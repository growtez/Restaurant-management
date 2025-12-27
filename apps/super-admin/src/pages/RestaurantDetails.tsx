import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Edit, Trash2 } from 'lucide-react';

export default function RestaurantDetails() {
    const { id } = useParams();

    // Mock data - would come from Firebase
    const restaurant = {
        id,
        name: 'Pizza Paradise',
        slug: 'pizza-paradise',
        email: 'owner@pizzaparadise.com',
        phone: '+91 98765 43210',
        address: '123 Food Street, Mumbai 400001',
        plan: 'DELIVERY',
        status: 'ACTIVE',
        tables: 15,
        menuItems: 45,
        totalOrders: 1250,
        revenue: '₹2,45,000',
        createdAt: '2024-01-15',
        branding: {
            primaryColor: '#FF5722',
            secondaryColor: '#212121',
        }
    };

    return (
        <>
            <header className="page-header">
                <Link to="/restaurants" className="flex items-center gap-sm text-secondary" style={{ marginBottom: '0.5rem', textDecoration: 'none' }}>
                    <ArrowLeft size={18} />
                    Back to Restaurants
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{restaurant.name}</h1>
                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                            {restaurant.slug}.yourapp.com
                        </p>
                    </div>
                    <div className="flex items-center gap-sm">
                        <button className="btn btn-secondary">
                            <ExternalLink size={18} />
                            Visit Site
                        </button>
                        <button className="btn btn-primary">
                            <Edit size={18} />
                            Edit
                        </button>
                    </div>
                </div>
            </header>

            <div className="page-content animate-fadeIn">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Info Card */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Restaurant Information</h2>
                        </div>
                        <div className="card-content">
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Email</div>
                                    <div>{restaurant.email}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Phone</div>
                                    <div>{restaurant.phone}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Address</div>
                                    <div>{restaurant.address}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Created</div>
                                    <div>{restaurant.createdAt}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Card */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Subscription</h2>
                        </div>
                        <div className="card-content">
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Plan</div>
                                    <div className="badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
                                        {restaurant.plan === 'DELIVERY' ? '₹1,499 - Delivery' : '₹999 - QR Only'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Status</div>
                                    <span className="badge success">Active</span>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Features</div>
                                    <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                                        <span className="badge info">QR Ordering</span>
                                        {restaurant.plan === 'DELIVERY' && <span className="badge info">Delivery</span>}
                                        {restaurant.plan === 'DELIVERY' && <span className="badge info">Custom Domain</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <div className="card-header">
                            <h2 className="card-title">Statistics</h2>
                        </div>
                        <div className="card-content">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Tables</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{restaurant.tables}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Menu Items</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{restaurant.menuItems}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Total Orders</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{restaurant.totalOrders}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Revenue</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>{restaurant.revenue}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="card" style={{ marginTop: '1.5rem', borderColor: 'var(--color-error)' }}>
                    <div className="card-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                        <h2 className="card-title" style={{ color: 'var(--color-error)' }}>Danger Zone</h2>
                    </div>
                    <div className="card-content flex items-center justify-between">
                        <div>
                            <div className="font-medium">Delete Restaurant</div>
                            <div className="text-secondary" style={{ fontSize: '0.875rem' }}>
                                Permanently delete this restaurant and all its data
                            </div>
                        </div>
                        <button className="btn" style={{ background: 'var(--color-error)', color: 'white' }}>
                            <Trash2 size={18} />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
