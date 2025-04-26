import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom"; 
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";

const RestaurantsOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/order/get-all-order");
      console.log(response)
      setOrders(response.data.orders);
    } catch (err) {
      setError("An error occurred while fetching restaurants.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantClick = (data) => {
    navigate(`/orders/${data._id}`);
  };

  

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width:"200px"
    },
    {
      name: "Customer Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <span
          className={`cursor-pointer ${row.status === 'pending' ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500'}`}
          onClick={() => {
            if (row.status !== 'pending') {
              handleRestaurantClick(row);
            }
          }}
        >
          {row.user.name}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`cursor-pointer ${row.status === 'pending' ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500'}`}
          onClick={() => {
            if (row.status !== 'pending') {
              handleRestaurantClick(row);
            }
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => (
        <span
          className={`cursor-pointer ${row.status === 'pending' ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500'}`}
          onClick={() => {
            if (row.status !== 'pending') {
              handleRestaurantClick(row);
            }
          }}
        >
          {row.user.email}
        </span>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      cell: (row) => (
        <span
          className={`cursor-pointer ${row.status === 'pending' ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500'}`}
          onClick={() => {
            if (row.status !== 'pending') {
              handleRestaurantClick(row);
            }
          }}
        >
          {row.user.phone}
        </span>
      ),
    },
    {
      name: "Address",
      selector: (row) => row.deliveryAddress,
      sortable: true,
      cell: (row) => (
        <span
          className={`cursor-pointer ${row.status === 'pending' ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500'}`}
          onClick={() => {
            if (row.status !== 'pending') {
              handleRestaurantClick(row);
            }
          }}
        >
          {row.deliveryAddress.state}, {row.deliveryAddress.city}, {row.deliveryAddress.street}, {row.deliveryAddress.postalCode}
        </span>
      ),
    },
  ];

  return (
    <div className="h-screen p-6">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex justify-end items-center mb-6">
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <DataTable
            columns={columns}
            data={orders}
            pagination
            highlightOnHover
            responsive
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantsOrders ;
