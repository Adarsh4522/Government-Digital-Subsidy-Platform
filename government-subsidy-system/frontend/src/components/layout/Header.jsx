import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Shield, Menu } from 'lucide-react';
import { ROLE_LABELS } from '../../constants/roles';

export const Header = ({ onToggleSidebar }) => {
  const { user, logout, roles } = useAuth();
  const primaryRole = roles[0] || 'ROLE_BENEFICIARY';
  const roleLabel = ROLE_LABELS[primaryRole] || primaryRole;

  return (
    <header
      style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        height: 'var(--header-height)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: 'var(--radius-md)',
            color: 'var(--gov-slate-700)',
            display: 'flex',
            alignItems: 'center',
          }}
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--gov-navy-900), var(--gov-navy-700))',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '18px',
              boxShadow: '0 2px 4px rgba(30, 58, 138, 0.3)',
            }}
          >
            🏛️
          </div>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--gov-navy-950)', lineHeight: 1.2 }}>
              Digital Government Subsidy & Grant Administration System
            </h1>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
              By government of India
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-slate-900)' }}>
                {user.fullName || user.username}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gov-navy-700)', fontWeight: 600 }}>
                {roleLabel}
              </div>
            </div>

            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--gov-navy-100)',
                color: 'var(--gov-navy-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px',
                border: '1px solid var(--gov-navy-200)',
              }}
            >
              {user.username ? user.username.substring(0, 2).toUpperCase() : 'GOV'}
            </div>

            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--gov-slate-100)',
                border: '1px solid var(--gov-slate-200)',
                color: 'var(--gov-crimson-600)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Logout from system"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <a
            href="/login"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              padding: '6px 16px',
              backgroundColor: 'var(--gov-navy-800)',
              color: '#fff',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Officer / Beneficiary Login
          </a>
        )}
      </div>
    </header>
  );
};
