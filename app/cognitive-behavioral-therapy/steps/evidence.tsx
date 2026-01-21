import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext, useState } from 'react';
import { CBTContext } from '../page';
import { CbtType } from '@/app/lib/definitions';
import Subtitle from '@/app/ui/subtitle';

interface ChildProps {
	updateCbt: (value: CbtType) => void;
}

export const Evidence: FC<ChildProps> = ({ updateCbt }) => {
	const cbt = useContext(CBTContext);
	const [inputValue, setInputValue] = useState(cbt.evidence);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(event.target.value);
		updateCbt({ ...cbt, evidence: event.target.value });
	};

	return (
		<div className="flex flex-col">
			<Title text="3. Evidence to the contrary" />
			<Subtitle text="List any evidence that challenges the automatic thought you have" />
			<Input
				type="text"
				id="thought"
				name="thought"
				value={inputValue}
				placeholder="Enter your evidence here"
				handleChange={(e) => handleChange(e)}
			/>
		</div>
	);
};
