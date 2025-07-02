import { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Fade,
  Alert
} from "@mui/material";
import { Add, TrendingUp, TrendingDown } from "@mui/icons-material";
import PropTypes from "prop-types";

function AddExpenses({ onAddTransaction }) {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "income",
  });
  const [success, setSuccess] = useState(false);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount) {
      return;
    }
    
    onAddTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    });
    
    setNewTransaction({ description: "", amount: "", type: "income" });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography 
        variant="h4" 
        textAlign="center" 
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          mb: 3
        }}
      >
        💸 Add New Transaction
      </Typography>

      {success && (
        <Fade in={success}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Transaction added successfully! 🎉
          </Alert>
        </Fade>
      )}

      <Card
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleAddTransaction}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Transaction Description"
                  placeholder="e.g., Salary, Grocery, Coffee..."
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, description: e.target.value })
                  }
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2196F3",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount (₹)"
                  type="number"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, amount: e.target.value })
                  }
                  required
                  variant="outlined"
                  inputProps={{ min: 0, step: 0.01 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2196F3",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Transaction Type</InputLabel>
                  <Select
                    value={newTransaction.type}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, type: e.target.value })
                    }
                    label="Transaction Type"
                    sx={{
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2196F3",
                      },
                    }}
                  >
                    <MenuItem value="income">
                      <Box display="flex" alignItems="center" gap={1}>
                        <TrendingUp sx={{ color: "#4CAF50" }} />
                        Income
                      </Box>
                    </MenuItem>
                    <MenuItem value="expense">
                      <Box display="flex" alignItems="center" gap={1}>
                        <TrendingDown sx={{ color: "#FF6347" }} />
                        Expense
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Add />}
                  sx={{
                    background: newTransaction.type === "income" 
                      ? "linear-gradient(45deg, #4CAF50 30%, #81C784 90%)"
                      : "linear-gradient(45deg, #FF6347 30%, #FF8A80 90%)",
                    color: "white",
                    borderRadius: 2,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      background: newTransaction.type === "income" 
                        ? "linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)"
                        : "linear-gradient(45deg, #D32F2F 30%, #EF5350 90%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  Add {newTransaction.type === "income" ? "Income" : "Expense"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

AddExpenses.propTypes = {
  onAddTransaction: PropTypes.func.isRequired,
};

export default AddExpenses;
