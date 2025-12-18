import Input from '@/app/ui/input';
import Title from '@/app/ui/title';
import { FC, useContext } from 'react';
import { CBTContext, distortion } from '../page';

interface ChildProps {
	updateCbt: (
		value: { thought: string } | { distortions: distortion[] },
	) => void;
}

export const Distortion: FC<ChildProps> = ({ updateCbt }) => {
	const cbt = useContext(CBTContext);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		const updatedDistortion = cbt.distortions.map((distortion) => {
			if (distortion.label === value) {
				return { label: value, checked: checked };
			}
			return distortion;
		});

		updateCbt({ distortions: updatedDistortion });
	};

	return (
		<div className="flex flex-col">
			<Title text="2. Select a Distortion" />
			<div className="grid grid-cols-3 gap-2">
				{cbt.distortions.map(
					(distortion: { label: string; checked: boolean }) => {
						return (
							<div className="flex flex-row gap-3 py-1" key={distortion.label}>
								<Input
									type="checkbox"
									id={distortion.label}
									value={distortion.label}
									name={distortion.label}
									checked={distortion.checked}
									onChange={(e) => handleCheckboxChange(e)}
								/>
								<label htmlFor={distortion.label}>{distortion.label}</label>
							</div>
						);
					},
				)}
			</div>
		</div>
	);
};
