import { useEffect, useMemo, useState } from 'react';
import {
  Calculator, Database, Eye, EyeOff, Lock, User, AlertCircle, ShieldCheck,
  WifiOff, Zap, TrendingUp, Package, Landmark, BookOpenCheck, Clock3, CalendarDays,
  CheckCircle2, Printer, FileSpreadsheet, PieChart, ChevronLeft,
} from 'lucide-react';
import { initDatabase, execQuery, runQuery, verifyPassword, hashPassword } from '../database/db';
import { toJalali, toPersianNumber } from '../utils/persianDate';

interface LoginPageProps {
  onLogin: (user: { id: number; username: string; fullName: string; role: string }) => void;
}

const WEEKDAYS = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
const J_MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

function useNow(tickMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), tickMs);
    return () => clearInterval(t);
  }, [tickMs]);
  return now;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false);
  const [readyError, setReadyError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState<number>(0);
  const [loginOk, setLoginOk] = useState(false);

  // rate-limit persistence (SR-AUTH-008)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('sarmad_login_guard');
      if (raw) {
        const g = JSON.parse(raw);
        if (g.lockUntil && Date.now() < g.lockUntil) {
          setAttempts(g.attempts ?? 5);
          setLockUntil(g.lockUntil);
          setError('به دلیل تلاش‌های ناموفق مکرر، ورود موقتاً قفل است.');
        } else if (g.lockUntil) {
          localStorage.removeItem('sarmad_login_guard');
        }
      }
    } catch { /* ignore */ }
  }, []);

  const saveGuard = (a: number, lock: number) => {
    try { localStorage.setItem('sarmad_login_guard', JSON.stringify({ attempts: a, lockUntil: lock })); } catch { /* ignore */ }
  };

  // boot the SQLite engine once — never let a failure trap the user
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await initDatabase();
        if (!alive) return;
        setDbReady(true);
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setReadyError('خطا در راه‌اندازی پایگاه داده. لطفاً صفحه را تازه‌سازی کنید.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // ---- live clock (Tehran wall-clock, Jalali date) ----
  const now = useNow(1000);
  const clock = useMemo(() => {
    let d = now;
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Tehran', hour: '2-digit', minute: '2-digit', second: '2-digit',
        year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour12: false,
      }).formatToParts(now);
      const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
      d = new Date(`${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}`);
    } catch { /* fall back to local time */ }
    const [jy, jm, jd] = toJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return {
      time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`,
      dateLong: `${WEEKDAYS[d.getDay()]} ${toPersianNumber(jd)} ${J_MONTHS[jm - 1]} ${toPersianNumber(jy)}`,
      dateNum: `${toPersianNumber(jy)}/${toPersianNumber(String(jm).padStart(2, '0'))}/${toPersianNumber(String(jd).padStart(2, '0'))}`,
    };
  }, [now]);

  // countdown while locked
  const lockRemain = lockUntil > Date.now() ? Math.ceil((lockUntil - Date.now()) / 1000) : 0;
  useEffect(() => {
    if (lockRemain <= 0) return;
    const t = setInterval(() => {
      if (Date.now() >= lockUntil) { setLockUntil(0); setAttempts(0); setError(''); try { localStorage.removeItem('sarmad_login_guard'); } catch { /* ignore */ } }
    }, 1000);
    return () => clearInterval(t);
  }, [lockUntil, lockRemain]);

  const bumpFail = (msg: string) => {
    const a = attempts + 1;
    setAttempts(a);
    if (a >= 5) {
      const until = Date.now() + 60_000;
      setLockUntil(until);
      saveGuard(a, until);
      setError('۵ تلاش ناموفق ثبت شد — ورود به مدت ۶۰ ثانیه قفل است.');
    } else {
      saveGuard(a, 0);
      setError(msg);
    }
  };

  const handleLogin = async () => {
    if (lockRemain > 0) return;
    setError('');
    if (!username.trim() || !password) {
      setError('لطفاً نام کاربری و رمز عبور را وارد کنید.');
      return;
    }
    setLoading(true);
    try {
      await initDatabase();
      setDbReady(true);

      const users = execQuery(`SELECT * FROM users WHERE username = ?`, [username.trim()]);
      if (!users || users.length === 0) {
        bumpFail('نام کاربری یا رمز عبور اشتباه است.');
        return;
      }
      const user = users[0];
      if (Number(user.is_active) !== 1) {
        setError('این کاربر غیرفعال است. با مدیر سیستم تماس بگیرید.');
        return;
      }
      const okStored = verifyPassword(password, String(user.password_hash ?? ''));
      const okLegacy = String(user.password_hash ?? '') === hashPassword(password);
      if (!okStored && !okLegacy) {
        bumpFail('نام کاربری یا رمز عبور اشتباه است.');
        return;
      }

      // upgrade legacy hashes to canonical v2 format on successful login
      if (!String(user.password_hash).startsWith('v2:')) {
        try { runQuery(`UPDATE users SET password_hash = ? WHERE id = ?`, [hashPassword(password), user.id]); } catch { /* ignore */ }
      }
      try { runQuery(`UPDATE users SET last_login = datetime('now','localtime') WHERE id = ?`, [user.id]); } catch { /* ignore */ }

      // audit trail — columns guaranteed by migration v2
      try {
        runQuery(
          `INSERT INTO audit_logs (user_name, username, user_id, action, entity, table_name, record_id, details, result, at, created_at)
           VALUES (?, ?, ?, 'login', 'auth', 'users', ?, 'ورود موفق به سیستم', 'success', datetime('now','localtime'), datetime('now','localtime'))`,
          [user.full_name || user.username, user.username, Number(user.id), String(user.id)]
        );
      } catch (e) {
        console.warn('audit log insert failed (non-blocking):', e);
      }

      try { localStorage.removeItem('sarmad_login_guard'); } catch { /* ignore */ }
      localStorage.setItem('sarmad_session_time', Date.now().toString());
      setAttempts(0);
      setLoginOk(true);
      setTimeout(() => {
        onLogin({ id: Number(user.id), username: user.username, fullName: user.full_name || user.username, role: user.role || 'viewer' });
      }, 750);
    } catch (e) {
      console.error(e);
      setError('خطای غیرمنتظره در اتصال به پایگاه داده. دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (u: string, p: string) => { setUsername(u); setPassword(p); setError(''); };

  const fieldCls = 'w-full h-14 rounded-2xl bg-slate-50 border-2 border-slate-200 pr-14 pl-12 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100';

  return (
    <div dir="rtl" className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 md:p-8"
      style={{ background: 'radial-gradient(1200px 600px at 85% -10%, #1e3a8a 0%, transparent 60%), radial-gradient(900px 500px at 10% 110%, #b45309 0%, transparent 55%), linear-gradient(135deg, #0b1f4b 0%, #142c63 45%, #0f2454 100%)' }}>

      {/* decorative rings & dots */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[24px] border-orange-400/10"></div>
        <div className="absolute top-10 -left-10 w-56 h-56 rounded-full border-[14px] border-blue-300/10"></div>
        <div className="absolute -bottom-28 -right-28 w-[420px] h-[420px] rounded-full border-[30px] border-blue-400/10"></div>
        <div className="absolute bottom-10 right-24 w-40 h-40 rounded-full bg-orange-400/10 blur-2xl"></div>
        <div className="absolute top-24 left-1/3 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '26px 26px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 items-stretch">

        {/* ================= RIGHT PANEL — brand / info / clock ================= */}
        <div className="hidden lg:flex flex-col justify-between text-white rounded-[2rem] p-10 border border-white/15 backdrop-blur-sm"
          style={{ background: 'linear-gradient(160deg, rgba(30,58,138,.55), rgba(11,31,75,.75))' }}>

          {/* logo */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-orange-400 via-amber-300 to-orange-500 blur-md opacity-60 animate-pulse"></div>
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                style={{ background: 'conic-gradient(from 210deg, #f97316, #fb923c, #fdba74, #f97316)' }}>
                <div className="w-[76px] h-[76px] rounded-full bg-[#0b1f4b] flex items-center justify-center border-4 border-white/90">
                  <Calculator size={34} className="text-orange-400" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">سَرمد</h1>
              <p className="text-blue-200 text-sm mt-1">سیستم حسابداری، امور مالی و انبارداری</p>
              <div className="flex gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-200 text-xs font-bold">
                  <WifiOff size={12} /> کاملاً آفلاین
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-400/15 border border-orange-300/30 text-orange-200 text-xs font-bold">
                  <Database size={12} /> SQLite
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-300/15 border border-blue-200/30 text-blue-100 text-xs font-bold">
                  <ShieldCheck size={12} /> نسخه ۱.۰
                </span>
              </div>
            </div>
          </div>

          {/* live clock card */}
          <div className="my-8 rounded-3xl border border-white/15 p-6 flex items-center justify-between gap-6"
            style={{ background: 'linear-gradient(120deg, rgba(249,115,22,.16), rgba(59,130,246,.14))' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Clock3 size={26} className="text-orange-300" />
              </div>
              <div>
                <div className="text-4xl font-black tabular-nums tracking-wide" style={{ textShadow: '0 2px 12px rgba(249,115,22,.35)' }}>{toPersianNumber(clock.time)}</div>
                <div className="text-blue-200 text-sm mt-1">{clock.dateLong}</div>
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 text-blue-200 text-xs mb-1"><CalendarDays size={14} /> تاریخ امروز</div>
              <div className="text-2xl font-extrabold text-white tabular-nums">{clock.dateNum}</div>
            </div>
          </div>

          {/* feature bullets */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {[
              { icon: <BookOpenCheck size={18} />, t: 'اسناد حسابداری متوازن', d: 'ثبت خودکار بدهکار و بستانکار' },
              { icon: <Package size={18} />, t: 'انبار هوشمند', d: 'رسید، حواله، انتقال و کارتکس' },
              { icon: <Landmark size={18} />, t: 'چک و خزانه‌داری', d: 'سررسید، وصول و مغایرت بانک' },
              { icon: <TrendingUp size={18} />, t: 'داشبورد و گزارش', d: 'نمودار فروش، خرید و موجودی' },
              { icon: <FileSpreadsheet size={18} />, t: 'ورود و خروج Excel', d: 'واردسازی گروهی با پیش‌نمایش' },
              { icon: <Printer size={18} />, t: 'چاپ فارسی راست‌چین', d: 'سربرگ شرکت روی همه اسناد' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-9 h-9 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-400/90 to-orange-600/90 text-white shadow-lg shadow-orange-900/30">{f.icon}</div>
                <div>
                  <div className="text-sm font-bold text-white">{f.t}</div>
                  <div className="text-xs text-blue-200/80 mt-0.5 leading-5">{f.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* footer credit */}
          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-200 text-xs">
              <Zap size={13} className="text-orange-300" /> اجرای محلی بدون نیاز به اینترنت
            </div>
            <div className="text-sm font-extrabold text-white">
              طراحی و توسعه: <span className="text-orange-300">سمیرا سرمد</span>
            </div>
          </div>
        </div>

        {/* ================= LEFT PANEL — login form ================= */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-black/40 border border-white/60 p-7 sm:p-10 flex flex-col justify-center min-h-[560px]">

          {/* mobile logo row */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'conic-gradient(from 210deg, #f97316, #fdba74, #f97316)' }}>
                <div className="w-11 h-11 rounded-full bg-[#0b1f4b] flex items-center justify-center border-2 border-white">
                  <Calculator size={20} className="text-orange-400" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-[#0b1f4b]">سَرمد</div>
                <div className="text-[11px] text-slate-500">حسابداری، امور مالی و انبارداری</div>
              </div>
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-[#0b1f4b] tabular-nums">{toPersianNumber(clock.time)}</div>
              <div className="text-[11px] text-slate-500">{clock.dateNum}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-1">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20" style={{ background: 'linear-gradient(135deg,#1e3a8a,#0b1f4b)' }}>
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#0b1f4b]">ورود به سامانه</h2>
              <p className="text-xs text-slate-500 mt-0.5">برای ادامه، هویت خود را تأیید کنید</p>
            </div>
          </div>

          {/* status line */}
          <div className="flex items-center gap-2 mt-4 mb-5 text-xs">
            {loading && !dbReady ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                <span className="w-3.5 h-3.5 border-2 border-blue-300 border-t-blue-700 rounded-full animate-spin"></span>
                در حال آماده‌سازی پایگاه داده SQLite…
              </span>
            ) : dbReady ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                <CheckCircle2 size={14} /> پایگاه داده آماده و سالم است
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">
                <AlertCircle size={14} /> {readyError || 'پایگاه داده آماده نیست'}
              </span>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 mb-4 rounded-2xl bg-red-50 border border-red-200 animate-[shake_.35s_ease]">
              <AlertCircle size={18} className="text-red-600 shrink-0" />
              <span className="text-sm text-red-700 font-bold">{error}</span>
            </div>
          )}
          {lockRemain > 0 && (
            <div className="flex items-center gap-2 px-4 py-3 mb-4 rounded-2xl bg-orange-50 border border-orange-200">
              <Clock3 size={18} className="text-orange-600 shrink-0" />
              <span className="text-sm text-orange-700 font-bold">بازگشایی خودکار تا {toPersianNumber(lockRemain)} ثانیه دیگر</span>
            </div>
          )}

          {loginOk ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-10">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 size={40} className="text-emerald-600" />
              </div>
              <div className="text-lg font-black text-emerald-700">ورود موفق — در حال انتقال به داشبورد…</div>
            </div>
          ) : (
            <>
              {/* username */}
              <label className="block text-sm font-bold text-slate-700 mb-2">نام کاربری</label>
              <div className="relative mb-4">
                <div className="absolute right-0 top-0 h-14 w-14 flex items-center justify-center rounded-r-2xl text-slate-400 pointer-events-none">
                  <User size={20} />
                </div>
                <input
                  type="text" value={username} autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="مثلاً admin"
                  className={fieldCls}
                />
              </div>

              {/* password */}
              <label className="block text-sm font-bold text-slate-700 mb-2">رمز عبور</label>
              <div className="relative mb-2">
                <div className="absolute right-0 top-0 h-14 w-14 flex items-center justify-center rounded-r-2xl text-slate-400 pointer-events-none">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="رمز عبور خود را وارد کنید"
                  className={fieldCls}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute left-1 top-0 h-14 w-12 flex items-center justify-center rounded-xl text-slate-400 hover:text-orange-500 transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {attempts > 0 && lockRemain === 0 && (
                <div className="text-[11px] text-slate-400 mb-3">
                  {toPersianNumber(attempts)} تلاش ناموفق — پس از ۵ تلاش، ورود ۶۰ ثانیه قفل می‌شود
                </div>
              )}

              {/* submit */}
              <button
                onClick={handleLogin}
                disabled={loading || !dbReady || lockRemain > 0}
                className="mt-4 w-full h-14 rounded-2xl text-white text-base font-black flex items-center justify-center gap-2 shadow-xl shadow-orange-600/30 transition-all active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed group"
                style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 55%, #c2410c 100%)' }}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    در حال بررسی…
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    ورود به سیستم
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* demo accounts */}
              <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-600">حساب‌های نمونه — کلیک کنید تا پر شود</span>
                  <PieChart size={15} className="text-orange-400" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { u: 'admin', p: 'admin123', label: 'مدیر سیستم' },
                    { u: 'finance', p: '1234', label: 'مدیر مالی' },
                    { u: 'accountant', p: '1234', label: 'حسابدار' },
                    { u: 'warehouse', p: '1234', label: 'انباردار' },
                  ].map(a => (
                    <button key={a.u} onClick={() => quickFill(a.u, a.p)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all text-right">
                      <div>
                        <div className="text-xs font-bold text-[#0b1f4b]">{a.label}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{a.u} / {a.p}</div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-blue-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">{a.u[0].toUpperCase()}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* footer */}
          <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>نسخه ۱.۰.۰ • SQLite • اجرای محلی و آفلاین</span>
            <span className="font-bold text-slate-500">طراح: <span className="text-orange-500">سمیرا سرمد</span></span>
          </div>
        </div>
      </div>

      <style>{`@keyframes shake {0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
    </div>
  );
}
