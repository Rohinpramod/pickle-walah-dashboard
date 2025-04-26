import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useFetch from "../../Hooks/UseFetch";

function Payments() {
  const [paymentsData, isLoading, error] = useFetch(`/order/get-all-payments`);

  // Calculate the total amount
  const totalAmount = paymentsData?.data.reduce((total, payment) => total + payment.amount, 0) || 0;

  // Define columns for the DataTable
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.orderId,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.user?.name,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Transaction ID",
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <div className="h-screen p-6">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={paymentsData?.data || []}
              pagination
              highlightOnHover
              responsive
            />
            {/* Display the total amount */}
            <div className="p-4 bg-gray-100 text-right font-bold">
              <span>Total Amount: </span>
              <span>{totalAmount.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Payments;
