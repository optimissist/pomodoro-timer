import {useState, useEffect, useRef, useCallback} from "react";
import {useTheme} from "./ThemeContext";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import Switch from "./Switch";
import SessionTracker from "./SessionTracker";
import TimerSettings from "./TimerSettings";

const getDailySessions = () => {
    const saved = localStorage.getItem("dailySessions");
    if (!saved) return 0;
    const { count, date } = JSON.parse(saved);
    if (date !== new Date().toLocaleDateString()) {
        localStorage.removeItem("dailySessions");
        return 0;
    }
    return count;
};

function PomodoroApp() {
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [seconds, setSeconds] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("work");
    const [sessions, setSessions] = useState(() => Number(localStorage.getItem("sessions")) || 0);
    const [dailySessions, setDailySessions] = useState(getDailySessions);

    const intervalRef = useRef(null);

    const {theme} = useTheme();

    const switchMode = useCallback(() => {
     const nextMode = mode === "work" ? "break" : "work";
     setMode(nextMode);
     setSeconds(nextMode === "work" ? workDuration * 60 : breakDuration * 60);
     if (mode === "work") {
        setSessions(sessions + 1);
    setDailySessions(dailySessions + 1);
     }

    }, [mode, sessions, workDuration, breakDuration]);
    
    const start = useCallback(() => {
        setIsRunning(true);
       intervalRef.current = setInterval(() => setSeconds(t => t - 1), 1000);
    }, []);

    const pause = useCallback(() => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    }, []);

  const skip = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    switchMode();
}, [switchMode]);

    const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(mode === "work" ? workDuration * 60 : breakDuration * 60);
}, [mode, workDuration, breakDuration]);


    useEffect(() => localStorage.setItem("sessions", sessions), [sessions])
    
    useEffect(() => {
    if (isRunning && seconds > 0) {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }
}, [isRunning, seconds]);
    
useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#242424" : "#ffffff";
}, [theme]);

    return (
        <div className={theme}>
            <h1>Pomodoro Timer</h1>
            <p><Switch />Toggle Dark Mode or Light Mode</p>
            <TimerSettings 
            workDuration={workDuration}
            breakDuration={breakDuration}
            onWorkDurationChange={e => setWorkDuration(e.target.value)}
            onBreakDurationChange={e => setBreakDuration(e.target.value)}
            isRunning={isRunning}/>
            <TimerDisplay 
            seconds={seconds}
            mode={mode} />
            <TimerControls 
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onSkip={skip} />
            <SessionTracker 
            sessions={sessions} />
        </div>
    )
}

export default PomodoroApp;