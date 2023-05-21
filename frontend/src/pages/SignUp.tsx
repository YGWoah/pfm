import React, {
  RefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
//import ToastMessage from '../Compenents/supCompenent/ToastMessage';

const SignUp = () => {
  const [clickable, setClickable] = useState(true);
  //i use Refs to get the value of the input
  const FullName: RefObject<HTMLInputElement> = useRef(null);
  const Email: RefObject<HTMLInputElement> = useRef(null);
  const Password: RefObject<HTMLInputElement> = useRef(null);
  const Verify: RefObject<HTMLInputElement> = useRef(null);
  //i use useCallback to  cache the fumction althiugh it is not neccesery
  const SignUp = useCallback(() => {
    //check if the password is valid and only containes letters and numbers and special characters

    var matchedCase = /^[a-zA-Z0-9!@$%^&*]{8,16}$/;

    if (
      !FullName.current ||
      !Email.current ||
      !Password.current ||
      !Verify.current
    ) {
      return;
    }

    if (!matchedCase.test(Password.current.value)) {
      console.log('Password is not valid');
      console.log(Password.current.value);
      return;
    } else {
      console.log('text');
    }
    if (Password.current.value !== Verify.current.value) {
      console.log('Password is not match');
      return;
    }
    let payload = {
      username: FullName.current.value,
      email: Email.current.value,
      password: Password.current.value,
    };
    setClickable(false);
    axios.post('/api/users/register', payload).then((res) => {
      console.log(res.data);
      setClickable(true);
    });
  }, []);
  return (
    <>
      <div className="w-full h-full flex justify-center m-8 sm:m-4">
        <div className="w-full flex flex-col justify-center py-8 sm:px-6 sm:w-3/5 md:w-1/2 lg:px-8 lg:w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Create new account
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
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="fullName"
                      name="fullName "
                      type="name"
                      ref={FullName}
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
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
                      ref={Email}
                      autoComplete="email"
                      required
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
                      ref={Password}
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Verify Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="Verifypassword"
                      type="password"
                      ref={Verify}
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={SignUp}
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
        {/* <ToastMessage message={'An account has been created!!'} /> */}
      </div>
    </>
  );
};

export default SignUp;
