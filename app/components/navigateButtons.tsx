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
		<div className='flex flex-row gap-3 justify-center'>
			<Button
				disabled={backButtonDisabled}
				name='BACK'
				onClick={() => changePage('back')}
			/>
			<Button
				disabled={nextButtonDisabled}
				name='NEXT'
				onClick={() => changePage('next')}
			/>
		</div>
	);
}
