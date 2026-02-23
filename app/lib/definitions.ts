export type sensation = {
	label: string;
	checked: boolean;
};

export type energyRelease = {
	label: string;
	checked: boolean;
};

export type distortion = {
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
	triggerLevel: number | undefined;
	distance: boolean | null;
	sensations: sensation[];
	energyRelease: energyRelease[];
	analyzeTrigger: analyzeTrigger;
	healing: healing;
	reflectionLevel: number | undefined;
}

export interface CbtType {
	id?: number;
	thought: string;
	distortions: distortion[];
	evidence: string;
	reframed: string;
	created_at?: string;
}

export const distortionList = [
	{ label: 'catastrophizing', checked: false },
	{ label: 'should statements', checked: false },
	{ label: 'magnification', checked: false },
	{ label: 'minimization', checked: false },
	{ label: 'emotional reasoning', checked: false },
	{ label: 'mental filter', checked: false },
	{ label: 'disqualify the positive', checked: false },
	{ label: 'all-or-nothing thinking', checked: false },
	{ label: 'personalization', checked: false },
	{ label: 'blaming', checked: false },
	{ label: 'mind reading', checked: false },
	{ label: 'fortune telling', checked: false },
	{ label: 'labeling', checked: false },
	{ label: 'overgeneralization', checked: false },
	{ label: 'jumping to conclusions', checked: false },
];

export const emptyCBT = {
	thought: '',
	distortions: distortionList,
	evidence: '',
	reframed: '',
};
