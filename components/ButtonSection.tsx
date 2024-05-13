"use client";

import { Button } from "@nextui-org/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

const ButtonSection = ({
  token,
  productUrl,
}: {
  token: string;
  productUrl: string;
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-between px-5 py-10">
      <Button
        radius="md"
        color="danger"
        variant="solid"
        startContent={<MdDelete />}
        onPress={() => {
          swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
          }).then(async (willDelete) => {
            if (willDelete) {
              const res = await fetch(productUrl, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (res.status === 204) {
                swal("Poof! Your product has been deleted!", {
                  icon: "success",
                }).then(() => {
                  router.push("/");
                });
              }
            } else {
              swal({
                title: "Your product is safe!",
                icon: "info",
              });
            }
          });
        }}
      >
        Delete
      </Button>
      <Button radius="md" color="secondary" endContent={<MdEdit />}>
        Edit
      </Button>
    </div>
  );
};

export default ButtonSection;
