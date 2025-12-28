import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const ProfileScreen = ({ navigation }) => {
    const { theme, isDark, toggleTheme } = useTheme();
    const colors = theme.colors;

    const driver = {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        email: 'rajesh@delivery.com',
        rating: 4.8,
        totalDeliveries: 1250,
        vehicleType: 'Bike',
        vehicleNumber: 'MH 01 AB 1234',
    };

    const menuItems = [
        { id: 1, icon: 'user', label: 'Edit Profile', screen: null },
        { id: 2, icon: 'truck', label: 'Vehicle Info', screen: null },
        { id: 3, icon: 'file-text', label: 'Documents', screen: null },
        { id: 4, icon: 'bell', label: 'Notifications', screen: null },
        { id: 5, icon: 'settings', label: 'Settings', screen: 'Settings' },
        { id: 6, icon: 'help-circle', label: 'Help & Support', screen: null },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>My <Text style={{ fontWeight: '700' }}>Profile</Text></Text>
                </View>

                {/* Profile Card */}
                <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                        <Text style={styles.avatarText}>RK</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={[styles.driverName, { color: colors.text }]}>{driver.name}</Text>
                        <Text style={[styles.driverPhone, { color: colors.textSecondary }]}>{driver.phone}</Text>
                        <View style={styles.ratingRow}>
                            <Icon name="star" size={16} color={colors.star} />
                            <Text style={[styles.ratingText, { color: colors.text }]}>{driver.rating}</Text>
                            <Text style={[styles.deliveryCount, { color: colors.textMuted }]}>• {driver.totalDeliveries} deliveries</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.editBtn, { backgroundColor: colors.inputBg }]}>
                        <Icon name="edit-2" size={18} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Vehicle Info */}
                <View style={[styles.vehicleCard, { backgroundColor: colors.card }]}>
                    <View style={[styles.vehicleIcon, { backgroundColor: colors.primary + '15' }]}>
                        <Icon name="truck" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.vehicleInfo}>
                        <Text style={[styles.vehicleType, { color: colors.text }]}>{driver.vehicleType}</Text>
                        <Text style={[styles.vehicleNumber, { color: colors.textMuted }]}>{driver.vehicleNumber}</Text>
                    </View>
                    <View style={[styles.verifiedBadge, { backgroundColor: colors.success + '20' }]}>
                        <Icon name="check-circle" size={14} color={colors.success} />
                        <Text style={[styles.verifiedText, { color: colors.success }]}>Verified</Text>
                    </View>
                </View>

                {/* Theme Toggle */}
                <TouchableOpacity style={[styles.themeToggle, { backgroundColor: colors.card }]} onPress={() => toggleTheme(isDark ? 'light' : 'dark')}>
                    <View style={[styles.themeIcon, { backgroundColor: colors.primary + '15' }]}>
                        <Icon name={isDark ? 'moon' : 'sun'} size={20} color={colors.primary} />
                    </View>
                    <View style={styles.themeInfo}>
                        <Text style={[styles.themeLabel, { color: colors.text }]}>Theme</Text>
                        <Text style={[styles.themeValue, { color: colors.textMuted }]}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
                    </View>
                    <Icon name={isDark ? 'sun' : 'moon'} size={20} color={colors.textMuted} />
                </TouchableOpacity>

                {/* Menu Items */}
                <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={item.id} style={[styles.menuItem, index !== menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]} onPress={() => item.screen && navigation.navigate(item.screen)}>
                            <View style={[styles.menuIcon, { backgroundColor: colors.primary + '15' }]}>
                                <Icon name={item.icon} size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                            <Icon name="chevron-right" size={20} color={colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout */}
                <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: colors.error + '15' }]}>
                    <Icon name="log-out" size={20} color={colors.error} />
                    <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
                </TouchableOpacity>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: { padding: spacing.lg, paddingTop: spacing.xl },
    headerTitle: { fontSize: 28, fontWeight: '600' },

    profileCard: { marginHorizontal: spacing.lg, borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    avatar: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
    profileInfo: { flex: 1, marginLeft: 16 },
    driverName: { fontSize: 18, fontWeight: '600', marginBottom: 2 },
    driverPhone: { fontSize: 14, marginBottom: 6 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingText: { fontSize: 14, fontWeight: '600' },
    deliveryCount: { fontSize: 12 },
    editBtn: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },

    vehicleCard: { marginHorizontal: spacing.lg, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    vehicleIcon: { width: 50, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    vehicleInfo: { flex: 1, marginLeft: 16 },
    vehicleType: { fontSize: 16, fontWeight: '600' },
    vehicleNumber: { fontSize: 13, marginTop: 2 },
    verifiedBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, gap: 4 },
    verifiedText: { fontSize: 12, fontWeight: '600' },

    themeToggle: { marginHorizontal: spacing.lg, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    themeIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    themeInfo: { flex: 1 },
    themeLabel: { fontSize: 16, fontWeight: '500' },
    themeValue: { fontSize: 12, marginTop: 2 },

    menuSection: { marginHorizontal: spacing.lg, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    menuIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    menuLabel: { flex: 1, fontSize: 16 },

    logoutBtn: { marginHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, gap: 8 },
    logoutText: { fontSize: 16, fontWeight: '600' },
});

export default ProfileScreen;
