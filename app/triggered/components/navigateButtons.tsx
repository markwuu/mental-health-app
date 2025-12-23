export default function NavigateButtons({
	changePage,
}: {
	changePage: (direction: 'next' | 'back') => void;
}) {
	return (
		<div className="flex flex-row gap-3">
			<button
				className="px-4 py-2 my-2 border-2 border-gray-300 rounded"
				onClick={() => changePage('back')}
			>
				Back
			</button>
			<button
				className="px-4 py-2 my-2 border-2 border-gray-300 rounded"
				onClick={() => changePage('next')}
			>
				Next
			</button>
		</div>
	);
}
