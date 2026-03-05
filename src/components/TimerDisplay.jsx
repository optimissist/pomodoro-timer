function TimerDisplay({seconds, mode}) {
    const totalMinutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const totalSeconds = String(seconds % 60).padStart(2, "0");
    return (
        <div>
            <h2>{mode === "work" ? "Work Session!" : "Break Time!"}</h2>
            <h1>{totalMinutes}:{totalSeconds}</h1>
        </div>
    )
}

export default TimerDisplay;