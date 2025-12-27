import { useState } from 'react';
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    ExternalLink
} from 'lucide-react';

// Mock data
const restaurants = [
    { id: '1', name: 'Pizza Paradise', slug: 'pizza-paradise', plan: 'DELIVERY', status: 'ACTIVE', email: 'owner@pizzaparadise.com', tables: 15, createdAt: '2024-01-15' },
    { id: '2', name: 'Tandoori Nights', slug: 'tandoori-nights', plan: 'QR', status: 'ACTIVE', email: 'admin@tandoorinights.com', tables: 20, createdAt: '2024-02-10' },
    { id: '3', name: 'Dragon Wok', slug: 'dragon-wok', plan: 'DELIVERY', status: 'TRIAL', email: 'hello@dragonwok.com', tables: 8, createdAt: '2024-03-01' },
    { id: '4', name: 'The Burger Joint', slug: 'the-burger-joint', plan: 'QR', status: 'ACTIVE', email: 'contact@burgerjoint.com', tables: 12, createdAt: '2024-02-20' },
    { id: '5', name: 'Sushi Master', slug: 'sushi-master', plan: 'DELIVERY', status: 'EXPIRED', email: 'info@sushimaster.com', tables: 10, createdAt: '2023-12-05' },
    { id: '6', name: 'Cafe Mocha', slug: 'cafe-mocha', plan: 'QR', status: 'ACTIVE', email: 'hello@cafemocha.com', tables: 25, createdAt: '2024-01-28' },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'ACTIVE':
            return <span className="badge success">Active</span>;
        case 'TRIAL':
            return <span className="badge info">Trial</span>;
        case 'EXPIRED':
            return <span className="badge error">Expired</span>;
        case 'SUSPENDED':
            return <span className="badge warning">Suspended</span>;
        default:
            return <span className="badge">{status}</span>;
    }
};

const getPlanBadge = (plan: string) => {
    switch (plan) {
        case 'DELIVERY':
            return <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>₹1,499 - Delivery</span>;
        case 'QR':
            return <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>₹999 - QR Only</span>;
        default:
            return <span className="badge">{plan}</span>;
    }
};

export default function Restaurants() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredRestaurants = restaurants.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.slug.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <header className="page-header flex items-center justify-between">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Restaurants</h1>
                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                        Manage all registered restaurants on your platform
                    </p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} />
                    Add Restaurant
                </button>
            </header>

            <div className="page-content animate-fadeIn">
                {/* Filters */}
                <div className="flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--color-text-muted)'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search restaurants..."
                            className="form-input"
                            style={{ paddingLeft: '40px' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <select
                        className="form-input"
                        style={{ width: 'auto' }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="TRIAL">Trial</option>
                        <option value="EXPIRED">Expired</option>
                        <option value="SUSPENDED">Suspended</option>
                    </select>

                    <button className="btn btn-secondary">
                        <Filter size={18} />
                        More Filters
                    </button>
                </div>

                {/* Restaurants Table */}
                <div className="card">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Restaurant</th>
                                    <th>Plan</th>
                                    <th>Status</th>
                                    <th>Tables</th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRestaurants.map((restaurant) => (
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
                                        <td>{restaurant.tables}</td>
                                        <td className="text-secondary">{restaurant.createdAt}</td>
                                        <td>
                                            <div className="flex items-center gap-sm">
                                                <button className="btn btn-ghost" title="Visit Restaurant">
                                                    <ExternalLink size={16} />
                                                </button>
                                                <button className="btn btn-ghost">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
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
