function TimerSettings({ workDuration, breakDuration, onWorkDurationChange, onBreakDurationChange, isRunning }) {

    return (
        <div>
            <input 
            type="number"
            value={workDuration}
            onChange={onWorkDurationChange}
            disabled={isRunning}
            />
            <input 
            type="number"
            value={breakDuration}
            onChange={onBreakDurationChange}
            disabled={isRunning}
            />
        </div>
    )
}

export default TimerSettings;