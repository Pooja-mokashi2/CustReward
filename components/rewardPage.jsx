import React, { useState, useEffect } from "react";
import RewardPageView from "./RewardPageView";
import UserTable from "./userTable";
import { calculatePoints } from "./calculatePoints";

const RewardPage = () => {
  const customerId = "01"; // Default customer ID
  const [purchaseData, setCustData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error("response failed");
      }
      const customerData = await response.json();
      setCustData(customerData);

      // Get customer name based on customer ID
      const customer = customerData.find(
        (transaction) => transaction.CustomerID === customerId
      );
      setCustomerName(customer ? customer.CustomerName : "Unknown");
    } catch (error) {
      console.error("error", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const filteredCustData = purchaseData.filter((item) => {
    return (item.CustomerID === customerId);
  }); 

  const calculateRewards = () => {
    const rewardsPerCustomer = {};
    filteredCustData.forEach(({ PurchaseAmount, TransactionDate }) => {
      const month = new Date(TransactionDate).getMonth();
      const year = new Date(TransactionDate).getFullYear();
      const points = calculatePoints(PurchaseAmount);

      if (!rewardsPerCustomer[customerId]) {
        rewardsPerCustomer[customerId] = { monthly: {} };
      }

      rewardsPerCustomer[customerId].monthly[`${month}-${year}`] =
        (rewardsPerCustomer[customerId].monthly[`${month}-${year}`] || 0) +
        points;
    });

    const monthlyPoints = rewardsPerCustomer[customerId]?.monthly || {};
    const sortedMonths = Object.keys(monthlyPoints).sort((a, b) => new Date(a) - new Date(b));
    const lastThreeMonths = sortedMonths.slice(0, 3);

    const filteredMonthlyPoints = {};
    lastThreeMonths.map((month) => (filteredMonthlyPoints[month] = monthlyPoints[month]));
    const totalPoints = Object.values(filteredMonthlyPoints).reduce((acc, points) => acc + points,0);
    return { filteredMonthlyPoints, totalPoints };
  };

  const { filteredMonthlyPoints, totalPoints } = calculateRewards();

  const getMonthYearName = (monthYear) => {
    const [month, year] = monthYear.split("-");
    const date = new Date(year, month);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <>
      <RewardPageView
        error={error}
        customerName={customerName}
        totalPoints={totalPoints}
        filteredMonthlyPoints={filteredMonthlyPoints}
        getMonthYearName={getMonthYearName}
      />
      <UserTable data={filteredCustData} />
    </>
  );
};

export default RewardPage;
