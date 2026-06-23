import Title from '@/app/ui/title';
import { useContext } from 'react';
import { TriggerContext } from '../page';
import Subtitle from '@/app/ui/subtitle';

export const Summary = () => {
	const trigger = useContext(TriggerContext);
	const {
		triggerLevel,
		distance,
		sensations,
		energyRelease,
		analyzeTrigger,
		healing,
		reflectionLevel,
	} = trigger;

	const finalPercent = () => {
		if (reflectionLevel && triggerLevel) {
			const difference =
				((reflectionLevel - triggerLevel) / triggerLevel) * 100;
			if (difference === 0) {
				return `${triggerLevel} → ${reflectionLevel} (${Math.abs(
					difference,
				)}% change)`;
			} else if (difference < 0) {
				return `${triggerLevel} → ${reflectionLevel} (${Math.abs(
					difference,
				)}% decrease)`;
			} else if (difference > 0) {
				return `${triggerLevel} → ${reflectionLevel} (${Math.abs(
					difference,
				)}% increase)`;
			}
		}
		return;
	};

	const highlightedAnswer =
		'bg-[#d02309] text-white text-base font-serif font-black italic tracking-[-0.06em] px-3 py-2 leading-none uppercase';

	return (
		<div className='flex flex-col items-start'>
			<Title text='Summary' />
			<h2 className='font-extrabold text-lg'>1. Acknowledge the trigger</h2>
			<Subtitle text='Rate trigger intensity from 1-10' />
			<p className={highlightedAnswer}>{triggerLevel}</p>
			<h2 className='pt-7 font-extrabold text-lg'>2. Create Distance</h2>
			<Subtitle text='Are you able to physically remove yourself from the trigger?' />
			<p className={highlightedAnswer}> {distance === true ? 'yes' : 'no'} </p>
			<h2 className='pt-7 font-extrabold text-lg'>3. Body Sensations</h2>
			<Subtitle text='Selected sensations happening in your body' />
			<div className='grid grid-cols-3 gap-2 py-1'>
				{sensations.map((sensation: { label: string; checked: boolean }) => {
					if (sensation.checked) {
						return (
							<div
								className='flex flex-row items-center gap-3 py-1'
								key={sensation.label}
							>
								<label className={highlightedAnswer} htmlFor={sensation.label}>
									{'\u2022 ' + sensation.label}
								</label>
							</div>
						);
					}
				})}
			</div>
			<h2 className='pt-7 font-extrabold text-lg'>4. Releasing Energy</h2>
			<Subtitle text='Selected activities to release negative energy' />
			<div className='grid grid-cols-3 gap-2 py-1'>
				{energyRelease.map(
					(energyRelease: { label: string; checked: boolean }) => {
						if (energyRelease.checked) {
							return (
								<div
									className='flex flex-row items-center gap-3 py-1'
									key={energyRelease.label}
								>
									<label
										className={highlightedAnswer}
										htmlFor={energyRelease.label}
									>
										{'\u2022 ' + energyRelease.label}
									</label>
								</div>
							);
						}
					},
				)}
			</div>
			<h2 className='pt-7 font-extrabold text-lg'>5. Analyze the situation</h2>
			<Subtitle text='What am I experiencing?' />
			<p className={highlightedAnswer}>{analyzeTrigger.experiencing}</p>
			<Subtitle text='What story am I telling myself?' />
			<p className={highlightedAnswer}>{analyzeTrigger.story}</p>
			<Subtitle text='What exactly am I reacting to?' />
			<p className={highlightedAnswer}>{analyzeTrigger.reactingTo}</p>
			<Subtitle text='Is my reaction appropriate?' />
			<p className={highlightedAnswer}>
				{analyzeTrigger.appropriateReaction === true ? 'yes' : 'no'}
			</p>
			<h2 className='pt-7 font-extrabold text-lg'>
				6. Healing and finding your center
			</h2>
			<Subtitle text='Selected activities to bring yourself back to the present moment' />
			<div className='grid grid-cols-3 gap-2 py-1'>
				{trigger.healing.activities.map(
					(healingActivity: { label: string; checked: boolean }) => {
						if (healingActivity.checked) {
							return (
								<div
									className='flex flex-row items-center gap-3 py-1'
									key={healingActivity.label}
								>
									<label
										className={highlightedAnswer}
										htmlFor={healingActivity.label}
									>
										{'\u2022 ' + healingActivity.label}
									</label>
								</div>
							);
						}
					},
				)}
			</div>
			<Subtitle text='Whats a healthy next step I can give myself?' />
			<p className={highlightedAnswer}>{healing.giveMyself}</p>
			<Subtitle text='Whats a healthy next step I can give my partner?' />
			<p className={highlightedAnswer}>{healing.givePartner}</p>
			<h2 className='pt-7 font-extrabold text-lg'>
				7. Reflecting on the trigger
			</h2>
			<Subtitle text='Rate trigger intensity from 1-10' />
			<p className={highlightedAnswer}>{finalPercent()}</p>
		</div>
	);
};
