import { BarChart3, TrendingUp, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Analytics() {
    // Mock Data
    const stats = [
        { label: 'Total Orders', value: '12,450', change: '+12.5%', trend: 'up', icon: ShoppingBag, color: 'blue' },
        { label: 'Platform Revenue', value: '₹45.2L', change: '+8.2%', trend: 'up', icon: DollarSign, color: 'green' },
        { label: 'Avg. Order Value', value: '₹450', change: '-2.1%', trend: 'down', icon: TrendingUp, color: 'purple' },
        { label: 'Active Restaurants', value: '145', change: '+15', trend: 'up', icon: BarChart3, color: 'orange' },
    ];

    const topRestaurants = [
        { id: 1, name: 'Pizza Paradise', orders: 1250, revenue: '₹4.5L', growth: '+12%' },
        { id: 2, name: 'Burger King', orders: 980, revenue: '₹3.2L', growth: '+8%' },
        { id: 3, name: 'Sushi World', orders: 850, revenue: '₹5.1L', growth: '+25%' },
        { id: 4, name: 'Taco Time', orders: 720, revenue: '₹2.1L', growth: '-5%' },
        { id: 5, name: 'Pasta House', orders: 650, revenue: '₹2.8L', growth: '+10%' },
    ];

    return (
        <>
            <header className="page-header">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Platform Analytics</h1>
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                    Key metrics and performance indicators
                </p>
            </header>

            <div className="page-content animate-fadeIn">
                {/* 1. KPI Cards */}
                <div className="stats-grid mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-card">
                            <div className={`stat-icon ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="stat-info w-full">
                                <div className="flex justify-between items-start">
                                    <div className="stat-label">{stat.label}</div>
                                    <div className={`text-xs font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                                        {stat.change}
                                        {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    </div>
                                </div>
                                <div className="stat-value mt-1">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 2. Growth/Revenue Chart Placeholder (CSS Only) */}
                    <div className="card lg:col-span-2">
                        <div className="card-header flex justify-between items-center">
                            <h2 className="card-title">Revenue Growth</h2>
                            <select className="form-input text-sm py-1 w-auto">
                                <option>Last 30 Days</option>
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-2 px-4 pb-2">
                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                                <div key={i} className="w-full bg-primary/10 rounded-t-sm relative group hover:bg-primary/20 transition-colors" style={{ height: `${h}%` }}>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap">
                                        ₹{h}k
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-secondary px-4 mt-2">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </div>

                    {/* 3. Top Restaurants */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Top Restaurants</h2>
                        </div>
                        <div className="divide-y divide-border">
                            {topRestaurants.map((rest, i) => (
                                <div key={rest.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm text-gray-500">
                                            #{i + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{rest.name}</div>
                                            <div className="text-xs text-secondary">{rest.orders} orders</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-sm">{rest.revenue}</div>
                                        <div className="text-xs text-green-600">{rest.growth}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-border">
                            <button className="btn btn-ghost w-full text-sm">View All Rankings</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
