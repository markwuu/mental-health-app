'use server';

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
			SELECT "user".name, cbt.id, cbt.thought, cbt.distortions, cbt.evidence, cbt.user_id
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

export async function fetchCbtEntry(id: string) {
	try {
		const data = await sql<CbtType[]>`
			SELECT "user".name, cbt.id, cbt.thought, cbt.distortions, cbt.evidence, cbt.user_id
			FROM "user"
			JOIN cbt ON cbt.user_id = "user".id
			WHERE "user".id = 1 AND cbt.id = ${id};
		`;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch cbt entry data.');
	}
}

export async function paginateCbtQuery(
	page: number = 1,
	pageSize: number = 20,
): Promise<{
	data: CbtType[];
	pagination: {
		page: number;
		pageSize: number;
		totalRecords: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}> {
	if (page < 1) throw new Error('Page number must be 1 or greater.');
	if (pageSize < 1) throw new Error('Page size must be 1 or greater.');
	const cbtQueryString = `
			SELECT "user".name, cbt.id, cbt.thought, cbt.distortions, cbt.evidence, cbt.user_id, cbt.created_at
			FROM "user"
			JOIN cbt ON cbt.user_id = "user".id
			WHERE "user".id = 1
			ORDER BY cbt.created_at DESC
		`;

	const offset = (page - 1) * pageSize;

	const [countResult, dataResult] = await Promise.all([
		sql`SELECT COUNT(*) FROM (${sql.unsafe(cbtQueryString)}) AS total_count`,
		sql.unsafe(
			`${cbtQueryString} LIMIT ${pageSize} OFFSET ${offset}`,
		) as Promise<CbtType[]>,
	]);

	const totalRecords = parseInt(countResult[0].count, 10);
	const totalPages = Math.ceil(totalRecords / pageSize);

	return {
		data: dataResult,
		pagination: {
			page,
			pageSize,
			totalRecords,
			totalPages,
			hasNext: page < totalPages,
			hasPrev: page > 1,
		},
	};
}
