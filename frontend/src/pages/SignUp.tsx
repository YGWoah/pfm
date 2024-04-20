import { RefObject, useCallback, useRef, useState } from 'react';
import axios from 'axios';
import CustomInput from '../Component/CustomInput';
import { Toaster, toast } from 'sonner';
//import ToastMessage from '../Compenents/supCompenent/ToastMessage';

const SignUp = () => {
	const [clickable, setClickable] = useState(true);

	const FullName: RefObject<HTMLInputElement> = useRef(null);
	const Email: RefObject<HTMLInputElement> = useRef(null);
	const Password: RefObject<HTMLInputElement> = useRef(null);
	const Verify: RefObject<HTMLInputElement> = useRef(null);
	const fullNamePattern = /^[A-Za-z\s]+$/;
	const onChangeEmailPattern = /^[a-zA-Z0-9_-]+(@[a-zA-Z0-9_-]+)?$/;
	const onBlurEmailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	const SignUp = useCallback(() => {
		toast.info('A new is about to be created');
		var matchedCase = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
		if (
			!FullName.current ||
			!Email.current ||
			!Password.current ||
			!Verify.current
		) {
			return;
		}

		if (!matchedCase.test(Password.current.value)) {
			toast.error('Password is not valid');
			return;
		} else {
			console.log('text');
		}
		if (Password.current.value !== Verify.current.value) {
			toast.error('The password do not match');
			return;
		}
		let payload = {
			name: FullName.current.value,
			email: Email.current.value,
			password: Password.current.value,
		};
		setClickable(false);
		axios.post('/auth/register', payload).then((res) => {
			console.log(res.data);
			setClickable(true);
			toast.success('An account has been created!!');
		});
	}, []);
	return (
		<>
			<div className="w-full h-full flex justify-center m-8 sm:m-4">
				<div className="w-full flex flex-col justify-center py-8 sm:px-6 sm:w-3/5 md:w-1/2 lg:px-8 lg:w-1/2">
					<div className="flex items-center justify-center">
						<h2 className="text-2xl font-medium leading-7 m-5 black">
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
										<CustomInput
											id="fullName"
											name="fullName "
											type="name"
											autoComplete="email"
											onChangePattern={fullNamePattern}
											onChangeErrorMessage="Please enter letters and spaces only"
											required
											ref={FullName}
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
										<CustomInput
											id="email"
											name="email"
											type="email"
											onChangePattern={onChangeEmailPattern}
											onBlurPattern={onBlurEmailPattern}
											onChangeErrorMessage="Please use only letters, numbers, -, _, and @"
											onBlurErrorMessage="Please insert a valid Email"
											ref={Email}
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
										<CustomInput
											id="password"
											name="password"
											type="password"
											onBlurPattern={
												/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/
											}
											ref={Password}
											onBlurErrorMessage="Password must contain at least one digit, one letter, one special character, and be at least 8 characters long."
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
										className={
											' flex signIn items-center justify-center bg-primary  text-white rounded-md text-base w-32    h-10 ' +
											(clickable ? ' ' : 'cursor-not-allowed opacity-50')
										}
									>
										Sign in
									</button>
									<Toaster />
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
