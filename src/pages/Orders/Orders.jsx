import React from 'react';
import { useParams } from 'react-router';
import useFetch from '../../Hooks/UseFetch';
import DataTable from 'react-data-table-component';
import { axiosInstance } from '../../config/axiosInstance';

const Orders = () => {
  const { id } = useParams();
  const [orderData, isLoading, error] = useFetch(`/order/get-order-by-id/${id}`);

  const order = orderData?.order;

  const updateOrderStatus = async (orderId) => {
    try {
      console.log('tryBlock',orderId)
      const response = await axiosInstance.patch(`/order/update-order-status/${orderId}`);
      alert("Updated successfully");
      window.location.reload();
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  // Map items from cartId to include additional order-level info
  const itemRows = order?.cartId?.items?.map(item => ({
    ...item,
    orderId: order._id,
    status: order.status,
    createdAt: order.createdAt,
    totalPrice: order.cartId?.totalPrice
  }));

  const columns = [
    {
      name: 'Order ID',
      selector: row => row.orderId,
    },
    {
      name: 'Restaurant',
      selector: row => row.itemId.name,
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
    },
    {
      name: 'Item Total Price',
      selector: row => row.totalItemPrice,
    },
    {
      name: 'Final Price',
      selector: row => row.totalPrice,
    },
    {
      name: 'Status',
      selector: row => row.status,
    },
    {
      name: 'Created At',
      selector: row => new Date(row.createdAt).toLocaleString(),
    },
    {
      name: 'Actions',
      cell: row => (
        <button
          onClick={() => updateOrderStatus(row.orderId)}
          disabled={row.status === 'delivered'}
          style={{
            padding: '6px 12px',
            backgroundColor: row.status === 'delivered' ? '#ccc' : '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: row.status === 'delivered' ? 'not-allowed' : 'pointer',
          }}
        >
          Update Status
        </button>
      ),
    },
  ];

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {itemRows && (
        <DataTable
          columns={columns}
          data={itemRows}
          pagination
        />
      )}
    </div>
  );
};

export default Orders;
