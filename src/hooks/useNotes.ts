import { useState, useEffect } from 'react';

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const STORAGE_KEY = 'admin_notes';

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    const addNote = (title: string, content: string) => {
        const newNote: Note = {
            id: Date.now().toString(),
            title,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setNotes((prev) => [newNote, ...prev]);
        return newNote;
    };

    const updateNote = (id: string, title: string, content: string) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id
                    ? { ...note, title, content, updatedAt: new Date().toISOString() }
                    : note
            )
        );
    };

    const deleteNote = (id: string) => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
    };

    return {
        notes,
        addNote,
        updateNote,
        deleteNote,
    };
};
