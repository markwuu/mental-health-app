export default function Header({ text }: { text: string }) {
	return (
		<h1 className="text-2xl text-center uppercase font-bold tracking-tight font-mono">
			{text}
		</h1>
	);
}
