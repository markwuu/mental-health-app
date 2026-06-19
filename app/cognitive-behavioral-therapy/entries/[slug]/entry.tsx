'use client';

import { CbtType } from '@/app/lib/definitions';
import Answer from '@/app/ui/answer';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import { useState, useTransition } from 'react';
import AutoExpandingTextarea from '../../../ui/expandingInput';
import { updateCbt } from '@/app/lib/actions';

export default function Entry({ data }: { data: CbtType }) {
	const [editButtonDisabled, setEditButtonDisabled] = useState(false);
	const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
	const [displayEditMenu, setDisplayEditMenu] = useState(false);
	const [entryData, setEntryData] = useState(data);
	const [isPending, startTransition] = useTransition();

	const handleEditButton = () => {
		setDisplayEditMenu(true);
		setSaveButtonDisabled(false);
		setEditButtonDisabled(true);
	};

	const handleSaveButton = () => {
		setSaveButtonDisabled(true);
		setDisplayEditMenu(false);
		setEditButtonDisabled(false);
		submitData();
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		const { name, value } = event.target; // Destructure name and value from the input
		setEntryData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		const updatedDistortion = entryData.distortions.map((distortion) => {
			if (distortion.label === value) {
				return { label: value, checked: checked };
			}
			return distortion;
		});

		setEntryData((prev) => ({
			...prev,
			distortions: updatedDistortion,
		}));
	};

	const submitData = () => {
		startTransition(async () => {
			await updateCbt('1', entryData);
		});
	};

	if (isPending) {
		return <span className='text-xl'>🚀 Saving data...</span>;
	}

	return (
		<div>
			{!displayEditMenu && (
				<div className='flex flex-col'>
					<h2 className='font-extrabold text-lg'>1. Automatic Thought:</h2>
					<Answer text={entryData?.thought} />
					<h2 className='pt-7 font-extrabold text-lg'>
						2. Cognitive Distortions:
					</h2>
					<div className='grid grid-cols-3 gap-2'>
						{entryData?.distortions.map(
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
					<Answer text={entryData?.evidence} />
					<h2 className='pt-7 font-extrabold text-lg'>4. Reframed Thought:</h2>
					<Answer text={entryData?.reframed} />
				</div>
			)}
			{displayEditMenu && (
				<div className='flex flex-col'>
					<h2 className='font-extrabold text-lg'>1. Automatic Thought:</h2>
					<AutoExpandingTextarea
						id='thought'
						name='thought'
						value={entryData.thought}
						placeholder='Enter thought here'
						onChange={handleChange}
					/>
					<h2 className='pt-7 font-extrabold text-lg'>
						2. Cognitive Distortions:
					</h2>
					<div className='grid grid-cols-3 gap-2'>
						{entryData?.distortions.map(
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
											onChange={(e) => {
												handleCheckboxChange(e);
											}}
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
					<AutoExpandingTextarea
						id='evidence'
						name='evidence'
						placeholder='Enter evidence here'
						value={entryData.evidence}
						onChange={handleChange}
					/>
					<h2 className='pt-7 font-extrabold text-lg'>4. Reframed Thought:</h2>
					<AutoExpandingTextarea
						id='reframed'
						name='reframed'
						value={entryData.reframed}
						placeholder='Enter reframed thought here'
						onChange={handleChange}
					/>
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
