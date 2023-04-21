export default function SuccessMessage(props) {
	return (
		<>
			{props.message && (
				<div className="success-message">
					<h6>{props.message}</h6>
				</div>
			)}
		</>
	);
}
