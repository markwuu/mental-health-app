import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { TriggerContext } from '../page';
import { TriggerType } from '@/app/lib/definitions';
import Subtitle from '@/app/ui/subtitle';

interface ChildProps {
	updateTrigger: (value: TriggerType) => void;
}

export const Analyze: FC<ChildProps> = ({ updateTrigger }) => {
	const trigger = useContext(TriggerContext);
	const getRadioValue = () => {
		if (trigger.analyzeTrigger.appropriateReaction === true) return 'yes';
		if (trigger.analyzeTrigger.appropriateReaction === false) return 'no';
		return '';
	};
	const getInputObject = () => {
		return {
			experiencing: trigger.analyzeTrigger.experiencing,
			story: trigger.analyzeTrigger.story,
			reactingTo: trigger.analyzeTrigger.reactingTo,
		};
	};
	const [inputObject, setInputObject] = useState(getInputObject);
	const [selectedValue, setSelectedValue] = useState<string>(getRadioValue);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		let updateObject = {};
		if (event.target.name === 'experiencing') {
			updateObject = { experiencing: event.target.value };
		} else if (event.target.name === 'story') {
			updateObject = { story: event.target.value };
		} else if (event.target.name === 'reactingTo') {
			updateObject = { reactingTo: event.target.value };
		}

		setInputObject((prev) => ({
			...prev,
			...updateObject,
		}));
		updateTrigger({
			...trigger,
			analyzeTrigger: {
				...trigger.analyzeTrigger,
				...updateObject,
			},
		});
	};

	const handleRadioButtonChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setSelectedValue(event.target.value);
		updateTrigger({
			...trigger,
			analyzeTrigger: {
				...trigger.analyzeTrigger,
				appropriateReaction: event.target.value === 'yes' ? true : false,
			},
		});
	};

	return (
		<div className='flex flex-col'>
			<Title text='5. Analyze the situation' />
			<div className='flex flex-col pb-5 gap-5.5'>
				<div>
					<Subtitle text='What am I experiencing?' />
					<Input
						type='text'
						id='experiencing'
						name='experiencing'
						value={inputObject.experiencing}
						handleChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div>
					<Subtitle text='What story am I telling myself?' />
					<Input
						type='text'
						id='story'
						name='story'
						value={inputObject.story}
						handleChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div>
					<Subtitle text='What exactly am I reacting to?Add an activity' />
					<Input
						type='text'
						id='reactingTo'
						name='reactingTo'
						value={inputObject.reactingTo}
						handleChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div>
					<Subtitle text='Is my reaction appropriate?' />
					<div className='pb-3 my-2'>
						<Input
							type='radio'
							id='yes'
							name='yes'
							value='yes'
							checked={selectedValue === 'yes'}
							onChange={(e) => handleRadioButtonChange(e)}
						/>
						<Input
							type='radio'
							id='no'
							name='no'
							value='no'
							checked={selectedValue === 'no'}
							onChange={(e) => handleRadioButtonChange(e)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
