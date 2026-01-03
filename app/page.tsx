import { fetchTriggers } from './lib/data';

export default async function Home() {
	const triggers = await fetchTriggers();
	console.log(`🚀 ~ Home ~ triggers:`, triggers);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
				hi
			</main>
		</div>
	);
}
