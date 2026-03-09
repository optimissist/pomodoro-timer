function SessionTracker({sessions}) {
    function session() {
        let sessionMessage;
        if (sessions === 0) {
            sessionMessage = "Let's get started!"
        } else if (sessions > 0 && sessions < 4) {
            sessionMessage = "Great work, keep going!"
        } else {
            sessionMessage = "You're on fire! 🔥"
        }
        return sessionMessage
    }

    return (
        <div>
            <p>Sessions Completed: {sessions}</p>
            <p>{session()}</p>
        </div>
    )
}

export default SessionTracker;