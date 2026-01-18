import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    ExternalLink,
    RefreshCw,
    Edit,
    Ban,
    CheckCircle
} from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';
import AddRestaurantModal from '../components/AddRestaurantModal';
import { RestaurantStatus, SubscriptionPlan } from '@restaurant-saas/types';

const getStatusBadge = (status: RestaurantStatus) => {
    switch (status) {
        case RestaurantStatus.ACTIVE:
            return <span className="badge success">Active</span>;
        case RestaurantStatus.TRIAL:
            return <span className="badge info">Trial</span>;
        case RestaurantStatus.EXPIRED:
            return <span className="badge error">Expired</span>;
        case RestaurantStatus.SUSPENDED:
            return <span className="badge warning">Suspended</span>;
        default:
            return <span className="badge">{status}</span>;
    }
};

const getPlanBadge = (plan: SubscriptionPlan) => {
    switch (plan) {
        case SubscriptionPlan.DELIVERY:
            return <span className="badge info">Delivery</span>;
        case SubscriptionPlan.QR:
            return <span className="badge warning">QR Only</span>;
        case SubscriptionPlan.OWNED:
            return <span className="badge success">Owned</span>;
        default:
            return <span className="badge">{plan}</span>;
    }
};

export default function Restaurants() {
    const navigate = useNavigate();
    const { restaurants, loading, error, actions } = useRestaurants();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filteredRestaurants = restaurants.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.slug.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="text-red-500 mb-4">Error loading restaurants: {error}</div>
                <button onClick={actions.refresh} className="btn btn-primary">Try Again</button>
            </div>
        );
    }

    const handleAction = (action: () => void) => {
        action();
        setOpenMenuId(null);
    };

    return (
        <div onClick={() => setOpenMenuId(null)}>
            <header className="page-header flex items-center justify-between">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Restaurants</h1>
                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                        Manage all registered restaurants on your platform
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-ghost" onClick={actions.refresh} title="Refresh">
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={18} />
                        Add Restaurant
                    </button>
                </div>
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
                        <option value={RestaurantStatus.ACTIVE}>Active</option>
                        <option value={RestaurantStatus.TRIAL}>Trial</option>
                        <option value={RestaurantStatus.EXPIRED}>Expired</option>
                        <option value={RestaurantStatus.SUSPENDED}>Suspended</option>
                    </select>

                    <button className="btn btn-secondary">
                        <Filter size={18} />
                        More Filters
                    </button>
                </div>

                {/* Restaurants Table */}
                <div className="card" style={{ overflow: 'visible' }}>
                    <div className="table-container" style={{ overflow: 'visible' }}>
                        {loading ? (
                            <div className="p-8 text-center text-secondary">Loading restaurants...</div>
                        ) : filteredRestaurants.length === 0 ? (
                            <div className="p-8 text-center text-secondary">No restaurants found</div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Restaurant</th>
                                        <th>Plan</th>
                                        <th>Status</th>
                                        <th>Contact</th>
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
                                                        {restaurant.slug}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{getPlanBadge(restaurant.subscription?.plan)}</td>
                                            <td>{getStatusBadge(restaurant.status)}</td>
                                            <td>
                                                <div className="text-sm">{restaurant.contact?.email}</div>
                                                <div className="text-xs text-muted">{restaurant.contact?.phone}</div>
                                            </td>
                                            <td className="text-secondary">
                                                {restaurant.createdAt?.seconds ? new Date(restaurant.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-sm relative">
                                                    <a
                                                        href={`https://${restaurant.domain || restaurant.slug + '.yourapp.com'}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-ghost"
                                                        title="Visit Restaurant"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                    <button
                                                        className="btn btn-ghost"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenMenuId(openMenuId === restaurant.id ? null : restaurant.id);
                                                        }}
                                                    >
                                                        <MoreHorizontal size={18} />
                                                    </button>

                                                    {openMenuId === restaurant.id && (
                                                        <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg py-1 z-10 w-48 text-sm animate-in fade-in zoom-in-95 duration-200">
                                                            <button
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                                                                onClick={() => handleAction(() => navigate(`/restaurants/${restaurant.id}`))}
                                                            >
                                                                <Edit size={14} /> Edit Details
                                                            </button>

                                                            {restaurant.status === RestaurantStatus.SUSPENDED ? (
                                                                <button
                                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-green-600"
                                                                    onClick={() => handleAction(() => actions.reactivate(restaurant.id))}
                                                                >
                                                                    <CheckCircle size={14} /> Reactivate
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                                                    onClick={() => handleAction(() => actions.suspend(restaurant.id, 'Super Admin Action'))}
                                                                >
                                                                    <Ban size={14} /> Suspend
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {isAddModalOpen && (
                <AddRestaurantModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={() => {
                        actions.refresh();
                        // Modal closes automatically via props usually
                    }}
                />
            )}
        </div>
    );
}

