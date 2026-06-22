export default function Button({
	styles,
	name,
	onClick,
	disabled,
}: {
	styles?: string;
	name: string;
	onClick: (arg0: string) => void;
	disabled?: boolean;
}) {
	const isDisabled = disabled;
	const buttonTextColor = isDisabled
		? 'opacity-40 cursor-not-allowed'
		: 'bg-[#d02309] border-[#d02309]';
	return (
		<button
			className={`px-3.5 py-2 border border-[#d1d5db] rounded-md bg-white cursor-pointer text-sm font-medium text-[#374151] transition-all duration-150 ${buttonTextColor} ${styles}`}
			onClick={() => onClick(name)}
			disabled={isDisabled}
		>
			{name}
		</button>
	);
}
