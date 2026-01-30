import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Globe, Lock, ArrowLeft, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
    const navigate = useNavigate();

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
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', lineHeight: '1.2', margin: 0 }}>Privacy <span style={{ color: 'var(--primary)' }}>Settings</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your data visibility and permissions</p>
                </div>
            </header>

            <div style={{ display: 'grid', gap: '24px' }}>
                <Section title="Profile Visibility" icon={Eye} color="var(--primary)">
                    <PrivacyOption
                        title="Public Profile"
                        desc="Allow anyone to find your farm and see your produce."
                        icon={Globe}
                        defaultChecked={true}
                    />
                    <PrivacyOption
                        title="Show Contact Info"
                        desc="Display your email and phone number to verified buyers."
                        icon={Users}
                        defaultChecked={false}
                    />
                </Section>

                <Section title="Data Sharing" icon={Lock} color="var(--secondary)">
                    <PrivacyOption
                        title="Share Analytics"
                        desc="Allow FreshRush to use your anonymous data for market trends."
                        icon={Globe}
                        defaultChecked={true}
                    />
                </Section>
            </div>
        </main>
    );
};

const Section = ({ title, icon: Icon, color, children }) => (
    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon size={20} color={color} />
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{title}</h3>
        </div>
        <div>{children}</div>
    </div>
);

const PrivacyOption = ({ title, desc, icon: Icon, defaultChecked }) => {
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <div style={{ padding: '24px', display: 'flex', gap: '20px', borderBottom: '1px solid var(--glass-border)' }}>
            <div style={{
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon size={20} color="var(--text-dim)" />
            </div>

            <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{desc}</p>
            </div>

            <motion.div
                onClick={() => setChecked(!checked)}
                className="toggle-switch"
                style={{
                    width: '50px',
                    height: '28px',
                    background: checked ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                    borderRadius: '14px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                }}
            >
                <motion.div
                    initial={false}
                    animate={{ x: checked ? 24 : 2 }}
                    style={{
                        width: '24px',
                        height: '24px',
                        background: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                />
            </motion.div>
        </div>
    );
}

export default Privacy;
