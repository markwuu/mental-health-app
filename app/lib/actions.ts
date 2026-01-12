'use server';

import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type State = {
	errors?: {
		amount?: string[];
	};
	message?: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTrigger(userId: string, data: any) {
	const {
		triggerLevel,
		distance,
		sensations,
		energyRelease,
		analyzeTrigger,
		healing,
		reflectionLevel,
	} = data;

	try {
		await sql`
			INSERT INTO "trigger" (trigger_level, distance, sensations, energy_release, analyze_trigger, healing, reflection_level, user_id)
			VALUES (${triggerLevel}, ${distance}, ${sensations}::jsonb, ${energyRelease}::jsonb, ${analyzeTrigger}::jsonb, ${healing}::jsonb, ${reflectionLevel}, ${userId});
		`;
		console.log('submitted to db');
	} catch (error) {
		console.error(error);
		return {
			message: 'Database error: Failed to create trigger.',
		};
	}

	redirect('/triggered');
}
