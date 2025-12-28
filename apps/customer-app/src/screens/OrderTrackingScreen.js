import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from '../context/LocationContext';
import { spacing } from '../theme';

const OrderTrackingScreen = ({ route, navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;
    const { selectedAddress } = useLocation();
    const { orderId = 'ORD-ABC123' } = route.params || {};

    const steps = [
        { id: 1, label: 'Order Placed', time: '2:30 PM', completed: true },
        { id: 2, label: 'Preparing', time: '2:35 PM', completed: true },
        { id: 3, label: 'Out for Delivery', time: '2:50 PM', completed: true },
        { id: 4, label: 'Delivered', time: null, completed: false },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <View style={styles.header}>
                <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.inputBg }]} onPress={() => navigation.navigate('MainApp')}><Icon name="arrow-left" size={24} color={colors.text} /></TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Track Order</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.orderCard, { backgroundColor: colors.card }]}>
                    <View style={styles.orderHeader}><Text style={[styles.orderId, { color: colors.text }]}>{orderId}</Text><View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}><Text style={[styles.statusText, { color: colors.success }]}>On the way</Text></View></View>
                    <Text style={[styles.estimatedTime, { color: colors.textMuted }]}>Estimated arrival: 15-20 mins</Text>
                </View>

                <View style={[styles.driverCard, { backgroundColor: colors.card }]}>
                    <View style={styles.driverInfo}>
                        <View style={[styles.driverAvatar, { backgroundColor: colors.primary }]}><Text style={styles.driverInitials}>RK</Text></View>
                        <View><Text style={[styles.driverName, { color: colors.text }]}>Rahul Kumar</Text><Text style={[styles.driverVehicle, { color: colors.textMuted }]}>Honda Activa • MH 01 AB 1234</Text></View>
                    </View>
                    <View style={styles.driverActions}>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary + '15' }]}><Icon name="phone" size={20} color={colors.primary} /></TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary + '15' }]}><Icon name="message-circle" size={20} color={colors.primary} /></TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.trackingCard, { backgroundColor: colors.card }]}>
                    <Text style={[styles.trackingTitle, { color: colors.text }]}>Order Status</Text>
                    {steps.map((step, index) => (
                        <View key={step.id} style={styles.step}>
                            <View style={styles.stepIndicator}>
                                <View style={[styles.stepDot, step.completed && { backgroundColor: colors.success, borderColor: colors.success }]}>{step.completed && <Icon name="check" size={12} color="#FFFFFF" />}</View>
                                {index < steps.length - 1 && <View style={[styles.stepLine, { backgroundColor: step.completed ? colors.success : colors.textMuted }]} />}
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={[styles.stepLabel, { color: step.completed ? colors.text : colors.textMuted }]}>{step.label}</Text>
                                {step.time && <Text style={[styles.stepTime, { color: colors.textMuted }]}>{step.time}</Text>}
                            </View>
                        </View>
                    ))}
                </View>

                <View style={[styles.addressCard, { backgroundColor: colors.card }]}>
                    <View style={[styles.addressIcon, { backgroundColor: colors.primary + '15' }]}><Icon name="map-pin" size={20} color={colors.primary} /></View>
                    <View style={styles.addressInfo}>
                        <Text style={[styles.addressLabel, { color: colors.textMuted }]}>Delivery Address</Text>
                        <Text style={[styles.addressText, { color: colors.text }]}>{selectedAddress?.address || '123 Main Street, Mumbai 400001'}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.xl + 20, paddingBottom: spacing.md },
    backBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '600' },
    scrollContent: { padding: spacing.lg },
    orderCard: { borderRadius: 16, padding: 20, marginBottom: 16 },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    orderId: { fontSize: 18, fontWeight: '600' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
    statusText: { fontSize: 12, fontWeight: '600' },
    estimatedTime: { fontSize: 14 },
    driverCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 16, padding: 20, marginBottom: 16 },
    driverInfo: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    driverAvatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
    driverInitials: { color: '#1a1a1a', fontSize: 18, fontWeight: '700' },
    driverName: { fontSize: 16, fontWeight: '600' },
    driverVehicle: { fontSize: 12, marginTop: 2 },
    driverActions: { flexDirection: 'row', gap: 12 },
    actionBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    trackingCard: { borderRadius: 16, padding: 20, marginBottom: 16 },
    trackingTitle: { fontSize: 16, fontWeight: '600', marginBottom: 20 },
    step: { flexDirection: 'row', minHeight: 56 },
    stepIndicator: { alignItems: 'center', marginRight: 16 },
    stepDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#888', alignItems: 'center', justifyContent: 'center' },
    stepLine: { width: 2, flex: 1, marginVertical: 4 },
    stepContent: { flex: 1, paddingBottom: 16 },
    stepLabel: { fontSize: 14, marginBottom: 2, fontWeight: '500' },
    stepTime: { fontSize: 12 },
    addressCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 20 },
    addressIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    addressInfo: { flex: 1 },
    addressLabel: { fontSize: 12, marginBottom: 4 },
    addressText: { fontSize: 14 },
});

export default OrderTrackingScreen;
