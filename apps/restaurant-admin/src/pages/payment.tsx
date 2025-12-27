import React, { useState } from 'react';
import { TrendingUp, Download, Calendar, CreditCard, CheckCircle, Eye, Trash2, X } from 'lucide-react';
import './payment.css';
import Sidebar from '../components/sidebar';

// Type Definitions
interface PaymentTransaction {
  orderId: string;
  customerName: string;
  tableNo: string;
  dateTime: string;
  paymentMethod: string;
  paymentStatus: string;
  statusColor: string;
  amount: number;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

// Main Payment Component
const Payment: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<string>('today');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);

  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      orderId: 'ORDER-242',
      customerName: 'Rohit Desai',
      tableNo: 'Table 11',
      dateTime: '12:10 PM - Oct 02, 2025',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 580,
      orderItems: [
        { name: 'Chicken Biryani', quantity: 1, price: 320 },
        { name: 'Gulab Jamun', quantity: 2, price: 130 },
        { name: 'Lassi', quantity: 1, price: 130 }
      ]
    },
    {
      orderId: 'ORDER-241',
      customerName: 'Divya Nair',
      tableNo: 'Table 6',
      dateTime: '12:12 PM - Oct 02, 2025',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 350,
      orderItems: [
        { name: 'Paneer Butter Masala', quantity: 1, price: 280 },
        { name: 'Naan', quantity: 2, price: 70 }
      ]
    },
    {
      orderId: 'ORDER-240',
      customerName: 'Sanjeev Iqbal',
      tableNo: 'Table 15',
      dateTime: '12:15 PM - Oct 02, 2025',
      paymentMethod: 'Card',
      paymentStatus: 'Pending',
      statusColor: 'pending',
      amount: 480,
      orderItems: [
        { name: 'Mutton Curry', quantity: 1, price: 380 },
        { name: 'Rice', quantity: 1, price: 100 }
      ]
    },
    {
      orderId: 'ORDER-239',
      customerName: 'Sourav Sharma',
      tableNo: 'Table 8',
      dateTime: '12:18 PM - Oct 02, 2025',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 420,
      orderItems: [
        { name: 'Dal Tadka', quantity: 1, price: 180 },
        { name: 'Roti', quantity: 4, price: 120 },
        { name: 'Raita', quantity: 1, price: 120 }
      ]
    },
    {
      orderId: 'ORDER-238',
      customerName: 'Vikram Singh',
      tableNo: 'Table 2',
      dateTime: '12:20 PM - Oct 02, 2025',
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      statusColor: 'pending',
      amount: 320,
      orderItems: [
        { name: 'Veg Thali', quantity: 1, price: 250 },
        { name: 'Sweet Lassi', quantity: 1, price: 70 }
      ]
    },
    {
      orderId: 'ORDER-237',
      customerName: 'Anjali Verma',
      tableNo: 'Table 10',
      dateTime: '12:25 PM - Oct 02, 2025',
      paymentMethod: 'Card',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 500,
      orderItems: [
        { name: 'Fish Curry', quantity: 1, price: 350 },
        { name: 'Steamed Rice', quantity: 1, price: 150 }
      ]
    },
    {
      orderId: 'ORDER-235',
      customerName: 'Priya Sharma',
      tableNo: 'Table 3',
      dateTime: '12:30 PM - Oct 02, 2025',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 470,
      orderItems: [
        { name: 'Chole Bhature', quantity: 1, price: 220 },
        { name: 'Kulfi', quantity: 2, price: 250 }
      ]
    },
    {
      orderId: 'ORDER-234',
      customerName: 'Rajesh Kumar',
      tableNo: 'Table 7',
      dateTime: '12:35 PM - Oct 02, 2025',
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      statusColor: 'pending',
      amount: 890,
      orderItems: [
        { name: 'Family Thali', quantity: 2, price: 800 },
        { name: 'Ice Cream', quantity: 3, price: 90 }
      ]
    },
    {
      orderId: 'ORDER-220',
      customerName: 'Amit Patel',
      tableNo: 'Table 5',
      dateTime: '11:45 AM - Oct 02, 2025',
      paymentMethod: 'Card',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 500,
      orderItems: [
        { name: 'Tandoori Chicken', quantity: 1, price: 450 },
        { name: 'Mint Chutney', quantity: 1, price: 50 }
      ]
    },
    {
      orderId: 'ORDER-219',
      customerName: 'Sanjay Khanna',
      tableNo: 'Table 12',
      dateTime: '11:30 AM - Oct 02, 2025',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 1000,
      orderItems: [
        { name: 'Special Biryani', quantity: 2, price: 800 },
        { name: 'Rasgulla', quantity: 4, price: 200 }
      ]
    },
    {
      orderId: 'ORDER-218',
      customerName: 'Neha Kapoor',
      tableNo: 'Table 8',
      dateTime: '11:20 AM - Oct 02, 2025',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 540,
      orderItems: [
        { name: 'Palak Paneer', quantity: 1, price: 280 },
        { name: 'Garlic Naan', quantity: 2, price: 160 },
        { name: 'Mango Juice', quantity: 1, price: 100 }
      ]
    },
    {
      orderId: 'ORDER-217',
      customerName: 'Ravi Mehta',
      tableNo: 'Table 3',
      dateTime: '11:10 AM - Oct 02, 2025',
      paymentMethod: 'Card',
      paymentStatus: 'Failed',
      statusColor: 'failed',
      amount: 520,
      orderItems: [
        { name: 'Butter Chicken', quantity: 1, price: 380 },
        { name: 'Jeera Rice', quantity: 1, price: 140 }
      ]
    },
    {
      orderId: 'ORDER-216',
      customerName: 'Pooja Singh',
      tableNo: 'Table 14',
      dateTime: '10:55 AM - Oct 02, 2025',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      statusColor: 'paid',
      amount: 360,
      orderItems: [
        { name: 'Aloo Gobi', quantity: 1, price: 200 },
        { name: 'Chapati', quantity: 3, price: 90 },
        { name: 'Pickle', quantity: 1, price: 70 }
      ]
    },
    {
      orderId: 'ORDER-215',
      customerName: 'Arjun Reddy',
      tableNo: 'Table 9',
      dateTime: '10:40 AM - Oct 02, 2025',
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      statusColor: 'pending',
      amount: 350,
      orderItems: [
        { name: 'Masala Dosa', quantity: 2, price: 300 },
        { name: 'Filter Coffee', quantity: 1, price: 50 }
      ]
    }
  ]);

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    const methodMatch = selectedPaymentMethod === 'all' || transaction.paymentMethod === selectedPaymentMethod;
    const statusMatch = selectedPaymentStatus === 'all' || transaction.paymentStatus === selectedPaymentStatus;
    return methodMatch && statusMatch;
  });

  // Calculate totals
  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const todayRevenue = 125380;
  const weekRevenue = 890000;

  const handleExportReport = () => {
    console.log('Exporting report...');
    // Implementation for exporting report
  };

  const handleView = (orderId: string) => {
    const transaction = transactions.find(t => t.orderId === orderId);
    if (transaction) {
      setSelectedTransaction(transaction);
      setIsModalOpen(true);
    }
  };

  const handleMarkPaid = (orderId: string) => {
    setTransactions(transactions.map(transaction => 
      transaction.orderId === orderId 
        ? { ...transaction, paymentStatus: 'Paid', statusColor: 'paid' }
        : transaction
    ));
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(transaction => transaction.orderId !== orderId));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Payments & Billing</h1>
        </div>

        <div className="revenue-grid">
          <div className="revenue-card">
            <div className="card-top-bar card-top-bar-green"></div>
            <h3 className="card-title">Revenue Today</h3>
            <div className="revenue-amount">₹ {todayRevenue.toLocaleString()}</div>
            <div className="revenue-change">
              <span className="change-text change-positive">+15% vs yesterday</span>
              <TrendingUp size={16} color="#68D391" className="trend-icon" />
            </div>
          </div>

          <div className="revenue-card">
            <div className="card-top-bar card-top-bar-blue"></div>
            <h3 className="card-title">Revenue This Week</h3>
            <div className="revenue-amount">₹ {weekRevenue.toLocaleString()}</div>
            <div className="revenue-change">
              <span className="change-text change-blue">+8% vs last week</span>
              <TrendingUp size={16} color="#7F9CF5" className="trend-icon" />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-buttons">
            <div className="filter-group">
              <Calendar size={16} color="#718096" />
              <select 
                className="filter-select"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div className="filter-group">
              <CreditCard size={16} color="#718096" />
              <select 
                className="filter-select"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              >
                <option value="all">All Methods</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Wallet">Wallets</option>
              </select>
            </div>

            <div className="filter-group">
              <CheckCircle size={16} color="#718096" />
              <select 
                className="filter-select"
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          <button className="export-btn" onClick={handleExportReport}>
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h2 className="table-title">Completed Payments</h2>
            <button className="view-all-btn" onClick={() => setShowAllPayments(true)}>View All</button>
            {/* <div className="payment-summary">
              Total: ₹{totalRevenue.toLocaleString()} ({filteredTransactions.length} transactions)
            </div> */}
          </div>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Date & Time</th>
                <th>Payment Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#A0AEC0' }}>
                    No transactions found matching the selected filters
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="order-id-cell">{transaction.orderId}</div>
                    </td>
                    <td>
                      <div className="customer-name-cell">{transaction.customerName}</div>
                    </td>
                    <td>
                      <div className="datetime-cell">{transaction.dateTime}</div>
                    </td>
                    <td>
                      <span className={`payment-status-pill status-${transaction.statusColor}`}>
                        {transaction.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <div className="amount-cell">₹{transaction.amount.toLocaleString()}</div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn"
                          onClick={() => handleView(transaction.orderId)}
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        {transaction.paymentStatus === 'Pending' && (
                          <button 
                            className="action-btn paid-btn"
                            onClick={() => handleMarkPaid(transaction.orderId)}
                            title="Mark as Paid"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(transaction.orderId)}
                          title="Delete Transaction"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Transaction Details Modal */}
        {isModalOpen && selectedTransaction && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Transaction Details</h3>
                <button className="modal-close-btn" onClick={closeModal}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="detail-section">
                  <div className="detail-row">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">{selectedTransaction.orderId}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Customer Name:</span>
                    <span className="detail-value">{selectedTransaction.customerName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Table No:</span>
                    <span className="detail-value">{selectedTransaction.tableNo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date & Time:</span>
                    <span className="detail-value">{selectedTransaction.dateTime}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Payment Method:</span>
                    <span className={`method-badge method-${selectedTransaction.paymentMethod.toLowerCase()}`}>
                      {selectedTransaction.paymentMethod}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Payment Status:</span>
                    <span className={`payment-status-pill status-${selectedTransaction.statusColor}`}>
                      {selectedTransaction.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="order-items-section">
                  <h4 className="section-title">Order Items</h4>
                  <div className="order-items-list">
                    {selectedTransaction.orderItems.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                        </div>
                        <span className="item-price">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="total-section">
                  <div className="total-row">
                    <span className="total-label">Total Amount:</span>
                    <span className="total-amount">₹{selectedTransaction.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;