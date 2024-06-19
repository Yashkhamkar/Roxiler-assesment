import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./barchart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const years = [2021, 2022, 2023];

const BarChart = () => {
  const [month, setMonth] = useState("january"); // Initial month value
  const [year, setYear] = useState(2022); // Initial year value
  const [barData, setBarData] = useState({});

  useEffect(() => {
    fetchBarData(month, year);
  }, [month, year]);

  const fetchBarData = async (selectedMonth, selectedYear) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/barchart`, {
        params: {
          month: selectedMonth,
          year: selectedYear,
        },
      });
      setBarData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const barChartData = {
    labels: Object.keys(barData),
    datasets: [
      {
        label: "Number of Items",
        data: Object.values(barData),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="barchart-container">
      <h1>Price Range Distribution</h1>
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
      <div className="bar-chart">
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
};

export default BarChart;
