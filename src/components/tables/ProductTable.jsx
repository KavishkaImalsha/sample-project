import React from "react";

const ProductTable = ({ products }) => {
  return (
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      {products.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="p-3 text-xl font-bold">No product to show</p>
        </div>
      ) : (
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium">
                Product name
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Price
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr id={index} class="bg-neutral-primary border-b border-default">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {product.productName}
                </th>
                <td class="px-6 py-4">{product.productPrice}</td>
                <td class="px-6 py-4">{product.quantity}</td>
                <td className="space-x-3">
                  <button className="p-2 bg-gray-400 rounded-full text-white hover:bg-gray-500">
                    Update
                  </button>
                  <button className="p-2 bg-red-400 rounded-full text-white hover:bg-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
