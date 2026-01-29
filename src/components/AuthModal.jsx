import React, { useState } from 'react';
import { X, Mail, Lock, User, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { signIn, signUp, signInWithGoogle } from '../services/authService';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        displayName: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await signIn(formData.email, formData.password);
            } else {
                await signUp(formData.email, formData.password, formData.displayName);
            }
            onAuthSuccess();
            onClose();
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            await signInWithGoogle();
            onAuthSuccess();
            onClose();
        } catch (err) {
            setError(err.message || 'Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 3000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="glass-panel"
                style={{
                    width: '450px',
                    padding: '40px',
                    position: 'relative',
                    borderRadius: '24px',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--text-main)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
                >
                    <X size={24} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '16px',
                        }}
                    >
                        <Leaf size={32} color="var(--primary)" />
                        <h2
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.75rem',
                                margin: 0,
                            }}
                        >
                            {isLogin ? 'Welcome Back' : 'Join FreshRush'}
                        </h2>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        {isLogin
                            ? 'Sign in to manage your produce'
                            : 'Create an account to get started'}
                    </p>
                </div>

                {error && (
                    <div
                        style={{
                            padding: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            color: '#ef4444',
                            fontSize: '0.875rem',
                            marginBottom: '20px',
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {!isLogin && (
                        <div className="input-group">
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    color: 'var(--text-muted)',
                                    marginBottom: '8px',
                                    fontWeight: 500,
                                }}
                            >
                                Full Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-dim)',
                                    }}
                                />
                                <input
                                    required
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 44px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.2s',
                                    }}
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                    placeholder="Enter your name"
                                    onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                                    onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
                                />
                            </div>
                        </div>
                    )}

                    <div className="input-group">
                        <label
                            style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: 'var(--text-muted)',
                                marginBottom: '8px',
                                fontWeight: 500,
                            }}
                        >
                            Email Address
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail
                                size={18}
                                style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-dim)',
                                }}
                            />
                            <input
                                required
                                type="email"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 44px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.2s',
                                }}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="you@example.com"
                                onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                                onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label
                            style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                color: 'var(--text-muted)',
                                marginBottom: '8px',
                                fontWeight: 500,
                            }}
                        >
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock
                                size={18}
                                style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-dim)',
                                }}
                            />
                            <input
                                required
                                type="password"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 44px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.2s',
                                }}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                                onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="buyer-action-btn"
                        style={{
                            padding: '14px',
                            marginTop: '8px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderRadius: '12px',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div style={{ margin: '24px 0', textAlign: 'center', position: 'relative' }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'var(--glass-border)',
                        }}
                    />
                    <span
                        style={{
                            position: 'relative',
                            background: 'var(--bg-main)',
                            padding: '0 16px',
                            color: 'var(--text-dim)',
                            fontSize: '0.875rem',
                        }}
                    >
                        or continue with
                    </span>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.08)';
                        e.target.style.borderColor = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                        e.target.style.borderColor = 'var(--glass-border)';
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path
                            fill="#4285F4"
                            d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                        />
                        <path
                            fill="#34A853"
                            d="M9.003 18c2.43 0 4.467-.806 5.956-2.184L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                        />
                        <path
                            fill="#EA4335"
                            d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                        />
                    </svg>
                    Google
                </button>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary)',
                                cursor: 'pointer',
                                fontWeight: 600,
                                textDecoration: 'underline',
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;
