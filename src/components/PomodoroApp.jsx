import {useState, useEffect, useRef, useContext} from "react";
import TimerDisplay from "./TimerDisplay";
import TimerCOntrols from "./TimerControls";

function PomodoroApp() {
    const [seconds, setSeconds] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("work");
    const [session, setSessions] = useState(0);

    const intervalRef = useRef(null);
    
    const start = useCallback(() => {
        setIsRunning(true);
       intervalRef.current = setInterval(() => setSeconds(t => t - 1), 1000);
    }, []);

    const pause = useCallback(() => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    }, []);

    const skip = useCallback(() => {

    }, []);

    const reset = useCallback(() => {
        setIsRunning(false);
        setSeconds(mode === "work" ? 25 * 60 : 5 * 60);
        setMode("work");
        setSessions(0);
        clearInterval(intervalRef.current);
    }, [mode]);

    return (
        <div>

        </div>
    )


// A switchMode function wrapped in useCallback that toggles between "work" and "break", updates seconds, and increments sessions if switching away from "work"
// A start function wrapped in useCallback that starts the interval
// A pause function wrapped in useCallback that clears the interval
// A reset function wrapped in useCallback that resets seconds to the current mode's duration and stops the timer
// A skip function wrapped in useCallback that calls switchMode
// A useEffect that ticks down seconds and calls switchMode when it hits 0
export default PomodoroApp;