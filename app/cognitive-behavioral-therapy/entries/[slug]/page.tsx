import { fetchCbtEntry } from '@/app/lib/data';
import Answer from '@/app/ui/answer';
import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import Link from 'next/link';

export default async function CognitiveBehavioralTherapyEntryPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	const entry = await fetchCbtEntry(slug);
	console.log(`🚀 ~ CognitiveBehavioralTherapyEntryPage ~ entry:`, entry);
	console.log(`🚀 ~ CognitiveBehavioralTherapyEntryPage ~ entry:`, entry[0]);
	const { thought, distortions, evidence, reframed } = entry[0];

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
				<span className='text-2xl text-center uppercase font-bold tracking-tight font-mono'>
					{' > '}
				</span>
				<Link
					href='/cognitive-behavioral-therapy/entries'
					className='text-2xl text-center uppercase font-bold tracking-tight font-mono underline underline-offset-6 text-slate-500'
				>
					{slug}
				</Link>
			</div>
			<div className='flex flex-col'>
				<Title text='Summary' />
				<h2 className='font-extrabold text-lg'>1. Automatic Thought:</h2>
				<Answer text={thought} />
				<h2 className='pt-7 font-extrabold text-lg'>
					2. Cognitive Distortions:
				</h2>
				<div className='grid grid-cols-3 gap-2'>
					{distortions.map(
						(distortion: { label: string; checked: boolean }) => {
							if (distortion.checked) {
								return (
									<div
										className='flex flex-row gap-3 py-1 items-center'
										key={distortion.label}
									>
										<Input
											type='checkbox'
											id={distortion.label}
											value={distortion.label}
											name={distortion.label}
											checked={distortion.checked}
											readOnly={true}
										/>
										<label htmlFor={distortion.label}>
											<Answer text={distortion.label} />
										</label>
									</div>
								);
							}
						},
					)}
				</div>
				<h2 className='pt-7 font-extrabold text-lg'>3. Evidence:</h2>
				<Answer text={evidence} />
				<h2 className='pt-7 font-extrabold text-lg'>4. Reframed Thought:</h2>
				<Answer text={reframed} />
			</div>
		</div>
	);
}
