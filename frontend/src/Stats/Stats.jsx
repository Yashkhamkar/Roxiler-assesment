import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stats.css";

const months = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

const years = [2021, 2022, 2023, 2024]; 

const Stats = () => {
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2022");
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  const fetchStats = async (selectedMonth, selectedYear) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stats`, {
        params: {
          month: selectedMonth === "all" ? "" : selectedMonth,
          year: selectedYear,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchStats(month, year);
  }, [month, year]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="stats-container">
      <h1>Statistics</h1>
      <div className="controls">
        <select value={month} onChange={handleMonthChange}>
          {months.map((m, index) => (
            <option key={index} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <select value={year} onChange={handleYearChange}>
          {years.map((y, index) => (
            <option key={index} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="stats-boxes">
        <div className="stats-box">
          <h2>Total Sale Amount</h2>
          <p>${stats.totalSaleAmount.toFixed(2)}</p>
        </div>
        <div className="stats-box">
          <h2>Total Sold Items</h2>
          <p>{stats.totalSoldItems}</p>
        </div>
        <div className="stats-box">
          <h2>Total Not Sold Items</h2>
          <p>{stats.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
