import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const OrderDetailScreen = ({ route, navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;
    const { order } = route.params || {};

    const [orderStatus, setOrderStatus] = useState(order?.status || 'accepted');

    const statusSteps = [
        { id: 'accepted', label: 'Order Accepted', icon: 'check-circle' },
        { id: 'picked_up', label: 'Picked Up', icon: 'package' },
        { id: 'on_the_way', label: 'On The Way', icon: 'navigation' },
        { id: 'delivered', label: 'Delivered', icon: 'home' },
    ];

    const currentStepIndex = statusSteps.findIndex(s => s.id === orderStatus);

    const handleUpdateStatus = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < statusSteps.length) {
            setOrderStatus(statusSteps[nextIndex].id);
            if (statusSteps[nextIndex].id === 'delivered') {
                Alert.alert('Order Completed!', `You earned ₹${order?.earning || 75}`, [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            }
        }
    };

    const openMaps = () => {
        const address = encodeURIComponent(order?.address || '');
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
    };

    const callCustomer = () => {
        Linking.openURL('tel:+919876543210');
    };

    if (!order) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.text }]}>Order not found</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.inputBg }]} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{order.id}</Text>
                <TouchableOpacity style={[styles.helpBtn, { backgroundColor: colors.warning + '20' }]}>
                    <Icon name="help-circle" size={24} color={colors.warning} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Status Progress */}
                <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
                    <Text style={[styles.statusTitle, { color: colors.text }]}>Order Status</Text>
                    <View style={styles.statusSteps}>
                        {statusSteps.map((step, index) => {
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;
                            return (
                                <View key={step.id} style={styles.stepRow}>
                                    <View style={styles.stepIndicator}>
                                        <View style={[styles.stepDot, { backgroundColor: isCompleted ? colors.primary : colors.border }, isCurrent && { borderWidth: 3, borderColor: colors.primary }]}>
                                            {isCompleted && <Icon name="check" size={14} color="#FFFFFF" />}
                                        </View>
                                        {index < statusSteps.length - 1 && (
                                            <View style={[styles.stepLine, { backgroundColor: isCompleted && index < currentStepIndex ? colors.primary : colors.border }]} />
                                        )}
                                    </View>
                                    <View style={styles.stepContent}>
                                        <Text style={[styles.stepLabel, { color: isCompleted ? colors.text : colors.textMuted }]}>{step.label}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Restaurant Info */}
                <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                    <View style={styles.infoHeader}>
                        <Icon name="shopping-bag" size={20} color={colors.primary} />
                        <Text style={[styles.infoTitle, { color: colors.text }]}>Pickup From</Text>
                    </View>
                    <Text style={[styles.infoName, { color: colors.text }]}>{order.restaurant}</Text>
                    <Text style={[styles.infoAddress, { color: colors.textMuted }]}>Restaurant Address, Mumbai</Text>
                    <View style={styles.infoDetails}>
                        <Text style={[styles.infoDetail, { color: colors.textSecondary }]}>{order.items} items</Text>
                    </View>
                </View>

                {/* Customer Info */}
                <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                    <View style={styles.infoHeader}>
                        <Icon name="map-pin" size={20} color={colors.error} />
                        <Text style={[styles.infoTitle, { color: colors.text }]}>Deliver To</Text>
                    </View>
                    <Text style={[styles.infoName, { color: colors.text }]}>{order.customerName}</Text>
                    <Text style={[styles.infoAddress, { color: colors.textMuted }]}>{order.address}</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary + '15' }]} onPress={openMaps}>
                            <Icon name="navigation" size={18} color={colors.primary} />
                            <Text style={[styles.actionText, { color: colors.primary }]}>Navigate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary + '15' }]} onPress={callCustomer}>
                            <Icon name="phone" size={18} color={colors.primary} />
                            <Text style={[styles.actionText, { color: colors.primary }]}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Earning */}
                <View style={[styles.earningCard, { backgroundColor: colors.card }]}>
                    <View>
                        <Text style={[styles.earningLabel, { color: colors.textMuted }]}>Your Earning</Text>
                        <Text style={[styles.earningAmount, { color: colors.primary }]}>₹{order.earning}</Text>
                    </View>
                    <View style={styles.distanceInfo}>
                        <Icon name="navigation" size={16} color={colors.textMuted} />
                        <Text style={[styles.distanceText, { color: colors.textMuted }]}>{order.distance}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Action Button */}
            {orderStatus !== 'delivered' && (
                <View style={[styles.footer, { backgroundColor: colors.background }]}>
                    <TouchableOpacity style={[styles.updateBtn, { backgroundColor: colors.primary }]} onPress={handleUpdateStatus}>
                        <Text style={styles.updateBtnText}>
                            {orderStatus === 'accepted' && 'Mark as Picked Up'}
                            {orderStatus === 'picked_up' && 'Start Delivery'}
                            {orderStatus === 'on_the_way' && 'Complete Delivery'}
                        </Text>
                        <Icon name="arrow-right" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    errorText: { fontSize: 16, textAlign: 'center', marginTop: 100 },

    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.xl + 20, paddingBottom: spacing.md },
    backBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '600' },
    helpBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },

    scrollContent: { padding: spacing.lg, paddingBottom: 120 },

    statusCard: { borderRadius: 16, padding: 20, marginBottom: 16 },
    statusTitle: { fontSize: 16, fontWeight: '600', marginBottom: 20 },
    statusSteps: {},
    stepRow: { flexDirection: 'row', minHeight: 50 },
    stepIndicator: { alignItems: 'center', marginRight: 16 },
    stepDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    stepLine: { width: 2, flex: 1, marginVertical: 4 },
    stepContent: { flex: 1, paddingBottom: 16 },
    stepLabel: { fontSize: 14, fontWeight: '500' },

    infoCard: { borderRadius: 16, padding: 20, marginBottom: 16 },
    infoHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    infoTitle: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
    infoName: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
    infoAddress: { fontSize: 14, marginBottom: 12 },
    infoDetails: { flexDirection: 'row' },
    infoDetail: { fontSize: 13 },
    actionButtons: { flexDirection: 'row', gap: 12 },
    actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12, gap: 8 },
    actionText: { fontSize: 14, fontWeight: '600' },

    earningCard: { borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    earningLabel: { fontSize: 12, marginBottom: 4 },
    earningAmount: { fontSize: 28, fontWeight: '700' },
    distanceInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    distanceText: { fontSize: 14 },

    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg },
    updateBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 16, gap: 12 },
    updateBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

export default OrderDetailScreen;
