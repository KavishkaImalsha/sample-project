import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/productSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ProductManageModal = ({ setIsModalOpen }) => {
  // Updated Zod Schema to match Laravel validation
  const productSchema = z
    .object({
      barcode: z.string().min(1, "Barcode is required"),
      product_name: z.string().min(1, "Product name is required"),
      cost_price: z.coerce.number().min(0, "Cost price cannot be negative"),
      selling_price: z.coerce
        .number()
        .min(0, "Selling price must be at least 0"),
      quantity: z.coerce.number().int().nonnegative(),
      minimum_stock: z.coerce.number().int().nonnegative(),
    })
    .refine((data) => data.selling_price >= data.cost_price, {
      message: "Selling price must be greater than or equal to cost price",
      path: ["selling_price"],
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

  const submitProductData = async (data) => {
    try {
      await dispatch(addProduct({ productDetails: data, token })).unwrap();
      toast.success("Product added successfully!");
      reset();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error || "Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(submitProductData)} className="space-y-5">
          {/* Barcode & Name */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Barcode"
              register={register("barcode")}
              error={errors.barcode}
            />
            <InputField
              label="Product Name"
              register={register("product_name")}
              error={errors.product_name}
            />
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
            <InputField
              label="Cost Price"
              type="number"
              register={register("cost_price")}
              error={errors.cost_price}
            />
            <InputField
              label="Selling Price"
              type="number"
              register={register("selling_price")}
              error={errors.selling_price}
            />
          </div>

          {/* Stock Section */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Quantity"
              type="number"
              register={register("quantity")}
              error={errors.quantity}
            />
            <InputField
              label="Min Stock Level"
              type="number"
              register={register("minimum_stock")}
              error={errors.minimum_stock}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex justify-center items-center"
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper component for cleaner code
const InputField = ({ label, register, error, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
      {label}
    </label>
    <input
      {...register}
      type={type}
      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 transition-all ${error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-400"}`}
    />
    {error && (
      <span className="text-xs text-red-500 mt-1 ml-1">{error.message}</span>
    )}
  </div>
);

export default ProductManageModal;
