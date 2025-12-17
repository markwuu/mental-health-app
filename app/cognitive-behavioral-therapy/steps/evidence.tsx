import Input from '@/app/ui/input';
import Title from '@/app/ui/title';

export default function Evidence() {
	return (
		<div className="flex flex-col">
			<Title text="3. Is there any evidence that challenges this?" />
			<Input
				type="text"
				id="thought"
				name="thought"
				placeholder="Enter your thought here"
			/>
		</div>
	);
}
