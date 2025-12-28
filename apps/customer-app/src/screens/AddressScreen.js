import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from '../context/LocationContext';
import { spacing } from '../theme';

const AddressScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const colors = theme.colors;
    const { savedAddresses, getCurrentLocation, setDefaultAddress, isLoading, currentLocation } = useLocation();

    const handleUseCurrentLocation = async () => {
        const location = await getCurrentLocation();
        if (location) {
            // In production, you'd reverse geocode this to get the address
            console.log('Location obtained:', location);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.inputBg }]} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>My Addresses</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Use Current Location */}
                <TouchableOpacity style={[styles.locationBtn, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]} onPress={handleUseCurrentLocation} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color={colors.primary} />
                    ) : (
                        <Icon name="navigation" size={20} color={colors.primary} />
                    )}
                    <Text style={[styles.locationText, { color: colors.primary }]}>
                        {isLoading ? 'Getting Location...' : 'Use Current Location'}
                    </Text>
                </TouchableOpacity>

                {currentLocation && (
                    <View style={[styles.currentLocationCard, { backgroundColor: colors.card }]}>
                        <Icon name="map-pin" size={18} color={colors.success} />
                        <Text style={[styles.currentLocationText, { color: colors.textSecondary }]}>
                            Lat: {currentLocation.latitude.toFixed(6)}, Lng: {currentLocation.longitude.toFixed(6)}
                        </Text>
                    </View>
                )}

                {/* Saved Addresses */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Saved Addresses</Text>

                {savedAddresses.map(addr => (
                    <TouchableOpacity key={addr.id} style={[styles.addressCard, { backgroundColor: colors.card }]} onPress={() => setDefaultAddress(addr.id)}>
                        <View style={[styles.addressIcon, { backgroundColor: colors.primary + '15' }]}>
                            <Icon name={addr.label === 'Home' ? 'home' : 'briefcase'} size={20} color={colors.primary} />
                        </View>
                        <View style={styles.addressInfo}>
                            <View style={styles.addressHeader}>
                                <Text style={[styles.addressLabel, { color: colors.text }]}>{addr.label}</Text>
                                {addr.isDefault && (
                                    <View style={[styles.defaultBadge, { backgroundColor: colors.primary }]}>
                                        <Text style={styles.defaultText}>Default</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={[styles.addressText, { color: colors.textMuted }]}>{addr.address}</Text>
                        </View>
                        <TouchableOpacity style={styles.editBtn}>
                            <Icon name="edit-2" size={16} color={colors.textMuted} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}

                {/* Add New Address */}
                <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.card }]}>
                    <Icon name="plus" size={20} color={colors.primary} />
                    <Text style={[styles.addText, { color: colors.primary }]}>Add New Address</Text>
                </TouchableOpacity>
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

    locationBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 16, padding: 16, gap: 12, marginBottom: 16, borderWidth: 1, borderStyle: 'dashed' },
    locationText: { fontSize: 16, fontWeight: '600' },

    currentLocationCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 12, marginBottom: 16, gap: 8 },
    currentLocationText: { fontSize: 12 },

    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },

    addressCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, marginBottom: 12 },
    addressIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    addressInfo: { flex: 1 },
    addressHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
    addressLabel: { fontSize: 16, fontWeight: '600' },
    defaultBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    defaultText: { color: '#1a1a1a', fontSize: 10, fontWeight: '700' },
    addressText: { fontSize: 13 },
    editBtn: { padding: 8 },

    addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 16, padding: 16, gap: 12, marginTop: 12 },
    addText: { fontSize: 16, fontWeight: '500' },
});

export default AddressScreen;
