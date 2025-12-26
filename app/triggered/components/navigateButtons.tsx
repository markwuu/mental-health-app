import Button from '@/app/ui/button';

export default function NavigateButtons({
	changePage,
}: {
	changePage: (direction: 'next' | 'back') => void;
}) {
	return (
		<div className="flex flex-row gap-7 justify-center">
			<Button name="Back" onClick={() => changePage('back')} />
			<Button name="Next" onClick={() => changePage('next')} />
		</div>
	);
}
