import { useState } from 'react';
import { BookOpen, Eye, EyeOff, Lock, User, AlertCircle, Shield, Wifi, Zap } from 'lucide-react';
import { initDatabase, execQuery, runQuery, hashPassword } from '../database/db';

interface LoginPageProps {
  onLogin: (user: { id: number; username: string; fullName: string; role: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbReady, setDbReady] = useState(false);
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
      setDbReady(true);

      // Check credentials - using parameterized query
      const users = execQuery(`SELECT * FROM users WHERE username = ?`, [username]);
      if (users && users.length > 0 && Number(users[0].is_active) !== 1) {
        setError('این کاربر غیرفعال است. با مدیر سیستم تماس بگیرید.');
        setAttempts(prev => prev + 1);
        setLoading(false);
        return;
      }
      
      if (!users || users.length === 0) {
        console.warn('User not found or inactive:', username);
        setError('نام کاربری یا رمز عبور اشتباه است');
        setAttempts(prev => prev + 1);
        setLoading(false);
        return;
      }

      const user = users[0];
      console.log('User found:', user);
      
      if (user.password_hash !== hashPassword(password)) {
        console.warn('Password mismatch for user:', username);
        setError('نام کاربری یا رمز عبور اشتباه است');
        setAttempts(prev => prev + 1);
        setLoading(false);
        return;
      }

      if (attempts >= 4) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden" dir="rtl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30 mb-4 animate-float">
            <BookOpen size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">سَرمد</h1>
          <p className="text-blue-200/80 text-sm">سیستم حسابداری، امور مالی و انبارداری</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <Shield size={12} className="text-green-400" />
              <span className="text-[10px] text-green-300">آفلاین</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <Zap size={12} className="text-amber-400" />
              <span className="text-[10px] text-amber-300">SQLite</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-6 text-center">ورود به سیستم</h2>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/30 animate-scale-in">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <span className="text-xs text-red-200">{error}</span>
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-xs text-blue-200 mb-2 font-medium">نام کاربری</label>
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <User size={16} className="text-blue-300" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="نام کاربری خود را وارد کنید"
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs text-blue-200 mb-2 font-medium">رمز عبور</label>
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Lock size={16} className="text-blue-300" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="رمز عبور خود را وارد کنید"
                className="w-full pr-10 pl-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                در حال ورود...
              </span>
            ) : 'ورود به سیستم'}
          </button>

          {/* Demo credentials */}
          <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[10px] text-blue-200/60 text-center mb-2">اطلاعات ورود نمونه:</p>
            <div className="flex items-center justify-center gap-4 text-[11px]">
              <span className="text-blue-200">کاربری: <strong className="text-white">admin</strong></span>
              <span className="text-blue-200">رمز: <strong className="text-white">admin123</strong></span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-[10px] text-white/40">نسخه ۱.۰.۰ | پایگاه داده SQLite | اجرای محلی و آفلاین</p>
        </div>
      </div>
    </div>
  );
}
