import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { CBTContext } from '../page';

interface ChildProps {
	updateCbt: (value: { evidence: string }) => void;
}

export const Evidence: FC<ChildProps> = ({ updateCbt }) => {
	const cbt = useContext(CBTContext);
	const [inputValue, setInputValue] = useState(cbt.evidence);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(event.target.value);
		updateCbt({ evidence: event.target.value });
	};

	return (
		<div className="flex flex-col">
			<Title text="3. Is there any evidence that challenges this?" />
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
