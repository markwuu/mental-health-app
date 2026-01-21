import Title from '@/app/ui/title';
import { useContext } from 'react';
import { CBTContext } from '../page';
import Input from '@/app/ui/input';
import Answer from '@/app/ui/answer';

export default function Summary() {
	const cbt = useContext(CBTContext);
	const { thought, distortions, evidence, reframed } = cbt;

	return (
		<div className="flex flex-col">
			<Title text="Summary" />
			<h2 className="font-extrabold text-lg">1. Automatic Thought:</h2>
			<Answer text={thought} />
			<h2 className="pt-7 font-extrabold text-lg">2. Cognitive Distortions:</h2>
			<div className="grid grid-cols-3 gap-2">
				{distortions.map((distortion: { label: string; checked: boolean }) => {
					if (distortion.checked) {
						return (
							<div className="flex flex-row gap-3 py-1" key={distortion.label}>
								<Input
									type="checkbox"
									id={distortion.label}
									value={distortion.label}
									name={distortion.label}
									checked={distortion.checked}
									readOnly={true}
								/>
								<label htmlFor={distortion.label}>
									<Answer text={distortion.label} />
								</label>
							</div>
						);
					}
				})}
			</div>
			<h2 className="pt-7 font-extrabold text-lg">3. Evidence:</h2>
			<Answer text={evidence} />
			<h2 className="pt-7 font-extrabold text-lg">4. Reframed Thought:</h2>
			<Answer text={reframed} />
		</div>
	);
}
