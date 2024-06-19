import React, { useEffect, useState } from "react";
import axios from "axios";
import "./transaction.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Transaction = () => {
  const [month, setMonth] = useState("January");
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchTransactions = async (
    selectedMonth,
    searchText,
    pageNum,
    perPage
  ) => {
    try {
      const params = {
        search: searchText,
        page: pageNum,
        perPage: perPage,
      };

      if (selectedMonth !== "All") {
        params.month = selectedMonth;
      }

      const response = await axios.get(
        `http://localhost:5000/api/getproducts`,
        {
          params: params,
        }
      );

      setTransactions(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions(month, search, page, perPage);
  }, [month, search, page, perPage]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Transactions</h1>
      <div className="app">
        <div className="controls">
          <select value={month} onChange={handleMonthChange}>
            {months.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search transactions"
            value={search}
            onChange={handleSearchChange}
          />
          <select value={perPage} onChange={handlePerPageChange}>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Sold</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.sold ? "Yes" : "No"}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePrevious} disabled={page <= 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={page >= totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Transaction;
