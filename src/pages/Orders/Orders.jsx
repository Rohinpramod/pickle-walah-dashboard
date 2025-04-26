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
      const response = await axiosInstance.patch(`/order/update-order-status/${orderId}`);
      alert("Updated successfully");
      window.location.reload();
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const itemRows = order?.cartId?.items?.map(item => ({
    ...item,
    orderId: order._id,
    status: order.status,
    createdAt: order.createdAt,
    totalPrice: order.cartId?.totalPrice
  }));

  const columns = [
    { name: 'Order ID', selector: row => row.orderId },
    { name: 'Items', selector: row => row.itemId.name },
    { name: 'Quantity', selector: row => row.quantity },
    { name: 'Item Total Price', selector: row => row.totalItemPrice },
    { name: 'Final Price', selector: row => row.totalPrice },
    { name: 'Status', selector: row => row.status },
    { name: 'Created At', selector: row => new Date(row.createdAt).toLocaleString() },
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
    <div style={{ padding: '20px' }}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {order && (
        <div style={{ marginBottom: '30px' }}>
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
          <p><strong>Delivery Address:</strong> {order.deliveryAddress?.street}, {order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
          <p><strong>Coupon Used:</strong> {order.coupon?.code} ({order.coupon?.discountPercentage}% off, Max Discount: {order.coupon?.maxDiscountValue})</p>
          <p><strong>Final Price:</strong> ${order.finalPrice}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      )}

      {itemRows && (
        <DataTable
          title="Items in this Order"
          columns={columns}
          data={itemRows}
          pagination
        />
      )}
    </div>
  );
};

export default Orders;
