import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const HomeScreen = ({ navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;
    const [isOnline, setIsOnline] = useState(false);

    const todayStats = {
        deliveries: 12,
        earnings: 1850,
        distance: 45.5,
        hours: 6.5,
    };

    const pendingOrders = [
        { id: 'ORD001', restaurant: 'Pizza Palace', customerName: 'Rahul Kumar', address: '123 Main Street, Mumbai', distance: '2.5 km', earning: 75, items: 3, time: '5 mins ago' },
        { id: 'ORD002', restaurant: 'Burger Joint', customerName: 'Priya Sharma', address: '456 Park Avenue, Mumbai', distance: '3.8 km', earning: 95, items: 2, time: '2 mins ago' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={[styles.greeting, { color: colors.textMuted }]}>Good Morning</Text>
                            <Text style={[styles.driverName, { color: colors.text }]}>Delivery Partner</Text>
                        </View>
                        <TouchableOpacity style={[styles.profileBtn, { backgroundColor: colors.card }]} onPress={() => navigation.navigate('Profile')}>
                            <Icon name="user" size={24} color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Online Toggle */}
                    <View style={[styles.onlineCard, { backgroundColor: isOnline ? colors.primary + '20' : colors.card }]}>
                        <View style={styles.onlineInfo}>
                            <View style={[styles.statusDot, { backgroundColor: isOnline ? colors.online : colors.offline }]} />
                            <View>
                                <Text style={[styles.onlineTitle, { color: colors.text }]}>{isOnline ? 'You are Online' : 'You are Offline'}</Text>
                                <Text style={[styles.onlineSubtitle, { color: colors.textMuted }]}>{isOnline ? 'Accepting new orders' : 'Go online to receive orders'}</Text>
                            </View>
                        </View>
                        <Switch
                            value={isOnline}
                            onValueChange={setIsOnline}
                            trackColor={{ false: colors.border, true: colors.primary + '50' }}
                            thumbColor={isOnline ? colors.primary : colors.textMuted}
                        />
                    </View>
                </View>

                {/* Today's Stats */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Summary</Text>
                    <View style={styles.statsGrid}>
                        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                            <Icon name="package" size={24} color={colors.primary} />
                            <Text style={[styles.statValue, { color: colors.text }]}>{todayStats.deliveries}</Text>
                            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Deliveries</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                            <Icon name="dollar-sign" size={24} color={colors.primary} />
                            <Text style={[styles.statValue, { color: colors.text }]}>₹{todayStats.earnings}</Text>
                            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Earnings</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                            <Icon name="navigation" size={24} color={colors.primary} />
                            <Text style={[styles.statValue, { color: colors.text }]}>{todayStats.distance} km</Text>
                            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Distance</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                            <Icon name="clock" size={24} color={colors.primary} />
                            <Text style={[styles.statValue, { color: colors.text }]}>{todayStats.hours} hrs</Text>
                            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Online</Text>
                        </View>
                    </View>
                </View>

                {/* Pending Orders */}
                {isOnline && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>New Orders</Text>
                        {pendingOrders.map(order => (
                            <TouchableOpacity key={order.id} style={[styles.orderCard, { backgroundColor: colors.card }]} onPress={() => navigation.navigate('OrderDetail', { order })}>
                                <View style={styles.orderHeader}>
                                    <View style={[styles.orderBadge, { backgroundColor: colors.primary + '20' }]}>
                                        <Text style={[styles.orderBadgeText, { color: colors.primary }]}>{order.id}</Text>
                                    </View>
                                    <Text style={[styles.orderTime, { color: colors.textMuted }]}>{order.time}</Text>
                                </View>

                                <View style={styles.orderRestaurant}>
                                    <Icon name="shopping-bag" size={18} color={colors.primary} />
                                    <Text style={[styles.restaurantName, { color: colors.text }]}>{order.restaurant}</Text>
                                    <Text style={[styles.itemCount, { color: colors.textMuted }]}>• {order.items} items</Text>
                                </View>

                                <View style={styles.orderCustomer}>
                                    <Icon name="user" size={16} color={colors.textMuted} />
                                    <Text style={[styles.customerName, { color: colors.textSecondary }]}>{order.customerName}</Text>
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
                        ))}
                    </View>
                )}

                {!isOnline && (
                    <View style={styles.offlineMessage}>
                        <Icon name="wifi-off" size={48} color={colors.textMuted} />
                        <Text style={[styles.offlineTitle, { color: colors.text }]}>You're Offline</Text>
                        <Text style={[styles.offlineText, { color: colors.textMuted }]}>Turn on the switch above to start receiving orders</Text>
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: { padding: spacing.lg, paddingTop: spacing.xl },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    greeting: { fontSize: 14 },
    driverName: { fontSize: 24, fontWeight: '700' },
    profileBtn: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },

    onlineCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 16, padding: 20 },
    onlineInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    statusDot: { width: 12, height: 12, borderRadius: 6 },
    onlineTitle: { fontSize: 16, fontWeight: '600' },
    onlineSubtitle: { fontSize: 12, marginTop: 2 },

    section: { paddingHorizontal: spacing.lg, marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },

    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    statCard: { width: '47%', borderRadius: 16, padding: 16, alignItems: 'center' },
    statValue: { fontSize: 24, fontWeight: '700', marginTop: 8 },
    statLabel: { fontSize: 12, marginTop: 4 },

    orderCard: { borderRadius: 16, padding: 16, marginBottom: 12 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    orderBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    orderBadgeText: { fontSize: 12, fontWeight: '600' },
    orderTime: { fontSize: 12 },
    orderRestaurant: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    restaurantName: { fontSize: 16, fontWeight: '600' },
    itemCount: { fontSize: 14 },
    orderCustomer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
    customerName: { fontSize: 14 },
    orderAddress: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    addressText: { fontSize: 13, flex: 1 },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    distanceBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    distanceText: { fontSize: 14, fontWeight: '600' },
    earningBox: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    earningText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

    offlineMessage: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 40 },
    offlineTitle: { fontSize: 20, fontWeight: '600', marginTop: 16, marginBottom: 8 },
    offlineText: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});

export default HomeScreen;
