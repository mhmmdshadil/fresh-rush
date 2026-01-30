import React, { useState, useEffect, useMemo } from 'react';
import {
    Package,
    AlertTriangle,
    Truck,
    Leaf,
    Plus,
    Bell,
    User,
    Zap,
    MapPin,
    TrendingUp,
    CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useCountdown } from '../hooks/useCountdown';
import AddProduceModal from '../components/AddProduceModal';
import { subscribeToUserProduce, cancelProduce, addProduce } from '../services/produceService';
import { getAllBuyers } from '../services/buyerService';
import { seedBuyers } from '../utils/seedData';

// --- Sub-components (Moved from App.jsx) ---

const StatCard = ({ label, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -4, backgroundColor: 'rgba(255,255,255,0.05)' }}
        className="glass-panel"
        style={{
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 32px',
            borderRadius: '24px',
            marginBottom: '16px',
            border: '1px solid var(--glass-border)',
            background: 'rgba(255,255,255,0.02)'
        }}
    >
        <div>
            <div className="stat-value" style={{ fontSize: '2rem', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
            <div className="stat-label" style={{ margin: 0, fontSize: '0.85rem', textTransform: 'none', color: 'var(--text-muted)' }}>{label}</div>
        </div>
        <div style={{
            padding: '12px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={24} color={color || 'var(--text-main)'} />
        </div>
    </motion.div>
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
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.01 }}
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
                        Cancel Order
                    </button>
                )}
            </div>
        </motion.div>
    );
};

const BuyerCard = ({ buyer, onAccept }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
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
        <button
            className="buyer-action-btn"
            onClick={() => onAccept(buyer)}
        >
            Accept Offer
        </button>
    </motion.div>
);

const Dashboard = ({ user, onNotification }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Local notification state for dashboard-specific alerts (optional to sync with global)
    // For now using the prop passed from parent Layout/App if available, or just local console

    // Subscribe to user's produce
    useEffect(() => {
        if (!user) return;

        const unsubscribe = subscribeToUserProduce(user.uid, (produceData) => {
            setProducts(produceData);
            if (produceData.length > 0 && !selectedProduct) {
                setSelectedProduct(produceData[0]);
            }
        });

        return () => unsubscribe();
    }, [user]);

    // Load buyers
    useEffect(() => {
        if (!user) return;

        const loadBuyers = async () => {
            try {
                await seedBuyers();
                const buyersData = await getAllBuyers();
                setBuyers(buyersData);
            } catch (error) {
                console.error('Error loading buyers:', error);
                onNotification('Failed to load buyers', 'critical');
            }
        };

        loadBuyers();
    }, [user]);

    // Priority Sorting Logic
    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            if (a.status === 'Cancelled' && b.status !== 'Cancelled') return -1;
            if (a.status !== 'Cancelled' && b.status === 'Cancelled') return 1;
            return new Date(a.expiryTime) - new Date(b.expiryTime);
        });
    }, [products]);

    const handleCancel = async (id) => {
        try {
            await cancelProduce(id);
            const product = products.find(p => p.id === id);
            onNotification(`ALERT: Order cancelled for ${product.name}! Finding alternatives...`, 'critical');
        } catch (error) {
            console.error('Error cancelling produce:', error);
            onNotification('Failed to cancel order', 'critical');
        }
    };

    const handleAddProduce = async (newProduct) => {
        try {
            await addProduce(newProduct, user.uid);
            onNotification(`Produce registered: ${newProduct.name} is now live in the system.`, 'fresh');
        } catch (error) {
            console.error('Error adding produce:', error);
            onNotification('Failed to add produce', 'critical');
        }
    };

    const handleAcceptOffer = (buyer) => {
        onNotification(`Offer accepted from ${buyer.name}! Preparing for pickup...`, 'fresh');
    };

    const stats = {
        atRisk: products.filter(p => p.status === 'Cancelled').length,
        totalVolume: products.reduce((sum, p) => {
            const qty = parseInt(p.quantity) || 0;
            return sum + qty;
        }, 0) + ' kg',
        activeBuyers: buyers.length
    };

    return (
        <>
            <main className="main-content">
                <header style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(400px, 1.5fr) 1fr',
                    gap: '40px',
                    marginBottom: '80px',
                    alignItems: 'start'
                }}>
                    <div style={{ paddingTop: '20px' }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: '4rem',
                                fontFamily: 'var(--font-display)',
                                lineHeight: '1.1',
                                marginBottom: '24px',
                                fontWeight: 600,
                                letterSpacing: '-1px'
                            }}
                        >
                            Green<br />
                            <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>Operations</span>
                        </motion.h1>

                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '1.1rem',
                            maxWidth: '480px',
                            marginBottom: '40px',
                            lineHeight: '1.6'
                        }}>
                            Revolutionizing agricultural logistics with AI-driven decay prediction and instant buyer matching.
                        </p>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsModalOpen(true)}
                                className="buyer-action-btn"
                                style={{
                                    width: 'auto',
                                    background: 'white',
                                    color: 'black',
                                    padding: '16px 32px',
                                    borderRadius: '40px',
                                    fontSize: '1rem'
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Open Catalog <Plus size={18} />
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ x: 4 }}
                                onClick={() => navigate('/analytics')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-main)',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                View Analytics <TrendingUp size={16} />
                            </motion.button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <StatCard
                            label="Critical Alerts"
                            value={stats.atRisk}
                            icon={AlertTriangle}
                            color="var(--status-critical)"
                        />
                        <StatCard
                            label="Total Volume"
                            value={stats.totalVolume}
                            icon={Package}
                            color="var(--text-main)"
                        />
                        <StatCard
                            label="Logistics Partners"
                            value={stats.activeBuyers}
                            icon={Truck}
                            color="var(--status-fresh)"
                        />
                        <div style={{
                            marginTop: '16px',
                            padding: '24px',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '24px',
                            border: '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>98%</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Network Uptime</div>
                            </div>
                            <CheckCircle size={24} color="var(--status-fresh)" />
                        </div>
                    </div>
                </header>

                <section className="product-stack-container">
                    <div className="product-stack-header">
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>Active Production Line</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Real-time urgency sorted by AI decay algorithms</p>
                        </div>
                        {/* Filter/Sort Button could go here */}
                    </div>

                    <div className="product-stack">
                        {sortedProducts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-panel"
                                style={{ padding: '60px', textAlign: 'center', borderStyle: 'dashed' }}
                            >
                                <Leaf size={64} color="var(--text-dim)" style={{ margin: '0 auto 24px', opacity: 0.5 }} />
                                <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '1.2rem' }}>Production Line Empty</h3>
                                <p style={{ color: 'var(--text-dim)' }}>
                                    Register new produce to start the matching engine.
                                </p>
                            </motion.div>
                        ) : (
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
                        )}
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
                <div className="panel-header" style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '8px' }}>Logistics Match</h2>
                    {selectedProduct ? (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ padding: '8px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px' }}>
                                <Package size={16} color="var(--primary)" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Finding buyers for</div>
                                <div style={{ fontWeight: 600, color: 'white' }}>{selectedProduct.name}</div>
                            </div>
                        </div>
                    ) : (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Select an item to view matches</p>
                    )}
                </div>

                <div className="buyer-list" style={{ flex: 1, overflowY: 'auto' }}>
                    {buyers.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                            <Truck size={32} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <p>No logistics partners nearby</p>
                        </div>
                    ) : (
                        buyers.map(buyer => (
                            <BuyerCard key={buyer.id} buyer={buyer} onAccept={handleAcceptOffer} />
                        ))
                    )}
                </div>

                {/* Live Status Indicator */}
                <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#60a5fa' }}>
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%' }}
                        />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>LIVE NETWORK</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#93c5fd', lineHeight: '1.4' }}>
                        Scanning 150km radius for optimal fleet availability and pricing.
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Dashboard;
