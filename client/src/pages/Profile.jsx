

export default function Profile({ friends, userName}) {



	return (
        <div className="profile">
            <h1>Hello {userName}!</h1>
            
                <div className="data-numbers"></div>
                <h3>Friends</h3>
                <ul>
                    {friends.map((f, i) => (
                        <li key={i}>
                            {f.firstName} {f.lastName}
                        </li>
                    ))}
            </ul>
            <div className="settings">
            <h3>Settings</h3>
            <p>Account</p>
            <p>Notifications</p>
            <p>Privacy</p>
            <p>Language</p>
            </div>

            <div className="support">
            <h3>Support</h3>
            <p>Help Center</p>
                <p>Contact Us</p>
            </div>

            
            <button>Log out</button>

            </div>
        
    );
    
}
