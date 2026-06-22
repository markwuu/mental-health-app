import Link from 'next/link';

export default function Breadcrumb({ pageTitle }: { pageTitle: string }) {
	const href = () => {
		if (pageTitle === 'cbt') {
			return '/cognitive-behavioral-therapy';
		} else if (pageTitle === 'triggered') {
			return '/triggered';
		}

		return '';
	};

	const title =
		pageTitle === 'cbt' ? 'Cognitive Behavior Therapy' : 'Triggered';

	return (
		<div className='text-center flex justify-center items-center gap-3'>
			<Link
				href={href()}
				className='bg-[#d02309] text-white text-2xl font-serif font-black italic tracking-[-0.06em] px-3 py-2 leading-none uppercase'
			>
				{title}
			</Link>
			<span className='text-xl text-center font-bold tracking-tight font-mono'>
				{' > '}
			</span>
			<Link
				href={`${href()}/entries`}
				className='text-2xl font-serif font-black italic tracking-[-0.06em] px-3 py-2 leading-none uppercase'
			>
				Entries
			</Link>
		</div>
	);
}
