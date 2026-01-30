import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertTriangle } from 'lucide-react';

import Layout from './components/Layout';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Deliveries from './pages/Deliveries';
import Analytics from './pages/Analytics';
import FarmMap from './pages/FarmMap';
import Settings from './pages/Settings';
import EditProfile from './pages/settings/EditProfile';
import ChangePassword from './pages/settings/ChangePassword';
import Privacy from './pages/settings/Privacy';

import { onAuthChange } from './services/authService';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        setIsAuthModalOpen(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [{ id, message, type }, ...prev].slice(0, 3));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--bg-main)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Zap size={48} color="var(--primary)" />
        </motion.div>
      </div>
    );
  }

  // Show auth modal if not logged in
  if (!user) {
    return (
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => { }} // Block closing if required
        onAuthSuccess={() => setIsAuthModalOpen(false)}
      />
    );
  }

  return (
    <BrowserRouter>
      {/* Global Notifications Layer */}
      <div className="notification-container">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`glass-panel toast ${n.type}`}
              style={{ borderLeftColor: n.type === 'critical' ? 'var(--status-critical)' : 'var(--primary)' }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AlertTriangle size={20} color={n.type === 'critical' ? 'var(--status-critical)' : 'var(--primary)'} />
                <span style={{ fontSize: '0.9rem' }}>{n.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Routes>
        <Route path="/" element={<Layout user={user} onLogoutNotification={addNotification} />}>
          <Route index element={<Dashboard user={user} onNotification={addNotification} />} />
          <Route path="profile" element={<Profile user={user} />} />
          <Route path="deliveries" element={<Deliveries />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="map" element={<FarmMap />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/edit-profile" element={<EditProfile />} />
          <Route path="settings/change-password" element={<ChangePassword />} />
          <Route path="settings/privacy" element={<Privacy />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
