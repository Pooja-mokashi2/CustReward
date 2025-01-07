import React from "react";

const UserTable = ({ data }) => {
  const columns = [
    { id: "PurchaseAmount", label: "PurchaseAmount" },
    { id: "TransactionDate", label: "TransactionDate" },
  ];
  return (
    <div className="container col-lg-6">
      <h3 className="text-center text-secondary mb-4">
        Customer Purchase Details
      </h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-sm">
          <thead className="text-center">
            <tr>
              {columns.map((column) => (
                <th key={column.id}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.id}>{row[column.id]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
