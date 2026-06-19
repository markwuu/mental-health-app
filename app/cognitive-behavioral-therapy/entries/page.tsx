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
			<div className='text-center flex justify-between items-center'>
				<Link
					href='/cognitive-behavioral-therapy'
					className='text-2xl font-serif font-black italic tracking-[-0.06em] px-2 py-2 leading-none uppercase'
				>
					Cognitive Behavior Therapy
				</Link>
				<span className='text-xl text-center font-bold tracking-tight font-mono'>
					{' > '}
				</span>
				<Link
					href='/cognitive-behavioral-therapy/entries'
					className='bg-[#d02309] text-white text-2xl font-serif font-black italic tracking-[-0.06em] px-2 py-2 leading-none uppercase'
				>
					Entries
				</Link>
			</div>
			<div className='p-5 h-83 rounded-lg bg-[#d02309]'>
				{data?.data.map((entry) => {
					return (
						<Link
							key={entry.id}
							href={`/cognitive-behavioral-therapy/entries/${entry.id}`}
						>
							<div
								key={entry.id}
								className='p-3 rounded-lg mb-3 bg-black cursor-pointer hover:text-[#d09a92]'
							>
								<div>
									<span className='font-bold'>[ Entry {entry?.id} 🦇 </span>
									{entry?.updated_at
										? new Date(entry.updated_at).toLocaleDateString()
										: ''}
									<span className='font-bold'> ] </span>
									<span className='italic'>
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
