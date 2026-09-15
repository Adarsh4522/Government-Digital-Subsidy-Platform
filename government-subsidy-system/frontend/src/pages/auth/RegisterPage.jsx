import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { UserPlus, ArrowLeft, Shield } from 'lucide-react';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    role: 'ROLE_BENEFICIARY',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorDetails, setErrorDetails] = useState([]);

  const { success } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setErrorDetails([]);

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        roles: [formData.role],
      });
      success('Beneficiary account registered successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
      if (err.details && Array.isArray(err.details)) {
        setErrorDetails(err.details);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--gov-slate-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--gov-navy-900)',
            color: '#ffffff',
            padding: '24px 32px',
            borderBottom: '3px solid var(--gov-gold-500)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/login" style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={18} />
            </Link>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>New Beneficiary Registration</h2>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--gov-slate-300)', marginTop: '4px', paddingLeft: '28px' }}>
            Register your official credentials to apply for Central & State Subsidies
          </p>
        </div>

        <div style={{ padding: '32px' }}>
          {errorMsg && (
            <div
              style={{
                backgroundColor: 'var(--gov-crimson-50)',
                border: '1px solid var(--gov-crimson-100)',
                color: 'var(--gov-crimson-700)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              <div>{errorMsg}</div>
              {errorDetails.length > 0 && (
                <ul style={{ marginTop: '6px', paddingLeft: '18px', fontSize: '12px' }}>
                  {errorDetails.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">
                  Username <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  placeholder="e.g. kisan_ramesh"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="As per Aadhaar Card"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="ROLE_BENEFICIARY">Beneficiary / Applicant</option>
                <option value="ROLE_FIELD_OFFICER">Field Officer</option>
                <option value="ROLE_DISTRICT_OFFICER">District Officer</option>
                <option value="ROLE_FINANCE_OFFICER">Finance Officer</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              style={{ width: '100%', marginTop: '12px' }}
              icon={UserPlus}
            >
              Complete Registration
            </Button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
            Already registered?{' '}
            <Link to="/login" style={{ fontWeight: 600, color: 'var(--gov-navy-700)' }}>
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
