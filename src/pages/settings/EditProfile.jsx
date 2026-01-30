import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate('/settings');
        }, 1500);
    };

    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <motion.button
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/settings')}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        padding: '12px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ArrowLeft size={20} />
                </motion.button>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', lineHeight: '1.2', margin: 0 }}>Edit <span style={{ color: 'var(--primary)' }}>Profile</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Update your public persona and contact info</p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 2fr', gap: '40px' }}>
                {/* Avatar Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', height: 'fit-content' }}
                >
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            padding: '6px',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '5rem',
                                fontWeight: 700,
                                color: 'var(--primary)',
                                fontFamily: 'var(--font-display)',
                                overflow: 'hidden'
                            }}>
                                A
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                background: 'var(--primary)',
                                color: 'var(--primary-text)',
                                border: '4px solid #1a1a1a',
                                borderRadius: '50%',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}
                        >
                            <Camera size={22} />
                        </motion.button>
                    </div>
                    <p style={{ marginTop: '24px', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem' }}>
                        <strong style={{ color: 'white', display: 'block', marginBottom: '4px' }}>Profile Photo</strong>
                        Allowed formats: JPG, PNG, GIF<br />Max size: 2MB
                    </p>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel"
                    style={{ padding: '40px' }}
                >
                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Full Name</label>
                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                                <input
                                    type="text"
                                    defaultValue="Aishwarya A Nair"
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 48px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email Address</label>
                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                                <input
                                    type="email"
                                    defaultValue="ash.nair@example.com"
                                    disabled
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 48px',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        color: 'var(--text-dim)',
                                        cursor: 'not-allowed'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Phone Number</label>
                            <div className="input-with-icon" style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                                <input
                                    type="tel"
                                    defaultValue="+91 98765 43210"
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 48px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Farm Bio</label>
                            <textarea
                                rows="4"
                                defaultValue="Specializing in organic tropical fruits and vegetables. We use sustainable farming practices with zero chemical pesticides."
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none',
                                    resize: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                        <motion.button
                            onClick={handleSave}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="buyer-action-btn"
                            style={{ width: 'auto', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default EditProfile;
