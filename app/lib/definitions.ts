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
	id?: number;
	triggerLevel: number | undefined;
	distance: boolean | null;
	sensations: sensation[];
	energyRelease: energyRelease[];
	analyzeTrigger: analyzeTrigger;
	healing: healing;
	reflectionLevel: number | undefined;
	created_at?: string;
	updated_at?: string;
}

export interface dbTriggerType {
	id?: number;
	trigger_level: number;
	distance: boolean | null;
	sensations: sensation[];
	energy_release: energyRelease[];
	analyze_trigger: analyzeTrigger;
	healing: healing;
	reflection_level: number;
	created_at?: string;
	updated_at?: string;
}

export interface CbtType {
	id?: number;
	thought: string;
	distortions: distortion[];
	evidence: string;
	reframed: string;
	created_at?: string;
	updated_at?: string;
}

export const distortionList = [
	{ label: 'all-or-nothing thinking', checked: false },
	{ label: 'blaming', checked: false },
	{ label: 'catastrophizing', checked: false },
	{ label: 'disqualify the positive', checked: false },
	{ label: 'emotional reasoning', checked: false },
	{ label: 'fortune telling', checked: false },
	{ label: 'jumping to conclusions', checked: false },
	{ label: 'labeling', checked: false },
	{ label: 'magnification', checked: false },
	{ label: 'mental filter', checked: false },
	{ label: 'mind reading', checked: false },
	{ label: 'minimization', checked: false },
	{ label: 'overgeneralization', checked: false },
	{ label: 'personalization', checked: false },
	{ label: 'should statements', checked: false },
];

export const emptyCBT = {
	thought: '',
	distortions: distortionList,
	evidence: '',
	reframed: '',
};
