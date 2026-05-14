import { Link } from 'react-router';

// export ReturnToHome component
export default function ReturnToHome() {

	return (
		<div className="return-btn-wrap">
			<p><Link className="text-btn" to="/">Return to homepage</Link></p>
		</div>
	);
}