import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { ROLES } from '../../constants/roles';
import {
  LayoutDashboard,
  Layers,
  FileText,
  UserCheck,
  MapPin,
  CheckSquare,
  Receipt,
  Building,
  AlertTriangle,
  DownloadCloud,
  CheckCircle,
  CreditCard,
  PieChart,
  Activity,
  Sliders,
  Map,
  Users,
  ShieldAlert,
  Cpu,
} from 'lucide-react';

const ICON_MAP = {
  LayoutDashboard,
  Layers,
  FileText,
  UserCheck,
  MapPin,
  CheckSquare,
  Receipt,
  Building,
  AlertTriangle,
  DownloadCloud,
  CheckCircle,
  CreditCard,
  PieChart,
  Activity,
  Sliders,
  Map,
  Users,
  ShieldAlert,
  Cpu,
};

export const Sidebar = ({ isOpen }) => {
  const { roles } = useAuth();

  // Determine user navigation items
  let navItems = [];
  if (roles.includes(ROLES.ADMIN)) {
    navItems = NAVIGATION_ITEMS[ROLES.ADMIN];
  } else if (roles.includes(ROLES.FINANCE_OFFICER)) {
    navItems = NAVIGATION_ITEMS[ROLES.FINANCE_OFFICER];
  } else if (roles.includes(ROLES.DISTRICT_OFFICER)) {
    navItems = NAVIGATION_ITEMS[ROLES.DISTRICT_OFFICER];
  } else if (roles.includes(ROLES.FIELD_OFFICER)) {
    navItems = NAVIGATION_ITEMS[ROLES.FIELD_OFFICER];
  } else {
    navItems = NAVIGATION_ITEMS[ROLES.BENEFICIARY] || [];
  }

  return (
    <aside
      style={{
        width: isOpen ? 'var(--sidebar-width)' : '0',
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        minHeight: 'calc(100vh - var(--header-height) - 34px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '20px 14px', width: 'var(--sidebar-width)' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
            marginBottom: '12px',
            paddingLeft: '10px',
          }}
        >
          Navigation Modules
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = ICON_MAP[item.icon] || FileText;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--gov-navy-800)' : 'var(--gov-slate-700)',
                  backgroundColor: isActive ? 'var(--gov-navy-50)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--gov-navy-800)' : '3px solid transparent',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                })}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
