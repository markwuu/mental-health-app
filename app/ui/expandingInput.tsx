import React, { useState, useRef, useEffect } from 'react';

export default function AutoExpandingTextarea({
	id,
	name,
	placeholder,
	value,
	required = true,
	onChange,
	styles,
}: {
	id: string;
	name: string;
	placeholder?: string;
	value?: string;
	required?: boolean;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	styles?: string;
}) {
	const [inputValue, setInputValue] = useState(value);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	// Automatically adjust height when text changes
	useEffect(() => {
		const textarea = textareaRef.current; //captures the textarea DOM node once it's rendered
		if (textarea) {
			textarea.style.height = 'auto'; // Reset height to recalculate
			textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
		}
	}, [inputValue]); // Trigger effect every time textarea inputValue state updates

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e) {
			setInputValue(e.target.value);
			onChange(e);
		}
	};

	return (
		<textarea
			id={id}
			ref={textareaRef}
			name={name}
			placeholder={placeholder}
			value={inputValue}
			onChange={handleChange}
			rows={1}
			required={required}
			className={`bg-red-50 text-black w-full px-3 py-3 my-2 border border-gray-300 rounded leading-normal overflow-hidden resize-none ${styles}`}
		/>
	);
}
