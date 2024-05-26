import { cookies } from "next/headers";
import CardProductComponent from "./components/global/CardProduct";
import CaroselComponent from "./components/global/Carosels";
import FooterComponent from "./components/global/Footers";
import NavbarComponent from "./components/global/Navbars";

interface Products {
  id: number;
  name: string;
  stocks: number;
  price: number;
  description: string;
  sold: number;
  rating: number;
  img_url: string;
  token: Token;
}

interface Token {
  access_token: string | null;
  refresh_token: string | null;
}

const getNewProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/products`,
    {
      cache: "no-store",
    }
  );
  const res = await response.json();
  return res.data;
};

export default async function Home() {
  const products: Products[] = await getNewProducts();
  const cookieStore = cookies();
  const tokens: Token = {
    refresh_token: cookieStore.get("refresh_token")?.value || null,
    access_token: cookieStore.get("access_token")?.value || null,
  };
  return (
    <>
      <NavbarComponent
        access_token={tokens.access_token}
        refresh_token={tokens.refresh_token}
      />
      <section className="pt-16 bg-slate-100">
        <CaroselComponent />
        <div className="p-0 sm:p-5">
          <h3 className="text-2xl mb-5 text-black">New Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 content-center">
            {products.map((product, index) => {
              product.token = tokens;
              return (
                <div className="w-100 flex justify-center" key={index + 1}>
                  <CardProductComponent {...product} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
}
