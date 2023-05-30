import { useState } from "react";

export default function Profile({ friends, userName, events }) {
	const [friendsSelected, setFriendsSelected] = useState(false);

	return (
		<div className="profile">
			<h1>Hello {userName}!</h1>
			<div className="profile-info">
				<div className="data-numbers">
					<div className="friends-nr">
						<p>{friends.length}</p>
						<h3 onClick={() => setFriendsSelected(!friendsSelected)}>
							Friends
						</h3>
						{friendsSelected && (
							<div className="friends-list">
								{friends.map((f, i) => (
									<p key={i}>
										{f.firstName} {f.lastName}
									</p>
								))}
							</div>
						)}
					</div>

					<div className="events-nr">
						<p>{events.length}</p>
						<h3>Events</h3>
					</div>
				</div>

				<div className="config-list">
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
				</div>
			</div>

			<button>Log out</button>
		</div>
	);
}
