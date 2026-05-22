import { useEffect, useState } from "react";
import ProductManageModal from "../../components/modal/ProductManageModal";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/productSlice";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";
import ProductTable from "../../components/tables/ProductTable";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { products, loading, token } = useSelector((state) => state.product);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await dispatch(getProducts(token)).unwrap();
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
      <div className="mx-6">
        <div className="m-5 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome to product Management
            </h1>
            <sub className="text-gray-500">
              Here you can manage your products, add new products, update
              existing products, and delete products.
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

        <ProductTable
          products={products}
          setIsModalOpen={setIsModalOpen}
          isModalOpe={isModalOpen}
        />
      </div>
    </>
  );
};

export default Dashboard;
