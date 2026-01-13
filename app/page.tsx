import { fetchTriggers } from './lib/data';
import Header from './ui/header';

export default async function Home() {
	const triggers = await fetchTriggers();
	console.log(`🚀 ~ Home ~ triggers:`, triggers);

	return (
		<div className="font-sans">
			<main className="space-y-8 p-20 max-w-4xl w-187.5 mx-auto py-16 border-white border-2">
				<Header text="Healing from Anxious Attachment" />
			</main>
		</div>
	);
}
