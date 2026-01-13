import Button from '@/app/ui/button';

export default function NavigateButtons({
	changePage,
	backButtonDisabled,
	nextButtonDisabled,
}: {
	changePage: (direction: 'next' | 'back') => void;
	backButtonDisabled?: boolean;
	nextButtonDisabled?: boolean;
}) {
	return (
		<div className="flex flex-row gap-7 justify-center">
			<Button
				disabled={backButtonDisabled}
				name="Back"
				onClick={() => changePage('back')}
			/>
			<Button
				disabled={nextButtonDisabled}
				name="Next"
				onClick={() => changePage('next')}
			/>
		</div>
	);
}
