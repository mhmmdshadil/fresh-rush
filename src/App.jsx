
import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart3,
  MapPin,
  Clock,
  AlertTriangle,
  Leaf,
  LayoutDashboard,
  Truck,
  Settings,
  LogOut,
  Bell,
  Search,
  CheckCircle,
  XCircle,
  TrendingUp,
  Package,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PRODUCE, MOCK_BUYERS } from './data/mockData';
import { useCountdown } from './hooks/useCountdown';
import AddProduceModal from './components/AddProduceModal';
import './App.css';

// --- Sub-components ---

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="glass-panel stat-card">
    <div className="stat-label">{label}</div>
    <div className="stat-value" style={{ color }}>{value}</div>
    <div style={{ position: 'absolute', right: '20px', bottom: '20px', opacity: 0.1 }}>
      <Icon size={48} />
    </div>
  </div>
);

const ProductCard = ({ product, onSelect, onCancel, isActive }) => {
  const { hours, minutes, seconds, urgency } = useCountdown(product.expiryTime);

  const isCritical = urgency === 'critical' || urgency === 'expired';
  const isCancelled = product.status === 'Cancelled';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel product-card ${urgency} ${isActive ? 'active-match' : ''} ${urgency === 'critical' ? 'animate-pulse-critical' : ''} ${urgency === 'expired' ? 'grayscale' : ''}`}
      onClick={() => onSelect(product)}
      style={{ cursor: 'pointer', borderColor: isActive ? 'var(--primary)' : 'var(--glass-border)' }}
    >
      <div className="item-icon-box">
        <Leaf size={28} color={isCritical ? 'var(--status-critical)' : 'var(--primary)'} />
      </div>

      <div className="product-info">
        <h3 style={{ color: urgency === 'expired' ? 'var(--text-dim)' : 'inherit' }}>{product.name}</h3>
        <div className="product-meta">
          <span><Package size={14} /> {product.quantity}</span>
          <span style={{ color: isCancelled ? 'var(--status-critical)' : 'var(--status-fresh)', fontWeight: isCancelled ? 700 : 400 }}>
            {isCancelled ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
            {product.status}
          </span>
        </div>
      </div>

      <div className="countdown-box">
        <div className="countdown-timer" style={{ color: isCritical ? 'var(--status-critical)' : 'inherit' }}>
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className={`urgency-badge ${urgency}`}>{urgency}</div>
      </div>

      <div className="product-actions" onClick={(e) => e.stopPropagation()}>
        {isCancelled ? (
          <button className="buyer-action-btn" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            Find Buyers
          </button>
        ) : (
          <button
            onClick={() => onCancel(product.id)}
            className="buyer-action-btn"
            style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--status-critical)', border: 'none' }}
          >
            Simulate Cancel
          </button>
        )}
      </div>
    </motion.div>
  );
};

const BuyerCard = ({ buyer }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="glass-panel buyer-card"
  >
    <div className="buyer-header">
      <div className="buyer-name">{buyer.name}</div>
      {buyer.pickupType === 'Instant Pickup' && (
        <span className="instant-pickup-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Zap size={10} /> INSTANT
        </span>
      )}
    </div>
    <div className="buyer-stats">
      <span><MapPin size={12} /> {buyer.distance} km</span>
      <span><TrendingUp size={12} /> ₹{buyer.pricePerKg}/kg</span>
    </div>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
      Slots: {buyer.availableSlots.join(', ')}
    </div>
    <button className="buyer-action-btn">Accept Offer</button>
  </motion.div>
);

// --- Main App Component ---

function App() {
  const [products, setProducts] = useState(MOCK_PRODUCE);
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCE[0]);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Priority Sorting Logic
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      // Prioritize Cancelled over Active
      if (a.status === 'Cancelled' && b.status !== 'Cancelled') return -1;
      if (a.status !== 'Cancelled' && b.status === 'Cancelled') return 1;

      // Then sort by expiry time
      return new Date(a.expiryTime) - new Date(b.expiryTime);
    });
  }, [products]);

  const handleCancel = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'Cancelled' } : p));
    const product = products.find(p => p.id === id);
    addNotification(`ALERT: Primary buyer cancelled for ${product.name}! Finding alternatives...`, 'critical');
  };

  const handleAddProduce = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    addNotification(`Produce registered: ${newProduct.name} is now live in the system.`, 'fresh');
  };

  // Notifications Simulation
  useEffect(() => {
    const checkUrgency = () => {
      products.forEach(p => {
        if (p.status === 'Cancelled') {
          const diff = (new Date(p.expiryTime) - new Date()) / (1000 * 60 * 60);
          if (diff > 0 && diff < 6) {
            addNotification(`CRITICAL: ${p.name} expires in ${Math.round(diff * 60)} mins!`, 'critical');
          }
        }
      });
    };

    const interval = setInterval(checkUrgency, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [products]);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [{ id, message, type }, ...prev].slice(0, 3));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const stats = {
    atRisk: products.filter(p => p.status === 'Cancelled').length,
    totalVolume: "4,800 kg",
    activeBuyers: MOCK_BUYERS.length
  };

  return (
    <div className="app-container dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <Zap color="var(--primary)" fill="var(--primary)" size={32} />
          <span className="logo-text">FreshRush</span>
        </div>

        <nav className="nav-links">
          <div className="nav-item active"><LayoutDashboard size={20} /> Dashboard</div>
          <div className="nav-item"><Truck size={20} /> My Deliveries</div>
          <div className="nav-item"><BarChart3 size={20} /> Analytics</div>
          <div className="nav-item"><MapPin size={20} /> Farm Map</div>
          <div style={{ marginTop: 'auto' }} className="nav-item"><Settings size={20} /> Settings</div>
          <div className="nav-item"><LogOut size={20} /> Logout</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Farmer Command Center</h1>
            <p style={{ color: 'var(--text-muted)' }}>Real-time produce decay & buyer matching system</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} />
              <span style={{ fontSize: '0.875rem' }}>{notifications.length} Alerts</span>
            </div>
            <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={18} />
              <span style={{ fontSize: '0.875rem' }}>Search...</span>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard label="At Risk Produce" value={stats.atRisk} icon={AlertTriangle} color="var(--status-critical)" />
          <StatCard label="Total Inventory" value={stats.totalVolume} icon={Package} color="var(--primary)" />
          <StatCard label="Nearby Buyers" value={stats.activeBuyers} icon={Truck} color="var(--secondary)" />
        </section>

        <section className="product-stack-container">
          <div className="product-stack-header">
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Priority Pulse Stack</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Dynamic AI-sorted urgency queue</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="buyer-action-btn"
              style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={18} /> Register Produce
            </button>
          </div>

          <div className="product-stack">
            <AnimatePresence mode="popLayout">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                  onCancel={handleCancel}
                  isActive={selectedProduct?.id === product.id}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        <AddProduceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddProduce}
        />
      </main>

      {/* Right Panel: Buyer Match */}
      <aside className="buyers-panel">
        <div className="panel-header">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '8px' }}>Nearby Matches</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Finding buyers for <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{selectedProduct?.name}</span>
          </p>
        </div>

        <div className="buyer-list">
          {MOCK_BUYERS.map(buyer => (
            <BuyerCard key={buyer.id} buyer={buyer} />
          ))}
        </div>

        <div style={{ marginTop: '24px', padding: '16px', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>BACKEND INTEGRATION POINT</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Matching algorithm uses distance, price, and decay window to optimize route planning.
          </p>
        </div>
      </aside>

      {/* Notification Toast */}
      <div className="notification-container">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`glass-panel toast ${n.type}`}
              style={{ borderLeftColor: n.type === 'critical' ? 'var(--status-critical)' : 'var(--primary)' }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AlertTriangle size={20} color={n.type === 'critical' ? 'var(--status-critical)' : 'var(--primary)'} />
                <span style={{ fontSize: '0.9rem' }}>{n.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
