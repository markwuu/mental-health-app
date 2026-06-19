import { fetchCbtEntry } from '@/app/lib/data';
import Link from 'next/link';
import Entry from './entry';

export default async function CognitiveBehavioralTherapyEntryPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	const entry = await fetchCbtEntry(slug);

	const date = new Date(entry[0].updated_at || '');
	const localTime = date.toLocaleString('en-US', {
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	if (!entry) return <div>loading...</div>;

	return (
		<div className='space-y-4 p-20 max-w-4xl w-187.5 mx-auto py-16'>
			<div className='text-center flex justify-between items-center'>
				<Link
					href='/cognitive-behavioral-therapy'
					className='text-2xl font-serif font-black italic tracking-[-0.06em] px-2 py-2 leading-none uppercase'
				>
					Cognitive Behavior Therapy
				</Link>
				<span className='text-xl text-center font-bold tracking-tight font-mono'>
					{' > '}
				</span>
				<Link
					href='/cognitive-behavioral-therapy/entries'
					className='text-2xl font-serif font-black italic tracking-[-0.06em] px-2 py-2 leading-none uppercase'
				>
					Entries
				</Link>
			</div>
			<div className='pt-4 text-center text-2xl'>
				<span className='bg-[#d02309] text-white font-serif font-black italic tracking-[-0.06em] px-4 py-2 leading-none uppercase'>
					Entry {slug}
				</span>
			</div>
			<div className='text-center text-base italic'>[Updated: {localTime}]</div>
			<Entry data={entry[0]} />
		</div>
	);
}
