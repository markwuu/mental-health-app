import { fetchTriggerEntry } from '@/app/lib/data';
import Link from 'next/link';
import Entry from './entry';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function CognitiveBehavioralTherapyEntryPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	const entry = await fetchTriggerEntry(slug);

	const currentDate =
		entry[0].updated_at && formatDateToLocal(entry[0].updated_at);

	if (!entry) return <div>loading...</div>;

	return (
		<div className='space-y-4 p-20 max-w-4xl w-187.5 mx-auto py-16'>
			<div className='text-center flex justify-center items-center gap-3'>
				<Link
					href='/triggered'
					className='text-2xl font-serif font-black italic tracking-[-0.06em] px-3 py-2 leading-none uppercase'
				>
					Triggered
				</Link>
				<span className='text-xl text-center font-bold tracking-tight font-mono'>
					{' > '}
				</span>
				<Link
					href='/triggered/entries'
					className='text-2xl font-serif font-black italic tracking-[-0.06em] px-3 py-2 leading-none uppercase'
				>
					Entries
				</Link>
			</div>
			<div className='pt-4 text-center text-[1.69rem]'>
				<span className='bg-[#d02309] text-white font-serif font-black italic tracking-[-0.06em] px-4 py-2 leading-none uppercase'>
					Entry {slug}
				</span>
			</div>
			<div className='text-center text-base italic'>
				[Updated: {currentDate}]
			</div>
			<Entry data={entry[0]} />
		</div>
	);
}
