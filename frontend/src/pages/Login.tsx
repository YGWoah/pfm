import{ 
  useCallback,
  useRef,
  useState,
  RefObject,
} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

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
    axios
      .post('/auth/login', data)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem(
            'token',
            JSON.stringify(res.data.token)
          );
          setIsLoggedIn(true);
        }
        setClickable(true);
      })
      .catch((err) => {
        if(err.response.status === 404){
          toast.error('Wrong Email or password');
        }
        console.log(err);
        setClickable(true);
        if (!password.current || !email.current) return;
        email.current.value = '';
        password.current.value = '';
      });
  }, []);
  if (!isLoggedIn) {
    return (
      <>
      <Toaster />
        <div className="flex justify-center w-full h-full">
          <div className=" w-4/5 flex flex-col justify-center py-12 sm:px-6 lg:px-8 sm:w-3/5">
            <div className="flex items-center justify-center ">
              <h2 className=" text-2xl font-medium leading-7 m-5 black">
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

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={handleLogin}
                      className={
                        ' flex signIn items-center justify-center bg-primary  text-white rounded-md text-base w-32    h-10 ' +
                        (clickable
                          ? ' '
                          : 'cursor-not-allowed opacity-50')
                      }
                    >
                      Log In
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
