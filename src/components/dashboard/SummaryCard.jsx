import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { TrendingUp, TrendingDown, AccountBalance } from "@mui/icons-material";
import PropTypes from "prop-types";

const SummaryCard = ({ title, amount, type = "balance" }) => {
  const getIcon = () => {
    switch (type) {
      case "income":
        return <TrendingUp sx={{ fontSize: 28, color: "#4CAF50" }} />;
      case "expense":
        return <TrendingDown sx={{ fontSize: 28, color: "#FF6347" }} />;
      default:
        return <AccountBalance sx={{ fontSize: 28, color: "#2196F3" }} />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case "income":
        return "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)";
      case "expense":
        return "linear-gradient(135deg, #FF6347 0%, #FF8A80 100%)";
      default:
        return "linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)";
    }
  };

  const formatAmount = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <Card 
      sx={{
        background: getGradient(),
        borderRadius: 4,
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.2)",
        },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }
      }}
    >
      <CardContent sx={{ position: "relative", zIndex: 1, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontSize: "0.75rem"
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: "white",
                fontWeight: "bold",
                mt: 1,
                fontSize: { xs: "1.5rem", sm: "2rem" }
              }}
            >
              {formatAmount(amount)}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {getIcon()}
          </Box>
        </Box>
        
        {/* Additional info chip */}
        <Chip
          size="small"
          label={`${type.charAt(0).toUpperCase() + type.slice(1)}`}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            fontWeight: 500,
            fontSize: "0.7rem"
          }}
        />
      </CardContent>
    </Card>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["income", "expense", "balance"]),
};

export default SummaryCard;
