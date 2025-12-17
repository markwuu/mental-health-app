export default function NavigateButtons({
	changePage,
}: {
	changePage: (direction: 'next' | 'back') => void;
}) {
	return (
		<div className="flex flex-row gap-3">
			<button onClick={() => changePage('back')}>Back</button>
			<button onClick={() => changePage('next')}>Next</button>
		</div>
	);
}
