export default function Reframed() {
	return (
		<div className="flex flex-col">
			<h1>How can you reframe this thought?</h1>
			<input
				type="text"
				id="evidence"
				name="evidence"
				required
				placeholder="Enter your evidence here"
			/>
		</div>
	);
}
