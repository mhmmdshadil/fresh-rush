import React, { useState } from 'react';
import { X, Mail, Lock, User, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { signIn, signUp, signInWithGoogle } from '../services/authService';

const InputField = ({ label, icon: Icon, type, placeholder, value, onChange, required = false }) => (
    <div className="ios-input-wrapper">
        <label className="ios-label">{label}</label>
        <div style={{ position: 'relative' }}>
            <Icon size={20} className="ios-icon" />
            <input
                required={required}
                type={type}
                className="ios-input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    </div>
);

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', displayName: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            isLogin ? await signIn(formData.email, formData.password) : await signUp(formData.email, formData.password, formData.displayName);
            onAuthSuccess();
            onClose();
        } catch (err) { setError(err.message || 'Auth failed'); } finally { setLoading(false); }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel" style={{ width: '460px', padding: '48px', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', right: '24px', top: '24px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>

                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'inline-flex', gap: '12px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '8px 20px', borderRadius: '40px', border: '1px solid var(--glass-border)', marginBottom: '16px' }}>
                        <Leaf size={20} color="var(--primary)" />
                        <span className="font-serif" style={{ fontSize: '1.2rem' }}>{isLogin ? 'Welcome Back' : 'Join FreshRush'}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && <InputField label="Full Name" icon={User} type="text" placeholder="Aishwarya A Nair" value={formData.displayName} onChange={(e) => setFormData({ ...formData, displayName: e.target.value })} required />}
                    <InputField label="Email Address" icon={Mail} type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <InputField label="Password" icon={Lock} type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    <button type="submit" disabled={loading} className="buyer-action-btn" style={{ width: '100%', padding: '16px', marginTop: '12px' }}>{loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}</button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>{isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}</button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;
