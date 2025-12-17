export default function Input({
	id,
	name,
	placeholder,
	value,
	type,
	required = true,
	handleChange,
}: {
	type: string;
	id: string;
	name: string;
	placeholder?: string;
	value?: string;
	required?: boolean;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	if (type === 'text') {
		return (
			<input
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				required={required}
				className="bg-red-50 text-black w-full px-3 py-3 my-2 border border-gray-300 rounded"
				onChange={handleChange}
			/>
		);
	} else if (type === 'checkbox') {
		return (
			<input
				type="checkbox"
				id={id}
				name={name}
				value={value}
				className="h-6 w-6"
			/>
		);
	}
}
