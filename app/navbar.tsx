'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
	const pathname = usePathname();
	const currentTime = new Date();

	const getGreetingText = () => {
		const hour = currentTime.getHours();
		if (hour >= 5 && hour < 12) {
			return 'Good Morning, Em';
		} else if (hour >= 12 && hour < 18) {
			return 'Good Afternoon, Em';
		} else {
			return 'Good Evening, Em';
		}
	};

	return (
		<div className="flex-row w-7xl">
			<div className="pt-8 px-10 text-xl">
				<ul className="flex gap-8">
					<li
						className={`${
							pathname === '/' ? 'underline underline-offset-6' : ''
						}`}
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
			</div>
		</div>
	);
}
