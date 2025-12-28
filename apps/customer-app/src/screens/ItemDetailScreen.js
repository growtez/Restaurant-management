import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const ItemDetailScreen = ({ route, navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;
    const { item } = route.params || {};

    if (!item) return <View style={[styles.container, { backgroundColor: colors.background }]}><Text style={[styles.errorText, { color: colors.text }]}>Item not found</Text></View>;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <View style={styles.header}>
                <TouchableOpacity style={[styles.backBtn, { backgroundColor: 'rgba(0,0,0,0.5)' }]} onPress={() => navigation.goBack()}><Icon name="arrow-left" size={24} color="#FFFFFF" /></TouchableOpacity>
                <TouchableOpacity style={[styles.favoriteBtn, { backgroundColor: 'rgba(0,0,0,0.5)' }]}><Icon name="heart" size={24} color="#FFFFFF" /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainImage}><Image source={{ uri: item.image }} style={styles.image} />{item.discount && <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}><Text style={styles.discountText}>{item.discount}</Text></View>}</View>
                <View style={styles.contentSection}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                    <View style={[styles.servesInfo, { backgroundColor: colors.primary + '15' }]}><Text style={[styles.servesText, { color: colors.primary }]}>{item.serves || `Serves ${item.servings || 1}`}</Text></View>
                    <View style={styles.timeRatingRow}>
                        <View style={styles.timeRatingLeft}>
                            <View style={[styles.timeBadge, { backgroundColor: colors.inputBg }]}><Text style={[styles.timeText, { color: colors.text }]}>{item.time}</Text></View>
                            <View style={styles.ratingSection}><Icon name="star" size={16} color={colors.primary} /><Text style={[styles.ratingText, { color: colors.text }]}>{item.rating}</Text></View>
                        </View>
                        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Cart')}><Text style={styles.addBtnText}>ADD</Text></TouchableOpacity>
                    </View>
                    <Text style={[styles.mainPrice, { color: colors.primary }]}>₹{item.price}</Text>
                    <Text style={[styles.description, { color: colors.textSecondary }]}>{item.description || item.fullDescription || `${item.name} with premium ingredients.`}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.xl + 20, zIndex: 10 },
    backBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    favoriteBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    mainImage: { position: 'relative' },
    image: { width: '100%', height: 300 },
    discountBadge: { position: 'absolute', top: 80, left: 20, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    discountText: { color: '#1a1a1a', fontWeight: '700', fontSize: 14 },
    contentSection: { padding: spacing.lg, paddingBottom: 40 },
    itemName: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
    servesInfo: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 16 },
    servesText: { fontSize: 12, fontWeight: '500' },
    timeRatingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    timeRatingLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    timeBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
    timeText: { fontSize: 14, fontWeight: '500' },
    ratingSection: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    ratingText: { fontSize: 14, fontWeight: '500' },
    addBtn: { paddingHorizontal: 32, paddingVertical: 12, borderRadius: 12 },
    addBtnText: { color: '#1a1a1a', fontWeight: '700', fontSize: 16 },
    mainPrice: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
    description: { fontSize: 15, lineHeight: 24 },
    errorText: { fontSize: 16, textAlign: 'center', marginTop: 100 },
});

export default ItemDetailScreen;
