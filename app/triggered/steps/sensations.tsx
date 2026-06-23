import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { TriggerContext } from '../page';
import { TriggerType } from '@/app/lib/definitions';
import Subtitle from '@/app/ui/subtitle';

interface ChildProps {
	updateTrigger: (value: TriggerType) => void;
}

export const Sensations: FC<ChildProps> = ({ updateTrigger }) => {
	const trigger = useContext(TriggerContext);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setInputValue(event.target.value);
	};

	const handleSubmit = () => {
		if (inputValue !== '') {
			const sensationsLabels = trigger.sensations.map(
				(sensation) => sensation.label,
			);
			const repeatSensation = sensationsLabels.includes(inputValue);
			if (!repeatSensation) {
				updateTrigger({
					...trigger,
					sensations: [
						...trigger.sensations,
						{ label: inputValue, checked: true },
					],
				});
			}
			setInputValue('');
		}
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		const updatedSensations = trigger.sensations.map((sensation) => {
			if (sensation.label === value) {
				return { label: value, checked: checked };
			}
			return sensation;
		});

		updateTrigger({ ...trigger, sensations: updatedSensations });
	};

	return (
		<div className='flex flex-col'>
			<Title text='3. Body Sensations' />
			<Subtitle text='Add a new body sensation' />
			<div className='flex gap-6 pb-5'>
				<Input
					type='text'
					id='thought'
					name='thought'
					value={inputValue}
					placeholder='Enter sensation here'
					handleChange={(e) => handleInputChange(e)}
				/>
				<button
					onClick={handleSubmit}
					className='px-4.5 my-2 border-2 border-gray-300 rounded'
				>
					+
				</button>
			</div>
			<Subtitle text='Select all the sensations happening in your body' />
			<div className='grid grid-cols-3 gap-2 pt-1'>
				{trigger.sensations.map(
					(sensation: { label: string; checked: boolean }) => {
						return (
							<div
								className='flex flex-row items-center gap-3 py-1'
								key={sensation.label}
							>
								<Input
									type='checkbox'
									id={sensation.label}
									value={sensation.label}
									name={sensation.label}
									checked={sensation.checked}
									onChange={(e) => handleCheckboxChange(e)}
								/>
								<label htmlFor={sensation.label}>{sensation.label}</label>
							</div>
						);
					},
				)}
			</div>
		</div>
	);
};
