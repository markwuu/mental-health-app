export default function Buttohn({
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
	const buttonTextColor = isDisabled ? 'text-[#414141]' : 'text-[#ffff]';
	return (
		<button
			className={`px-7 py-1.5 my-1 border-3 border-gray-300 rounded ${buttonTextColor} ${styles}`}
			onClick={() => onClick(name)}
			disabled={isDisabled}
		>
			{name}
		</button>
	);
}
