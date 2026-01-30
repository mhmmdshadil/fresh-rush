import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Layers, Info } from 'lucide-react';

const FarmMap = () => {
    const [selectedZone, setSelectedZone] = useState(null);

    const zones = [
        { id: 1, name: 'Sector Alpha', crop: 'Alphonso Mango', status: 'Harvesting', color: 'var(--status-fresh)', top: '25%', left: '35%' },
        { id: 2, name: 'Sector Beta', crop: 'Mixed Veg', status: 'Cultivating', color: 'var(--primary)', top: '55%', left: '65%' },
        { id: 3, name: 'Hydroponics Lab', crop: 'Exotic Herbs', status: 'Maintenance', color: 'var(--secondary)', top: '35%', left: '55%' },
    ];

    return (
        <main className="main-content" style={{ overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '24px', flexShrink: 0 }}>
                <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', lineHeight: '1.2' }}>Farm <span style={{ color: 'var(--primary)' }}>Geo-Spatial</span> Map</h1>
                <p style={{ color: 'var(--text-muted)' }}>Satellite-linked crop zoning system</p>
            </header>

            <div style={{ flex: 1, position: 'relative', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                {/* Simulated Map Background */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 50% 50%, #151515 0%, #050505 100%)',
                    position: 'absolute'
                }}>
                    {/* Grid Lines */}
                    <div style={{
                        width: '100%', height: '100%',
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                    {/* Radar Effect */}
                    <motion.div
                        animate={{ opacity: [0, 0.2, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%', height: '80%',
                            border: '1px solid var(--primary)',
                            borderRadius: '50%'
                        }}
                    />
                </div>

                {/* Map Controls */}
                <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button className="glass-panel" style={{ padding: '12px', cursor: 'pointer', background: 'rgba(0,0,0,0.6)' }}><Navigation size={20} color="var(--primary)" /></button>
                    <button className="glass-panel" style={{ padding: '12px', cursor: 'pointer', background: 'rgba(0,0,0,0.6)' }}><Layers size={20} color="white" /></button>
                </div>

                {/* Zones (Pins) */}
                {zones.map(zone => (
                    <motion.div
                        key={zone.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        onClick={() => setSelectedZone(zone)}
                        style={{
                            position: 'absolute',
                            top: zone.top,
                            left: zone.left,
                            cursor: 'pointer',
                            zIndex: 10
                        }}
                    >
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                                padding: '10px',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '50%',
                                border: `2px solid ${zone.color}`,
                                boxShadow: `0 0 20px ${zone.color}`
                            }}>
                                <MapPin size={28} color={zone.color} fill={zone.color} />
                            </div>
                            <div style={{
                                background: 'var(--bg-surface)',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                marginTop: '8px',
                                fontSize: '0.75rem',
                                whiteSpace: 'nowrap',
                                fontWeight: 600,
                                border: '1px solid var(--glass-border)'
                            }}>
                                {zone.name}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Selected Zone Detail Card */}
                {selectedZone && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="glass-panel"
                        style={{
                            position: 'absolute',
                            bottom: '24px',
                            left: '24px',
                            width: '320px',
                            padding: '24px',
                            zIndex: 20,
                            background: 'rgba(10, 10, 10, 0.9)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{selectedZone.name}</h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>ID: ZN-0{selectedZone.id}</div>
                            </div>
                            <button onClick={() => setSelectedZone(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>✕</button>
                        </div>

                        <div style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Current Crop</span>
                                <span style={{ color: 'white', fontWeight: 500 }}>{selectedZone.crop}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                                <span style={{ color: selectedZone.color, fontWeight: 500 }}>{selectedZone.status}</span>
                            </div>
                        </div>

                        <button
                            className="buyer-action-btn"
                            style={{ width: '100%' }}
                        >
                            View Zone Details
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    );
};

export default FarmMap;
