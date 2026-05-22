import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormErrorBanner from "../errorMessages/FormErrorBanner";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/productSlice";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";

const ProductManageModal = ({ setIsModalOpen }) => {
  const productSchema = z.object({
    productName: z.string().min(1, "Name is required"),
    productPrice: z.coerce.number({
      invalid_type_error: "Price must be a number",
    }),
    quantity: z.coerce.number({
      invalid_type_error: "Quantity must be a number",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.product);

  const firstErrorMessage = Object.values(errors)[0]?.message;
  const submitProductData = async (data) => {
    try {
      await dispatch(addProduct({ data, token })).unwrap();
      reset();
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClockLoader />
      </div>
    );
  }
  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => {
            setIsModalOpen(false);
          }}
        ></div>

        <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div className="flex justify-end">
            <button
              className="rounded-full h-10 w-10 flex justify-center items-center bg-gray-200 hover:bg-gray-300 text-lg text-white"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <p>x</p>
            </button>
          </div>
          <div className="text-center text-xl font-semibold my-3">
            <h1>Add Products</h1>
          </div>
          {firstErrorMessage && (
            <FormErrorBanner errors={{ message: firstErrorMessage }} />
          )}
          <form onSubmit={handleSubmit(submitProductData)}>
            <div className="space-y-4">
              <div>
                <label for="productName">Product Name</label>
                <input
                  {...register("productName")}
                  type="text"
                  className="block border border-gray-300 p-1 w-full rounded"
                  name="productName"
                  id="productName"
                />
              </div>
              <div>
                <label for="productPrice">Product Price</label>
                <input
                  {...register("productPrice")}
                  type="number"
                  className="block border border-gray-300 p-1 w-full rounded"
                  name="productPrice"
                  id="productPrice"
                />
              </div>
              <div>
                <label for="quantity">Quantity</label>
                <input
                  {...register("quantity")}
                  type="number"
                  className="block border border-gray-300 p-1 w-full rounded"
                  name="quantity"
                  id="quantity"
                />
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-700 w-full text-white rounded-full my-3"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductManageModal;
