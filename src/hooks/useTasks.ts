import { useState, useEffect } from 'react';

export interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string;
}

const STORAGE_KEY = 'admin_tasks';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const createTask = (title: string, description: string, assignedTo: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            assignedTo,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
        return newTask;
    };

    const toggleTaskComplete = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                        completedAt: !task.completed ? new Date().toISOString() : undefined,
                    }
                    : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const getTasksByUser = (email: string) => {
        return tasks.filter((task) => task.assignedTo === email);
    };

    return {
        tasks,
        createTask,
        toggleTaskComplete,
        deleteTask,
        getTasksByUser,
    };
};
