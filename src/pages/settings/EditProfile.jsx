import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/settings');
        }, 1200);
    };

    return (
        <main className="main-content">
            <header style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <button onClick={() => navigate('/settings')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '12px', borderRadius: '14px', cursor: 'pointer' }}>
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '4px' }}>Edit <span style={{ color: 'var(--primary)' }}>Profile</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Apple-style typography and consistent input padding.</p>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '48px' }}>
                <aside style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                        <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '4px' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#1a3229', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>A</div>
                        </div>
                        <button style={{ position: 'absolute', bottom: 10, right: 10, background: 'var(--primary)', border: '4px solid #1a3229', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}><Camera size={20} /></button>
                    </div>
                    <div className="ios-label">Profile Photo</div>
                </aside>

                <div className="glass-panel" style={{ padding: '48px' }}>
                    <div className="ios-input-wrapper">
                        <label className="ios-label">Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User className="ios-icon" size={20} />
                            <input className="ios-input" defaultValue="Aishwarya A Nair" />
                        </div>
                    </div>

                    <div className="ios-input-wrapper">
                        <label className="ios-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail className="ios-icon" size={20} />
                            <input className="ios-input" defaultValue="ash.nair@example.com" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                        </div>
                    </div>

                    <div className="ios-input-wrapper">
                        <label className="ios-label">Phone Number</label>
                        <div style={{ position: 'relative' }}>
                            <Phone className="ios-icon" size={20} />
                            <input className="ios-input" defaultValue="+91 98765 43210" />
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={handleSave} className="buyer-action-btn" style={{ padding: '14px 40px' }}>
                            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditProfile;
