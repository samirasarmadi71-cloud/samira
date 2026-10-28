import { useState } from 'react';
import { BookOpen, Eye, EyeOff, Lock, User, AlertCircle, Shield, Wifi, Zap } from 'lucide-react';
import { initDatabase, execQuery, runQuery } from '../database/db';

interface LoginPageProps {
  onLogin: (user: { id: number; username: string; fullName: string; role: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Initialize database
      await initDatabase();

      // Check credentials
      const users = execQuery(`SELECT * FROM users WHERE username = ? AND is_active = 1`, [username]);
      
      console.log('Query result:', users);
      
      if (!users || users.length === 0) {
        console.warn('User not found or inactive:', username);
        setError('نام کاربری یا رمز عبور اشتباه است');
        setAttempts(prev => prev + 1);
        setLoading(false);
        return;
      }

      const user = users[0];
      console.log('User found:', user);
      console.log('Password check:', user.password_hash, '===', password, '?', user.password_hash === password);
      
      if (user.password_hash !== password) {
        console.warn('Password mismatch for user:', username);
        setError('نام کاربری یا رمز عبور اشتباه است');
        setAttempts(prev => prev + 1);
        setLoading(false);
        return;
      }

      if (attempts >= 5) {
        setError('تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفاً بعداً تلاش کنید.');
        setLoading(false);
        return;
      }

      // Update last login
      runQuery(`UPDATE users SET last_login = datetime('now') WHERE id = ?`, [user.id]);

      // Log audit
      runQuery(`INSERT INTO audit_logs (user_id, action, table_name, record_id) VALUES (?, ?, ?, ?)`, 
        [user.id, 'login', 'users', user.id]);

      // Save session with timestamp
      localStorage.setItem('sarmad_session_time', Date.now().toString());

      onLogin({
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        role: user.role
      });
    } catch (e) {
      setError('خطا در اتصال به پایگاه داده. لطفاً دوباره تلاش کنید.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #581c87 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px'
    }} dir="rtl">
      {/* Animated background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '25%', right: '25%',
          width: '400px', height: '400px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 3s infinite'
        }}></div>
        <div style={{
          position: 'absolute', bottom: '25%', left: '25%',
          width: '400px', height: '400px',
          background: 'rgba(168, 85, 247, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 3s infinite',
          animationDelay: '1s'
        }}></div>
      </div>

      {/* Login Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '420px'
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
            boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
            marginBottom: '16px'
          }}>
            <BookOpen size={36} color="white" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: 'white',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>سَرمد</h1>
          <p style={{
            fontSize: '14px',
            color: 'rgba(191, 219, 254, 0.8)',
            margin: 0
          }}>سیستم حسابداری، امور مالی و انبارداری</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '12px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px', borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Shield size={12} color="#4ade80" />
              <span style={{ fontSize: '10px', color: '#86efac' }}>آفلاین</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px', borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Zap size={12} color="#fbbf24" />
              <span style={{ fontSize: '10px', color: '#fde047' }}>SQLite</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '32px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '24px',
            textAlign: 'center',
            margin: '0 0 24px 0'
          }}>ورود به سیستم</h2>

          {/* Error Message */}
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <AlertCircle size={16} color="#fca5a5" />
              <span style={{ fontSize: '13px', color: '#fecaca' }}>{error}</span>
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              color: 'rgba(191, 219, 254, 0.9)',
              marginBottom: '8px',
              fontWeight: '500'
            }}>نام کاربری</label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}>
                <User size={18} color="rgba(147, 197, 253, 0.8)" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="نام کاربری خود را وارد کنید"
                style={{
                  width: '100%',
                  paddingRight: '44px',
                  paddingLeft: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.8)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              color: 'rgba(191, 219, 254, 0.9)',
              marginBottom: '8px',
              fontWeight: '500'
            }}>رمز عبور</label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}>
                <Lock size={18} color="rgba(147, 197, 253, 0.8)" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="رمز عبور خود را وارد کنید"
                style={{
                  width: '100%',
                  paddingRight: '44px',
                  paddingLeft: '44px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.8)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} color="rgba(147, 197, 253, 0.8)" /> : <Eye size={18} color="rgba(147, 197, 253, 0.8)" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%',
              paddingTop: '14px',
              paddingBottom: '14px',
              borderRadius: '12px',
              background: loading ? 'rgba(99, 102, 241, 0.5)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
              color: 'white',
              fontSize: '15px',
              fontWeight: '700',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.2s',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(139, 92, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.3)';
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                در حال ورود...
              </span>
            ) : 'ورود به سیستم'}
          </button>

          {/* Demo credentials */}
          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{
              fontSize: '11px',
              color: 'rgba(191, 219, 254, 0.6)',
              textAlign: 'center',
              marginBottom: '8px',
              margin: '0 0 8px 0'
            }}>اطلاعات ورود نمونه:</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '12px' }}>
              <span style={{ color: 'rgba(191, 219, 254, 0.8)' }}>
                کاربری: <strong style={{ color: 'white' }}>admin</strong>
              </span>
              <span style={{ color: 'rgba(191, 219, 254, 0.8)' }}>
                رمز: <strong style={{ color: 'white' }}>admin123</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', margin: 0 }}>
            نسخه ۱.۰.۰ | پایگاه داده SQLite | اجرای محلی و آفلاین
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
