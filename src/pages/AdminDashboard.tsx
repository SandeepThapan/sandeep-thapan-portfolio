import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAttendance, AttendanceRecord } from '@/hooks/useAttendance';
import { useNotes, Note } from '@/hooks/useNotes';
import { useTasks, Task } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
    LayoutDashboard,
    LogOut,
    Users,
    Clock,
    FileText,
    StickyNote,
    CheckSquare,
    Plus,
    Trash2,
    Edit,
    Calendar,
    TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { getAttendanceHistory } = useAttendance();
    const { notes, addNote, updateNote, deleteNote } = useNotes();
    const { tasks, createTask, deleteTask } = useTasks();

    // Dialog states
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    // Form states
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddNote = () => {
        setEditingNote(null);
        setNoteTitle('');
        setNoteContent('');
        setShowNoteDialog(true);
    };

    const handleEditNote = (note: Note) => {
        setEditingNote(note);
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setShowNoteDialog(true);
    };

    const handleSaveNote = () => {
        if (!noteTitle.trim() || !noteContent.trim()) {
            toast({
                title: "Missing Information",
                description: "Please provide both title and content",
                variant: "destructive",
            });
            return;
        }

        if (editingNote) {
            updateNote(editingNote.id, noteTitle, noteContent);
            toast({
                title: "Note Updated",
                description: "Your note has been updated successfully",
            });
        } else {
            addNote(noteTitle, noteContent);
            toast({
                title: "Note Created",
                description: "Your note has been created successfully",
            });
        }

        setShowNoteDialog(false);
        setNoteTitle('');
        setNoteContent('');
        setEditingNote(null);
    };

    const handleDeleteNote = (id: string) => {
        deleteNote(id);
        toast({
            title: "Note Deleted",
            description: "The note has been removed",
        });
    };

    const handleCreateTask = () => {
        if (!taskTitle.trim() || !taskDescription.trim()) {
            toast({
                title: "Missing Information",
                description: "Please provide both title and description",
                variant: "destructive",
            });
            return;
        }

        createTask(taskTitle, taskDescription, 'Anuj@dailytask.com');
        toast({
            title: "Task Created",
            description: "Task has been assigned to Anuj",
        });

        setShowTaskDialog(false);
        setTaskTitle('');
        setTaskDescription('');
    };

    const handleDeleteTask = (id: string) => {
        deleteTask(id);
        toast({
            title: "Task Deleted",
            description: "The task has been removed",
        });
    };

    const attendanceHistory = getAttendanceHistory();
    const totalHours = attendanceHistory.reduce((sum, record) => sum + (record.hoursWorked || 0), 0);
    const avgHours = attendanceHistory.length > 0 ? totalHours / attendanceHistory.length : 0;
    const daysWorked = attendanceHistory.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm text-gray-600">Welcome, {user?.email}</p>
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
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Total Hours</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalHours.toFixed(1)}</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Days Worked</p>
                                    <p className="text-3xl font-bold text-gray-900">{daysWorked}</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <Calendar className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Avg Hours/Day</p>
                                    <p className="text-3xl font-bold text-gray-900">{avgHours.toFixed(1)}</p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="activity" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="activity" className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Activity
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="flex items-center gap-2">
                            <StickyNote className="w-4 h-4" />
                            Notes
                        </TabsTrigger>
                        <TabsTrigger value="tasks" className="flex items-center gap-2">
                            <CheckSquare className="w-4 h-4" />
                            Tasks
                        </TabsTrigger>
                    </TabsList>

                    {/* Activity Tab */}
                    <TabsContent value="activity" className="space-y-4">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    Employee Activity - Anuj
                                </CardTitle>
                                <CardDescription>Check-in/check-out history and daily reports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {attendanceHistory.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">No activity recorded yet</p>
                                ) : (
                                    <div className="space-y-4">
                                        {attendanceHistory.map((record: AttendanceRecord, index: number) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-3">
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
                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                                    <div>
                                                        <span className="font-medium">Check-in:</span> {new Date(record.checkInTime).toLocaleTimeString()}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Check-out:</span> {record.checkOutTime && new Date(record.checkOutTime).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                                {record.dailyReport && (
                                                    <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <FileText className="w-4 h-4 text-blue-600" />
                                                            <span className="font-medium text-sm text-gray-900">Daily Report</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">{record.dailyReport}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notes Tab */}
                    <TabsContent value="notes" className="space-y-4">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <StickyNote className="w-5 h-5 text-blue-600" />
                                            My Notes
                                        </CardTitle>
                                        <CardDescription>Create and manage your notes</CardDescription>
                                    </div>
                                    <Button onClick={handleAddNote} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Note
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {notes.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">No notes yet. Create your first note!</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {notes.map((note) => (
                                            <div key={note.id} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-semibold text-gray-900">{note.title}</h3>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleEditNote(note)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleDeleteNote(note.id)}
                                                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-3">{note.content}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(note.updatedAt).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tasks Tab */}
                    <TabsContent value="tasks" className="space-y-4">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <CheckSquare className="w-5 h-5 text-blue-600" />
                                            Task Management
                                        </CardTitle>
                                        <CardDescription>Create and assign tasks to Anuj</CardDescription>
                                    </div>
                                    <Button onClick={() => setShowTaskDialog(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Task
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {tasks.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">No tasks yet. Create a task for Anuj!</p>
                                ) : (
                                    <div className="space-y-3">
                                        {tasks.map((task: Task) => (
                                            <div key={task.id} className={`p-4 rounded-lg border-2 ${task.completed
                                                    ? 'bg-green-50 border-green-200'
                                                    : 'bg-white border-gray-200'
                                                }`}>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                                                {task.title}
                                                            </h3>
                                                            {task.completed && (
                                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                                                    Completed
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                                            <span>Assigned to: {task.assignedTo}</span>
                                                            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                                                            {task.completedAt && (
                                                                <span>Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleDeleteTask(task.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Note Dialog */}
            <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
                        <DialogDescription>
                            {editingNote ? 'Update your note' : 'Add a new note to your collection'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="note-title">Title</Label>
                            <Input
                                id="note-title"
                                placeholder="Note title"
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="note-content">Content</Label>
                            <Textarea
                                id="note-content"
                                placeholder="Write your note here..."
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                className="min-h-[150px]"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveNote} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                            {editingNote ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Task Dialog */}
            <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>
                            Assign a new task to Anuj
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="task-title">Task Title</Label>
                            <Input
                                id="task-title"
                                placeholder="Enter task title"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="task-description">Description</Label>
                            <Textarea
                                id="task-description"
                                placeholder="Describe the task..."
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className="min-h-[120px]"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowTaskDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateTask} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                            Create Task
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;
