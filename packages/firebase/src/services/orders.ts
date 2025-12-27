// ==========================================
// Orders Service
// ==========================================

import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    onSnapshot,
    Unsubscribe,
} from 'firebase/firestore';
import { db } from '../config';
import { ordersRef, orderRef } from '../collections';
import {
    Order,
    OrderStatus,
    OrderType,
    Cart,
    Address,
    PaymentMethod,
    PaymentStatus,
} from '@restaurant-saas/types';
import { getCart, clearCart, calculateCartTotal } from './cart';

// ==========================================
// Order Number Generation
// ==========================================

const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `ORD-${timestamp}-${random}`;
};

// ==========================================
// Order CRUD
// ==========================================

export const getOrder = async (
    restaurantId: string,
    orderId: string
): Promise<Order | null> => {
    const docSnap = await getDoc(orderRef(restaurantId, orderId));
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Order;
    }
    return null;
};

export const getOrders = async (
    restaurantId: string,
    limitCount: number = 50
): Promise<Order[]> => {
    const q = query(
        ordersRef(restaurantId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

export const getOrdersByStatus = async (
    restaurantId: string,
    status: OrderStatus
): Promise<Order[]> => {
    const q = query(
        ordersRef(restaurantId),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

export const getActiveOrders = async (restaurantId: string): Promise<Order[]> => {
    const activeStatuses = [
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
        OrderStatus.PREPARING,
        OrderStatus.READY,
        OrderStatus.OUT_FOR_DELIVERY,
    ];

    const q = query(
        ordersRef(restaurantId),
        where('status', 'in', activeStatuses),
        orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

export const getTableOrders = async (
    restaurantId: string,
    tableNumber: number
): Promise<Order[]> => {
    const q = query(
        ordersRef(restaurantId),
        where('type', '==', OrderType.DINE_IN),
        where('tableNumber', '==', tableNumber),
        where('status', 'in', [
            OrderStatus.PENDING,
            OrderStatus.CONFIRMED,
            OrderStatus.PREPARING,
            OrderStatus.READY,
        ]),
        orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

// ==========================================
// Create Order from Cart
// ==========================================

export interface CreateOrderOptions {
    restaurantId: string;
    customerName?: string;
    customerPhone?: string;
    customerId?: string;
    address?: Address;
    deliveryInstructions?: string;
    paymentMethod: PaymentMethod;
    taxRate?: number; // e.g., 0.05 for 5%
    deliveryFee?: number;
}

export const createOrderFromCart = async (
    options: CreateOrderOptions
): Promise<string> => {
    const { restaurantId, taxRate = 0.05, deliveryFee = 0 } = options;

    // Get cart
    const cart = await getCart(restaurantId);
    if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
    }

    // Calculate totals
    const subtotal = calculateCartTotal(cart.items);
    const taxes = Math.round(subtotal * taxRate);
    const total = subtotal + taxes + (cart.type === OrderType.DELIVERY ? deliveryFee : 0);

    // Create order items with totals
    const orderItems = cart.items.map(item => ({
        ...item,
        total: item.price * item.quantity +
            (item.addons?.reduce((sum, a) => sum + a.price, 0) || 0) * item.quantity,
    }));

    // Create order document
    const orderDocRef = doc(ordersRef(restaurantId));
    const order: Omit<Order, 'id'> = {
        orderNumber: generateOrderNumber(),
        type: cart.type,

        // Customer info
        customerId: options.customerId,
        customerName: options.customerName,
        customerPhone: options.customerPhone,

        // Dine-in
        tableNumber: cart.tableNumber,

        // Delivery
        address: options.address,
        deliveryInstructions: options.deliveryInstructions,

        // Items
        items: orderItems,
        subtotal,
        taxes,
        deliveryFee: cart.type === OrderType.DELIVERY ? deliveryFee : 0,
        discount: 0,
        total,

        // Status
        status: OrderStatus.PENDING,

        // Payment
        payment: {
            method: options.paymentMethod,
            status: options.paymentMethod === PaymentMethod.COD
                ? PaymentStatus.PENDING
                : PaymentStatus.PENDING,
        },

        // Timestamps
        createdAt: serverTimestamp() as any,
    };

    await setDoc(orderDocRef, order);

    // Clear cart after order
    await clearCart(restaurantId);

    return orderDocRef.id;
};

// ==========================================
// Update Order Status
// ==========================================

export const updateOrderStatus = async (
    restaurantId: string,
    orderId: string,
    status: OrderStatus
): Promise<void> => {
    const timestampField = getTimestampFieldForStatus(status);

    const updateData: any = { status };
    if (timestampField) {
        updateData[timestampField] = serverTimestamp();
    }

    await updateDoc(orderRef(restaurantId, orderId), updateData);
};

const getTimestampFieldForStatus = (status: OrderStatus): string | null => {
    switch (status) {
        case OrderStatus.CONFIRMED:
            return 'confirmedAt';
        case OrderStatus.PREPARING:
            return 'preparingAt';
        case OrderStatus.READY:
            return 'readyAt';
        case OrderStatus.DELIVERED:
            return 'deliveredAt';
        case OrderStatus.CANCELLED:
            return 'cancelledAt';
        default:
            return null;
    }
};

// ==========================================
// Assign Delivery
// ==========================================

export const assignDeliveryAgent = async (
    restaurantId: string,
    orderId: string,
    agentId: string
): Promise<void> => {
    await updateDoc(orderRef(restaurantId, orderId), {
        assignedAgent: agentId,
        status: OrderStatus.OUT_FOR_DELIVERY,
    });
};

// ==========================================
// Real-time Order Subscription
// ==========================================

export const subscribeToOrders = (
    restaurantId: string,
    callback: (orders: Order[]) => void
): Unsubscribe => {
    const q = query(
        ordersRef(restaurantId),
        orderBy('createdAt', 'desc'),
        limit(50)
    );

    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        callback(orders);
    });
};

export const subscribeToActiveOrders = (
    restaurantId: string,
    callback: (orders: Order[]) => void
): Unsubscribe => {
    const activeStatuses = [
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
        OrderStatus.PREPARING,
        OrderStatus.READY,
        OrderStatus.OUT_FOR_DELIVERY,
    ];

    const q = query(
        ordersRef(restaurantId),
        where('status', 'in', activeStatuses),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        callback(orders);
    });
};

export const subscribeToOrder = (
    restaurantId: string,
    orderId: string,
    callback: (order: Order | null) => void
): Unsubscribe => {
    return onSnapshot(orderRef(restaurantId, orderId), (snapshot) => {
        if (snapshot.exists()) {
            callback({ id: snapshot.id, ...snapshot.data() } as Order);
        } else {
            callback(null);
        }
    });
};
