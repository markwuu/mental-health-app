import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { TriggerContext } from '../page';

interface ChildProps {
	updateTrigger: (value: { distance: boolean }) => void;
}

export const Distance: FC<ChildProps> = ({ updateTrigger }) => {
	const trigger = useContext(TriggerContext);
	const [selectedValue, setSelectedValue] = useState<string>(
		trigger.distance ? 'yes' : 'no',
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
		updateTrigger({ distance: event.target.value === 'yes' ? true : false });
	};

	return (
		<div className="flex flex-col">
			<Title text="2. Are you able to create distance from your trigger?" />
			<div className="py-3 my-2">
				<Input
					type="radio"
					id="yes"
					name="yes"
					value="yes"
					checked={selectedValue === 'yes'}
					onChange={(e) => handleChange(e)}
				/>
				<Input
					type="radio"
					id="no"
					name="no"
					value="no"
					checked={selectedValue === 'no'}
					onChange={(e) => handleChange(e)}
				/>
			</div>
		</div>
	);
};
