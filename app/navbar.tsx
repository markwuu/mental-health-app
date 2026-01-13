import { fetchProfile } from './lib/data';
import Navlinks from './navlinks';

export default async function Navbar() {
	const profile = await fetchProfile();
	const name = profile[0].name;

	return (
		<div className="flex-row w-3xl md:w-5xl">
			<div className="pt-8 px-10 text-xl">
				<Navlinks name={name} />
			</div>
		</div>
	);
}
