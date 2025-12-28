import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const CartScreen = ({ navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;

    const [activeTab, setActiveTab] = useState('cart');
    const [cart, setCart] = useState([
        { id: 1, name: 'Caesar Salad', price: 340, quantity: 2, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200', customizations: ['Extra Parmesan', 'No Croutons'] },
        { id: 2, name: 'Grilled Salmon', price: 740, quantity: 1, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200', customizations: ['Medium Rare'] },
        { id: 3, name: 'Fresh Orange Juice', price: 180, quantity: 3, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200', customizations: [] },
    ]);

    const [orders, setOrders] = useState([
        { id: 'ORD001', status: 'ready', items: [{ name: 'Chicken Wings', quantity: 1, price: 480 }], total: 760, orderTime: '2:30 PM', estimatedTime: 'Ready for pickup' },
        { id: 'ORD002', status: 'preparing', items: [{ name: 'Pasta Carbonara', quantity: 1, price: 560 }], total: 860, orderTime: '3:15 PM', estimatedTime: '10 mins remaining' },
    ]);

    const updateQuantity = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0));
    const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 40;
    const taxes = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + taxes;

    const getStatusColor = (status) => ({ placed: colors.primary, preparing: colors.warning, ready: colors.success }[status] || colors.textMuted);
    const getStatusIcon = (status) => ({ placed: 'clock', preparing: 'coffee', ready: 'check-circle' }[status] || 'clock');

    const placeOrder = () => {
        if (cart.length === 0) return;
        const newOrder = { id: `ORD00${orders.length + 1}`, status: 'placed', items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })), total, orderTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), estimatedTime: '30 mins' };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        setActiveTab('orders');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.inputBg }]} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.heartBtn, { backgroundColor: colors.primary + '15' }]}>
                        <Icon name="heart" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.mainTitle}>
                    <Text style={[styles.titleText, { color: colors.text }]}>My <Text style={styles.highlight}>Orders</Text></Text>
                    <Text style={[styles.titleText, { color: colors.text }]}>& <Text style={styles.highlight}>Cart</Text></Text>
                </View>

                <View style={styles.tabNavigation}>
                    <TouchableOpacity style={[styles.tabBtn, { backgroundColor: activeTab === 'cart' ? colors.primary : colors.card }]} onPress={() => setActiveTab('cart')}>
                        <Text style={[styles.tabBtnText, { color: activeTab === 'cart' ? '#1a1a1a' : colors.textMuted }]}>Cart ({cart.length})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBtn, { backgroundColor: activeTab === 'orders' ? colors.primary : colors.card }]} onPress={() => setActiveTab('orders')}>
                        <Text style={[styles.tabBtnText, { color: activeTab === 'orders' ? '#1a1a1a' : colors.textMuted }]}>Orders ({orders.length})</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {activeTab === 'cart' ? (
                    cart.length === 0 ? (
                        <View style={styles.emptyState}><Icon name="shopping-bag" size={64} color={colors.textMuted} /><Text style={[styles.emptyTitle, { color: colors.text }]}>Your cart is empty</Text><Text style={[styles.emptyText, { color: colors.textMuted }]}>Add delicious items to get started!</Text></View>
                    ) : (
                        <>
                            <View style={styles.cartItems}>
                                {cart.map(item => (
                                    <View key={item.id} style={[styles.cartItem, { backgroundColor: colors.card }]}>
                                        <Image source={{ uri: item.image }} style={styles.cartImage} />
                                        <View style={styles.cartInfo}>
                                            <View style={styles.cartHeader}><Text style={[styles.cartName, { color: colors.text }]}>{item.name}</Text><TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.id)}><Icon name="trash-2" size={16} color={colors.error} /></TouchableOpacity></View>
                                            {item.customizations.length > 0 && <View style={styles.customizations}>{item.customizations.map((c, i) => <View key={i} style={[styles.customTag, { backgroundColor: colors.inputBg }]}><Text style={[styles.customTagText, { color: colors.textSecondary }]}>{c}</Text></View>)}</View>}
                                            <View style={styles.cartBottom}>
                                                <View style={[styles.quantityControls, { backgroundColor: colors.border }]}>
                                                    <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: colors.inputBg }]} onPress={() => updateQuantity(item.id, -1)}><Icon name="minus" size={14} color={colors.text} /></TouchableOpacity>
                                                    <Text style={[styles.qtyText, { color: colors.text }]}>{item.quantity}</Text>
                                                    <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: colors.inputBg }]} onPress={() => updateQuantity(item.id, 1)}><Icon name="plus" size={14} color={colors.text} /></TouchableOpacity>
                                                </View>
                                                <Text style={[styles.itemPrice, { color: colors.primary }]}>₹{item.price * item.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                            <View style={[styles.orderSummary, { backgroundColor: colors.card }]}>
                                <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Subtotal</Text><Text style={[styles.summaryValue, { color: colors.text }]}>₹{subtotal}</Text></View>
                                <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Delivery Fee</Text><Text style={[styles.summaryValue, { color: colors.text }]}>₹{deliveryFee}</Text></View>
                                <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Tax (5%)</Text><Text style={[styles.summaryValue, { color: colors.text }]}>₹{taxes}</Text></View>
                                <View style={[styles.summaryRow, styles.summaryTotal, { borderTopColor: colors.border }]}><Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text><Text style={[styles.totalValue, { color: colors.primary }]}>₹{total}</Text></View>
                            </View>
                            <TouchableOpacity style={[styles.placeOrderBtn, { backgroundColor: colors.primary }]} onPress={placeOrder}><Text style={styles.placeOrderText}>Place Order</Text></TouchableOpacity>
                        </>
                    )
                ) : (
                    orders.length === 0 ? (
                        <View style={styles.emptyState}><Icon name="clock" size={64} color={colors.textMuted} /><Text style={[styles.emptyTitle, { color: colors.text }]}>No orders yet</Text></View>
                    ) : (
                        <View style={styles.ordersList}>
                            {orders.map(order => (
                                <View key={order.id} style={[styles.orderItem, { backgroundColor: colors.card }]}>
                                    <View style={styles.orderHeader}>
                                        <View><Text style={[styles.orderId, { color: colors.text }]}>Order #{order.id}</Text><Text style={[styles.orderTime, { color: colors.textMuted }]}>{order.orderTime}</Text></View>
                                        <View style={[styles.orderStatus, { backgroundColor: getStatusColor(order.status) + '20' }]}><Icon name={getStatusIcon(order.status)} size={16} color={getStatusColor(order.status)} /><Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text></View>
                                    </View>
                                    <View style={[styles.orderItemsList, { borderColor: colors.border }]}>{order.items.map((i, idx) => <View key={idx} style={styles.orderItemRow}><Text style={[styles.orderItemName, { color: colors.textSecondary }]}>{i.quantity}x {i.name}</Text><Text style={[styles.orderItemPrice, { color: colors.textSecondary }]}>₹{i.price * i.quantity}</Text></View>)}</View>
                                    <View style={styles.orderFooter}><Text style={[styles.estimatedTime, { color: colors.textMuted }]}>{order.estimatedTime}</Text><Text style={[styles.orderTotal, { color: colors.primary }]}>Total: ₹{order.total}</Text></View>
                                </View>
                            ))}
                        </View>
                    )
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: spacing.lg, paddingTop: spacing.xl },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    backBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    heartBtn: { padding: 8, borderRadius: 50 },
    mainTitle: { marginBottom: 24 },
    titleText: { fontSize: 32, fontWeight: '600', lineHeight: 40 },
    highlight: { fontWeight: '700' },
    tabNavigation: { flexDirection: 'row', gap: 12 },
    tabBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
    tabBtnText: { fontSize: 14, fontWeight: '500' },
    scrollContent: { padding: spacing.lg, paddingTop: 0, paddingBottom: 100 },
    emptyState: { alignItems: 'center', paddingTop: 60 },
    emptyTitle: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
    emptyText: { fontSize: 14, textAlign: 'center' },
    cartItems: { gap: 16, marginBottom: 24 },
    cartItem: { flexDirection: 'row', borderRadius: 16, padding: 16 },
    cartImage: { width: 80, height: 80, borderRadius: 12 },
    cartInfo: { flex: 1, marginLeft: 16 },
    cartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    cartName: { fontSize: 16, fontWeight: '600', flex: 1 },
    removeBtn: { padding: 4 },
    customizations: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
    customTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    customTagText: { fontSize: 11 },
    cartBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    quantityControls: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 4 },
    qtyBtn: { width: 28, height: 28, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    qtyText: { fontWeight: '600', marginHorizontal: 12 },
    itemPrice: { fontSize: 16, fontWeight: '700' },
    orderSummary: { borderRadius: 16, padding: 20, marginBottom: 24 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    summaryLabel: { fontSize: 14 },
    summaryValue: { fontSize: 14 },
    summaryTotal: { borderTopWidth: 1, paddingTop: 12, marginTop: 4, marginBottom: 0 },
    totalLabel: { fontSize: 18, fontWeight: '700' },
    totalValue: { fontSize: 18, fontWeight: '700' },
    placeOrderBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
    placeOrderText: { color: '#1a1a1a', fontSize: 16, fontWeight: '700' },
    ordersList: { gap: 16 },
    orderItem: { borderRadius: 16, padding: 20 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
    orderId: { fontSize: 16, fontWeight: '600' },
    orderTime: { fontSize: 12, marginTop: 2 },
    orderStatus: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6 },
    statusText: { fontSize: 12, fontWeight: '600' },
    orderItemsList: { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 12, marginBottom: 12 },
    orderItemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    orderItemName: { fontSize: 14 },
    orderItemPrice: { fontSize: 14 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    estimatedTime: { fontSize: 12 },
    orderTotal: { fontSize: 16, fontWeight: '700' },
});

export default CartScreen;
