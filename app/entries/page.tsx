'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';
import { TriggerType } from '../lib/definitions';
import NavigateButtons from '../components/navigateButtons';
import Header from '../ui/header';

export default function WorkingThroughATriggerPage() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState('Trigger');
	const [backButtonDisabled] = useState<boolean>(false);
	const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);

	const handleDisableButton = (value: TriggerType, type: string) => {
		//todo handle disable button
	};

	const changePage = (direction: 'next' | 'back') => {
		//todo implement change page
	};

	return (
		<div className="space-y-8 p-20 max-w-4xl w-187.5 mx-auto py-16">
			<Header text="Cognitive Behavioral Therapy Entries" />
			<NavigateButtons
				backButtonDisabled={backButtonDisabled}
				nextButtonDisabled={nextButtonDisabled}
				changePage={changePage}
			/>
		</div>
	);
}
