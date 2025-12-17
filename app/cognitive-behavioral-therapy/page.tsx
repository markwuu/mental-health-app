'use client';

import Thought from './steps/thought';
import Distortion from './steps/distortion';
import Evidence from './steps/evidence';
import Reframed from './steps/reframed';
import Summary from './steps/summary';
import { useState } from 'react';
import NavigateButtons from './components/navigateButtons';
import { useRouter } from 'next/navigation';

export enum Page {
	Thought = 'Thought',
	Distortion = 'Distortion',
	Evidence = 'Evidence',
	Reframed = 'Reframed',
	Summary = 'Summary',
}

export default function CognitiveBehavioralTherapyPage() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState<Page>(Page.Thought);

	const displayStep = () => {
		switch (currentPage) {
			case Page.Thought:
				return <Thought />;
			case Page.Distortion:
				return <Distortion />;
			case Page.Evidence:
				return <Evidence />;
			case Page.Reframed:
				return <Reframed />;
			case Page.Summary:
				return <Summary />;
			default:
				return <Thought />;
		}
	};

	const changePage = (direction: 'next' | 'back') => {
		if (direction === 'next') {
			switch (currentPage) {
				case Page.Thought:
					setCurrentPage(Page.Distortion);
					break;
				case Page.Distortion:
					setCurrentPage(Page.Evidence);
					break;
				case Page.Evidence:
					setCurrentPage(Page.Reframed);
					break;
				case Page.Reframed:
					setCurrentPage(Page.Summary);
					break;
				case Page.Summary:
					router.push('/');
					break;
				default:
					setCurrentPage(Page.Thought);
			}
		} else if (direction === 'back') {
			switch (currentPage) {
				case Page.Thought:
					router.push('/');
					break;
				case Page.Distortion:
					setCurrentPage(Page.Thought);
					break;
				case Page.Evidence:
					setCurrentPage(Page.Distortion);
					break;
				case Page.Reframed:
					setCurrentPage(Page.Evidence);
					break;
				case Page.Summary:
					setCurrentPage(Page.Reframed);
					break;
				default:
					setCurrentPage(Page.Thought);
			}
		}
	};

	return (
		<div className="space-y-8 p-20">
			{displayStep()}
			<NavigateButtons changePage={changePage} />
		</div>
	);
}
