import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { CBTContext } from '../page';
import { CbtType } from '@/app/lib/definitions';

interface ChildProps {
	updateCbt: (value: CbtType) => void;
}

export const Reframed: FC<ChildProps> = ({ updateCbt }) => {
	const cbt = useContext(CBTContext);
	const [inputValue, setInputValue] = useState(cbt.reframed);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(event.target.value);
		updateCbt({ ...cbt, reframed: event.target.value });
	};

	return (
		<div className="flex flex-col">
			<Title text="4. Reframed Thought" />
			<p className="italic">
				Is there a way to reframe your thought in a more positive way?
			</p>
			<Input
				type="text"
				id="evidence"
				name="evidence"
				value={inputValue}
				placeholder="Enter your reframed thought here"
				handleChange={(e) => handleChange(e)}
			/>
		</div>
	);
};
