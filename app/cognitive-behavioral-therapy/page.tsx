'use client';

import { Thought } from './steps/thought';
import { Distortion } from './steps/distortion';
import { Evidence } from './steps/evidence';
import { Reframed } from './steps/reframed';
import Summary from './steps/summary';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';
import NavigateButtons from '../components/navigateButtons';
import { CbtType, emptyCBT } from '../lib/definitions';
import Button from '../ui/button';
import { createCbt } from '../lib/actions';
import Breadcrumb from '../ui/breadcrumb';

export const CBTContext = createContext<CbtType>(emptyCBT);

export default function CognitiveBehavioralTherapyPage() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState('Thought');
	const [cbt, setCbt] = useState<CbtType>(emptyCBT);
	const [backButtonDisabled, setBackButtonDisabled] = useState<boolean>(true);
	const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
	const [isPending, startTransition] = useTransition();

	const handleDisableButton = (value: CbtType, type: string) => {
		const { thought, distortions, evidence, reframed } = value;

		const thoughtAnswered = thought && thought.length > 0;
		const distortionsAnswered = distortions
			.map((distortion) => (distortion.checked === true ? true : false))
			.includes(true);
		const evidenceAnswered = evidence && evidence.length > 0;
		const reframedAnswered = reframed && reframed.length > 0;

		if (type === 'updateCbt') {
			setNextButtonDisabled(true);
			switch (currentPage) {
				case 'Thought':
					if (thoughtAnswered) setNextButtonDisabled(false);
					break;
				case 'Distortion':
					if (distortionsAnswered) setNextButtonDisabled(false);
					break;
				case 'Evidence':
					if (evidenceAnswered) setNextButtonDisabled(false);
					break;
				case 'Reframed':
					if (reframedAnswered) setNextButtonDisabled(false);
					break;

				default:
					return null;
			}
		}

		if (type === 'changePage:next') {
			setNextButtonDisabled(true);
			if (currentPage === 'Thought' && distortionsAnswered) {
				setNextButtonDisabled(false);
			}
			if (currentPage === 'Distortion' && evidenceAnswered) {
				setNextButtonDisabled(false);
			}
			if (currentPage === 'Evidence' && reframedAnswered) {
				setNextButtonDisabled(false);
			}
			if (currentPage === 'Reframed') {
				setNextButtonDisabled(false);
			}
		} else if (type === 'changePage:back') {
			setNextButtonDisabled(false);
		}
	};

	const updateCbt = (value: CbtType) => {
		handleDisableButton(value, 'updateCbt');
		setCbt((prev) => ({ ...prev, ...value }));
	};

	const displayStep = () => {
		if (currentPage === 'Thought') return <Thought updateCbt={updateCbt} />;
		if (currentPage === 'Distortion')
			return <Distortion updateCbt={updateCbt} />;
		if (currentPage === 'Evidence') return <Evidence updateCbt={updateCbt} />;
		if (currentPage === 'Reframed') return <Reframed updateCbt={updateCbt} />;
		if (currentPage === 'Summary') return <Summary />;

		return null;
	};

	const changePage = (direction: 'next' | 'back') => {
		handleDisableButton(cbt, `changePage:${direction}`);

		switch (direction) {
			case 'next':
				if (currentPage === 'Thought') {
					setBackButtonDisabled(false);
					return setCurrentPage('Distortion');
				}
				if (currentPage === 'Distortion') return setCurrentPage('Evidence');
				if (currentPage === 'Evidence') return setCurrentPage('Reframed');
				if (currentPage === 'Reframed') return setCurrentPage('Summary');
				if (currentPage === 'Summary') return router.push('/');
			case 'back':
				if (currentPage === 'Distortion') {
					setBackButtonDisabled(true);
					return setCurrentPage('Thought');
				}
				if (currentPage === 'Evidence') return setCurrentPage('Distortion');
				if (currentPage === 'Reframed') return setCurrentPage('Evidence');
				if (currentPage === 'Summary') return setCurrentPage('Reframed');

			default:
				return null;
		}
	};

	const postCbtData = () => {
		startTransition(async () => {
			await createCbt('1', cbt);
		});
	};

	return (
		<CBTContext.Provider value={cbt}>
			<div className='space-y-8 p-20 max-w-4xl w-187.5 mx-auto py-16'>
				<Breadcrumb pageTitle='cbt' />
				{isPending ? <span>Sending data...</span> : null}
				{displayStep()}
				{currentPage === 'Summary' ? (
					<Button name='Submit' onClick={postCbtData} />
				) : (
					<NavigateButtons
						backButtonDisabled={backButtonDisabled}
						nextButtonDisabled={nextButtonDisabled}
						changePage={changePage}
					/>
				)}
			</div>
		</CBTContext.Provider>
	);
}
