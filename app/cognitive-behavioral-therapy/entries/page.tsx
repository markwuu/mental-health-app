'use client';

import { paginateCbtQuery } from '@/app/lib/data';
import Pagination from './pagination';
import { CbtType } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CognitiveBehavioralTherapyEntriesPage() {
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
		<div className='space-y-8 p-20 max-w-4xl w-187.5 mx-auto py-16'>
			<div className='text-center'>
				<Link
					href='/cognitive-behavioral-therapy'
					className='text-2xl text-center uppercase font-bold tracking-tight font-mono'
				>
					Cognitive Behavior Therapy
				</Link>
				<span className='text-2xl text-center uppercase font-bold tracking-tight font-mono'>
					{' > '}
				</span>
				<Link
					href='/cognitive-behavioral-therapy/entries'
					className='text-2xl text-center uppercase font-bold tracking-tight font-mono underline underline-offset-6 text-slate-500'
				>
					Entries
				</Link>
			</div>
			<div className='p-5 h-83 rounded-lg bg-slate-800'>
				{data?.data.map((entry) => {
					return (
						<Link
							key={entry.id}
							href={`/cognitive-behavioral-therapy/entries/${entry.id}`}
						>
							<div
								key={entry.id}
								className='p-3 rounded-lg mb-3 bg-black cursor-pointer hover:text-slate-500'
							>
								<div>
									[{entry?.created_at?.toLocaleString()}]{' '}
									<span className='font-bold italic'>
										{shortenString(entry.thought, 40)}
									</span>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
			<div className='flex justify-center'>
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
