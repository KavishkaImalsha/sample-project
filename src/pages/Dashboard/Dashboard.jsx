import { useState } from "react";
import ProductManageModal from "../../components/modal/ProductManageModal";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = useSelector((state) => state.product);

  console.log(products);

  return (
    <>
      <div className="m-5 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome to product Management</h1>
          <sub className="text-gray-500">
            Here you can manage your products, add new products, update existing
            products, and delete products.
          </sub>
        </div>
        <div>
          <button
            className="bg-blue-600 p-2 rounded hover:bg-blue-700 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add Product
          </button>
        </div>
      </div>
      {isModalOpen && <ProductManageModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default Dashboard;
