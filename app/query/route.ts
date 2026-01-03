import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listTriggers() {
	const data = await sql`
		SELECT "user".name, trigger.trigger_level, trigger.distance, trigger.sensations, trigger.energy_release, trigger.analyze_trigger, trigger.healing, trigger.reflection_level, trigger.user_id
		FROM "user"
		JOIN trigger ON trigger.user_id = "user".id
		WHERE "user".id = 1;
	`;

	return data;
}

export async function GET() {
	try {
		return Response.json(await listTriggers());
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
