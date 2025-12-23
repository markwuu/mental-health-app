export default function NavigateButtons({
	changePage,
}: {
	changePage: (direction: 'next' | 'back') => void;
}) {
	return (
		<div className="flex flex-row gap-7 justify-center">
			<button
				className="px-7 py-1.5 my-1 border-3 border-gray-300 rounded"
				onClick={() => changePage('back')}
			>
				Back
			</button>
			<button
				className="px-7 py-1.5 my-1 border-3 border-gray-300 rounded"
				onClick={() => changePage('next')}
			>
				Next
			</button>
		</div>
	);
}
