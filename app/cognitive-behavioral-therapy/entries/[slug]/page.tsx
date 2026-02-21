import Header from '@/app/ui/header';
import { paginateCbtQuery } from '@/app/lib/data';
import Pagination from '../pagination';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		slug: number; // The dynamic segment name must match the folder name: [slug]
	};
}

export default async function WorkingThroughATriggerPage({
	params,
}: PageProps) {
	const { slug } = await params;
	const cbt = await paginateCbtQuery(slug, 5);
	const { data, pagination } = cbt;

	if (Number(slug) > pagination.totalPages) notFound();

	return (
		<div className="space-y-8 p-20 max-w-4xl w-187.5 mx-auto py-16">
			<Header text="Cognitive Behavioral Therapy Entries" />
			{data.map((entry) => {
				return (
					<div key={entry.id}>
						<h1>{entry.id}</h1>
					</div>
				);
			})}
			<div className="flex justify-center">
				<Pagination
					totalPages={pagination.totalPages}
					initialPage={Number(slug)}
				/>
			</div>
		</div>
	);
}
