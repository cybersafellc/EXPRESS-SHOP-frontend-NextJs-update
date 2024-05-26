"use client";

import Link from "next/link";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { accessTokenVerify, getNewAccessToken } from "@/app/func/token";
import { FormatRupiah } from "@arismun/format-rupiah";
import CartsComponent from "../carts/Carts";

interface Props {
  access_token: string | null;
  refresh_token: string | null;
  addToCartEffect?: number;
}

interface Carts {
  description: string;
  id: number;
  img_url: string;
  name: string;
  price: number;
  product_id: number;
  qty: number;
  rating: number;
  sold: number;
  stocks: number;
}

const getCarts = async (access_token: string | null, callback: any) => {
  try {
    const carts = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/carts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );
    const res = await carts.json();
    if (res.errors) {
      throw new Error(res.message);
    } else {
      callback(false, res.data);
    }
    return;
  } catch (error) {
    callback(error, false);
    return;
  }
};

export default function NavbarComponent(props: Props) {
  const [carts, setCarts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [viewCart, setViewCart] = useState(0);

  const redirect = useRouter();
  const handleLogout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setTimeout(() => {
      redirect.push("/users/login");
    }, 1000);
    return;
  };

  const refreshCart = () => {
    let statusToken: boolean = false;
    accessTokenVerify(props.access_token, (status: boolean) => {
      return (statusToken = status);
    });
    if (!statusToken) {
      getNewAccessToken(props.refresh_token, (err: any, newToken: string) => {
        if (err) {
          deleteCookie("access_token");
          deleteCookie("refresh_token");
          useRouter().push("/users/login");
          return;
        }
        props.access_token = newToken;
        return;
      });
    }
    getCarts(props.access_token, (err: any, success: Carts[] | any) => {
      if (err) {
        console.log(err);
        return;
      }
      setCarts(success);
      let totalV = 0;
      success.map((cart: Carts) => {
        setTotalValue(totalValue + cart.price * cart.qty);
        totalV += cart.price * cart.qty;
      });
      setTotalValue(totalV);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      refreshCart();
    }, 2000);
  });
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <>
      <CartsComponent viewCart={viewCart} products={carts} />
      <div className="navbar  bg-black fixed z-10 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Shop</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
              <li>
                <a>About Us</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Express Shop</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {carts.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{carts.length} Items</span>
                <span className="text-info">
                  Subtotal: <FormatRupiah value={totalValue} />
                </span>
                <div className="card-actions">
                  <button
                    className="btn btn-white btn-block"
                    onClick={() => setViewCart(viewCart + 1)}
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile Image"
                src="https://upload.wikimedia.org/wikipedia/commons/2/25/KPU_Alfiansyah_Bustami_Komeng.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {props.access_token ? (
              <>
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </>
            ) : (
              <li>
                <a onClick={() => redirect.push("/users/login")}>Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
