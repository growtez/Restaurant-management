import { useState } from 'react';
import { X, UserPlus, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { createRestaurant } from '../services/firebaseService';
import { SubscriptionPlan, RestaurantStatus } from '@restaurant-saas/types';

interface AddRestaurantModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

type OnboardingMode = 'SELECTION' | 'MANUAL' | 'AUTOMATIC';

export default function AddRestaurantModal({ onClose, onSuccess }: AddRestaurantModalProps) {
    const [mode, setMode] = useState<OnboardingMode>('SELECTION');
    const [loading, setLoading] = useState(false);

    // Form Data for Manual Flow
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        email: '',
        phone: '',
        plan: SubscriptionPlan.QR as string,
        // Admin Account Details (simulated for now as per flow)
        adminName: '',
        adminEmail: '',
        activateImmediately: true
    });

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await createRestaurant({
                name: formData.name,
                slug: formData.slug,
                status: formData.activateImmediately ? RestaurantStatus.ACTIVE : RestaurantStatus.TRIAL,
                contact: {
                    email: formData.email,
                    phone: formData.phone,
                    address: ''
                },
                // Set initial subscription
            });
            // TODO: In a real flow, we would create the admin user here using formData.adminEmail

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to create restaurant');
        } finally {
            setLoading(false);
        }
    };

    const renderSelection = () => (
        <div className="grid grid-cols-2 gap-4 p-4">
            <button
                onClick={() => setMode('MANUAL')}
                className="p-6 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-primary/20">
                    <UserPlus className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Manual Onboarding</h3>
                <p className="text-secondary text-sm">
                    Enter details, assign plan, and create admin account manually. Best for full control.
                </p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Manual Flow <ArrowRight size={16} className="ml-1" />
                </div>
            </button>

            <button
                onClick={() => setMode('AUTOMATIC')}
                className="p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            >
                <div className="mb-4 bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                    <Zap className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Automatic Onboarding</h3>
                <p className="text-secondary text-sm">
                    Generate invite link or import data to automate the setup process.
                </p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Auto Flow <ArrowRight size={16} className="ml-1" />
                </div>
            </button>
        </div>
    );

    const renderManualForm = () => (
        <form onSubmit={handleSubmit} className="modal-content">
            <div className="mb-6 flex items-center gap-2">
                <button type="button" onClick={() => setMode('SELECTION')} className="btn btn-ghost btn-sm p-1">
                    <ArrowLeft size={18} />
                </button>
                <h3 className="font-semibold">Manual Onboarding</h3>
            </div>

            {error && (
                <div className="alert error" style={{ marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <div className="space-y-6">
                {/* 1. Enter Details */}
                <section>
                    <h4 className="text-sm font-medium text-secondary uppercase mb-3">Restaurant Details</h4>
                    <div className="space-y-4">
                        <div className="form-group">
                            <label>Restaurant Name</label>
                            <input
                                type="text"
                                required
                                className="form-input"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Subdomain Slug</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    required
                                    className="form-input rounded-r-none"
                                    placeholder="e.g. pizza-paradise"
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                />
                                <span className="inline-flex items-center px-3 rounded-l-none border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    .yourapp.com
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label>Business Email</label>
                                <input
                                    type="email"
                                    required
                                    className="form-input"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    required
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* 2. Assign Subscription Plan */}
                <section>
                    <h4 className="text-sm font-medium text-secondary uppercase mb-3">Subscription Plan</h4>
                    <div className="form-group">
                        <label>Initial Plan</label>
                        <select
                            className="form-input"
                            value={formData.plan}
                            onChange={e => setFormData({ ...formData, plan: e.target.value })}
                        >
                            <option value={SubscriptionPlan.QR}>QR Plan (₹999/mo)</option>
                            <option value={SubscriptionPlan.DELIVERY}>Delivery Plan (₹1,499/mo)</option>
                            <option value={SubscriptionPlan.OWNED}>Owned App (Custom Pricing)</option>
                        </select>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* 3. Create Admin Account (Visual only for now if backend doesn't support immediate creation in this call) */}
                <section>
                    <h4 className="text-sm font-medium text-secondary uppercase mb-3">Create Admin Account</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label>Admin Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Admin Name"
                                value={formData.adminName}
                                onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Admin Email</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="same as business email"
                                value={formData.adminEmail || formData.email}
                                onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* 4. Activate Restaurant */}
                <section>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                        <input
                            type="checkbox"
                            id="activate"
                            className="w-4 h-4 text-green-600 rounded"
                            checked={formData.activateImmediately}
                            onChange={e => setFormData({ ...formData, activateImmediately: e.target.checked })}
                        />
                        <label htmlFor="activate" className="text-sm font-medium text-green-900 cursor-pointer">
                            Activate Restaurant Immediatey
                        </label>
                    </div>
                    <p className="text-xs text-secondary mt-1 ml-1">
                        If unchecked, restaurant will be in TRIAL mode.
                    </p>
                </section>
            </div>

            <div className="modal-actions mt-8">
                <button type="button" onClick={onClose} className="btn btn-ghost" disabled={loading}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : formData.activateImmediately ? 'Create & Activate' : 'Create Restaurant'}
                </button>
            </div>
        </form>
    );

    const renderAutomaticFlow = () => (
        <div className="modal-content text-center py-12">
            <div className="mb-6 flex items-center gap-2 absolute top-6 left-6">
                <button type="button" onClick={() => setMode('SELECTION')} className="btn btn-ghost btn-sm p-1">
                    <ArrowLeft size={18} />
                </button>
            </div>

            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Automatic Onboarding</h3>
            <p className="text-secondary max-w-sm mx-auto mb-8">
                Send an invite link to the restaurant owner. They will fill in their details and set up their account automatically.
            </p>

            <div className="max-w-xs mx-auto mb-8">
                <label className="block text-left text-sm font-medium mb-1">Owner Email</label>
                <input type="email" className="form-input mb-2" placeholder="owner@restaurant.com" />
                <button className="btn btn-primary w-full" onClick={() => {
                    alert('Invite sent! (Simulated)');
                    onClose();
                }}>
                    Send Invite Link
                </button>
            </div>
        </div>
    );

    return (
        <div className="modal-overlay">
            <div className="modal" style={{ maxWidth: mode === 'SELECTION' ? '800px' : '600px' }}>
                <div className="modal-header border-b-0 pb-0">
                    {mode === 'SELECTION' && <h2>Add New Restaurant</h2>}
                    <button onClick={onClose} className="btn-icon absolute right-4 top-4">
                        <X size={20} />
                    </button>
                </div>

                {mode === 'SELECTION' && renderSelection()}
                {mode === 'MANUAL' && renderManualForm()}
                {mode === 'AUTOMATIC' && renderAutomaticFlow()}
            </div>
        </div>
    );
}
