import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip
} from "@mui/material";
import { Edit, Delete, TrendingUp, TrendingDown } from "@mui/icons-material";
import PropTypes from "prop-types";

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6" color="text.secondary">
          No transactions found
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Add your first transaction to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box p={3} pb={1}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Recent Transactions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
        </Typography>
      </Box>
      
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 500, 
          overflowY: "auto",
          mx: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#f8f9fa",
                borderBottom: "2px solid #dee2e6"
              }}>
                Description
              </TableCell>
              <TableCell sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#f8f9fa",
                borderBottom: "2px solid #dee2e6"
              }}>
                Amount
              </TableCell>
              <TableCell sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#f8f9fa",
                borderBottom: "2px solid #dee2e6"
              }}>
                Type
              </TableCell>
              <TableCell align="center" sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#f8f9fa",
                borderBottom: "2px solid #dee2e6"
              }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{
                  "&:hover": { 
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    transform: "scale(1.01)",
                    transition: "all 0.2s ease-in-out"
                  },
                  transition: "all 0.2s ease-in-out"
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {transaction.type === "income" ? (
                      <TrendingUp sx={{ color: "#4CAF50", fontSize: 20 }} />
                    ) : (
                      <TrendingDown sx={{ color: "#FF6347", fontSize: 20 }} />
                    )}
                    <Typography variant="body1" fontWeight={500}>
                      {transaction.description}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body1" 
                    fontWeight="bold"
                    color={transaction.type === "income" ? "#4CAF50" : "#FF6347"}
                  >
                    {formatCurrency(transaction.amount)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    color={transaction.type === "income" ? "success" : "error"}
                    variant="outlined"
                    size="small"
                    icon={transaction.type === "income" ? <TrendingUp /> : <TrendingDown />}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Tooltip title="Edit Transaction">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onEdit(transaction)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.1)"
                          }
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Transaction">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDelete(transaction.id)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.1)"
                          }
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TransactionTable;
