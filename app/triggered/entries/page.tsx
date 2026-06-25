'use client';

import { paginateTriggerQuery } from '@/app/lib/data';
import Pagination from '../../ui/pagination';
import { TriggerType } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDateToLocal } from '@/app/lib/utils';
import Breadcrumb from '@/app/ui/breadcrumb';

export default function CognitiveBehavioralTherapyEntriesPage() {
	const [page, setPage] = useState(1);
	const [data, setData] = useState<{
		data: TriggerType[];
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
				const trigger = await paginateTriggerQuery(page, 5);
				setData(trigger);
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
			<div className='text-center flex justify-center items-center gap-3'>
				<Link
					href='/triggered'
					className='text-2xl font-serif font-black italic tracking-[-0.06em] px-3 py-2 leading-none uppercase'
				>
					Triggered
				</Link>
				<span className='text-xl text-center font-bold tracking-tight font-mono'>
					{' > '}
				</span>
				<Link
					href='/triggered/entries'
					className='bg-[#d02309] text-white text-2xl font-serif font-black italic tracking-[-0.06em] px-3 py-2 leading-none uppercase'
				>
					Entries
				</Link>
			</div>
			<div className='p-5 h-83 rounded-lg bg-[#d02309]'>
				{data?.data.map((entry) => {
					return (
						<Link key={entry.id} href={`/triggered/entries/${entry.id}`}>
							<div
								key={entry.id}
								className='p-3 rounded-lg mb-3 bg-black cursor-pointer hover:text-[#d09a92]'
							>
								<div>
									<span className='font-bold'>[ Entry {entry?.id} 🦇 </span>
									{entry?.updated_at && formatDateToLocal(entry?.updated_at)}
									<span className='font-bold'> ] </span>
									<span className='italic'>
										{entry?.triggerLevel &&
											shortenString(entry?.triggerLevel.toString(), 35)}
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
