import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { TriggerContext } from '../page';
import { TriggerType } from '@/app/lib/definitions';
import Subtitle from '@/app/ui/subtitle';

interface ChildProps {
	updateTrigger: (value: TriggerType) => void;
}

export const Distance: FC<ChildProps> = ({ updateTrigger }) => {
	const trigger = useContext(TriggerContext);
	const getInitialValue = () => {
		if (trigger.distance === true) return 'yes';
		if (trigger.distance === false) return 'no';
		return '';
	};
	const [selectedValue, setSelectedValue] = useState<string>(getInitialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
		updateTrigger({
			...trigger,
			distance: event.target.value === 'yes' ? true : false,
		});
	};

	return (
		<div className='flex flex-col'>
			<Title text='2. Create distance' />
			<Subtitle text='Are you able to physically remove yourself from the trigger?' />
			<div className='py-1 my-2'>
				<Input
					type='radio'
					id='yes'
					name='yes'
					value='yes'
					checked={selectedValue === 'yes'}
					onChange={(e) => handleChange(e)}
				/>
				<Input
					type='radio'
					id='no'
					name='no'
					value='no'
					checked={selectedValue === 'no'}
					onChange={(e) => handleChange(e)}
				/>
			</div>
		</div>
	);
};
