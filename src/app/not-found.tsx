import Link from "next/link";

export default function PageNotFound(){
    return <div className="h-[40vh] flex justify-center items-center m-8">
        <div className="text-center">
          <p className="text-base font-semibold text-error">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="btn normal-case text-sm font-semibold shadow-sm btn-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
    </div>;
}