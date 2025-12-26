'use client';

import { Trigger } from './steps/trigger';
import { Distance } from './steps/distance';
import { Sensations } from './steps/sensations';
import { Summary } from './steps/summary';
import { useState } from 'react';
import NavigateButtons from './components/navigateButtons';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';
import { EnergyRelease } from './steps/energyRelease';
import { Analyze } from './steps/analyze';
import { Healing } from './steps/healing';
import { Reflect } from './steps/reflect';

export type sensation = {
	label: string;
	checked: boolean;
};

export type energyRelease = {
	label: string;
	checked: boolean;
};

export type analyzeTrigger = {
	experiencing: string;
	story: string;
	reactingTo: string;
	appropriateReaction: boolean | null;
};

export type healingActivity = {
	label: string;
	checked: boolean;
};

export type healing = {
	activities: healingActivity[];
	giveMyself: string;
	givePartner: string;
};

export interface TriggerType {
	level?: number | null;
	distance?: boolean | null;
	sensations?: sensation[];
	energyRelease?: energyRelease[];
	analyzeTrigger?: analyzeTrigger;
	healing?: healing;
	reflect?: number | null;
}

const sensationsList = [
	{ label: 'sweating', checked: false },
	{ label: 'racing heart', checked: false },
	{ label: 'stomach ache', checked: false },
	{ label: 'dizziness', checked: false },
	{ label: 'redness in face', checked: false },
	{ label: 'headache', checked: false },
	{ label: 'head pressure', checked: false },
	{ label: 'heavy chest', checked: false },
	{ label: 'ears pounding', checked: false },
];

const energyReleaseList = [
	{ label: 'run', checked: false },
	{ label: 'cry', checked: false },
	{ label: 'shake', checked: false },
	{ label: 'stretch', checked: false },
	{ label: 'jumping jacks', checked: false },
	{ label: 'deep breathing', checked: false },
];

const healingActivityList = [
	{ label: 'call a friend', checked: false },
	{ label: 'get a hug', checked: false },
	{ label: 'play music', checked: false },
	{ label: 'watch tv', checked: false },
	{ label: 'journal', checked: false },
	{ label: 'meditate', checked: false },
];

const emptyTrigger = {
	level: undefined,
	distance: null,
	sensations: sensationsList,
	energyRelease: energyReleaseList,
	analyzeTrigger: {
		experiencing: '',
		story: '',
		reactingTo: '',
		appropriateReaction: null,
	},
	healing: {
		activities: healingActivityList,
		giveMyself: '',
		givePartner: '',
	},
	reflect: undefined,
};

export const TriggerContext = createContext<TriggerType>(emptyTrigger);

export default function WorkingThroughATriggerPage() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState('Trigger');
	const [trigger, setTrigger] = useState<TriggerType>(emptyTrigger);
	const [backButtonDisabled] = useState<boolean>(false);
	const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);

	// useEffect to check localstorage and set trigger with user input values

	const updateTrigger = (value: TriggerType) => {
		const {
			level,
			distance,
			sensations,
			energyRelease,
			analyzeTrigger,
			healing,
			reflect,
		} = value;

		if (
			(level && level > 0) ||
			typeof distance === 'boolean' ||
			(reflect && reflect > 0)
		) {
			setNextButtonDisabled(false);
		} else {
			setNextButtonDisabled(true);
		}
		sensations?.map((sensation) => {
			if (sensation.checked === true) {
				setNextButtonDisabled(false);
			}
		});
		energyRelease?.map((activity) => {
			if (activity.checked === true) {
				setNextButtonDisabled(false);
			}
		});
		if (
			analyzeTrigger?.experiencing &&
			analyzeTrigger?.story &&
			analyzeTrigger?.reactingTo &&
			typeof analyzeTrigger.appropriateReaction === 'boolean'
		) {
			setNextButtonDisabled(false);
		}
		if (healing?.giveMyself && healing?.givePartner) {
			healing?.activities.map((activity) => {
				if (activity.checked === true) {
					setNextButtonDisabled(false);
				}
			});
		}
		setTrigger((prev) => ({ ...prev, ...value }));
	};

	const displayStep = () => {
		if (currentPage === 'Trigger')
			return <Trigger updateTrigger={updateTrigger} />;
		if (currentPage === 'Distance')
			return <Distance updateTrigger={updateTrigger} />;
		if (currentPage === 'Sensations')
			return <Sensations updateTrigger={updateTrigger} />;
		if (currentPage === 'EnergyRelease')
			return <EnergyRelease updateTrigger={updateTrigger} />;
		if (currentPage === 'Analyze')
			return <Analyze updateTrigger={updateTrigger} />;
		if (currentPage === 'Healing')
			return <Healing updateTrigger={updateTrigger} />;
		if (currentPage === 'Reflect')
			return <Reflect updateTrigger={updateTrigger} />;
		if (currentPage === 'Summary') return <Summary />;

		return null;
	};

	const changePage = (direction: 'next' | 'back') => {
		switch (direction) {
			case 'next':
				if (currentPage === 'Trigger') {
					if (typeof trigger.distance === 'boolean') {
						setNextButtonDisabled(false);
					} else {
						setNextButtonDisabled(true);
					}
					return setCurrentPage('Distance');
				}
				if (currentPage === 'Distance') {
					setNextButtonDisabled(true);
					trigger?.sensations?.map((sensation) => {
						if (sensation.checked === true) {
							setNextButtonDisabled(false);
						}
					});
					return setCurrentPage('Sensations');
				}
				if (currentPage === 'Sensations') {
					setNextButtonDisabled(true);
					trigger?.energyRelease?.map((activity) => {
						if (activity.checked === true) {
							setNextButtonDisabled(false);
						}
					});
					return setCurrentPage('EnergyRelease');
				}
				if (currentPage === 'EnergyRelease') {
					setNextButtonDisabled(true);
					if (
						trigger?.analyzeTrigger?.experiencing &&
						trigger?.analyzeTrigger?.story &&
						trigger?.analyzeTrigger?.reactingTo &&
						typeof trigger?.analyzeTrigger.appropriateReaction === 'boolean'
					) {
						setNextButtonDisabled(false);
					}
					return setCurrentPage('Analyze');
				}
				if (currentPage === 'Analyze') {
					setNextButtonDisabled(true);
					if (trigger?.healing?.giveMyself && trigger?.healing?.givePartner) {
						trigger?.healing?.activities.map((activity) => {
							if (activity.checked === true) {
								setNextButtonDisabled(false);
							}
						});
					}
					return setCurrentPage('Healing');
				}
				if (currentPage === 'Healing') {
					setNextButtonDisabled(true);
					if (
						trigger.reflect !== null &&
						trigger.reflect !== undefined &&
						trigger.reflect >= 0
					) {
						setNextButtonDisabled(false);
					}
					return setCurrentPage('Reflect');
				}
				if (currentPage === 'Reflect') {
					return setCurrentPage('Summary');
				}
				if (currentPage === 'Summary') return router.push('/');
			case 'back':
				if (currentPage === 'Trigger') return router.push('/');
				if (currentPage === 'Distance') {
					setNextButtonDisabled(false);
					return setCurrentPage('Trigger');
				}
				if (currentPage === 'Sensations') {
					setNextButtonDisabled(false);
					return setCurrentPage('Distance');
				}
				if (currentPage === 'EnergyRelease') {
					setNextButtonDisabled(false);
					return setCurrentPage('Sensations');
				}
				if (currentPage === 'Analyze') {
					setNextButtonDisabled(false);
					return setCurrentPage('EnergyRelease');
				}
				if (currentPage === 'Healing') {
					setNextButtonDisabled(false);
					return setCurrentPage('Analyze');
				}
				if (currentPage === 'Reflect') {
					setNextButtonDisabled(false);
					return setCurrentPage('Healing');
				}
				if (currentPage === 'Summary') {
					setNextButtonDisabled(false);
					return setCurrentPage('Reflect');
				}

			default:
				return null;
		}
	};

	return (
		<TriggerContext.Provider value={trigger}>
			<div className="space-y-8 p-20 max-w-4xl w-187.5 mx-auto py-16">
				<h1 className="text-3xl text-center tracking-wide">
					Working through a trigger
				</h1>
				{displayStep()}
				<NavigateButtons
					backButtonDisabled={backButtonDisabled}
					nextButtonDisabled={nextButtonDisabled}
					changePage={changePage}
				/>
			</div>
		</TriggerContext.Provider>
	);
}
