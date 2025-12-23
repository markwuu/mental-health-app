import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { analyzeTrigger, TriggerContext } from '../page';

interface ChildProps {
	updateTrigger: (value: { analyzeTrigger: analyzeTrigger }) => void;
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
			analyzeTrigger: {
				...trigger.analyzeTrigger,
				appropriateReaction: event.target.value === 'yes' ? true : false,
			},
		});
	};

	return (
		<div className="flex flex-col">
			<Title text="5. Analyze the situation" />
			<div className="flex flex-col pb-5 gap-5.5">
				<div>
					<p className="italic">What am I experiencing?</p>
					<Input
						type="text"
						id="experiencing"
						name="experiencing"
						value={inputObject.experiencing}
						handleChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div>
					<p className="italic">What story am I telling myself?</p>
					<Input
						type="text"
						id="story"
						name="story"
						value={inputObject.story}
						handleChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div>
					<p className="italic">What exactly am I reacting to?</p>
					<Input
						type="text"
						id="reactingTo"
						name="reactingTo"
						value={inputObject.reactingTo}
						handleChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div>
					<p className="italic">Is my reaction appropriate?</p>
					<div className="pb-3 my-2">
						<Input
							type="radio"
							id="yes"
							name="yes"
							value="yes"
							checked={selectedValue === 'yes'}
							onChange={(e) => handleRadioButtonChange(e)}
						/>
						<Input
							type="radio"
							id="no"
							name="no"
							value="no"
							checked={selectedValue === 'no'}
							onChange={(e) => handleRadioButtonChange(e)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
