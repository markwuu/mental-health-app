import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { sensation, TriggerContext } from '../page';

interface ChildProps {
	updateTrigger: (value: { sensations: sensation[] }) => void;
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

		updateTrigger({ sensations: updatedSensations });
	};

	return (
		<div className="flex flex-col">
			<Title text="3. What sensations are you feeling in your body?" />
			<div className="flex gap-6 pb-5">
				<Input
					type="text"
					id="thought"
					name="thought"
					value={inputValue}
					placeholder="Add body sensation here"
					handleChange={(e) => handleInputChange(e)}
					styles={'max-w-3xs'}
				/>
				<button
					onClick={handleSubmit}
					className="px-4 py-3 my-2 border-2 border-gray-300 rounded"
				>
					+
				</button>
			</div>
			<div className="grid grid-cols-3 gap-2">
				{trigger.sensations.map(
					(sensation: { label: string; checked: boolean }) => {
						return (
							<div className="flex flex-row gap-3 py-1" key={sensation.label}>
								<Input
									type="checkbox"
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
