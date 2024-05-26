import { cookies } from "next/headers";
import CardProductComponent from "../components/global/CardProduct";
import FooterComponent from "../components/global/Footers";
import NavbarComponent from "../components/global/Navbars";
import SearchMenuComponent from "../components/shop/SearchMenu";

interface SearchParams {
  search: string;
}
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

const searchProduct = async (query: string) => {
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/products?search=${query}`,
    {
      cache: "no-store",
    }
  );
  const res = await responses.json();
  return res.data;
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cookieStore = await cookies();
  const tokens: Token = {
    refresh_token: cookieStore.get("refresh_token")?.value || null,
    access_token: cookieStore.get("access_token")?.value || null,
  };

  let products: Products[];

  if (searchParams.search) {
    products = await searchProduct(searchParams.search);
  } else {
    products = await searchProduct("");
  }
  let renderNotFound = await false;
  if (!products[0]) {
    renderNotFound = await true;
  }
  return (
    <>
      <NavbarComponent {...tokens} />
      <section className="bg-slate-100 pt-16 min-h-screen">
        <div className="container-fluid">
          <SearchMenuComponent />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 py-10 px-5">
            {products.map((product, index) => {
              product.token = tokens;
              return (
                <>
                  <div
                    className="flex justify-center items-center"
                    key={index + 1}
                  >
                    <CardProductComponent {...product} />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {renderNotFound ? (
          <div className="flex justify-center text-3xl">
            <h1>Not found {searchParams.search}</h1>
          </div>
        ) : (
          ""
        )}
      </section>
      <FooterComponent />
    </>
  );
}
