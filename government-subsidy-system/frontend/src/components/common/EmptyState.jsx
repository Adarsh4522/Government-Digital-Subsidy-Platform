import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No Records Found',
  description = 'There are currently no items matching your criteria in the system.',
  action,
}) => {
  return (
    <div
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gov-slate-500)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--gov-slate-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          color: 'var(--gov-slate-400)',
        }}
      >
        <Icon size={28} />
      </div>
      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gov-slate-800)', marginBottom: '6px' }}>
        {title}
      </h4>
      <p style={{ fontSize: '13px', color: 'var(--gov-slate-500)', maxWidth: '400px', marginBottom: action ? '20px' : '0' }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};
