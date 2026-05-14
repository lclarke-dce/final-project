import ReturnToHome from './ReturnToHome';

// export My404 component - used if a user tries to access a route that does not exist
export default function My404() {

	return (
		<div className="text-center">
			<h2>This page cannot be found.</h2>

			<ReturnToHome />
		</div>
	);
}