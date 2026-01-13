import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { CBTContext } from '../page';
import { CbtType } from '@/app/lib/definitions';

interface ChildProps {
	updateCbt: (value: CbtType) => void;
}

export const Thought: FC<ChildProps> = ({ updateCbt }) => {
	const cbt = useContext(CBTContext);
	const [inputValue, setInputValue] = useState(cbt.thought);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(event.target.value);
		updateCbt({ ...cbt, thought: event.target.value });
	};

	return (
		<div className="flex flex-col">
			<Title text="1. Add Your Thought" />
			<Input
				type="text"
				id="thought"
				name="thought"
				value={inputValue}
				placeholder="Enter your thought here"
				handleChange={(e) => handleChange(e)}
			/>
		</div>
	);
};
