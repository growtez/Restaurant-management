import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from '../context/LocationContext';
import { spacing } from '../theme';

const CheckoutScreen = ({ route, navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;
    const { selectedAddress } = useLocation();
    const { total = 0 } = route.params || {};
    const [selectedPayment, setSelectedPayment] = useState('cod');

    const paymentMethods = [
        { id: 'cod', icon: 'smartphone', label: 'Pay on Delivery' },
        { id: 'card', icon: 'credit-card', label: 'Credit/Debit Card' },
        { id: 'upi', icon: 'globe', label: 'UPI' },
    ];

    const handlePlaceOrder = () => {
        const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
        navigation.replace('OrderTracking', { orderId });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <View style={styles.header}>
                <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.inputBg }]} onPress={() => navigation.goBack()}><Icon name="arrow-left" size={24} color={colors.text} /></TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Checkout</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Delivery Address</Text>
                    <TouchableOpacity style={[styles.addressCard, { backgroundColor: colors.card }]} onPress={() => navigation.navigate('Address')}>
                        <View style={[styles.addressIcon, { backgroundColor: colors.primary + '15' }]}><Icon name="map-pin" size={20} color={colors.primary} /></View>
                        <View style={styles.addressInfo}>
                            <Text style={[styles.addressLabel, { color: colors.text }]}>{selectedAddress?.label || 'Select Address'}</Text>
                            <Text style={[styles.addressText, { color: colors.textMuted }]}>{selectedAddress?.address || 'Tap to choose delivery address'}</Text>
                        </View>
                        <Icon name="edit-2" size={16} color={colors.textMuted} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Method</Text>
                    {paymentMethods.map(method => (
                        <TouchableOpacity key={method.id} style={[styles.paymentOption, { backgroundColor: colors.card, borderColor: selectedPayment === method.id ? colors.primary : 'transparent' }]} onPress={() => setSelectedPayment(method.id)}>
                            <View style={[styles.paymentIcon, { backgroundColor: colors.primary + '15' }]}><Icon name={method.icon} size={20} color={selectedPayment === method.id ? colors.primary : colors.textMuted} /></View>
                            <Text style={[styles.paymentText, { color: colors.text }]}>{method.label}</Text>
                            <View style={[styles.radio, { borderColor: selectedPayment === method.id ? colors.primary : colors.textMuted }]}>{selectedPayment === method.id && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}</View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Summary</Text>
                    <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
                        <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Order Total</Text><Text style={[styles.summaryValue, { color: colors.text }]}>₹{total}</Text></View>
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
                <TouchableOpacity style={[styles.placeOrderBtn, { backgroundColor: colors.primary }]} onPress={handlePlaceOrder}><Text style={styles.placeOrderText}>Place Order • ₹{total}</Text></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.xl + 20, paddingBottom: spacing.md },
    backBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '600' },
    scrollContent: { padding: spacing.lg, paddingBottom: 120 },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
    addressCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16 },
    addressIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    addressInfo: { flex: 1 },
    addressLabel: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    addressText: { fontSize: 13 },
    paymentOption: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 2 },
    paymentIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    paymentText: { flex: 1, fontSize: 16 },
    radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
    radioInner: { width: 12, height: 12, borderRadius: 6 },
    summaryCard: { borderRadius: 16, padding: 20 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
    summaryLabel: { fontSize: 16 },
    summaryValue: { fontSize: 20, fontWeight: '700' },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, borderTopWidth: 1 },
    placeOrderBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
    placeOrderText: { color: '#1a1a1a', fontSize: 16, fontWeight: '700' },
});

export default CheckoutScreen;
