import {
    Store,
    TrendingUp,
    DollarSign,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    MoreHorizontal
} from 'lucide-react';

// Mock data for demo
const stats = [
    {
        label: 'Total Restaurants',
        value: '247',
        change: '+12%',
        positive: true,
        icon: Store,
        color: 'purple'
    },
    {
        label: 'Active Subscriptions',
        value: '198',
        change: '+8%',
        positive: true,
        icon: TrendingUp,
        color: 'blue'
    },
    {
        label: 'Monthly Revenue',
        value: '₹2,47,500',
        change: '+23%',
        positive: true,
        icon: DollarSign,
        color: 'green'
    },
    {
        label: 'Total Users',
        value: '1,842',
        change: '-2%',
        positive: false,
        icon: Users,
        color: 'orange'
    }
];

const recentRestaurants = [
    { id: 1, name: 'Pizza Paradise', slug: 'pizza-paradise', plan: 'DELIVERY', status: 'ACTIVE', revenue: '₹24,500' },
    { id: 2, name: 'Tandoori Nights', slug: 'tandoori-nights', plan: 'QR', status: 'ACTIVE', revenue: '₹18,200' },
    { id: 3, name: 'Dragon Wok', slug: 'dragon-wok', plan: 'DELIVERY', status: 'TRIAL', revenue: '₹0' },
    { id: 4, name: 'The Burger Joint', slug: 'the-burger-joint', plan: 'QR', status: 'ACTIVE', revenue: '₹12,800' },
    { id: 5, name: 'Sushi Master', slug: 'sushi-master', plan: 'DELIVERY', status: 'EXPIRED', revenue: '₹0' },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'ACTIVE':
            return <span className="badge success">Active</span>;
        case 'TRIAL':
            return <span className="badge info">Trial</span>;
        case 'EXPIRED':
            return <span className="badge error">Expired</span>;
        default:
            return <span className="badge">{status}</span>;
    }
};

const getPlanBadge = (plan: string) => {
    switch (plan) {
        case 'DELIVERY':
            return <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>Delivery</span>;
        case 'QR':
            return <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>QR Only</span>;
        default:
            return <span className="badge">{plan}</span>;
    }
};

export default function Dashboard() {
    return (
        <>
            <header className="page-header flex items-center justify-between">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Dashboard</h1>
                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                        Welcome back! Here's what's happening with your platform.
                    </p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} />
                    Add Restaurant
                </button>
            </header>

            <div className="page-content animate-fadeIn">
                {/* Stats Grid */}
                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-card">
                            <div className={`stat-icon ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="stat-info">
                                <div className="stat-label">{stat.label}</div>
                                <div className="stat-value">{stat.value}</div>
                                <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                                    {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change} from last month
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Restaurants */}
                <div className="card">
                    <div className="card-header flex items-center justify-between">
                        <h2 className="card-title">Recent Restaurants</h2>
                        <button className="btn btn-ghost">View All</button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Restaurant</th>
                                    <th>Plan</th>
                                    <th>Status</th>
                                    <th>Revenue</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRestaurants.map((restaurant) => (
                                    <tr key={restaurant.id}>
                                        <td>
                                            <div>
                                                <div className="font-medium">{restaurant.name}</div>
                                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                    {restaurant.slug}.yourapp.com
                                                </div>
                                            </div>
                                        </td>
                                        <td>{getPlanBadge(restaurant.plan)}</td>
                                        <td>{getStatusBadge(restaurant.status)}</td>
                                        <td className="font-medium">{restaurant.revenue}</td>
                                        <td>
                                            <button className="btn btn-ghost">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
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
