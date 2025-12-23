import Title from '@/app/ui/title';
import { useContext } from 'react';
import { TriggerContext } from '../page';
import Input from '@/app/ui/input';

export const Summary = () => {
	const trigger = useContext(TriggerContext);
	const {
		level,
		distance,
		sensations,
		energyRelease,
		analyzeTrigger,
		healing,
		reflect,
	} = trigger;

	const finalPercent = () => {
		const difference = ((reflect - level) / level) * 100;
		if (difference === 0) {
			return `${level} → ${reflect} (${Math.abs(difference)}% change)`;
		} else if (difference < 0) {
			return `${level} → ${reflect} (${Math.abs(difference)}% decrease)`;
		} else if (difference > 0) {
			return `${level} → ${reflect} (${Math.abs(difference)}% increase)`;
		}
	};

	return (
		<div className="flex flex-col">
			<Title text="Summary" />
			<h2 className="pt-7 font-extrabold text-lg">
				1. Acknowledge the trigger
			</h2>
			<p className="italic">Rate trigger intensity from 1-10</p>
			<p> {level} </p>
			<h2 className="pt-7 font-extrabold text-lg">2. Create Distance</h2>
			<p className="italic">
				Are you able to physically remove yourself from the trigger?
			</p>
			<p> {distance === true ? 'yes' : 'no'} </p>
			<h2 className="pt-7 font-extrabold text-lg">3. Body Sensations</h2>
			<p className="italic">Selected sensations happening in your body </p>
			<div className="grid grid-cols-3 gap-2">
				{sensations.map((sensation: { label: string; checked: boolean }) => {
					if (sensation.checked) {
						return (
							<div className="flex flex-row gap-3 py-1" key={sensation.label}>
								<Input
									type="checkbox"
									id={sensation.label}
									value={sensation.label}
									name={sensation.label}
									checked={sensation.checked}
									readOnly={true}
								/>
								<label htmlFor={sensation.label}>{sensation.label}</label>
							</div>
						);
					}
				})}
			</div>
			<h2 className="pt-7 font-extrabold text-lg">4. Releasing Energy</h2>
			<p className="italic">Selected activities to release negative energy </p>
			<div className="grid grid-cols-3 gap-2">
				{energyRelease.map(
					(energyRelease: { label: string; checked: boolean }) => {
						if (energyRelease.checked) {
							return (
								<div
									className="flex flex-row gap-3 py-1"
									key={energyRelease.label}
								>
									<Input
										type="checkbox"
										id={energyRelease.label}
										value={energyRelease.label}
										name={energyRelease.label}
										checked={energyRelease.checked}
										readOnly={true}
									/>
									<label htmlFor={energyRelease.label}>
										{energyRelease.label}
									</label>
								</div>
							);
						}
					},
				)}
			</div>
			<h2 className="pt-7 font-extrabold text-lg">5. Analyze the situation</h2>
			<p className="italic">What am I experiencing?</p>
			<p>{analyzeTrigger.experiencing}</p>
			<p className="italic">What story am I telling myself?</p>
			<p>{analyzeTrigger.story}</p>
			<p className="italic">What exactly am I reacting to?</p>
			<p>{analyzeTrigger.reactingTo}</p>
			<p className="italic">Is my reaction appropriate?</p>
			<p>{analyzeTrigger.appropriateReaction === true ? 'yes' : 'no'}</p>
			<h2 className="pt-7 font-extrabold text-lg">
				6. Healing and finding your center
			</h2>
			<p className="italic">
				Selected activities to bring yourself back to the present moment
			</p>
			<div className="grid grid-cols-3 gap-2">
				{trigger.healing.activities.map(
					(healingActivity: { label: string; checked: boolean }) => {
						if (healingActivity.checked) {
							return (
								<div
									className="flex flex-row gap-3 py-1"
									key={healingActivity.label}
								>
									<Input
										type="checkbox"
										id={healingActivity.label}
										value={healingActivity.label}
										name={healingActivity.label}
										checked={healingActivity.checked}
										readOnly={true}
									/>
									<label htmlFor={healingActivity.label}>
										{healingActivity.label}
									</label>
								</div>
							);
						}
					},
				)}
			</div>
			<p className="italic">Whats a healthy next step I can give myself?</p>
			<p>{healing.giveMyself}</p>
			<p className="italic">Whats a healthy next step I can give my partner?</p>
			<p>{healing.givePartner}</p>
			<h2 className="pt-7 font-extrabold text-lg">
				7. Reflecting on the trigger
			</h2>
			<p className="italic">Rate trigger intensity from 1-10</p>
			<p>{finalPercent()}</p>
			{/* <h2 className="pt-7 font-extrabold text-lg">2. Distortions:</h2>
			<div className="grid grid-cols-3 gap-2"> */}
			{/* {distortions.map((distortion: { label: string; checked: boolean }) => {
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
							<label htmlFor={distortion.label}>{distortion.label}</label>
						</div>
					);
				})} 
			</div>
				 */}
			{/* <h2 className="pt-7 font-extrabold text-lg">3. Evidence:</h2>
			<p> {evidence} </p>
			<h2 className="pt-7 font-extrabold text-lg">4. Reframed Thought:</h2>
			<p> {reframed} </p> */}
		</div>
	);
};
