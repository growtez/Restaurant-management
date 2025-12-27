import { CreditCard, TrendingUp, DollarSign } from 'lucide-react';

const subscriptionStats = [
    { label: 'QR Plan (₹999)', count: 127, revenue: '₹1,26,873' },
    { label: 'Delivery Plan (₹1,499)', count: 71, revenue: '₹1,06,429' },
    { label: 'Trial', count: 49, revenue: '₹0' },
];

const recentPayments = [
    { id: 1, restaurant: 'Pizza Paradise', plan: 'DELIVERY', amount: '₹1,499', date: '2024-03-15', status: 'SUCCESS' },
    { id: 2, restaurant: 'Tandoori Nights', plan: 'QR', amount: '₹999', date: '2024-03-14', status: 'SUCCESS' },
    { id: 3, restaurant: 'Dragon Wok', plan: 'DELIVERY', amount: '₹1,499', date: '2024-03-14', status: 'PENDING' },
    { id: 4, restaurant: 'Cafe Mocha', plan: 'QR', amount: '₹999', date: '2024-03-13', status: 'SUCCESS' },
    { id: 5, restaurant: 'Sushi Master', plan: 'DELIVERY', amount: '₹1,499', date: '2024-03-12', status: 'FAILED' },
];

const getPaymentStatusBadge = (status: string) => {
    switch (status) {
        case 'SUCCESS':
            return <span className="badge success">Success</span>;
        case 'PENDING':
            return <span className="badge warning">Pending</span>;
        case 'FAILED':
            return <span className="badge error">Failed</span>;
        default:
            return <span className="badge">{status}</span>;
    }
};

export default function Subscriptions() {
    return (
        <>
            <header className="page-header">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Subscriptions</h1>
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                    Manage subscription plans and payments
                </p>
            </header>

            <div className="page-content animate-fadeIn">
                {/* Subscription Stats */}
                <div className="stats-grid">
                    {subscriptionStats.map((stat) => (
                        <div key={stat.label} className="stat-card">
                            <div className="stat-icon purple">
                                <CreditCard size={24} />
                            </div>
                            <div className="stat-info">
                                <div className="stat-label">{stat.label}</div>
                                <div className="stat-value">{stat.count}</div>
                                <div className="text-secondary" style={{ fontSize: '0.875rem' }}>
                                    Revenue: {stat.revenue}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Revenue Overview */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div className="card-header">
                        <h2 className="card-title flex items-center gap-sm">
                            <TrendingUp size={20} />
                            Revenue Overview
                        </h2>
                    </div>
                    <div className="card-content">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                                <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>This Month</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)' }}>₹2,33,302</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                                <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Last Month</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>₹1,98,450</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                                <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Growth</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)' }}>+17.5%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Payments */}
                <div className="card">
                    <div className="card-header flex items-center justify-between">
                        <h2 className="card-title flex items-center gap-sm">
                            <DollarSign size={20} />
                            Recent Payments
                        </h2>
                        <button className="btn btn-ghost">View All</button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Restaurant</th>
                                    <th>Plan</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPayments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td className="font-medium">{payment.restaurant}</td>
                                        <td>{payment.plan}</td>
                                        <td className="font-medium">{payment.amount}</td>
                                        <td className="text-secondary">{payment.date}</td>
                                        <td>{getPaymentStatusBadge(payment.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
