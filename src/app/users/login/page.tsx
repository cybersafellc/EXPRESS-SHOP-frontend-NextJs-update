"use client";

import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const logins = async (username: string, password: string, cb: any) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const responses = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    const res = await responses.json();
    if (res.errors) {
      throw new Error(res.message);
    } else {
      cb(null, res);
    }
    return;
  } catch (error) {
    cb(error, null);
    return;
  }
};

export default function LoginPage() {
  const [loadingButton, setLoadingButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const alertComponent: any = useRef(null);

  const redirect = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoadingButton(true);
    alertComponent.current.className = "alert alert-error rounded-none hidden";
    if (!e.currentTarget.email.value || !e.currentTarget.password.value) {
      setErrorMessage("Email and password required!");
      alertComponent.current.className = "alert alert-error rounded-none";
      setLoadingButton(false);
      return;
    }

    logins(
      e.currentTarget.email.value,
      e.currentTarget.password.value,
      (err: any, ress: any) => {
        if (err) {
          setErrorMessage(err.message);
          alertComponent.current.className = "alert alert-error rounded-none";
          setLoadingButton(false);
          return;
        }
        setCookie("access_token", ress.data.access_token);
        setCookie("refresh_token", ress.data.refresh_token);
        setErrorMessage(ress.message);
        alertComponent.current.className = "alert alert-success rounded-none";

        setTimeout(() => {
          redirect.push("/");
        }, 2000);
      }
    );
  };

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-slate-100"
        style={{
          backgroundImage: "url('/placeholder.svg')",
        }}
      >
        <div className="flex items-center justify-center h-full">
          <form
            className="mx-auto w-[350px] space-y-6 bg-white  rounded-lg shadow-lg p-6 text-black"
            onSubmit={(e) => handleLogin(e)}
          >
            <div className="space-y-2 text-center">
              <h1 className="text-2xl  ">Login</h1>
            </div>
            <div
              role="alert"
              className="alert alert-error hidden"
              ref={alertComponent}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="capitalize">{errorMessage}</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="input input-bordered flex items-center gap-2 bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Email"
                    name="email"
                  />
                </label>
              </div>
              <div className="space-y-2">
                <label className="input input-bordered flex items-center gap-2 bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Password"
                    name="password"
                  />
                </label>
              </div>
              <div>
                <Link
                  href="/users/reset-password"
                  className="text-sm text-primary"
                >
                  Forget Password?
                </Link>
              </div>
              {loadingButton ? (
                <button className="w-full btn" disabled type="submit">
                  <span className="loading loading-dots loading-md"></span>
                </button>
              ) : (
                <button className="w-full btn" type="submit">
                  Login
                </button>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link className="underline text-primary" href="/users/signup">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
