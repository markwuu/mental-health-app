'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navlinks({ name }: { name: string }) {
	const pathname = usePathname();
	const currentTime = new Date();

	const getGreetingText = () => {
		const hour = currentTime.getHours();
		if (hour >= 5 && hour < 12) {
			return `Morning, ${name}!`;
		} else if (hour >= 12 && hour < 18) {
			return `Afternoon, ${name}!`;
		} else {
			return `Evening, ${name}!`;
		}
	};

	return (
		<ul className="flex gap-8">
			<li
				className={`${pathname === '/' ? 'underline underline-offset-6' : ''}`}
			>
				<Link href="/">Home</Link>
			</li>
			<li
				className={`${
					pathname === '/cognitive-behavioral-therapy'
						? 'underline underline-offset-6'
						: ''
				}`}
			>
				<Link href="/cognitive-behavioral-therapy">CBT</Link>
			</li>
			<li
				className={`${
					pathname === '/triggered' ? 'underline underline-offset-6' : ''
				}`}
			>
				<Link href="/triggered">Triggered</Link>
			</li>
			<li className="ml-auto">{getGreetingText()}</li>
		</ul>
	);
}
