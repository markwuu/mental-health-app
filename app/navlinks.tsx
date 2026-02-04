'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navlinks({ name }: { name: string }) {
	const pathname = usePathname();
	const currentTime = new Date();

	const getGreetingText = () => {
		const hour = currentTime.getHours();
		if (hour >= 5 && hour < 12) {
			return `Good Morning, ${name}`;
		} else if (hour >= 12 && hour < 18) {
			return `Good Afternoon, ${name}`;
		} else {
			return `Good Evening, ${name}`;
		}
	};

	return (
		<ul className="flex gap-8 tracking-wide ">
			<li
				className={`uppercase font-mono ${
					pathname === '/' ? 'underline underline-offset-6 font-bold' : ''
				}`}
			>
				<Link href="/">Home</Link>
			</li>
			<li
				className={`uppercase font-mono ${
					pathname === '/cognitive-behavioral-therapy'
						? 'underline underline-offset-6 font-bold'
						: ''
				}`}
			>
				<Link href="/cognitive-behavioral-therapy">CBT</Link>
			</li>
			<li
				className={`uppercase font-mono ${
					pathname === '/triggered'
						? 'underline underline-offset-6 font-bold'
						: ''
				}`}
			>
				<Link href="/triggered">Triggered</Link>
			</li>
			<li
				className={`uppercase font-mono ${
					pathname === '/entries'
						? 'underline underline-offset-6 font-bold'
						: ''
				}`}
			>
				<Link href="/entries">Entries</Link>
			</li>
			<li className="ml-auto font-mono">
				<span className="italic">{getGreetingText()} </span>🖤
			</li>
		</ul>
	);
}
