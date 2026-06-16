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

	if (!entry) return <div>loading...</div>;

	return (
		<div className='space-y-8 p-20 max-w-4xl w-187.5 mx-auto py-16'>
			<div className='text-center'>
				<Link
					href='/cognitive-behavioral-therapy'
					className='text-2xl text-center uppercase font-bold tracking-tight font-mono'
				>
					Cognitive Behavior Therapy
				</Link>
				<span className='text-2xl text-center uppercase font-bold tracking-tight font-mono'>
					{' > '}
				</span>
				<Link
					href='/cognitive-behavioral-therapy/entries'
					className='text-2xl text-center uppercase font-bold tracking-tight font-mono'
				>
					Entries
				</Link>
			</div>
			<div className='text-center text-2xl underline underline-offset-10'>
				Entry {slug}
			</div>
			<Entry data={entry[0]} />
		</div>
	);
}
