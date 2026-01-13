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
			<Title text="4. How can you reframe this thought?" />
			<Input
				type="text"
				id="evidence"
				name="evidence"
				value={inputValue}
				placeholder="Enter your evidence here"
				handleChange={(e) => handleChange(e)}
			/>
		</div>
	);
};
