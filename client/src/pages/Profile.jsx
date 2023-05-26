import "./Profile.css";


export default function Profile({ userFriends}) {



	return (
        <div>
            <h1>Profile</h1>
            <div className="div user-friends">
                <h3>Friends</h3>
                <ul>
                    {userFriends.map((f, i) => (
                        <li key={i}>
                            {f.firstName} {f.lastName}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
    
}
