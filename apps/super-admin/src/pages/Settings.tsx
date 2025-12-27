import { Save } from 'lucide-react';

export default function Settings() {
    return (
        <>
            <header className="page-header">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Settings</h1>
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                    Configure your SaaS platform settings
                </p>
            </header>

            <div className="page-content animate-fadeIn">
                {/* Platform Settings */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div className="card-header">
                        <h2 className="card-title">Platform Settings</h2>
                    </div>
                    <div className="card-content">
                        <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>
                            <div className="form-group">
                                <label className="form-label">Platform Name</label>
                                <input type="text" className="form-input" defaultValue="Restaurant SaaS" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Support Email</label>
                                <input type="email" className="form-input" defaultValue="support@restaurantsaas.com" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Support Phone</label>
                                <input type="tel" className="form-input" defaultValue="+91 98765 43210" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Trial Period (Days)</label>
                                <input type="number" className="form-input" defaultValue="14" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Settings */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div className="card-header">
                        <h2 className="card-title">Subscription Pricing</h2>
                    </div>
                    <div className="card-content">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '600px' }}>
                            <div className="form-group">
                                <label className="form-label">QR Only Plan (₹/month)</label>
                                <input type="number" className="form-input" defaultValue="999" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Delivery Plan (₹/month)</label>
                                <input type="number" className="form-input" defaultValue="1499" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Branding Settings */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div className="card-header">
                        <h2 className="card-title">Default Branding</h2>
                    </div>
                    <div className="card-content">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '600px' }}>
                            <div className="form-group">
                                <label className="form-label">Default Primary Color</label>
                                <div className="flex items-center gap-sm">
                                    <input
                                        type="color"
                                        defaultValue="#6366f1"
                                        style={{ width: '48px', height: '36px', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                                    />
                                    <input type="text" className="form-input" defaultValue="#6366f1" style={{ flex: 1 }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Default Font</label>
                                <select className="form-input">
                                    <option>Inter</option>
                                    <option>Poppins</option>
                                    <option>Roboto</option>
                                    <option>Open Sans</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>
        </>
    );
}
