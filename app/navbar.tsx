import { fetchProfile } from './lib/data';
import Navlinks from './navlinks';

export default async function Navbar() {
	const profile = await fetchProfile();
	const name = profile[0].name;

	return (
		<div className="w-3xl md:w-4xl hidden sm:block">
			<div className="pt-8 px-10 text-sm">
				<Navlinks name={name} />
			</div>
		</div>
	);
}
