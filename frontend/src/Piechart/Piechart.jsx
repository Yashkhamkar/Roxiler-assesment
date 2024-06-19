import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import "./piechart.css";

ChartJS.register(PieController, ArcElement, Title, Tooltip, Legend);

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

const PieChart = () => {
  const [month, setMonth] = useState("january");
  const [year, setYear] = useState(2022);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetchPieData(month, year);
  }, [month, year]);

  const fetchPieData = async (selectedMonth, selectedYear) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/piechart`, {
        params: {
          month: selectedMonth,
          year: selectedYear,
        },
      });
      setPieData(response.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = pieData[tooltipItem.datasetIndex];
            const label = dataset.labels[tooltipItem.index] || "";
            const value = dataset.data[tooltipItem.index] || "";

            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const pieChartData = {
    labels: pieData.map((item) => item.category),
    datasets: [
      {
        label: "Categories",
        data: pieData.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="piechart-container">
      <h1>Pie Chart - Categories Distribution</h1>
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
      <div className="pie-chart">
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default PieChart;
