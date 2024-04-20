import { NavLink, Outlet } from 'react-router-dom';
const Nav = () => {
	return (
		<section className="flex h-full w-full">
			<div className="sticky flex flex-col items-center basis-80 h-full overflow-hidden text-black  border-r border-gray-700 ">
				<a className="flex items-center w-full px-3 mt-3">
					<span className="ml-2 text-2xl font-bold">The Booy</span>
				</a>
				<div className="w-full px-2">
					<div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
						<NavLink
							to="/home/article"
							className={({ isActive, isPending }) =>
								`flex items-center w-full h-12 px-3 mt-4 rounded text ${
									isActive ? ' text-blue-700' : isPending ? 'bg-blue-700 text-white' : ''
								}`
							}
						>
							<span className="ml-2 text-lg font-semibold">Articles</span>
						</NavLink>

						<NavLink
							className={({ isActive, isPending }) =>
								`flex items-center w-full h-12 px-3 mt-4 rounded text ${
									isActive ? ' text-blue-700' : isPending ? 'bg-blue-700 text-white' : ''
								}`
							}
							to="/home/create"
						>
							<span className="ml-2 text-lg font-semibold">Create new Article</span>
						</NavLink>

						<NavLink
							className={({ isActive, isPending }) =>
								`flex items-center w-full h-12 px-3 mt-4 rounded text ${
									isActive ? ' text-blue-700' : isPending ? 'bg-blue-700 text-white' : ''
								}`
							}
							to="/home/profile"
						>
							<span className="ml-2 text-lg font-semibold">Profile</span>
						</NavLink>
					</div>
					<div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
						<a className="flex items-center w-full h-12 px-3 mt-4 rounded hover:bg-gray-700 hover:text-gray-300">
							<span className="ml-2 text-lg font-semibold">Settings</span>
						</a>
					</div>
				</div>

				<button className="flex items-center justify-center w-full h-16 mt-auto   ">
					<span className="  text-lg font-semibold hover:text-red-700">Log Out</span>
				</button>
			</div>
			<div className="w-10/12 scroll-smooth overflow-y-scroll ">
				<Outlet />
			</div>
		</section>
	);
};
export default Nav;
