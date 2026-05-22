import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/productSlice";
import { toast } from "react-toastify";

const ProductTable = ({ products }) => {
  const { message, loading, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const handleDeleteProduct = async (barcode) => {
    try {
      const result = await dispatch(deleteProduct(barcode)).unwrap();
      toast.success(result?.message || "Product delete succesful");
    } catch (error) {
      toast.error(error?.message || "Product delete unsucceful");
    }
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-4xl">📦</div>
          <p className="text-gray-500 font-medium">No products found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest font-bold">
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Cost Price</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr
                  key={product.id || product.barcode}
                  className="group hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {product.product_name}
                    <p className="text-[11px] text-gray-400 font-normal">
                      SKU: {product.barcode}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">
                    ${parseFloat(product.cost_price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        product.quantity <= product.minimum_stock
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {product.quantity} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteProduct(product.barcode);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
