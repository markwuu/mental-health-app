import Input from '@/app/ui/input';
import Title from '@/app/ui/title';

export default function Thought() {
	return (
		<div className="flex flex-col">
			<Title text="Add Your Thought" />
			<Input
				type="text"
				id="thought"
				name="thought"
				placeholder="Enter your thought here"
			/>
		</div>
	);
}
