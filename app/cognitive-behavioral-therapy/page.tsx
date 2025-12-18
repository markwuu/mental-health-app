'use client';

import { Thought } from './steps/thought';
import Distortion from './steps/distortion';
import Evidence from './steps/evidence';
import Reframed from './steps/reframed';
import Summary from './steps/summary';
import { useState } from 'react';
import NavigateButtons from './components/navigateButtons';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';

type CBTContextType = {
	thought: string;
	distortions: string[];
	evidence: string;
	reframed: string;
};

const emptyCBT = {
	thought: '',
	distortions: [''],
	evidence: '',
	reframed: '',
};

export const CBTContext = createContext<CBTContextType>(emptyCBT);

export default function CognitiveBehavioralTherapyPage() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState('Thought');
	const [cbt, setCbt] = useState<CBTContextType>(emptyCBT);

	const updateCbt = (value: string) => {
		setCbt((prev) => ({
			...prev,
			thought: value,
		}));
	};

	const displayStep = () => {
		if (currentPage === 'Thought') return <Thought updateCbt={updateCbt} />;
		if (currentPage === 'Distortion') return <Distortion />;
		if (currentPage === 'Evidence') return <Evidence />;
		if (currentPage === 'Reframed') return <Reframed />;
		if (currentPage === 'Summary') return <Summary />;

		return null;
	};

	const changePage = (direction: 'next' | 'back') => {
		switch (direction) {
			case 'next':
				if (currentPage === 'Thought') return setCurrentPage('Distortion');
				if (currentPage === 'Distortion') return setCurrentPage('Evidence');
				if (currentPage === 'Evidence') return setCurrentPage('Reframed');
				if (currentPage === 'Reframed') return setCurrentPage('Summary');
				if (currentPage === 'Summary') return router.push('/');
			case 'back':
				if (currentPage === 'Thought') return router.push('/');
				if (currentPage === 'Distortion') return setCurrentPage('Thought');
				if (currentPage === 'Evidence') return setCurrentPage('Distortion');
				if (currentPage === 'Reframed') return setCurrentPage('Evidence');
				if (currentPage === 'Summary') return setCurrentPage('Reframed');

			default:
				return null;
		}
	};

	return (
		<CBTContext.Provider value={cbt}>
			<div className="space-y-8 p-20">
				{displayStep()}
				<NavigateButtons changePage={changePage} />
			</div>
		</CBTContext.Provider>
	);
}
