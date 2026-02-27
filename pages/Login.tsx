import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { StarBackground } from '@/components/onboarding/StarBackground';
import { ThemeToggle } from '@/components/onboarding/ThemeToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import baeblesLogo from '@/assets/baebles-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [forgotMode, setForgotMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (forgotMode) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setIsLoading(false);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Check your email for a password reset link!');
        setForgotMode(false);
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back to Baebles!');
      navigate('/feed');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <StarBackground />
      
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <img 
            src={baeblesLogo} 
            alt="Baebles" 
            className="w-32 h-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="font-body text-muted-foreground">
            Your magical fantasy reader community
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm"
        >
          <div className="baebles-card">
            <div className="corner-br" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>

              {!forgotMode && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-muted/50 border-border focus:border-primary pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setForgotMode(true)}
                      className="text-sm text-primary/80 hover:text-primary transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}

              {forgotMode && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setForgotMode(false)}
                    className="text-sm text-primary/80 hover:text-primary transition-colors"
                  >
                    ← Back to login
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="baebles-btn-primary w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      ✨
                    </motion.span>
                    {forgotMode ? 'Sending reset link...' : 'Entering the realm...'}
                  </span>
                ) : (
                  forgotMode ? 'Send Reset Link' : 'Log In'
                )}
              </button>
            </form>

            <div className="baebles-divider mt-6">
              <span>✦</span>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              New to Baebles?{' '}
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
