import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC } from 'react';

interface ChildProps {
	updateCbt: (arg0: string) => void;
}

export const Thought: FC<ChildProps> = ({ updateCbt }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		updateCbt(value);
	};

	return (
		<div className="flex flex-col">
			<Title text="1. Add Your Thought" />
			<Input
				type="text"
				id="thought"
				name="thought"
				// value={thought}
				placeholder="Enter your thought here"
				handleChange={(e) => handleChange(e)}
			/>
		</div>
	);
};
