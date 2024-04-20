import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../style/Hero.css';

function Hero() {
  // const DispLogIn = () => {
  //   return;
  // };
  // const DispSignIn = () => {
  //   return;
  // };
  return (
    <Fragment>
      <div className="header">
        <div className="flex space-btwn">
          <div className="logo"></div>
          <div className="sign flex space-btwn">
            <Link
              to="/login"
              className="login flex   items-center justify-center text-primary"
            >
              Log in
            </Link>
            <Link
              to="signup"
              className="flex signIn items-center justify-center bg-primary text-white rounded-md text-base w-32 h-9"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="first-section flex ">
        <div className="flex ">
          <div className="titles">
            <div className="title  ">
              <p>Unleash Your Thoughts, Ignite the World </p>
            </div>
            <div className="  font-normal text-lg leading-7 m-5">
              <p className="text-secondary">
                Join the Community of Curious Minds, Where Ideas Come
                to Life
              </p>
            </div>
            <div className=" flex w-full justify-center m-10 ">
              <div className=" flex justify-between basis-3/6 ">
                <div className=" w-40 bg-primary rounded-lg flex items-center  justify-center ">
                  <NavLink
                    to="/home"
                    // className={({isActive,isPending})=>`flex items-center` ${isPending?'
                    // isPending':'isPending'}}
                    className={({ isActive, isPending }) =>
                      `flex items-center text-white ${
                        isActive
                          ? ' text-gray-300'
                          : isPending
                          ? 'bg-black text-white'
                          : ''
                      }`
                    }
                  >
                    Get Started
                  </NavLink>
                </div>
                <div className="w-40   flex cursor-not-allowed ">
                  <a
                    href="https://www.youtube.com/watch?v=jYr0QSJ5Yts&t=995s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center cursor-not-allowed "
                  >
                    <span className="cursor-not-allowed hover:opacity-50">
                      Watch Video
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Hero;
