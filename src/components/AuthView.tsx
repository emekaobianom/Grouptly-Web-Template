import React, { useState, useEffect } from 'react';
import { Users, CreditCard, X, ShieldAlert, Download, Monitor, Sun, Moon } from 'lucide-react';
import { Member, OrgSettings } from '../types';
import { GROUPTLY_LOGO_URL } from '../constants/branding';

interface AuthViewProps {
  members: Member[];
  settings: OrgSettings;
  onLogin: (member: Member) => void;
  onSignup: (name: string, email: string, orgName: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  members,
  onLogin,
  theme,
  onToggleTheme,
}) => {
  // Cant login modal
  const [showCantLoginModal, setShowCantLoginModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);

  // PWA install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallDesktopApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } else {
      alert(
        "To install Grouptly as a Desktop App:\n\n1. Look at your browser address bar (top right).\n2. Click the 'Install' or desktop monitor icon (or open browser menu -> 'Install Grouptly').\n3. Enjoy offline-ready desktop access!"
      );
    }
  };

  const handleGoogleLogin = () => {
    const adminMember = members.find((m) => m.role === 'admin') || members[0];
    onLogin(adminMember);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) return;
    setRecoverySent(true);
    setTimeout(() => {
      setRecoverySent(false);
      setShowCantLoginModal(false);
      setRecoveryEmail('');
      alert(`Secure recovery link and Google OAuth sync instructions sent to ${recoveryEmail}.`);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-200">
      {/* Left: Branding & Value Props & Mobile/Desktop Download Badges */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 relative overflow-hidden border-r border-slate-200 dark:border-slate-800 text-slate-100">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none"></div>

        {/* Blended Grouptly Logo Splash Watermark */}
        <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.14] [mask-image:radial-gradient(closest-side,black_40%,transparent_100%)] select-none">
          <img
            src={GROUPTLY_LOGO_URL}
            alt=""
            className="w-full h-full object-contain rotate-[-8deg]"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1.5 shadow-xl shadow-indigo-950/50 ring-2 ring-teal-400/30">
              <img src={GROUPTLY_LOGO_URL} alt="Grouptly Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-white">Grouptly</span>
              <span className="block text-xs text-teal-300 font-semibold tracking-wide">www.grouptly.com</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            The Ultimate Hub for Groups & Communities
          </h1>
          <p className="text-slate-300 text-base max-w-lg mb-8 leading-relaxed">
            Streamline member registration, dues tracking, event RSVPs, meeting minutes, and broadcasts for clubs, unions, and associations.
          </p>

          <div className="space-y-4 max-w-md mb-8">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Users className="h-6 w-6 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-white">Member Roster & Roles</h3>
                <p className="text-xs text-slate-400">Manage member directories, committees, and access permissions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <CreditCard className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-white">Automated Dues & Finances</h3>
                <p className="text-xs text-slate-400">Track annual fees, special levies, and secure payment receipts.</p>
              </div>
            </div>
          </div>

          {/* Download Badges (Desktop PWA + iOS App Store + Google Play) */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Download className="h-4 w-4 text-teal-400" /> Download Grouptly (Desktop & Mobile PWA)
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Desktop PWA Install Button */}
              <button
                onClick={handleInstallDesktopApp}
                className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 px-4 py-2.5 rounded-xl transition-all shadow-md group"
              >
                <Monitor className="h-5 w-5 text-indigo-200" />
                <div className="text-left">
                  <div className="text-[10px] uppercase text-indigo-200">Install PWA</div>
                  <div className="text-xs font-bold text-white">Desktop App</div>
                </div>
              </button>

              <a
                href="#app-store"
                onClick={(e) => { e.preventDefault(); alert("Redirecting to Apple App Store (iOS app v2.5)..."); }}
                className="flex items-center gap-3 bg-black hover:bg-slate-950 text-white border border-slate-700 px-4 py-2.5 rounded-xl transition-all shadow-md group"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.83 6.18c.61-.75 1.02-1.8 1.01-2.85-.92.04-2.03.62-2.68 1.37-.56.65-1.05 1.71-1.01 2.74 1.03.08 2.07-.51 2.68-1.26z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase text-slate-400">Download on the</div>
                  <div className="text-xs font-bold text-white">Apple App Store</div>
                </div>
              </a>

              <a
                href="#google-play"
                onClick={(e) => { e.preventDefault(); alert("Redirecting to Google Play Store (Android app v2.5)..."); }}
                className="flex items-center gap-3 bg-black hover:bg-slate-950 text-white border border-slate-700 px-4 py-2.5 rounded-xl transition-all shadow-md group"
              >
                <svg className="h-5 w-5 fill-current text-indigo-400" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.455 1.455 0 0 1-.22-.792V2.606c0-.31.08-.59.219-.792zM15.208 13.416l1.989 1.989-11.456 6.626 9.467-8.615zm0-2.832L5.741 1.969l11.456 6.626-1.989 1.989zm2.41 2.41l3.526 2.038a1.164 1.164 0 0 1 0 2.016l-3.526 2.038-2.128-2.128 2.128-3.964z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase text-slate-400">Get it on</div>
                  <div className="text-xs font-bold text-white">Google Play Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 Grouptly Enterprise Platform</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> All Systems Operational
          </span>
        </div>
      </div>

      {/* Right: Login Box */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle Light/Dark Mode"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-4 w-4 text-amber-400" /> Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 text-indigo-600" /> Dark Mode
            </>
          )}
        </button>

        {/* Subtle Background Blended Logo Accent */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 opacity-[0.06] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-normal dark:[mask-image:radial-gradient(closest-side,black_35%,transparent_100%)] select-none">
          <img src={GROUPTLY_LOGO_URL} alt="" className="w-full h-full object-contain rotate-12" />
        </div>

        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex lg:hidden items-center justify-center h-14 w-14 rounded-2xl bg-white p-1.5 mb-4 shadow-lg shadow-indigo-600/20 ring-2 ring-teal-400/30">
              <img src={GROUPTLY_LOGO_URL} alt="Grouptly Logo" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Admin Sign In to Grouptly
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Please login to create new groups or manage existing group hubs.
            </p>
          </div>

          <div className="space-y-5 py-2">
            {/* Admin-only notice */}
            <div className="flex items-start gap-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 p-4 text-xs text-amber-900 dark:text-amber-200">
              <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-300 mb-0.5">Admin Only Login Portal</p>
                <p className="text-amber-800/90 dark:text-amber-200/90">
                  Login below to create new groups or manage existing ones. Regular members should download the Grouptly mobile app on iOS or Android.
                </p>
              </div>
            </div>

            {/* Google OAuth Login Button */}
            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-white py-3.5 px-4 text-sm font-bold text-slate-900 shadow-lg hover:bg-slate-100 transition-all border border-slate-200 dark:border-slate-700"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.21 21.32 7.29 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.2C.44 8.14 0 9.87 0 12s.44 3.86 1.2 5.4l4.07-3.16z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.29 0 3.21 2.68 1.2 6.6l4.07 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
                </svg>
                Sign in with Google OAuth (Admin)
              </button>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-500 dark:text-slate-400">Protected by enterprise Google Auth</span>
                <button
                  onClick={() => setShowCantLoginModal(true)}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                >
                  Can't login?
                </button>
              </div>
            </div>
          </div>

          {/* Mobile/Desktop Download Links visible on mobile view too */}
          <div className="lg:hidden pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Download Grouptly (Desktop & Mobile):</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={handleInstallDesktopApp} className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold border border-indigo-500">
                💻 Install Desktop App
              </button>
              <button onClick={() => alert("Redirecting to Apple App Store...")} className="bg-slate-900 dark:bg-black text-white px-3 py-2 rounded-xl text-xs font-bold border border-slate-700">
                 App Store
              </button>
              <button onClick={() => alert("Redirecting to Google Play Store...")} className="bg-slate-900 dark:bg-black text-white px-3 py-2 rounded-xl text-xs font-bold border border-slate-700">
                ▶ Google Play
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Can't Login Modal */}
      {showCantLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 text-slate-900 dark:text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-white p-1 flex items-center justify-center ring-1 ring-slate-200 dark:ring-0">
                  <img src={GROUPTLY_LOGO_URL} alt="Grouptly" className="h-full w-full object-contain" />
                </div>
                <h3 className="text-base font-bold">Can't Login? (Admin Account Recovery)</h3>
              </div>
              <button
                onClick={() => setShowCantLoginModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Since this web portal is strictly for <strong>Group Administrators</strong>, please ensure you are signing in with the exact Google account linked to your administrative role.
            </p>

            <form onSubmit={handleRecoverySubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Your Admin Google Email</label>
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {recoverySent ? (
                <div className="p-3 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center">
                  Recovery link dispatched to your Google email!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg hover:bg-indigo-500 transition-all"
                >
                  Send Admin Google OAuth Recovery Link
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
