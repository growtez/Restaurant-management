import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../theme';

const EarningsScreen = ({ navigation }) => {
    const { theme, isDark } = useTheme();
    const colors = theme.colors;

    const weeklyEarnings = [
        { day: 'Mon', amount: 450 },
        { day: 'Tue', amount: 680 },
        { day: 'Wed', amount: 520 },
        { day: 'Thu', amount: 890 },
        { day: 'Fri', amount: 1200 },
        { day: 'Sat', amount: 1450 },
        { day: 'Sun', amount: 320 },
    ];

    const maxEarning = Math.max(...weeklyEarnings.map(e => e.amount));

    const summary = {
        today: 1850,
        thisWeek: 5510,
        thisMonth: 24500,
        totalDeliveries: 145,
    };

    const recentTransactions = [
        { id: 1, type: 'delivery', description: 'Order #ORD003 Delivered', amount: 65, time: '10 mins ago' },
        { id: 2, type: 'delivery', description: 'Order #ORD002 Delivered', amount: 95, time: '45 mins ago' },
        { id: 3, type: 'bonus', description: 'Peak Hour Bonus', amount: 50, time: '1 hour ago' },
        { id: 4, type: 'delivery', description: 'Order #ORD001 Delivered', amount: 75, time: '2 hours ago' },
        { id: 5, type: 'incentive', description: '5 Deliveries Completed', amount: 100, time: '3 hours ago' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>My <Text style={{ fontWeight: '700' }}>Earnings</Text></Text>
                </View>

                {/* Today's Earning Card */}
                <View style={[styles.earningCard, { backgroundColor: colors.primary }]}>
                    <Text style={styles.earningLabel}>Today's Earnings</Text>
                    <Text style={styles.earningAmount}>₹{summary.today}</Text>
                    <View style={styles.earningStats}>
                        <View style={styles.earningStatItem}>
                            <Icon name="trending-up" size={16} color="rgba(255,255,255,0.8)" />
                            <Text style={styles.earningStatText}>+12% from yesterday</Text>
                        </View>
                    </View>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryGrid}>
                    <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.summaryValue, { color: colors.primary }]}>₹{summary.thisWeek}</Text>
                        <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>This Week</Text>
                    </View>
                    <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.summaryValue, { color: colors.primary }]}>₹{summary.thisMonth}</Text>
                        <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>This Month</Text>
                    </View>
                    <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.summaryValue, { color: colors.text }]}>{summary.totalDeliveries}</Text>
                        <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Deliveries</Text>
                    </View>
                </View>

                {/* Weekly Chart */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Overview</Text>
                    <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
                        <View style={styles.chart}>
                            {weeklyEarnings.map((item, index) => (
                                <View key={index} style={styles.chartBar}>
                                    <View style={styles.barContainer}>
                                        <View style={[styles.bar, { backgroundColor: colors.primary, height: `${(item.amount / maxEarning) * 100}%` }]} />
                                    </View>
                                    <Text style={[styles.barLabel, { color: colors.textMuted }]}>{item.day}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Recent Transactions */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>
                    <View style={[styles.transactionCard, { backgroundColor: colors.card }]}>
                        {recentTransactions.map((txn, index) => (
                            <View key={txn.id} style={[styles.transactionItem, index !== recentTransactions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                                <View style={[styles.txnIcon, { backgroundColor: txn.type === 'bonus' || txn.type === 'incentive' ? colors.warning + '20' : colors.primary + '20' }]}>
                                    <Icon name={txn.type === 'delivery' ? 'package' : 'gift'} size={18} color={txn.type === 'bonus' || txn.type === 'incentive' ? colors.warning : colors.primary} />
                                </View>
                                <View style={styles.txnInfo}>
                                    <Text style={[styles.txnDesc, { color: colors.text }]}>{txn.description}</Text>
                                    <Text style={[styles.txnTime, { color: colors.textMuted }]}>{txn.time}</Text>
                                </View>
                                <Text style={[styles.txnAmount, { color: colors.success }]}>+₹{txn.amount}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: { padding: spacing.lg, paddingTop: spacing.xl },
    headerTitle: { fontSize: 28, fontWeight: '600' },

    earningCard: { marginHorizontal: spacing.lg, borderRadius: 20, padding: 24, marginBottom: 16 },
    earningLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 8 },
    earningAmount: { color: '#FFFFFF', fontSize: 42, fontWeight: '700', marginBottom: 12 },
    earningStats: {},
    earningStatItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    earningStatText: { color: 'rgba(255,255,255,0.9)', fontSize: 13 },

    summaryGrid: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: 12, marginBottom: 24 },
    summaryCard: { flex: 1, borderRadius: 12, padding: 16, alignItems: 'center' },
    summaryValue: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
    summaryLabel: { fontSize: 11 },

    section: { paddingHorizontal: spacing.lg, marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },

    chartCard: { borderRadius: 16, padding: 20 },
    chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
    chartBar: { alignItems: 'center', flex: 1 },
    barContainer: { height: 100, width: 24, justifyContent: 'flex-end' },
    bar: { width: '100%', borderRadius: 4, minHeight: 4 },
    barLabel: { fontSize: 11, marginTop: 8 },

    transactionCard: { borderRadius: 16, overflow: 'hidden' },
    transactionItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    txnIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    txnInfo: { flex: 1 },
    txnDesc: { fontSize: 14, fontWeight: '500', marginBottom: 2 },
    txnTime: { fontSize: 12 },
    txnAmount: { fontSize: 16, fontWeight: '700' },
});

export default EarningsScreen;
