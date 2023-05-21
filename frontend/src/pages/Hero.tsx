import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../style/Hero.scss';

function Hero() {
  const DispLogIn = () => {
    return;
  };
  const DispSignIn = () => {
    return;
  };
  return (
    <Fragment>
      <div className="header">
        <div className="flex space-btwn">
          <div className="logo">
            {/* <img src={uranus} alt="URANUS" /> */}
          </div>
          <div className="sign flex space-btwn">
            <Link to="/login" className="login">
              Log in
            </Link>
            <input
              type="button"
              value="Sign up"
              className="signIn"
              onClick={DispSignIn}
            />
            {/* <img src={moon} alt="MOON" /> */}
          </div>
        </div>
      </div>
      <div className="first-section flex ">
        <div className="flex ">
          <div className="titles">
            <div className="title  ">
              <p>Unleash Your Thoughts, Ignite the World </p>
            </div>
            <div className="below-title m-5">
              <p>
                Join the Community of Curious Minds, Where Ideas Come
                to Life
              </p>
            </div>
            <div className="title-btns flex w-full justify-center m-10 ">
              <div className="sub-title-btns flex justify-between basis-3/6 ">
                <div className="getStarted flex">
                  <input type="button" value="Get Started" />
                </div>
                <div className="watchVideo flex">
                  {/* <img src={playIcon} alt="" /> */}
                  <a
                    href="https://www.youtube.com/watch?v=jYr0QSJ5Yts&t=995s"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </a>
                  {/* <input type="button" value="Watch Video" /> */}
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
