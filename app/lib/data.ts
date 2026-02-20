import postgres from 'postgres';
import { CbtType, TriggerType } from './definitions';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProfile() {
	try {
		const data = await sql`
			SELECT "user".name
			FROM "user"
			WHERE "user".id = 1;
		`;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch profile data.');
	}
}

export async function fetchTriggers() {
	try {
		const data = await sql<TriggerType[]>`
			SELECT "user".name, trigger.trigger_level, trigger.distance, trigger.sensations, trigger.energy_release, trigger.analyze_trigger, trigger.healing, trigger.reflection_level, trigger.user_id
			FROM "user"
			JOIN trigger ON trigger.user_id = "user".id
			WHERE "user".id = 1;
		`;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch trigger data.');
	}
}

export async function fetchCbt() {
	try {
		const data = await sql<CbtType[]>`
			SELECT "user".name, cbt.thought, cbt.distortions, cbt.evidence, cbt.user_id
			FROM "user"
			JOIN cbt ON cbt.user_id = "user".id
			WHERE "user".id = 1;
		`;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch cbt data.');
	}
}
