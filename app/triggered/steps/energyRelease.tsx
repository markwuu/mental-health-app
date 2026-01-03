import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { TriggerContext } from '../page';
import { TriggerType } from '@/app/lib/definitions';

interface ChildProps {
	updateTrigger: (value: TriggerType) => void;
}

export const EnergyRelease: FC<ChildProps> = ({ updateTrigger }) => {
	const trigger = useContext(TriggerContext);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setInputValue(event.target.value);
	};

	const handleSubmit = () => {
		if (inputValue !== '') {
			const energyReleaseLabels = trigger.energyRelease.map(
				(energyRelease) => energyRelease.label,
			);
			const repeatEnergyRelease = energyReleaseLabels.includes(inputValue);
			if (!repeatEnergyRelease) {
				updateTrigger({
					...trigger,
					energyRelease: [
						...trigger.energyRelease,
						{ label: inputValue, checked: true },
					],
				});
			}
			setInputValue('');
		}
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		const updatedEnergyRelease = trigger.energyRelease.map((energyRelease) => {
			if (energyRelease.label === value) {
				return { label: value, checked: checked };
			}
			return energyRelease;
		});

		updateTrigger({ ...trigger, energyRelease: updatedEnergyRelease });
	};

	return (
		<div className="flex flex-col">
			<Title text="4. Releasing Energy" />
			<p className="italic">Add an activity</p>
			<div className="flex gap-6 pb-5">
				<Input
					type="text"
					id="thought"
					name="thought"
					value={inputValue}
					placeholder="Add activity here"
					handleChange={(e) => handleInputChange(e)}
				/>
				<button
					onClick={handleSubmit}
					className="px-4 py-3 my-2 border-2 border-gray-300 rounded"
				>
					+
				</button>
			</div>
			<p className="italic">
				Select an activity to physically release the negative energy in you
			</p>
			<div className="grid grid-cols-3 gap-2 pt-1">
				{trigger.energyRelease.map(
					(energyRelease: { label: string; checked: boolean }) => {
						return (
							<div
								className="flex flex-row items-center gap-3 py-1"
								key={energyRelease.label}
							>
								<Input
									type="checkbox"
									id={energyRelease.label}
									value={energyRelease.label}
									name={energyRelease.label}
									checked={energyRelease.checked}
									onChange={(e) => handleCheckboxChange(e)}
								/>
								<label htmlFor={energyRelease.label}>
									{energyRelease.label}
								</label>
							</div>
						);
					},
				)}
			</div>
		</div>
	);
};
