import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck } from 'lucide-react';

export const GovBanner = () => {
  const { user, quickSwitchRole, demoAccounts } = useAuth();

  return (
    <div
      style={{
        backgroundColor: 'var(--gov-navy-950)',
        color: '#ffffff',
        borderBottom: '2px solid #f59e0b',
        padding: '6px 24px',
        fontSize: '11px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
          <span style={{ color: '#f59e0b' }}>🇮🇳</span> भारत सरकार | Government of India
        </span>
        <span style={{ color: 'var(--gov-slate-400)' }}>•</span>
        <span style={{ color: 'var(--gov-slate-300)' }}>Public Financial Management & Direct Benefit Transfer Cell</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--gov-gold-500)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <UserCheck size={13} /> Quick Demo Switcher:
        </span>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {demoAccounts.map((acc) => {
            const isActive = user?.username === acc.username;
            return (
              <button
                key={acc.username}
                onClick={() => quickSwitchRole(acc)}
                title={`Switch to ${acc.label}`}
                style={{
                  backgroundColor: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#0f172a' : '#ffffff',
                  border: isActive ? '1px solid #d97706' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '3px',
                  padding: '2px 7px',
                  fontSize: '10px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {acc.username}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
