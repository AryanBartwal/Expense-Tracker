import { useState, useEffect, useCallback } from "react";
import { Box, Grid, Typography } from "@mui/material";
import SummaryCard from "./dashboard/SummaryCard";
import TransactionTable from "./transactions/TransactionTable";
import EditTransactionForm from "./transactions/EditTransactionForm";
import ChartContainer from "./dashboard/ChartContainer";
import AddExpenses from "./transactions/AddExpenses";
import NavbarAfter from "./dashboard/NavbarAfter";
import Footer from "./landingpage/Footer";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [editTransaction, setEditTransaction] = useState(null);

  const fetchTransactions = useCallback(() => {
    fetch("http://localhost:5000/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        calculateSummary(data);
      });
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const calculateSummary = (data) => {
    const income = data
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expenses = data
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    setTotalIncome(income);
    setTotalExpenses(expenses);
  };

  const handleAddTransaction = (newTransaction) => {
    fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTransactions = [...transactions, data];
        setTransactions(updatedTransactions);
        calculateSummary(updatedTransactions);
      });
  };

  const handleDeleteTransaction = (id) => {
    fetch(`http://localhost:5000/transactions/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== id
        );
        setTransactions(updatedTransactions);
        calculateSummary(updatedTransactions);
      });
  };

  const handleSaveUpdate = () => {
    fetch(`http://localhost:5000/transactions/${editTransaction.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTransactions = transactions.map((transaction) =>
          transaction.id === editTransaction.id ? data : transaction
        );
        setTransactions(updatedTransactions);
        calculateSummary(updatedTransactions);
        setEditTransaction(null);
      });
  };

  return (
    <>
      <NavbarAfter />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          pt: 10,
          pb: 4,
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 4 }, maxWidth: "1400px", margin: "0 auto" }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            textAlign="center" 
            sx={{ 
              color: "white",
              fontWeight: "bold",
              mb: 4,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            💰 Financial Dashboard
          </Typography>

        <Grid container spacing={3} id="dashboard-summary">
          <Grid item xs={12} sm={6} md={4}>
            <SummaryCard
              title="Total Income"
              amount={totalIncome}
              type="income"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SummaryCard
              title="Total Expenses"
              amount={totalExpenses}
              type="expense"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SummaryCard
              title="Current Balance"
              amount={totalIncome - totalExpenses}
              type="balance"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 2 }} id="dashboard-charts">
          <Grid item xs={12}>
            <ChartContainer
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 2 }} id="dashboard-transactions">
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: 4,
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
                overflow: "hidden"
              }}
            >
              <TransactionTable
                transactions={transactions}
                onEdit={setEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 4,
              boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
              overflow: "hidden"
            }}
          >
            <AddExpenses onAddTransaction={handleAddTransaction} />
          </Box>
        </Box>

        {editTransaction && (
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: 4,
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
                overflow: "hidden"
              }}
            >
              <EditTransactionForm
                transaction={editTransaction}
                setTransaction={setEditTransaction}
                onSave={handleSaveUpdate}
                onCancel={() => setEditTransaction(null)}
              />
            </Box>
          </Box>
        )}
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default Dashboard;
