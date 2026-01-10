import { useState, useEffect } from 'react';

export interface AttendanceRecord {
    date: string;
    checkInTime: string;
    checkOutTime?: string;
    hoursWorked?: number;
    dailyReport?: string;
}

interface AttendanceState {
    isCheckedIn: boolean;
    checkInTime: string | null;
    currentDate: string;
}

const STORAGE_KEY = 'attendance_records';
const STATE_KEY = 'attendance_state';

export const useAttendance = () => {
    const [state, setState] = useState<AttendanceState>(() => {
        const saved = localStorage.getItem(STATE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            const today = new Date().toDateString();
            // Reset if it's a new day
            if (parsed.currentDate !== today) {
                return {
                    isCheckedIn: false,
                    checkInTime: null,
                    currentDate: today,
                };
            }
            return parsed;
        }
        return {
            isCheckedIn: false,
            checkInTime: null,
            currentDate: new Date().toDateString(),
        };
    });

    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    }, [state]);

    // Update elapsed time every second when checked in
    useEffect(() => {
        if (state.isCheckedIn && state.checkInTime) {
            const interval = setInterval(() => {
                const checkIn = new Date(state.checkInTime!);
                const now = new Date();
                const seconds = Math.floor((now.getTime() - checkIn.getTime()) / 1000);
                setElapsedSeconds(seconds);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [state.isCheckedIn, state.checkInTime]);

    const checkIn = () => {
        const now = new Date();
        setState({
            isCheckedIn: true,
            checkInTime: now.toISOString(),
            currentDate: now.toDateString(),
        });
    };

    const checkOut = (dailyReport: string) => {
        if (!state.checkInTime) return;

        const checkInTime = new Date(state.checkInTime);
        const checkOutTime = new Date();
        const hoursWorked = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

        const record: AttendanceRecord = {
            date: state.currentDate,
            checkInTime: state.checkInTime,
            checkOutTime: checkOutTime.toISOString(),
            hoursWorked: parseFloat(hoursWorked.toFixed(2)),
            dailyReport,
        };

        // Save to records
        const records = getAttendanceHistory();
        records.unshift(record);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

        // Reset state
        setState({
            isCheckedIn: false,
            checkInTime: null,
            currentDate: new Date().toDateString(),
        });
        setElapsedSeconds(0);

        return record;
    };

    const getAttendanceHistory = (): AttendanceRecord[] => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    };

    const calculateHoursWorked = (): number => {
        if (!state.checkInTime) return 0;
        const checkIn = new Date(state.checkInTime);
        const now = new Date();
        return (now.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
    };

    const formatElapsedTime = (): string => {
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return {
        isCheckedIn: state.isCheckedIn,
        checkInTime: state.checkInTime,
        checkIn,
        checkOut,
        getAttendanceHistory,
        calculateHoursWorked,
        elapsedSeconds,
        formatElapsedTime,
    };
};
