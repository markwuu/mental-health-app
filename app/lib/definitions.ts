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
}
