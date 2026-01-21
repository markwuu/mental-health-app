export default function Input({
	id,
	name,
	placeholder,
	value,
	type,
	required = true,
	handleChange,
	checked,
	onChange,
	readOnly,
	styles,
}: {
	type: string;
	id: string;
	name: string;
	placeholder?: string;
	value?: string;
	required?: boolean;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	styles?: string;
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
				className={`bg-red-50 text-black w-full px-3 py-3 my-2 border border-gray-300 rounded ${styles}`}
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
				className={`h-4 w-4`}
				onChange={onChange}
				checked={checked}
				readOnly={readOnly}
			/>
		);
	} else if (type === 'radio') {
		return (
			<>
				<input
					className={`appearance-none rounded-full w-4 h-4 border-2 border-gray-400 transition-all duration-200 ease-linear mr-1 relative top-1 checked:border-[6px] checked:border-solid checked:border-[#511717] ${styles}`}
					type="radio"
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					checked={checked}
				/>
				<label htmlFor={id} className="pl-2 pr-5">
					{name}
				</label>
			</>
		);
	}
}
