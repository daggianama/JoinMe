

export default function Profile({ friends, userName}) {



	return (
        <div>
            <h1>Hello {userName}</h1>
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
