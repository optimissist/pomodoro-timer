function TimerControls({isRunning, onStart, onPause, onReset, onSkip}) {
    return (
        <div>
             <button type="button" onClick={onStart} disabled={isRunning}>Start</button>
             <button type="button" onClick={onPause} disabled={!isRunning}>Pause</button>
             <button type="button" onClick={onReset}>Reset</button>
             <button type="button" onClick={onSkip}>Skip</button>
        </div>
    )
}

export default TimerControls;