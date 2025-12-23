import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { healing, TriggerContext } from '../page';

interface ChildProps {
	updateTrigger: (value: { healing: healing }) => void;
}

export const Healing: FC<ChildProps> = ({ updateTrigger }) => {
	const trigger = useContext(TriggerContext);
	const getInputObject = () => {
		return {
			activities: trigger.healing.activities,
			giveMyself: trigger.healing.giveMyself,
			givePartner: trigger.healing.givePartner,
		};
	};
	const [inputObject, setInputObject] = useState(getInputObject);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		if (event.target.name === 'thought') {
			setInputValue(event.target.value);
		} else if (['giveMyself', 'givePartner'].includes(event.target.name)) {
			let updateObject = {};
			if (event.target.name === 'giveMyself') {
				updateObject = { giveMyself: event.target.value };
			} else if (event.target.name === 'givePartner') {
				updateObject = { givePartner: event.target.value };
			}

			setInputObject((prev) => ({
				...prev,
				...updateObject,
			}));
			updateTrigger({
				healing: {
					...trigger.healing,
					...updateObject,
				},
			});
		}
	};

	const handleSubmit = () => {
		if (inputValue !== '') {
			const healingActivityLabels = trigger.healing.activities.map(
				(activity) => activity.label,
			);
			const repeatHealingActivity = healingActivityLabels.includes(inputValue);
			if (!repeatHealingActivity) {
				updateTrigger({
					healing: {
						activities: [
							...trigger.healing.activities,
							{ label: inputValue, checked: true },
						],
						giveMyself: trigger.healing.giveMyself,
						givePartner: trigger.healing.givePartner,
					},
				});
			}
			setInputValue('');
		}
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		const updatedHealingActivities = trigger.healing.activities.map(
			(activity) => {
				if (activity.label === value) {
					return { label: value, checked: checked };
				}
				return activity;
			},
		);

		updateTrigger({
			healing: {
				activities: updatedHealingActivities,
				giveMyself: trigger.healing.giveMyself,
				givePartner: trigger.healing.givePartner,
			},
		});
	};

	return (
		<div className="flex flex-col">
			<Title text="6. Healing and finding your center" />
			<div className="flex flex-col pb-5 gap-5.5">
				<div>
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
						Select an activity to do to help yourself become present again
					</p>
					<div className="grid grid-cols-3 gap-2">
						{trigger.healing.activities.map(
							(healingActivity: { label: string; checked: boolean }) => {
								return (
									<div
										className="flex flex-row gap-3 py-1"
										key={healingActivity.label}
									>
										<Input
											type="checkbox"
											id={healingActivity.label}
											value={healingActivity.label}
											name={healingActivity.label}
											checked={healingActivity.checked}
											onChange={(e) => handleCheckboxChange(e)}
										/>
										<label htmlFor={healingActivity.label}>
											{healingActivity.label}
										</label>
									</div>
								);
							},
						)}
					</div>
				</div>
				<div>
					<p className="italic">Whats a healthy next step I can give myself?</p>
					<Input
						type="text"
						id="giveMyself"
						name="giveMyself"
						value={inputObject.giveMyself}
						handleChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div>
					<p className="italic">What can I do for my partner?</p>
					<Input
						type="text"
						id="givePartner"
						name="givePartner"
						value={inputObject.givePartner}
						handleChange={(e) => handleInputChange(e)}
					/>
				</div>
			</div>
		</div>
	);
};
