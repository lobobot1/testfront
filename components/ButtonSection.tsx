"use client";

import { Button } from "@nextui-org/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import swal from "sweetalert";
import { updateProduct } from "../app/actions";
import { useForm } from "react-hook-form";
import ErrorInput from "./ErrorInput";
import { Textarea } from "@nextui-org/input";

interface Product {
  title: string;
  price: number;
  sku: string;
  grams: number;
  stock: number;
  compare_price: number;
  barcode: string;
  description: string;
}

const ButtonSection = ({
  token,
  productUrl,
  handle,
  product,
}: {
  token: string;
  productUrl: string;
  handle: string;
  product: Product;
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: product});

  const onSubmit = handleSubmit(async (data) => {
    const error = await updateProduct(data, productUrl, handle);
    if (error) {
      swal(error.error, "click the button", "error");
    }
  });

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
      <Button
        radius="md"
        color="secondary"
        endContent={<MdEdit />}
        onPress={onOpen}
      >
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        placement="center"
      >
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Product
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="px-10">
                    <label
                      htmlFor="title"
                      className="block mb-1 font-medium capitalize"
                    >
                      title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                      {...register("title", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors["title"] && (
                      <ErrorInput message={errors.title.message as string} />
                    )}
                  </div>
                  <div className="px-10">
                    <label
                      htmlFor="price"
                      className="block mb-1 font-medium capitalize"
                    >
                      price
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                      {...register("price", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors["price"] && (
                      <ErrorInput message={errors.price.message as string} />
                    )}
                  </div>
                  <div className="px-10">
                    <label
                      htmlFor="sku"
                      className="block mb-1 font-medium capitalize"
                    >
                      sku
                    </label>
                    <input
                      type="text"
                      id="sku"
                      className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                      {...register("sku", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors["sku"] && (
                      <ErrorInput message={errors.sku.message as string} />
                    )}
                  </div>
                  <div className="px-10">
                    <label
                      htmlFor="grams"
                      className="block mb-1 font-medium capitalize"
                    >
                      grams
                    </label>
                    <input
                      type="number"
                      id="grams"
                      className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                      {...register("grams", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors["grams"] && (
                      <ErrorInput message={errors.grams.message as string} />
                    )}
                  </div>
                  <div className="px-10">
                    <label
                      htmlFor="stock"
                      className="block mb-1 font-medium capitalize"
                    >
                      stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                      {...register("stock", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors["stock"] && (
                      <ErrorInput message={errors.stock.message as string} />
                    )}
                  </div>
                  <div className="px-10">
                    <label
                      htmlFor="compare_price"
                      className="block mb-1 font-medium capitalize"
                    >
                      compare price
                    </label>
                    <input
                      type="number"
                      id="compare_price"
                      className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                      {...register("compare_price", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors["compare_price"] && (
                      <ErrorInput
                        message={errors.compare_price.message as string}
                      />
                    )}
                  </div>
                  <div className="px-10">
                    <label
                      htmlFor="barcode"
                      className="block mb-1 font-medium capitalize"
                    >
                      barcode
                    </label>
                    <input
                      type="number"
                      id="barcode"
                      className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                      {...register("barcode", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors["barcode"] && (
                      <ErrorInput message={errors.barcode.message as string} />
                    )}
                  </div>
                  <div className="px-10">
                    <Textarea
                      isRequired
                      label="Description"
                      placeholder="Enter the description of the product"
                      {...register("description", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors["description"] && (
                      <ErrorInput
                        message={errors.description.message as string}
                      />
                    )}
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onSubmit().then(() => {
                      onClose();
                    });
                  }}
                >
                  update product
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ButtonSection;
