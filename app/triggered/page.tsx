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

export type TriggerContextType = {
	level: number;
	distance: boolean | null;
	sensations: sensation[];
	energyRelease: energyRelease[];
	analyzeTrigger: analyzeTrigger;
	healing: healing;
	reflect: number;
};

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
	level: 1,
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
	reflect: 1,
};

export const TriggerContext = createContext<TriggerContextType>(emptyTrigger);

export default function WorkingThroughATriggerPage() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState('Trigger');
	const [trigger, setTrigger] = useState<TriggerContextType>(emptyTrigger);

	// useEffect to check localstorage and set trigger with user input values

	const updateTrigger = (
		value:
			| { level: number }
			| { distance: boolean }
			| { sensations: sensation[] }
			| { energyRelease: energyRelease[] }
			| { analyzeTrigger: analyzeTrigger }
			| { healing: healing }
			| { reflect: number },
	) => {
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
				if (currentPage === 'Trigger') return setCurrentPage('Distance');
				if (currentPage === 'Distance') return setCurrentPage('Sensations');
				if (currentPage === 'Sensations')
					return setCurrentPage('EnergyRelease');
				if (currentPage === 'EnergyRelease') return setCurrentPage('Analyze');
				if (currentPage === 'Analyze') return setCurrentPage('Healing');
				if (currentPage === 'Healing') return setCurrentPage('Reflect');
				if (currentPage === 'Reflect') return setCurrentPage('Summary');
				if (currentPage === 'Summary') return router.push('/');
			case 'back':
				if (currentPage === 'Trigger') return router.push('/');
				if (currentPage === 'Distance') return setCurrentPage('Trigger');
				if (currentPage === 'Sensations') return setCurrentPage('Distance');
				if (currentPage === 'EnergyRelease')
					return setCurrentPage('Sensations');
				if (currentPage === 'Analyze') return setCurrentPage('EnergyRelease');
				if (currentPage === 'Healing') return setCurrentPage('Analyze');
				if (currentPage === 'Reflect') return setCurrentPage('Healing');
				if (currentPage === 'Summary') return setCurrentPage('Reflect');

			default:
				return null;
		}
	};

	return (
		<TriggerContext.Provider value={trigger}>
			<div className="space-y-8 p-20 max-w-4xl">
				<h1 className="text-3xl underline">Working through a trigger</h1>
				{displayStep()}
				<NavigateButtons changePage={changePage} />
			</div>
		</TriggerContext.Provider>
	);
}
