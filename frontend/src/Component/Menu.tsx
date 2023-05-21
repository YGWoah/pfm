import React, { Fragment } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
const Nav = () => {
  return (
    <section className="flex h-full w-full">
      <div className="sticky flex flex-col items-center basis-80 h-full overflow-hidden text-black  border-r border-gray-700 ">
        <a className="flex items-center w-full px-3 mt-3" href="#">
          <span className="ml-2 text-sm font-bold">The App</span>
        </a>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
            <NavLink
              to="/article"
              className={({ isActive, isPending }) =>
                `flex items-center w-full h-12 px-3 mt-2 rounded ${
                  isActive
                    ? 'hover:bg-gray-700 hover:text-gray-300'
                    : isPending
                    ? 'bg-gray-700 text-gray-300'
                    : ''
                }`
              }
            >
              <span className="ml-2 text-sm font-medium">
                Articles
              </span>
            </NavLink>

            <NavLink
              // className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              className={({ isActive, isPending }) =>
                `flex items-center w-full h-12 px-3 mt-2 rounded ${
                  isActive
                    ? 'hover:bg-gray-700 hover:text-gray-300'
                    : isPending
                    ? 'bg-gray-700 text-gray-300'
                    : ''
                }`
              }
              to="/article/create"
            >
              <span className="ml-2 text-sm font-medium">
                Create new Article
              </span>
            </NavLink>

            <NavLink
              className={({ isActive, isPending }) =>
                `flex items-center w-full h-12 px-3 mt-2 rounded ${
                  isActive
                    ? 'hover:bg-gray-700 hover:text-gray-300'
                    : isPending
                    ? 'bg-gray-700 text-gray-300'
                    : ''
                }`
              }
              to="/profile"
            >
              <span className="ml-2 text-sm font-medium">
                Profile
              </span>
            </NavLink>
          </div>
          <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
            <a
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              <span className="ml-2 text-sm font-medium">
                Settings
              </span>
            </a>
          </div>
        </div>

        <button className="flex items-center justify-center w-full h-16 mt-auto   hover:bg-gray-700 hover:text-gray-300">
          <span className="ml-2 text-sm font-medium">Log Out</span>
        </button>
      </div>
      <div className="grow scroll-smooth overflow-y-scroll ">
        <Outlet />
      </div>
    </section>
  );
};
export default Nav;
