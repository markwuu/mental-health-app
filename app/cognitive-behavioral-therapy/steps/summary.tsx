import Title from '@/app/ui/title';
import { useContext } from 'react';
import { CBTContext } from '../page';

export default function Summary() {
	const cbt = useContext(CBTContext);
	const { thought } = cbt;

	return (
		<div className="flex flex-col">
			<Title text="5. Summary" />
			<h2 className="pt-7 font-extrabold text-lg">Automatic Thought:</h2>
			<p> {thought} </p>
			<h2 className="pt-7 font-extrabold text-lg">Distortions:</h2>
			<h2 className="pt-7 font-extrabold text-lg">Evidence:</h2>
			<h2 className="pt-7 font-extrabold text-lg">Reframed Thought:</h2>
		</div>
	);
}
