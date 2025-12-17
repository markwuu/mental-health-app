import Input from '@/app/ui/input';
import Title from '@/app/ui/title';

export default function Distortion() {
	const distortions = [
		'catastrophizing',
		'should statements',
		'magnification',
		'minimization',
		'emotional reasoning',
		'mental filter',
		'disqualify the positive',
		'all-or-nothing thinking',
		'personalization',
		'blaming',
		'jumping to conclusions',
		'mind reading',
		'fortune telling',
		'overgeneralization',
		'labeling',
	];

	return (
		<div className="flex flex-col">
			<Title text="2. Select a Distortion" />
			<div className="grid grid-cols-3 gap-2">
				{distortions.map((distortion) => (
					<div className="flex flex-row gap-3 py-1" key={distortion}>
						<Input
							type="checkbox"
							id={distortion}
							name={distortion}
							value={distortion}
						/>
						<label htmlFor={distortion}>{distortion}</label>
					</div>
				))}
			</div>
		</div>
	);
}
