import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, PieChart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Analytics = () => {
    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', lineHeight: '1.2' }}>Performance <span style={{ color: 'var(--primary)' }}>Insights</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Financial growth and production efficiency metrics</p>
            </header>

            {/* Top Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                {[
                    { label: 'Total Revenue', value: '₹1,24,500', trend: '+12%', isPositive: true, icon: DollarSign },
                    { label: 'Orders Completed', value: '142', trend: '+5%', isPositive: true, icon: Activity },
                    { label: 'Avg. Sell Price', value: '₹42/kg', trend: '-2%', isPositive: false, icon: TrendingUp },
                    { label: 'Wastage Rate', value: '3.2%', trend: '-0.5%', isPositive: true, icon: PieChart },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel"
                        style={{ padding: '24px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                <stat.icon size={24} color="var(--primary)" />
                            </div>
                            <span style={{
                                fontSize: '0.9rem',
                                color: stat.isPositive ? 'var(--status-fresh)' : 'var(--status-critical)',
                                display: 'flex', alignItems: 'center',
                                fontWeight: 600,
                                background: stat.isPositive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                padding: '4px 12px',
                                borderRadius: '20px'
                            }}>
                                {stat.trend} {stat.isPositive ? <ArrowUpRight size={14} style={{ marginLeft: '4px' }} /> : <ArrowDownRight size={14} style={{ marginLeft: '4px' }} />}
                            </span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-display)' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section (Simulated with CSS) */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                {/* Revenue Graph */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel"
                    style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', padding: '32px' }}
                >
                    <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem' }}>Revenue Growth</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Monthly financial performance</p>
                        </div>
                        <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '8px 12px', borderRadius: '8px' }}>
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>

                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
                        {[40, 60, 45, 70, 55, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 0.8, delay: i * 0.05 }}
                                style={{
                                    flex: 1,
                                    background: `linear-gradient(to top, var(--primary), rgba(251, 191, 36, 0.1))`,
                                    borderRadius: '8px 8px 0 0',
                                    position: 'relative',
                                    opacity: 0.9
                                }}
                                whileHover={{ opacity: 1, scaleY: 1.05 }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-30px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-dim)',
                                    fontWeight: 500
                                }}>
                                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Crop Distribution Pie */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel"
                    style={{ minHeight: '400px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <div style={{ width: '100%', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.25rem' }}>Crop Distribution</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Yield by variety</p>
                    </div>

                    <div style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        position: 'relative',
                        width: '240px',
                        height: '240px'
                    }}>
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', overflow: 'visible', width: '100%', height: '100%' }}>
                            {/* Simple SVG Pie Chart Simulation */}
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                            <motion.circle
                                cx="50" cy="50" r="40"
                                fill="transparent"
                                stroke="var(--primary)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray="251.2"
                                strokeDashoffset="100" // 60%
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <motion.circle
                                cx="50" cy="50" r="40"
                                fill="transparent"
                                stroke="var(--secondary)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray="251.2"
                                strokeDashoffset="220" // ~12%
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 220 }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                style={{ transformOrigin: 'center', transform: 'rotate(216deg)' }}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>60%</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Mangoes</div>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--primary)' }} /> Mangoes
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--secondary)' }} /> Other
                        </div>
                    </div>
                </motion.div>

            </div>
        </main>
    );
};

export default Analytics;
