import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const OrdersScreen = ({ navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;
    const [activeTab, setActiveTab] = useState('active');

    const activeOrders = [
        { id: 'ORD003', restaurant: 'Chinese Kitchen', customerName: 'Amit Patel', address: '789 Lake View, Mumbai', distance: '1.8 km', earning: 65, status: 'picked_up', items: 4 },
        { id: 'ORD004', restaurant: 'Dosa Corner', customerName: 'Sneha Reddy', address: '321 Hill Road, Mumbai', distance: '4.2 km', earning: 110, status: 'on_the_way', items: 2 },
    ];

    const completedOrders = [
        { id: 'ORD001', restaurant: 'Pizza Palace', customerName: 'Rahul Kumar', address: '123 Main Street, Mumbai', earning: 75, status: 'delivered', time: '2:30 PM' },
        { id: 'ORD002', restaurant: 'Burger Joint', customerName: 'Priya Sharma', address: '456 Park Avenue, Mumbai', earning: 95, status: 'delivered', time: '1:15 PM' },
        { id: 'ORD005', restaurant: 'Biryani House', customerName: 'Karthik Iyer', address: '654 Beach Road, Mumbai', earning: 85, status: 'delivered', time: '12:00 PM' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'picked_up': return colors.warning;
            case 'on_the_way': return colors.primary;
            case 'delivered': return colors.success;
            default: return colors.textMuted;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'picked_up': return 'Picked Up';
            case 'on_the_way': return 'On The Way';
            case 'delivered': return 'Delivered';
            default: return status;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>My <Text style={{ fontWeight: '700' }}>Orders</Text></Text>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity style={[styles.tab, { backgroundColor: activeTab === 'active' ? colors.primary : colors.card }]} onPress={() => setActiveTab('active')}>
                        <Text style={[styles.tabText, { color: activeTab === 'active' ? '#FFFFFF' : colors.textMuted }]}>Active ({activeOrders.length})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, { backgroundColor: activeTab === 'completed' ? colors.primary : colors.card }]} onPress={() => setActiveTab('completed')}>
                        <Text style={[styles.tabText, { color: activeTab === 'completed' ? '#FFFFFF' : colors.textMuted }]}>Completed ({completedOrders.length})</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {activeTab === 'active' ? (
                    activeOrders.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Icon name="package" size={64} color={colors.textMuted} />
                            <Text style={[styles.emptyTitle, { color: colors.text }]}>No Active Orders</Text>
                            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Accept new orders to start delivering</Text>
                        </View>
                    ) : (
                        activeOrders.map(order => (
                            <TouchableOpacity key={order.id} style={[styles.orderCard, { backgroundColor: colors.card }]} onPress={() => navigation.navigate('OrderDetail', { order })}>
                                <View style={styles.orderHeader}>
                                    <View style={[styles.orderBadge, { backgroundColor: colors.primary + '20' }]}>
                                        <Text style={[styles.orderBadgeText, { color: colors.primary }]}>{order.id}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(order.status) }]} />
                                        <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{getStatusText(order.status)}</Text>
                                    </View>
                                </View>

                                <View style={styles.orderRestaurant}>
                                    <Icon name="shopping-bag" size={18} color={colors.primary} />
                                    <Text style={[styles.restaurantName, { color: colors.text }]}>{order.restaurant}</Text>
                                </View>

                                <View style={styles.orderAddress}>
                                    <Icon name="map-pin" size={16} color={colors.textMuted} />
                                    <Text style={[styles.addressText, { color: colors.textMuted }]} numberOfLines={1}>{order.address}</Text>
                                </View>

                                <View style={styles.orderFooter}>
                                    <View style={styles.distanceBox}>
                                        <Icon name="navigation" size={14} color={colors.primary} />
                                        <Text style={[styles.distanceText, { color: colors.primary }]}>{order.distance}</Text>
                                    </View>
                                    <View style={[styles.earningBox, { backgroundColor: colors.primary }]}>
                                        <Text style={styles.earningText}>₹{order.earning}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )
                ) : (
                    completedOrders.map(order => (
                        <View key={order.id} style={[styles.orderCard, { backgroundColor: colors.card }]}>
                            <View style={styles.orderHeader}>
                                <View style={[styles.orderBadge, { backgroundColor: colors.success + '20' }]}>
                                    <Text style={[styles.orderBadgeText, { color: colors.success }]}>{order.id}</Text>
                                </View>
                                <Text style={[styles.completedTime, { color: colors.textMuted }]}>{order.time}</Text>
                            </View>

                            <View style={styles.orderRestaurant}>
                                <Icon name="shopping-bag" size={18} color={colors.success} />
                                <Text style={[styles.restaurantName, { color: colors.text }]}>{order.restaurant}</Text>
                            </View>

                            <View style={styles.orderFooter}>
                                <View style={styles.statusBadge2}>
                                    <Icon name="check-circle" size={16} color={colors.success} />
                                    <Text style={[styles.statusText2, { color: colors.success }]}>Delivered</Text>
                                </View>
                                <Text style={[styles.earningAmount, { color: colors.primary }]}>+₹{order.earning}</Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: { padding: spacing.lg, paddingTop: spacing.xl },
    headerTitle: { fontSize: 28, fontWeight: '600', marginBottom: 20 },
    tabContainer: { flexDirection: 'row', gap: 12 },
    tab: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
    tabText: { fontSize: 14, fontWeight: '500' },

    scrollContent: { padding: spacing.lg, paddingTop: 0 },

    emptyState: { alignItems: 'center', paddingTop: 60 },
    emptyTitle: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
    emptyText: { fontSize: 14, textAlign: 'center' },

    orderCard: { borderRadius: 16, padding: 16, marginBottom: 12 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    orderBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    orderBadgeText: { fontSize: 12, fontWeight: '600' },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, gap: 6 },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    statusText: { fontSize: 12, fontWeight: '600' },
    orderRestaurant: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    restaurantName: { fontSize: 16, fontWeight: '600' },
    orderAddress: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    addressText: { fontSize: 13, flex: 1 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    distanceBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    distanceText: { fontSize: 14, fontWeight: '600' },
    earningBox: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    earningText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
    completedTime: { fontSize: 12 },
    statusBadge2: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    statusText2: { fontSize: 14, fontWeight: '500' },
    earningAmount: { fontSize: 18, fontWeight: '700' },
});

export default OrdersScreen;
