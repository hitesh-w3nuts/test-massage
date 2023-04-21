export default function ErrorMessage(props) {
	return (
		<>
			{props.message && (
				<div className="error-message">
					<h6>{props.message}</h6>
				</div>
			)}
		</>
	);
}
