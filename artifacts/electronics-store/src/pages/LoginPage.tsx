import React, { useState } from 'react';
import { Mail, Lock, User, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo Mode",
      description: "Authentication is mocked for this demo app.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded bg-amber-500 flex items-center justify-center font-bold text-slate-900 text-2xl tracking-tighter shadow-md">
            M
          </div>
        </Link>
        <h2 className="text-3xl font-bold text-slate-900">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {isLogin ? 'Enter your details to access your account' : 'Join thousands of Indian makers'}
        </p>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button 
            className={`flex-1 py-4 text-sm font-bold transition-colors ${isLogin ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-700 bg-slate-50'}`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-bold transition-colors ${!isLogin ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-700 bg-slate-50'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    required 
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm outline-none" 
                    placeholder="Rahul Sharma" 
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="email" 
                  required 
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm outline-none" 
                  placeholder="you@example.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  required 
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm outline-none" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    type="password" 
                    required 
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm outline-none" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            )}

            {isLogin ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-slate-300 rounded cursor-pointer accent-amber-500" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input required id="terms" type="checkbox" className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-slate-300 rounded cursor-pointer accent-amber-500" />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="terms" className="font-medium text-slate-600 cursor-pointer">
                    I agree to the <a href="#" className="text-amber-600 hover:underline">Terms of Service</a> and <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={handleSubmit} className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="sr-only">Sign in with Google</span>
              </button>

              <button onClick={handleSubmit} className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Github className="w-5 h-5 text-slate-900" />
                <span className="sr-only">Sign in with GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}