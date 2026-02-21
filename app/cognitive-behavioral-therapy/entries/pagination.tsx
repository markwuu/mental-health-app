'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface PaginationProps {
	totalPages: number;
	initialPage?: number;
}

function Pagination({ totalPages, initialPage = 1 }: PaginationProps) {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const router = useRouter();
	const pathname = usePathname();

	const goToPage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
		const segments = pathname.split('/');
		const slugIndex = segments.length - 1;
		segments[slugIndex] = page.toString();
		const newPath = segments.join('/');
		router.push(newPath);
	};

	const getPageNumbers = (): (number | '...')[] => {
		if (totalPages <= 7)
			return Array.from({ length: totalPages }, (_, i) => i + 1);

		if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
		if (currentPage >= totalPages - 3)
			return [
				1,
				'...',
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages,
			];

		return [
			1,
			'...',
			currentPage - 1,
			currentPage,
			currentPage + 1,
			'...',
			totalPages,
		];
	};

	return (
		<div style={styles.container}>
			{/* Prev */}
			<button
				onClick={() => goToPage(currentPage - 1)}
				disabled={currentPage === 1}
				style={{
					...styles.button,
					...(currentPage === 1 ? styles.disabled : {}),
				}}
			>
				‹
			</button>

			{/* Page numbers */}
			{getPageNumbers().map((page, index) =>
				page === '...' ? (
					<span key={`ellipsis-${index}`} style={styles.ellipsis}>
						...
					</span>
				) : (
					<button
						key={page}
						onClick={() => goToPage(page)}
						style={{
							...styles.button,
							...(page === currentPage ? styles.active : {}),
						}}
					>
						{page}
					</button>
				),
			)}

			{/* Next */}
			<button
				onClick={() => goToPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				style={{
					...styles.button,
					...(currentPage === totalPages ? styles.disabled : {}),
				}}
			>
				›
			</button>
		</div>
	);
}

const styles: Record<string, React.CSSProperties> = {
	container: {
		display: 'flex',
		alignItems: 'center',
		gap: '6px',
	},
	button: {
		padding: '8px 14px',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: '#d1d5db',
		borderRadius: '6px',
		background: '#fff',
		cursor: 'pointer',
		fontSize: '14px',
		fontWeight: 500,
		color: '#374151',
		transition: 'all 0.15s',
	},
	active: {
		background: '#3b82f6',
		color: '#fff',
		borderColor: '#3b82f6',
	},
	disabled: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
	ellipsis: {
		padding: '8px 4px',
		color: '#6b7280',
		fontSize: '14px',
	},
};

export default Pagination;
