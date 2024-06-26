import NavBar from "@/components/NavBar";
import * as jose from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const session = cookies().get("session") as RequestCookie;

  const token = session.value;

  const { payload } = await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET as string),
    { algorithms: ["HS256"] }
  );

  const { firstName } = payload;

  const currectPage = Number(searchParams?.page) || 1;

  let res = await fetch(`${process.env.PRODUCT_SERVICE_URL as string}/total`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { total } = await res.json();

  const pagination = Math.floor(total / 16);

  res = await fetch(
    `${process.env.PRODUCT_SERVICE_URL as string}/pagination/${currectPage}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const produts = await res.json();

  return (
    <main>
      <NavBar />
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-5">
            Welcome to the Product List{" "}
            <span className="text-blue-600 font-semibold capitalize">{`${firstName}`}</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <Modal currectPage={currectPage} />
      </div>
      <section className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {produts.map((product: any, inx: number) => (
            <a href={`/product/${product.handle}`} key={inx} className="grow">
              <Card fullWidth shadow="md" className="p-2">
                <CardHeader className="pb-10">
                  <Tooltip
                    content={product.title}
                    placement="bottom"
                    classNames={{
                      base: ["bg-black", "rounded-full"],
                      content: [
                        "py-2 px-4 shadow-xl font-semibold text-sm",
                        "text-white bg-neutral-400",
                      ],
                    }}
                  >
                    <h4 className="text-lg font-semibold overflow-ellipsis whitespace-nowrap overflow-hidden">
                      {product.title}
                    </h4>
                  </Tooltip>
                </CardHeader>
                <CardFooter className="flex flex-row  md:flex-row sm:flex-col justify-between">
                  <p className="text-sm">
                    <span className="font-semibold text-base">Price:</span> $
                    {product.price}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-base">Stock:</span>{" "}
                    {product.stock}
                  </p>
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>
      </section>
      <footer className="flex flex-wrap justify-center gap-4 items-center mb-6">
        <Pagination totalPages={pagination} currectPage={currectPage} />
      </footer>
    </main>
  );
}
