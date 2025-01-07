import React from "react";
import logo from "./logo1.png";

const RewardPageView = ({
  error,
  customerName,
  totalPoints,
  filteredMonthlyPoints,
  getMonthYearName,
}) => {
  return (
    <div className="container mt-4">
      {error ? (
        <div className="text-center text-danger">Error: {error.message}</div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col">
              <h2 className="text-center text-danger">
                Welcome - {customerName}
              </h2>
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            <div className="col-12 text-center">
              <h3
                className="text-primary"
                style={{ fontWeight: "500", fontSize: "26px" }}
              >
                Congrats your total reward points are {totalPoints.toFixed(2)}{" "}
                points{" "}
              </h3>
            </div>
          </div>
          <div className="row mb-4 justify-content-center">
            {Object.entries(filteredMonthlyPoints).map(
              ([monthYear, points]) => (
                <div key={monthYear} className="col-md-4 mb-4">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#e3f2fd",
                      border: "2px solid #1b5e20",
                    }}
                  >
                    <div className="card-body text-center">
                      <img
                        src={logo}
                        alt="logo"
                        className="img-fluid mb-3"
                        style={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "50%",
                          border: "2px solid #1b5e20",
                        }}
                      />
                      <h5 className="card-title text-info">
                        {getMonthYearName(monthYear)}
                      </h5>
                      <p className="card-text">
                        <h4 style={{ color: "#1b5e20", fontWeight: "bold" }}>
                          {points.toFixed(2)}
                        </h4>
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RewardPageView;
