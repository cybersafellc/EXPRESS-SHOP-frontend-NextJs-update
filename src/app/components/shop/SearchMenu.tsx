"use client";

import { useRouter } from "next/navigation";

export default function SearchMenuComponent() {
  const router = useRouter();
  const navigatePage = (e: any) => {
    if (e.currentTarget.search.value) {
      return router.push(`/shop?search=${e.currentTarget.search.value}`);
    }
  };
  return (
    <>
      <form onSubmit={(e) => navigatePage(e)}>
        <div className="pt-10 px-5 flex justify-center">
          <label className="input input-bordered flex items-center gap-2 bg-slate-300 w-9/12 text-black rounded-r-none">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              name="search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <button className="btn rounded-l-none" type="submit">
            Search
          </button>
        </div>
      </form>
    </>
  );
}
