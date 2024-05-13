"use client";
import { Pagination } from "@nextui-org/pagination";
import { useRouter } from "next/navigation";

const Paginations = ({
  totalPages,
  currectPage,
}: {
  totalPages: number;
  currectPage: number;
}) => {
  const router = useRouter();
  return (
    <Pagination
      loop
      showControls
      color="primary"
      variant="faded"
      initialPage={1}
      total={totalPages}
      page={currectPage}
      size="md"
      onChange={(page: number): void => {
        router.push(`/?page=${page}`);
      }}
    />
  );
};

export default Paginations;
