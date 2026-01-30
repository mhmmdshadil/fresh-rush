import React, { useState, useEffect, useMemo } from 'react';
import {
    Package, AlertTriangle, Truck, Leaf, Plus, Zap, MapPin,
    TrendingUp, CheckCircle, ShoppingBag, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import AddProduceModal from '../components/AddProduceModal';
import { subscribeToUserProduce, cancelProduce, addProduce } from '../services/produceService';
import { getAllBuyers } from '../services/buyerService';

const StatCard = ({ label, value, icon: Icon }) => (
    <div className="stat-card">
        <Icon size={20} color="var(--primary)" style={{ marginBottom: '8px', opacity: 0.8 }} />
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
    </div>
);

const ProductCard = ({ product, onSelect, onCancel, isActive }) => {
    const { hours, minutes, seconds, urgency } = useCountdown(product.expiryTime);
    const isCritical = urgency === 'critical';
    return (
        <motion.div
            layout
            onClick={() => onSelect(product)}
            className={`glass-panel product-card ${urgency} ${isActive ? 'active-match' : ''}`}
            style={{
                cursor: 'pointer',
                background: isActive ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '24px', marginBottom: '16px', borderRadius: '20px'
            }}
        >
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                    <Leaf size={24} color={isCritical ? 'var(--status-critical)' : 'var(--primary)'} />
                </div>
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>{product.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{product.quantity} • {urgency}</div>
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: isCritical ? 'var(--status-critical)' : 'white' }}>
                    {hours}:{minutes}:{seconds}
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onCancel(product.id); }}
                    style={{ background: 'none', border: 'none', color: 'var(--status-critical)', fontSize: '0.75rem', cursor: 'pointer', marginTop: '4px' }}
                >
                    Cancel Produce
                </button>
            </div>
        </motion.div>
    );
};

const Dashboard = ({ user, onNotification, onShowAuth }) => {
    const [products, setProducts] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewMode, setViewMode] = useState('farmer'); // 'farmer' | 'consumer'
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        if (!user) return;
        const unsub = subscribeToUserProduce(user.uid, setProducts);
        getAllBuyers().then(setBuyers);
        return unsub;
    }, [user]);

    const stats = {
        alerts: products.filter(p => p.status === 'Cancelled').length,
        volume: products.reduce((s, p) => s + (parseInt(p.quantity) || 0), 0) + 'kg',
        partners: buyers.length
    };

    const activeItems = products.filter(p => !['Sold', 'Cancelled'].includes(p.status));
    const soldItems = products.filter(p => p.status === 'Sold');

    return (
        <div className="app-container">
            <main className="main-content">
                {/* Hero Section */}
                <section style={{ padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: 'var(--secondary)', borderRadius: '50%', opacity: 0.1, filter: 'blur(80px)' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1 className="font-serif" style={{ fontSize: '5rem', lineHeight: '0.9', color: 'var(--primary)', marginBottom: '24px' }}>
                                Fresh<br />Harvest
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '400px', marginBottom: '32px' }}>
                                Connect your organic yield with primary orders and emergency secondary markets.
                            </p>
                            {!user ? (
                                <button className="buyer-action-btn" onClick={onShowAuth}>Sign In to Harvest</button>
                            ) : (
                                <button className="buyer-action-btn" onClick={() => setIsAddModalOpen(true)}><Plus size={20} /> Register Produce</button>
                            )}
                        </div>

                        {/* Apple-style Toggle */}
                        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '40px' }}>
                            {['farmer', 'consumer'].map(m => (
                                <button key={m} onClick={() => setViewMode(m)} style={{ padding: '8px 24px', borderRadius: '32px', border: 'none', background: viewMode === m ? 'var(--primary)' : 'transparent', color: viewMode === m ? 'var(--primary-text)' : 'white', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>{m}</button>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="stats-grid">
                    <StatCard label="Critical Alerts" value={stats.alerts} icon={AlertTriangle} />
                    <StatCard label="Total Volume" value={stats.volume} icon={Package} />
                    <StatCard label="Active Fleets" value={stats.partners} icon={Truck} />
                    <StatCard label="Market Demand" value="High" icon={TrendingUp} />
                </div>

                {viewMode === 'farmer' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                        <section>
                            <h2 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Active Production</h2>
                            {activeItems.map(p => <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} onCancel={cancelProduce} isActive={selectedProduct?.id === p.id} />)}
                        </section>
                        <section>
                            <h2 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Placed Orders</h2>
                            {soldItems.map(p => (
                                <div key={p.id} className="glass-panel" style={{ padding: '24px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>{p.name}</h4>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--status-fresh)' }}>Sold to Primary Buyer</div>
                                    </div>
                                    <CheckCircle color="var(--status-fresh)" />
                                </div>
                            ))}
                        </section>
                    </div>
                ) : (
                    <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                        <ShoppingBag size={48} style={{ margin: '0 auto 16px' }} />
                        <h3>Consumer Marketplace Coming Soon</h3>
                    </div>
                )}
            </main>

            {/* Contextual Secondary Market */}
            <aside style={{ width: '400px', background: 'var(--bg-main)', padding: '40px', borderLeft: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column' }}>
                <h2 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Secondary Market</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '32px' }}>Backup buyers for {selectedProduct ? selectedProduct.name : 'your produce'}</p>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {buyers.map(b => (
                        <div key={b.id} className="glass-panel" style={{ padding: '20px', marginBottom: '12px', background: 'rgba(255,255,255,0.03)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 600 }}>{b.name}</span>
                                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>₹{b.pricePerKg}/kg</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                                <span><MapPin size={12} /> {b.distance}km</span>
                                <span>{b.pickupType}</span>
                            </div>
                            <button className="buyer-action-btn" style={{ width: '100%', fontSize: '0.8rem', padding: '10px' }}>Accept Secondary Offer</button>
                        </div>
                    ))}
                </div>
            </aside>

            <AddProduceModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={(d) => addProduce(d, user.uid)} />
        </div>
    );
};

export default Dashboard;
