function SessionTracker({sessions, dailySessions}) {
    function getMotivationalMessage(count) {
    if (count === 0) return "Let's get started!";
    if (count < 4) return "Great work, keep going!";
    return "You're on fire! 🔥";
}

    return (
        <div>
            <p>Sessions Completed Today: {dailySessions}</p>
            <p>{getMotivationalMessage(dailySessions)}</p>
            <p>Total Sessions Completed: {sessions}</p>
            <p>{getMotivationalMessage(sessions) }</p>
        </div>
    )
}

export default SessionTracker;