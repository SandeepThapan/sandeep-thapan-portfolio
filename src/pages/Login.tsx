import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate a brief loading state for better UX
        setTimeout(() => {
            const success = login(email, password);

            if (success) {
                // Get user role from auth context
                const storedUser = localStorage.getItem('authUser');
                const userData = storedUser ? JSON.parse(storedUser) : null;

                toast({
                    title: "Login Successful",
                    description: "Welcome to your dashboard!",
                });

                // Redirect based on role
                if (userData?.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                toast({
                    title: "Login Failed",
                    description: "Invalid email or password. Please try again.",
                    variant: "destructive",
                });
            }

            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/95 shadow-2xl border-0">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-base">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</p>
                        <p className="text-xs text-blue-600">Email: Anuj@dailytask.com</p>
                        <p className="text-xs text-blue-600">Password: Goaljob</p>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
