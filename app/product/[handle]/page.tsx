import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import NavBar from "@/components/NavBar";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import ButtonSection from "@/components/ButtonSection";

interface Product {
  handle: string;
  title: string;
  price: number;
  sku: string;
  grams: number;
  stock: number;
  compare_price: number;
  barcode: string;
  description: string;
}

const page = async ({ params }: { params: { handle: string } }) => {
  const session = cookies().get("session") as RequestCookie;

  const token = session.value;

  const { handle } = params;

  const res = await fetch(
    `${process.env.PRODUCT_SERVICE_URL as string}/name/${handle}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const product: Product = await res.json();

  return (
    <div>
      <NavBar />
      <div className="text-base font-semibold pt-4 px-4 opacity-50 cursor-default">
        <a href="/" className="cursor-pointer">
          Home
        </a>{" "}
        / {handle}
      </div>
      <section className="p-10">
        <div className=" mt-10 pt-10 px-10  flex flex-col justify-evenly">
          <Card fullWidth>
            <CardHeader>
              <h2 className="text-xl font-semibold text-wrap">{product.title}</h2>
            </CardHeader>
            <CardBody>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </CardBody>
            <CardFooter className="flex justify-evenly">
              <p className="text-lg font-medium">
                Price: <span className="font-normal text-base">$ {product.price.toFixed(2)}</span>{" "}
              </p>
              <p className="text-lg font-medium">
                Stock: <span className="font-normal text-base">{product.stock}</span>{" "}
              </p>
              <p className="text-lg font-medium">
                SKU: <span className="font-normal text-base">{product.sku}</span>{" "}
              </p>
              <p className="text-lg font-medium">
                Barcode: <span className="font-normal text-base">{product.barcode}</span>{" "}
              </p>
            </CardFooter>
          </Card>
          <ButtonSection handle={handle} token={token} />
        </div>
      </section>
    </div>
  );
};

export default page;