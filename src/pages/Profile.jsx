import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Award, Calendar, Shield } from 'lucide-react';

const Profile = ({ user }) => {
    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', lineHeight: '1.2' }}>Farmer <span style={{ color: 'var(--primary)' }}>Profile</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your personal account and farm details</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                {/* Left Column: Identity Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel"
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(30,30,30,0.95), rgba(10,10,10,0.98))',
                        border: '1px solid rgba(251, 191, 36, 0.2)'
                    }}
                >
                    {/* Decorative Gold Shine */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%', left: '-50%',
                        width: '200%', height: '200%',
                        background: 'linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.05), transparent)',
                        transform: 'rotate(45deg)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ textAlign: 'center', padding: '40px 24px', position: 'relative', zIndex: 1 }}>
                        <div style={{
                            width: '130px',
                            height: '130px',
                            borderRadius: '50%',
                            padding: '4px',
                            background: 'linear-gradient(to bottom right, var(--primary), var(--secondary))',
                            margin: '0 auto 24px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <span style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                        </div>

                        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: 'white', fontFamily: 'var(--font-display)' }}>
                            {user?.displayName || 'Farmer User'}
                        </h2>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 16px',
                            background: 'rgba(251, 191, 36, 0.1)',
                            color: 'var(--primary)',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            border: '1px solid rgba(251, 191, 36, 0.3)'
                        }}>
                            <Shield size={14} fill="var(--primary)" /> Verified Grower
                        </div>
                    </div>

                    <div style={{
                        marginTop: '16px',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        padding: '32px 24px',
                        background: 'rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                <Mail size={18} color="var(--primary)" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Email</div>
                                <div style={{ color: 'var(--text-main)' }}>{user?.email}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                <Phone size={18} color="var(--primary)" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Phone</div>
                                <div style={{ color: 'var(--text-main)' }}>+91 98765 43210</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                <MapPin size={18} color="var(--primary)" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Location</div>
                                <div style={{ color: 'var(--text-main)' }}>Kerala, India</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Statistics & Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass-panel"
                            style={{ padding: '24px' }}
                        >
                            <Award size={32} color="var(--secondary)" style={{ marginBottom: '16px' }} />
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1 }}>4.8</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>Reputation Score</div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass-panel"
                            style={{ padding: '24px' }}
                        >
                            <Calendar size={32} color="var(--primary)" style={{ marginBottom: '16px' }} />
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1 }}>2</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>Years Member</div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass-panel"
                            style={{ padding: '24px' }}
                        >
                            <Shield size={32} color="var(--status-fresh)" style={{ marginBottom: '16px' }} />
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1 }}>100%</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>Quality Index</div>
                        </motion.div>
                    </div>

                    {/* Bio / Farm Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel"
                        style={{ padding: '32px' }}
                    >
                        <h3 style={{ marginBottom: '20px', fontSize: '1.25rem' }}>Farm Overview</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            Specializing in organic tropical fruits and vegetables. We use sustainable farming practices with zero chemical pesticides. Our farm "Green Haven" is located in the fertile plains near the river, ensuring constant fresh water supply for our produce.
                        </p>
                        <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {['Organic Certified', 'Eco-Friendly', 'Fast Delivery', 'Wholesale Partner'].map(tag => (
                                <span key={tag} style={{
                                    padding: '8px 20px',
                                    borderRadius: '30px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.03)',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-dim)',
                                    transition: 'all 0.2s'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
};

export default Profile;
