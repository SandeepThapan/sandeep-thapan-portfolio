import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAttendance } from '@/hooks/useAttendance';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import {
    LayoutDashboard,
    LogOut,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Calendar,
    Timer,
    FileText,
    CheckSquare
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const {
        isCheckedIn,
        checkInTime,
        checkIn,
        checkOut,
        getAttendanceHistory,
        calculateHoursWorked,
        formatElapsedTime,
    } = useAttendance();
    const { tasks, toggleTaskComplete, getTasksByUser } = useTasks();

    const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
    const [dailyReport, setDailyReport] = useState('');
    const [wordCount, setWordCount] = useState(0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCheckIn = () => {
        checkIn();
        toast({
            title: "Checked In Successfully! ✅",
            description: `Started work at ${new Date().toLocaleTimeString()}`,
        });
    };

    const handleCheckOutClick = () => {
        setShowCheckoutDialog(true);
    };

    const handleReportChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setDailyReport(text);
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
    };

    const handleCheckOutSubmit = () => {
        if (wordCount < 100) {
            toast({
                title: "Report Too Short",
                description: `Please write at least 100 words. Current: ${wordCount} words`,
                variant: "destructive",
            });
            return;
        }

        if (wordCount > 800) {
            toast({
                title: "Report Too Long",
                description: `Please keep your report under 800 words. Current: ${wordCount} words`,
                variant: "destructive",
            });
            return;
        }

        const hoursWorked = calculateHoursWorked();
        const record = checkOut(dailyReport);

        if (hoursWorked < 6) {
            toast({
                title: "⚠️ Warning: Incomplete Hours",
                description: `You worked ${hoursWorked.toFixed(2)} hours. Minimum requirement is 6 hours.`,
                variant: "destructive",
            });
        } else {
            toast({
                title: "🎉 Great Job!",
                description: `Excellent work! You completed ${hoursWorked.toFixed(2)} hours today. Keep it up!`,
            });
        }

        setShowCheckoutDialog(false);
        setDailyReport('');
        setWordCount(0);
    };

    const handleToggleTask = (taskId: string) => {
        toggleTaskComplete(taskId);
        toast({
            title: "Task Updated",
            description: "Task status has been updated",
        });
    };

    const hoursWorked = calculateHoursWorked();
    const history = getAttendanceHistory();
    const myTasks = user ? getTasksByUser(user.email) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Daily Task Tracker
                                </h1>
                                <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status Card */}
                <Card className="mb-8 border-0 shadow-xl">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <Clock className="w-6 h-6 text-purple-600" />
                                    Today's Attendance
                                </CardTitle>
                                <CardDescription className="text-base mt-1">
                                    {new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </CardDescription>
                            </div>
                            <div className={`px-4 py-2 rounded-full ${isCheckedIn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                <span className="font-semibold">
                                    {isCheckedIn ? '🟢 Checked In' : '⚪ Not Checked In'}
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {!isCheckedIn ? (
                            <div className="text-center py-8">
                                <Timer className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                                <p className="text-gray-600 mb-6">Ready to start your workday?</p>
                                <Button
                                    onClick={handleCheckIn}
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-6 text-lg"
                                >
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    Check In Now
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Elapsed Time Display */}
                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 text-center">
                                    <p className="text-sm opacity-90 mb-2">Time Worked Today</p>
                                    <p className="text-5xl font-bold font-mono">{formatElapsedTime()}</p>
                                    <p className="text-sm opacity-90 mt-2">{hoursWorked.toFixed(2)} hours</p>
                                </div>

                                {/* Check-in Time */}
                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Checked in at</p>
                                        <p className="font-semibold text-gray-900">
                                            {checkInTime && new Date(checkInTime).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Warning/Success Message */}
                                {hoursWorked > 0 && (
                                    <Alert className={hoursWorked >= 6 ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}>
                                        {hoursWorked >= 6 ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                                        )}
                                        <AlertDescription className={hoursWorked >= 6 ? 'text-green-800' : 'text-orange-800'}>
                                            {hoursWorked >= 6
                                                ? `🎉 Great! You've completed ${hoursWorked.toFixed(2)} hours. Minimum requirement met!`
                                                : `⏰ ${(6 - hoursWorked).toFixed(2)} hours remaining to meet the 6-hour minimum requirement.`
                                            }
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Check Out Button */}
                                <Button
                                    onClick={handleCheckOutClick}
                                    size="lg"
                                    variant="outline"
                                    className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-medium py-6 text-lg transition-all duration-200"
                                >
                                    <FileText className="w-5 h-5 mr-2" />
                                    Check Out & Submit Report
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Assigned Tasks */}
                {myTasks.length > 0 && (
                    <Card className="mb-8 border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckSquare className="w-5 h-5 text-purple-600" />
                                My Tasks
                            </CardTitle>
                            <CardDescription>Tasks assigned to you by admin</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {myTasks.map((task) => (
                                    <div key={task.id} className={`p-4 rounded-lg border-2 transition-all ${task.completed
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-white border-purple-200 hover:border-purple-300'
                                        }`}>
                                        <div className="flex items-start gap-3">
                                            <button
                                                onClick={() => handleToggleTask(task.id)}
                                                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${task.completed
                                                        ? 'bg-green-500 border-green-500'
                                                        : 'border-gray-300 hover:border-purple-500'
                                                    }`}
                                            >
                                                {task.completed && (
                                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                                )}
                                            </button>
                                            <div className="flex-1">
                                                <h3 className={`font-semibold mb-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                                    {task.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                                <p className="text-xs text-gray-500">
                                                    Created: {new Date(task.createdAt).toLocaleDateString()}
                                                    {task.completedAt && ` • Completed: ${new Date(task.completedAt).toLocaleDateString()}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Work History */}
                {history.length > 0 && (
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                Work History
                            </CardTitle>
                            <CardDescription>Your previous check-in and check-out records</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {history.slice(0, 7).map((record, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-600" />
                                                <span className="font-semibold text-gray-900">{record.date}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${record.hoursWorked && record.hoursWorked >= 6
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {record.hoursWorked?.toFixed(2)} hours
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                                            <div>
                                                <span className="font-medium">In:</span> {new Date(record.checkInTime).toLocaleTimeString()}
                                            </div>
                                            <div>
                                                <span className="font-medium">Out:</span> {record.checkOutTime && new Date(record.checkOutTime).toLocaleTimeString()}
                                            </div>
                                        </div>
                                        {record.dailyReport && (
                                            <details className="mt-2">
                                                <summary className="cursor-pointer text-sm text-purple-600 hover:text-purple-700 font-medium">
                                                    View Daily Report
                                                </summary>
                                                <p className="mt-2 text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                                                    {record.dailyReport}
                                                </p>
                                            </details>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>

            {/* Checkout Dialog */}
            <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Daily Work Report</DialogTitle>
                        <DialogDescription>
                            Please write a summary of your work today (100-800 words)
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Textarea
                                placeholder="Describe what you accomplished today, tasks completed, challenges faced, and any important updates..."
                                value={dailyReport}
                                onChange={handleReportChange}
                                className="min-h-[200px] resize-none"
                            />
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-sm text-gray-600">
                                    Word count: <span className={`font-semibold ${wordCount < 100 ? 'text-red-600' :
                                        wordCount > 800 ? 'text-red-600' :
                                            'text-green-600'
                                        }`}>{wordCount}</span> / 100-800 words
                                </p>
                                {wordCount < 100 && wordCount > 0 && (
                                    <p className="text-sm text-red-600">Need {100 - wordCount} more words</p>
                                )}
                                {wordCount > 800 && (
                                    <p className="text-sm text-red-600">{wordCount - 800} words over limit</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowCheckoutDialog(false);
                                setDailyReport('');
                                setWordCount(0);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCheckOutSubmit}
                            disabled={wordCount < 100 || wordCount > 800}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                            Submit & Check Out
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Dashboard;
