

export default function Profile({ friends}) {



	return (
        <div>
            <h1>Profile</h1>
            <div className="div user-friends">
                <h3>Friends</h3>
                <ul>
                    {friends.map((f, i) => (
                        <li key={i}>
                            {f.firstName} {f.lastName}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
    
}
