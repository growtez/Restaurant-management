import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const ProfileScreen = ({ navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;

    const user = { name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210' };

    const menuItems = [
        { id: 1, icon: 'map-pin', label: 'My Addresses', screen: 'Address' },
        { id: 2, icon: 'credit-card', label: 'Payment Methods', screen: null },
        { id: 3, icon: 'heart', label: 'Favorites', screen: null },
        { id: 4, icon: 'clock', label: 'Order History', screen: 'Orders' },
        { id: 5, icon: 'bell', label: 'Notifications', screen: null },
        { id: 6, icon: 'settings', label: 'Settings', screen: 'Settings' },
        { id: 7, icon: 'help-circle', label: 'Help & Support', screen: null },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.menuIcon}>
                        <View style={[styles.hamburger, { backgroundColor: colors.text }]} />
                        <View style={[styles.hamburger, { backgroundColor: colors.text }]} />
                        <View style={[styles.hamburger, { backgroundColor: colors.text }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.editBtn, { backgroundColor: colors.primary + '15' }]}>
                        <Icon name="edit-2" size={20} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.mainTitle}>
                    <Text style={[styles.titleText, { color: colors.text }]}>My <Text style={styles.highlight}>Profile</Text></Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* User Card */}
                <View style={[styles.userCard, { backgroundColor: colors.card }]}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                        <Text style={styles.avatarText}>JD</Text>
                    </View>
                    <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
                    <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user.email}</Text>
                    <Text style={[styles.userPhone, { color: colors.textSecondary }]}>{user.phone}</Text>
                </View>

                {/* Theme Quick Toggle */}
                <TouchableOpacity style={[styles.themeToggle, { backgroundColor: colors.card }]} onPress={() => navigation.navigate('Settings')}>
                    <View style={[styles.themeIcon, { backgroundColor: colors.primary + '15' }]}>
                        <Icon name={isDark ? 'moon' : 'sun'} size={20} color={colors.primary} />
                    </View>
                    <View style={styles.themeInfo}>
                        <Text style={[styles.themeLabel, { color: colors.text }]}>Theme</Text>
                        <Text style={[styles.themeValue, { color: colors.textMuted }]}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color={colors.textMuted} />
                </TouchableOpacity>

                {/* Menu Items */}
                <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.menuItem, index !== menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
                            onPress={() => item.screen && navigation.navigate(item.screen)}>
                            <View style={[styles.menuIconWrap, { backgroundColor: colors.primary + '15' }]}>
                                <Icon name={item.icon} size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                            <Icon name="chevron-right" size={20} color={colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: colors.error + '15' }]}>
                    <Icon name="log-out" size={20} color={colors.error} />
                    <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
                </TouchableOpacity>
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
    editBtn: { padding: 8, borderRadius: 50 },
    mainTitle: { marginBottom: 8 },
    titleText: { fontSize: 32, fontWeight: '600', lineHeight: 40 },
    highlight: { fontWeight: '700' },

    scrollContent: { padding: spacing.lg, paddingTop: 0 },

    userCard: { alignItems: 'center', borderRadius: 20, padding: 32, marginBottom: 16 },
    avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    avatarText: { fontSize: 28, fontWeight: '700', color: '#1a1a1a' },
    userName: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
    userEmail: { fontSize: 14, marginBottom: 2 },
    userPhone: { fontSize: 14 },

    themeToggle: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, marginBottom: 16 },
    themeIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    themeInfo: { flex: 1 },
    themeLabel: { fontSize: 16, fontWeight: '500' },
    themeValue: { fontSize: 12, marginTop: 2 },

    menuSection: { borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    menuIconWrap: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    menuLabel: { flex: 1, fontSize: 16 },

    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, gap: 8 },
    logoutText: { fontSize: 16, fontWeight: '600' },
});

export default ProfileScreen;
