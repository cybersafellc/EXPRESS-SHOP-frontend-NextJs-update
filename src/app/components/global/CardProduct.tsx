"use client";

import { accessTokenVerify, getNewAccessToken } from "@/app/func/token";
import { FormatRupiah } from "@arismun/format-rupiah";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavbarComponent from "./Navbars";

interface Products {
  id: number;
  name: string;
  stocks: number;
  price: number;
  description: string;
  sold: number;
  rating: number;
  img_url: string;
  token: Props;
}

interface Props {
  access_token: string | null;
  refresh_token: string | null;
  addToCartEffect?: number;
}

const addToCart = async (access_token: any, productId: number, qty: number) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        qty: qty,
      }),
    });
    return;
  } catch (error) {
    return;
  }
};

export default function CardProductComponent(props: Products) {
  const [countAddToCart, setCountAddToCart] = useState(0);
  const [successAdd, setSuccessAdd] = useState(true);

  const routers = useRouter();
  const handleAddToCart = async (productId: number, qty: number) => {
    setSuccessAdd(false);
    let statusToken: boolean = false;
    await accessTokenVerify(getCookie("access_token"), (status: boolean) => {
      return (statusToken = status);
    });
    if (!statusToken) {
      await getNewAccessToken(
        getCookie("refresh_token"),
        (err: any, newToken: string) => {
          if (err) {
            deleteCookie("access_token");
            deleteCookie("refresh_token");
            routers.push("/users/login");
            return;
          }
          setCookie("access_token", newToken);
          return;
        }
      );
    }
    await addToCart(getCookie("access_token"), productId, qty);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCountAddToCart(countAddToCart + 1);
    setSuccessAdd(true);
    return;
  };
  return (
    <>
      <div className="card rounded-none card-compact w-full bg-base-100 shadow-xl text-black">
        <figure className="max-h-60 min-h-60">
          <img src={props.img_url} alt="Shoes" />
        </figure>
        <div className="card-body bg-white">
          <h2 className="card-title">
            <FormatRupiah value={props.price} />
          </h2>
          <p>{props.name}</p>
          <div className="card-actions flex justify-between items-end">
            <div className="text-slate-500">
              <span>Rate {props.rating}</span>
              {" | "} <span>Sold {props.sold}</span>
            </div>
            {successAdd ? (
              <button
                className="btn btn-dark rounded-none text-white w-40"
                onClick={() => handleAddToCart(props.id, 1)}
              >
                Add To Cart
              </button>
            ) : (
              <button className="btn btn-dark rounded-none text-white w-40">
                <span className="loading loading-dots loading-md"></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
