export function MessageList( {toyMessages, onDeleteReview, loggedinUser} ) {
    return(

            <div className="messages-container">
                <h3 className="messages-title">Messages</h3>

                {toyMessages.length === 0 && (
                    <p className="no-messages">No messages yet.</p>
                )}
                <ul className="messages-list">
                        {toyMessages.map(msg => (
                            <li key={msg.id} className="message-item">
                                <div className="message-content">
                                    <span className="message-date">
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </span>
                                    <span>
                                        <strong>{msg.by.fullname}</strong>
                                    </span>
                                    <p className="message-text">{msg.txt}</p>
                                </div>

                                {loggedinUser && (loggedinUser.isAdmin || loggedinUser._id === msg.by._id) && (
                                    <button
                                        className="delete-btn"
                                        onClick={() => onDeleteReview(msg)}>Delete</button>
                                )}
                            </li>
                        ))}
                </ul>



        </div>
        
    )
}

