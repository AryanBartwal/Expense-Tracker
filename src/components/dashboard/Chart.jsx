import { 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";
import { Box, Typography, Grid, Card, CardContent, Fade } from "@mui/material";
import { TrendingUp, TrendingDown, AccountBalance } from "@mui/icons-material";
import PropTypes from "prop-types";

const Chart = ({ totalIncome, totalExpenses }) => {
  const pieData = [
    { name: "Income", value: totalIncome, color: "#4CAF50" },
    { name: "Expenses", value: totalExpenses, color: "#FF6347" },
  ];

  const barData = [
    { name: "Income", amount: totalIncome, fill: "#4CAF50" },
    { name: "Expenses", amount: totalExpenses, fill: "#FF6347" },
  ];

  // Monthly trend data (sample data - you can replace with real data)
  const trendData = [
    { month: "Jan", income: totalIncome * 0.8, expenses: totalExpenses * 0.7 },
    { month: "Feb", income: totalIncome * 0.9, expenses: totalExpenses * 0.8 },
    { month: "Mar", income: totalIncome * 1.1, expenses: totalExpenses * 0.9 },
    { month: "Apr", income: totalIncome, expenses: totalExpenses },
  ];

  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  // Custom tooltip formatter with animations
  const formatTooltip = (value, name) => [
    `₹${value.toLocaleString()}`,
    name
  ];

  // Custom label formatter for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 5 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  if (totalIncome === 0 && totalExpenses === 0) {
    return (
      <Fade in timeout={1000}>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height={400}
          flexDirection="column"
          gap={3}
          sx={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            borderRadius: 3,
            p: 4
          }}
        >
          <AccountBalance sx={{ fontSize: 80, color: "#9e9e9e", opacity: 0.5 }} />
          <Typography variant="h5" color="text.secondary" textAlign="center">
            No Financial Data Available
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Add some transactions to see your beautiful financial analytics and charts
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in timeout={1000}>
      <Box>
        {/* Financial Metrics Cards */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ 
              background: balance >= 0 ? "linear-gradient(135deg, #4CAF50, #81C784)" : "linear-gradient(135deg, #FF6347, #FF8A80)",
              color: "white",
              textAlign: "center"
            }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                  {balance >= 0 ? <TrendingUp /> : <TrendingDown />}
                  Net Balance
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  ₹{balance.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #2196F3, #64B5F6)",
              color: "white",
              textAlign: "center"
            }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h6">Savings Rate</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {savingsRate}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #9C27B0, #BA68C8)",
              color: "white",
              textAlign: "center"
            }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h6">Total Transactions</Typography>
                <Typography variant="h4" fontWeight="bold">
                  ₹{(totalIncome + totalExpenses).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Grid */}
        <Grid container spacing={3}>
          {/* Enhanced Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: 3,
              p: 2,
              height: 350
            }}>
              <Typography variant="h6" textAlign="center" mb={2} fontWeight="bold">
                💰 Income vs Expenses Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={90}
                    innerRadius={40}
                    paddingAngle={2}
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={formatTooltip}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Enhanced Bar Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: 3,
              p: 2,
              height: 350
            }}>
              <Typography variant="h6" textAlign="center" mb={2} fontWeight="bold">
                📊 Financial Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={formatTooltip}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Bar 
                    dataKey="amount" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                    animationBegin={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* New Trend Line Chart */}
          <Grid item xs={12}>
            <Card sx={{ 
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: 3,
              p: 2,
              height: 300
            }}>
              <Typography variant="h6" textAlign="center" mb={2} fontWeight="bold">
                📈 Monthly Trend Analysis
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6347" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF6347" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={formatTooltip}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#4CAF50" 
                    fillOpacity={1} 
                    fill="url(#incomeGradient)"
                    strokeWidth={3}
                    animationDuration={1500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#FF6347" 
                    fillOpacity={1} 
                    fill="url(#expenseGradient)"
                    strokeWidth={3}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

Chart.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

Chart.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default Chart;
