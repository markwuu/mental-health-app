'use client';

import Header from '@/app/ui/header';
import { paginateCbtQuery } from '@/app/lib/data';
import Pagination from './pagination';
import { CbtType } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function WorkingThroughATriggerPage() {
	const [page, setPage] = useState(1);
	const [data, setData] = useState<{
		data: CbtType[];
		pagination: {
			page: number;
			pageSize: number;
			totalRecords: number;
			totalPages: number;
			hasNext: boolean;
			hasPrev: boolean;
		};
	}>();

	useEffect(() => {
		const getData = async () => {
			try {
				const cbt = await paginateCbtQuery(page, 5);
				setData(cbt);
			} catch (err) {
				console.error(err);
			}
		};
		getData();
	}, [page]);

	const shortenString = (str: string, num: number) => {
		if (str.length > num) {
			return str.slice(0, num) + '...';
		} else {
			return str;
		}
	};

	return (
		<div className="space-y-8 p-20 max-w-4xl w-187.5 mx-auto py-16">
			<div className="text-center">
				<Link
					href="/cognitive-behavioral-therapy"
					className="text-2xl text-center uppercase font-bold tracking-tight font-mono"
				>
					Cognitive Behavior Therapy
				</Link>
				<span className="text-2xl text-center uppercase font-bold tracking-tight font-mono">
					{' / '}
				</span>
				<Link
					href="/cognitive-behavioral-therapy/entries"
					className="text-2xl text-center uppercase font-bold tracking-tight font-mono underline underline-offset-6"
				>
					Entries
				</Link>
			</div>
			{data?.data.map((entry) => {
				return (
					<div key={entry.id} className="border-2 border-white p-3 rounded-lg">
						<h1>
							{entry.id}. {shortenString(entry.thought, 60)}
						</h1>
					</div>
				);
			})}
			<div className="flex justify-center">
				{data ? (
					<Pagination
						totalPages={data.pagination.totalPages}
						initialPage={page}
						onPageChange={(p) => setPage(p)}
					/>
				) : null}
			</div>
		</div>
	);
}
