import { Card, CardContent, Typography, Box } from "@mui/material";
import { Analytics } from "@mui/icons-material";
import Chart from "./Chart";
import PropTypes from "prop-types";

const ChartContainer = ({ totalIncome, totalExpenses }) => (
  <Card
    sx={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: 4,
      boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.3)",
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
    <CardContent sx={{ position: "relative", zIndex: 1, p: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Box
          sx={{
            background: "linear-gradient(45deg, #fff 30%, rgba(255,255,255,0.8) 90%)",
            borderRadius: "50%",
            p: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
          }}
        >
          <Analytics sx={{ color: "#667eea", fontSize: 32 }} />
        </Box>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              color: "white",
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            📊 Analytics Dashboard
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: { xs: "0.9rem", sm: "1rem" }
            }}
          >
            Comprehensive Financial Insights & Trends
          </Typography>
        </Box>
      </Box>
      
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 4,
          p: 3,
          minHeight: 600,
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <Chart totalIncome={totalIncome} totalExpenses={totalExpenses} />
      </Box>
    </CardContent>
  </Card>
);

ChartContainer.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default ChartContainer;
