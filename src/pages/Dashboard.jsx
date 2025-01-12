import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  Box,
  useMediaQuery,
} from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { Car, Battery, Zap, MapPin } from 'lucide-react';

const makeDistribution = [
    { name: 'TESLA', value: 6 },
    { name: 'BMW', value: 2 },
    { name: 'NISSAN', value: 2 },
    { name: 'OTHERS', value: 4 },
  ];
  
  const modelYearData = [
    { year: '2013', count: 1 },
    { year: '2015', count: 1 },
    { year: '2016', count: 1 },
    { year: '2017', count: 1 },
    { year: '2018', count: 1 },
    { year: '2019', count: 2 },
    { year: '2020', count: 2 },
    { year: '2021', count: 3 },
    { year: '2022', count: 1 },
    { year: '2023', count: 1 },
  ];
  
  const evTypeData = [
    { name: 'BEV', value: 9 },
    { name: 'PHEV', value: 5 },
  ];
  
  const rangeData = [
    { range: '0-50', count: 0 },
    { range: '51-100', count: 2 },
    { range: '101-150', count: 1 },
    { range: '151-200', count: 0 },
    { range: '201-250', count: 1 },
    { range: '251-300', count: 4 },
    { range: 'Unknown', count: 6 },
  ];
  
  const cityData = [
    { name: 'Seattle', value: 3 },
    { name: 'Bothell', value: 2 },
    { name: 'Yakima', value: 2 },
    { name: 'Others', value: 7 },
  ];
  
  const utilityData = [
    { name: 'PUGET SOUND ENERGY', value: 8 },
    { name: 'CITY OF SEATTLE', value: 3 },
    { name: 'PACIFICORP', value: 2 },
    { name: 'OTHERS', value: 1 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function Dashboard({makeDistribution,modelYearData,evTypeData}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const metrics = [
    {
      title: 'Total Vehicles',
      value: '14',
      icon: <Car size={24} />,
      change: 'Registered EVs',
    },
    {
      title: 'Battery EVs',
      value: '9',
      icon: <Battery size={24} />,
      change: '64.3% of total',
    },
    {
      title: 'Avg Range',
      value: '131.4',
      icon: <Zap size={24} />,
      change: 'Miles per charge',
    },
    {
      title: 'Counties',
      value: '5',
      icon: <MapPin size={24} />,
      change: 'Represented',
    },
  ];

  return (
    <Container maxWidth="xlg" sx={{ py: 3 }}>
      {/* Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  p: 2,
                  color: theme.palette.primary.main,
                  opacity: 0.1,
                  transform: 'scale(2)',
                }}
              >
                {metric.icon}
              </Box>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                {metric.title}
              </Typography>
              <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                {metric.value}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {metric.change}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Vehicle Make Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Make Distribution
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={makeDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {makeDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Model Year Trend */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Model Year Distribution
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={modelYearData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* EV Type Distribution */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              EV Type Distribution
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={evTypeData}
                    innerRadius={0}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {evTypeData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Electric Range Distribution */}
        <Grid item xs={12} sm={6} md={8}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Electric Range Distribution
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rangeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill={theme.palette.primary.main}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* City Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              City Distribution
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cityData}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Utility Provider Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Utility Provider Distribution
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={utilityData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name"
                    width={80}
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill={theme.palette.primary.main}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;

