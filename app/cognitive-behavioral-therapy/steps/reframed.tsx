import Input from '@/app/ui/input';
import Title from '@/app/ui/title';

export default function Reframed() {
	return (
		<div className="flex flex-col">
			<Title text="How can you reframe this thought?" />
			<Input
				type="text"
				id="evidence"
				name="evidence"
				placeholder="Enter your evidence here"
			/>
		</div>
	);
}
