import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';

const Deliveries = () => {
    // Mock delivery data
    const deliveries = [
        {
            id: "ORD-7829",
            buyer: "Metro Mart Logistics",
            items: "500kg Mangoes",
            status: "In Transit",
            time: "2 hours ago",
            destination: "Kochi Hub",
            progress: 65
        },
        {
            id: "ORD-9921",
            buyer: "Fresh World",
            items: "200kg Bananas",
            status: "Delivered",
            time: "Yesterday",
            destination: "Trivandrum Store",
            progress: 100
        },
        {
            id: "ORD-1102",
            buyer: "Green Grocers",
            items: "50kg Chillies",
            status: "Pending Pickup",
            time: "Just now",
            destination: "Calicut Center",
            progress: 10
        }
    ];

    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', lineHeight: '1.2' }}>Logistics <span style={{ color: 'var(--primary)' }}>Hub</span></h1>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>Real-time tracking of your produce from farm to market.</p>
                </div>
                <div className="glass-panel" style={{ padding: '12px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Fleet</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>12 Trucks</div>
                </div>
            </header>

            <div style={{ display: 'grid', gap: '24px' }}>
                {deliveries.map((delivery, index) => (
                    <motion.div
                        key={delivery.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '80px 1fr 180px',
                            gap: '32px',
                            alignItems: 'center',
                            padding: '32px'
                        }}
                    >
                        {/* Left: Icon & ID */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '20px',
                                background: delivery.status === 'Delivered' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `1px solid ${delivery.status === 'Delivered' ? 'var(--status-fresh)' : 'var(--primary)'}`
                            }}>
                                <Truck size={32} color={delivery.status === 'Delivered' ? 'var(--status-fresh)' : 'var(--primary)'} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>{delivery.id}</span>
                        </div>

                        {/* Middle: Details & Progress */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>{delivery.buyer}</h3>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Package size={14} /> {delivery.items}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <MapPin size={14} /> {delivery.destination}
                                        </span>
                                    </div>
                                </div>
                                <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Clock size={14} /> {delivery.time}
                                </span>
                            </div>

                            {/* Progress Bar Container */}
                            <div style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                                    <span>Processing</span>
                                    <span>Delivered</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${delivery.progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        style={{
                                            height: '100%',
                                            background: delivery.status === 'Delivered' ? 'var(--status-fresh)' : 'linear-gradient(90deg, var(--secondary), var(--primary))',
                                            borderRadius: '4px',
                                            boxShadow: `0 0 10px ${delivery.status === 'Delivered' ? 'rgba(74, 222, 128, 0.3)' : 'var(--primary-glow)'}`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                            <div style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: delivery.status === 'Delivered' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                color: delivery.status === 'Delivered' ? 'var(--status-fresh)' : 'var(--primary)',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {delivery.status}
                            </div>
                            <button
                                className="buyer-action-btn"
                                style={{ width: '100%', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
                            >
                                Track Live
                            </button>
                        </div>

                    </motion.div>
                ))}
            </div>
        </main>
    );
};

export default Deliveries;
