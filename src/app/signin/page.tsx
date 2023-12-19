"use client";
import Link from "next/link";
import { useTransition } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
    const [isPending, startTransition] = useTransition();
      
        const formSubmit = async (formData: FormData ) => {  
              signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                callbackUrl : '/',
                
              });
        };

        const googleSignIn = () => {
            signIn('google', {
                callbackUrl : '/',
              })
        }

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h4 className="text-center">Condensed Fluids</h4>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <button
                className="mb-4 btn bg-white border-[1px] border-black hover:border-black normal-case w-full justify-center rounded-md px-3 font-semibold leading-6  shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                onClick={googleSignIn}
              >
                Continue with Google
              </button>
              <div className="divider before:bg-gray-400 after:bg-gray-400 before:h-[.5px] after:h-[.5px] my-1">or</div>
          <form className="space-y-6" action={formSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="off"
                  className="block w-full input input-secondary rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"               
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="off"
                  className="block w-full input input-secondary px-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-secondary normal-case w-full text-base justify-center rounded-md px-3 font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up.
            </Link>
          </p>
        </div>
      </div>
    );   
}