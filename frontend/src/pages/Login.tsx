import React, {
  useCallback,
  useRef,
  useState,
  RefObject,
} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const email: RefObject<HTMLInputElement> = useRef(null);
  const password: RefObject<HTMLInputElement> = useRef(null);
  const [clickable, setClickable] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = useCallback(() => {
    if (!email.current || !password.current) {
      return;
    }
    let data = {
      email: email.current.value,
      password: password.current.value,
    };

    setClickable(false);
    axios.post('/auth/login', data).then((res) => {
      if (res.data.token) {
        localStorage.setItem('token', JSON.stringify(res.data.token));
        setIsLoggedIn(true);
      }
      setClickable(true);
    });
  }, []);
  if (!isLoggedIn) {
    return (
      <>
        <div className="flex justify-center w-full h-full">
          <div className=" w-4/5 flex flex-col justify-center py-12 sm:px-6 lg:px-8 sm:w-3/5">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Log in to your account
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        ref={email}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        ref={password}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <button className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot your password?
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={handleLogin}
                      style={{ backgroundColor: '#000000' }}
                      className={
                        ' bg-black text-white  px-6 py-2 rounded-2xl p-4 inline-block text-base leading-normal focus:outline-none hover:bg-black hover:text-white  ' +
                        (clickable
                          ? ''
                          : 'cursor-not-allowed opacity-50')
                      }
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/home" />;
  }
};

export default Login;
