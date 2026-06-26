'use client';

import { TriggerType } from '@/app/lib/definitions';
import Answer from '@/app/ui/answer';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import { useState, useTransition } from 'react';
import AutoExpandingTextarea from '../../../ui/expandingInput';
import { updateTrigger } from '@/app/lib/actions';
import Title from '@/app/ui/title';
import Subtitle from '@/app/ui/subtitle';
import { finalPercent } from '@/app/lib/utils';

export default function Entry({ data }: { data: TriggerType }) {
	console.log(`🚀 ~ Entry ~ data:`, data);
	const [editButtonDisabled, setEditButtonDisabled] = useState(false);
	const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
	const [displayEditMenu, setDisplayEditMenu] = useState(false);
	const [entryData, setEntryData] = useState(data);
	const [isPending, startTransition] = useTransition();

	console.log(entryData);

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
			await updateTrigger('1', entryData);
		});
	};

	if (isPending) {
		return <span className='text-xl'>🚀 Saving data...</span>;
	}

	return (
		<div>
			{!displayEditMenu && (
				<div className='flex flex-col items-start'>
					<h2 className='pt-7 font-extrabold text-lg'>
						1. Initial Trigger Intensity
					</h2>
					<p>{entryData?.triggerLevel?.toString()}</p>
					<h2 className='pt-7 font-extrabold text-lg'>
						2. Did you remove yourself from the trigger?
					</h2>
					<Answer text={entryData?.distance === true ? 'yes' : 'no'} />
					<h2 className='pt-7 font-extrabold text-lg'>3. Body Sensations:</h2>
					<div className='grid grid-cols-3 gap-2 py-1'>
						{entryData?.sensations.map(
							(sensation: { label: string; checked: boolean }) => {
								if (sensation.checked) {
									return (
										<div
											className='flex flex-row items-center gap-3 py-1'
											key={sensation.label}
										>
											<label htmlFor={sensation.label}>
												{'\u2022 ' + sensation.label}
											</label>
										</div>
									);
								}
							},
						)}
					</div>
					<h2 className='pt-7 font-extrabold text-lg'>4. Releasing Energy:</h2>
					<div className='grid grid-cols-3 gap-2 py-1'>
						{entryData?.energyRelease.map(
							(activity: { label: string; checked: boolean }) => {
								if (activity.checked) {
									return (
										<div
											className='flex flex-row items-center gap-3 py-1'
											key={activity.label}
										>
											<label htmlFor={activity.label}>
												{'\u2022 ' + activity.label}
											</label>
										</div>
									);
								}
							},
						)}
					</div>
					<h2 className='pt-7 font-extrabold text-lg'>
						5. Analyze the situation:
					</h2>
					<div>
						<Subtitle text='What am I experiencing?' />
						<Answer text={entryData?.analyzeTrigger.experiencing} />
					</div>
					<div>
						<Subtitle text='What story am I telling myself?' />
						<Answer text={entryData?.analyzeTrigger.story} />
					</div>
					<div>
						<Subtitle text='What exactly am I reacting to?' />
						<Answer text={entryData?.analyzeTrigger.reactingTo} />
					</div>
					<div>
						<Subtitle text='Is my reaction appropriate?' />
						<p>
							{entryData?.analyzeTrigger.appropriateReaction === true
								? 'yes'
								: 'no'}
						</p>
					</div>
					<h2 className='pt-7 font-extrabold text-lg'>
						6. Healing and finding your center:
					</h2>
					<div className='grid grid-cols-3 gap-2 py-1'>
						{entryData?.healing.activities.map(
							(activity: { label: string; checked: boolean }) => {
								if (activity.checked) {
									return (
										<div
											className='flex flex-row items-center gap-3 py-1'
											key={activity.label}
										>
											<label htmlFor={activity.label}>
												{'\u2022 ' + activity.label}
											</label>
										</div>
									);
								}
							},
						)}
					</div>
					<div>
						<Subtitle text='Whats a healthy next step I can give myself?' />
						<Answer text={entryData?.healing.giveMyself} />
					</div>
					<div>
						<Subtitle text='Whats a healthy next step I can give my partner?' />
						<Answer text={entryData?.healing.givePartner} />
					</div>
					<h2 className='pt-7 font-extrabold text-lg'>
						7. Final Trigger Intensity
					</h2>
					<p>
						{finalPercent(
							entryData?.triggerLevel || 0,
							entryData?.reflectionLevel || 0,
						)}
					</p>
				</div>
			)}
			{displayEditMenu && <div className='flex flex-col'></div>}
			<div className='flex flex-row gap-3 justify-center p-10'>
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
