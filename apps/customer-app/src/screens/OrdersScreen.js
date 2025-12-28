import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const OrdersScreen = ({ navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;

    const orders = [
        { id: 'ORD001', status: 'delivered', items: [{ name: 'Caesar Salad', quantity: 2 }, { name: 'Chicken Wings', quantity: 1 }], total: 1160, date: '27 Dec 2024', time: '2:30 PM' },
        { id: 'ORD002', status: 'delivered', items: [{ name: 'Grilled Salmon', quantity: 1 }], total: 740, date: '25 Dec 2024', time: '7:15 PM' },
        { id: 'ORD003', status: 'delivered', items: [{ name: 'Pasta Carbonara', quantity: 2 }], total: 1120, date: '23 Dec 2024', time: '1:00 PM' },
    ];

    const getStatusColor = (status) => ({ delivered: colors.success, cancelled: colors.error, preparing: colors.warning }[status] || colors.primary);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.menuIcon}>
                        <View style={[styles.hamburger, { backgroundColor: colors.text }]} />
                        <View style={[styles.hamburger, { backgroundColor: colors.text }]} />
                        <View style={[styles.hamburger, { backgroundColor: colors.text }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cartBtn, { backgroundColor: colors.primary + '15' }]} onPress={() => navigation.navigate('Cart')}>
                        <Icon name="shopping-cart" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.mainTitle}><Text style={[styles.titleText, { color: colors.text }]}>Order <Text style={styles.highlight}>History</Text></Text></View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {orders.map(order => (
                    <TouchableOpacity key={order.id} style={[styles.orderCard, { backgroundColor: colors.card }]} onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}>
                        <View style={styles.orderHeader}>
                            <View><Text style={[styles.orderId, { color: colors.text }]}>Order #{order.id}</Text><Text style={[styles.orderDate, { color: colors.textMuted }]}>{order.date} • {order.time}</Text></View>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}><Icon name="check-circle" size={14} color={getStatusColor(order.status)} /><Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text></View>
                        </View>
                        <View style={[styles.orderItems, { borderColor: colors.border }]}>{order.items.map((item, idx) => <Text key={idx} style={[styles.orderItem, { color: colors.textSecondary }]}>• {item.quantity}x {item.name}</Text>)}</View>
                        <View style={styles.orderFooter}><Text style={[styles.orderTotal, { color: colors.primary }]}>₹{order.total}</Text><View style={styles.reorderBtn}><Icon name="refresh-cw" size={14} color={colors.primary} /><Text style={[styles.reorderText, { color: colors.primary }]}>Reorder</Text></View></View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: spacing.lg, paddingTop: spacing.xl },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    menuIcon: { gap: 4 },
    hamburger: { width: 24, height: 3, borderRadius: 2 },
    cartBtn: { padding: 8, borderRadius: 50 },
    mainTitle: { marginBottom: 8 },
    titleText: { fontSize: 32, fontWeight: '600', lineHeight: 40 },
    highlight: { fontWeight: '700' },
    scrollContent: { padding: spacing.lg, paddingTop: 0, gap: 16 },
    orderCard: { borderRadius: 16, padding: 20 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
    orderId: { fontSize: 16, fontWeight: '600' },
    orderDate: { fontSize: 12, marginTop: 4 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16, gap: 4 },
    statusText: { fontSize: 12, fontWeight: '600' },
    orderItems: { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 12, marginBottom: 12 },
    orderItem: { fontSize: 14, marginBottom: 4 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderTotal: { fontSize: 18, fontWeight: '700' },
    reorderBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    reorderText: { fontSize: 14, fontWeight: '500' },
});

export default OrdersScreen;
