import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { TriggerContext } from '../page';

interface ChildProps {
	updateTrigger: (value: { level: number }) => void;
}

export const Trigger: FC<ChildProps> = ({ updateTrigger }) => {
	const trigger = useContext(TriggerContext);
	const [selectedValue, setSelectedValue] = useState(trigger.level);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		const selectedNumber = parseInt(event.target.value, 10);
		setSelectedValue(selectedNumber);
		updateTrigger({ level: selectedNumber });
	};

	return (
		<div className="flex flex-col">
			<Title text="1. Acknowledge the trigger and rate it from 1-10" />
			<select
				className="w-full appearance-none bg-white px-3 py-3 my-2 pr-10 text-base text-black border border-gray-300 rounded cursor-pointer max-w-3xs bg-no-repeat bg-right bg-size-[20px]"
				style={{
					backgroundImage: `url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>')`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'right 10px center',
				}}
				name="triggerLevel"
				id="trigger-level-select"
				value={selectedValue}
				onChange={(e) => handleChange(e)}
			>
				<option disabled hidden>
					Rate your trigger...
				</option>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
				<option value={6}>6</option>
				<option value={7}>7</option>
				<option value={8}>8</option>
				<option value={9}>9</option>
				<option value={10}>10</option>
			</select>
		</div>
	);
};
