'use client';

import { CbtType } from '@/app/lib/definitions';
import Answer from '@/app/ui/answer';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import { useState } from 'react';

export default function Entry({ data }: { data: CbtType }) {
	const [editButtonDisabled, setEditButtonDisabled] = useState(false);
	const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
	const [displayEditMenu, setDisplayEditMenu] = useState(false);

	if (!data) return <div>loading...</div>;
	const { thought, distortions, evidence, reframed } = data;

	const handleEditButton = () => {
		setDisplayEditMenu(true);
		setSaveButtonDisabled(false);
	};

	const handleSaveButton = () => {
		setSaveButtonDisabled(true);
	};

	return (
		<div>
			{!displayEditMenu && (
				<div className='flex flex-col'>
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
											<label htmlFor={distortion.label}>
												<Answer text={'\u2022 ' + distortion.label} />
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
			)}
			{displayEditMenu && (
				<div className='flex flex-col'>
					<h2 className='font-extrabold text-lg'>1. Automatic Thought:</h2>
					<Answer text={thought} />
					<h2 className='pt-7 font-extrabold text-lg'>
						2. Cognitive Distortions:
					</h2>
					<div className='grid grid-cols-3 gap-2'>
						{distortions.map(
							(distortion: { label: string; checked: boolean }) => {
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
							},
						)}
					</div>
					<h2 className='pt-7 font-extrabold text-lg'>3. Evidence:</h2>
					<Answer text={evidence} />
					<h2 className='pt-7 font-extrabold text-lg'>4. Reframed Thought:</h2>
					<Answer text={reframed} />
				</div>
			)}
			<div className='flex flex-row gap-7 justify-center p-10'>
				<Button
					disabled={editButtonDisabled}
					name='Edit'
					onClick={handleEditButton}
				/>
				<Button
					disabled={saveButtonDisabled}
					name='Save'
					onClick={handleSaveButton}
				/>
			</div>
		</div>
	);
}
