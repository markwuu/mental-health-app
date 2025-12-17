export default function Evidence() {
	return (
		<div className="flex flex-col">
			<h1>Is there any evidence that challenges this?</h1>
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
