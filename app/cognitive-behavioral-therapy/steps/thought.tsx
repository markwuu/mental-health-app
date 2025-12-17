export default function Thought() {
	return (
		<div className="flex flex-col">
			<h1>Add Your Thought</h1>
			<input
				type="text"
				id="thought"
				name="thought"
				required
				placeholder="Enter your thought here"
			/>
		</div>
	);
}
