import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  FileText, 
  MapPin,
  Target,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const AIInsights = () => {
  // Mock analytics data
  const stateWiseData = [
    { state: 'Chhattisgarh', approved: 1567, pending: 623, rejected: 266 },
    { state: 'Odisha', approved: 1234, pending: 456, rejected: 198 },
    { state: 'Jharkhand', approved: 987, pending: 345, rejected: 156 },
    { state: 'Maharashtra', approved: 876, pending: 234, rejected: 123 },
    { state: 'Gujarat', experienced: 654, pending: 189, rejected: 98 }
  ];

  const landUseData = [
    { name: 'Agricultural', value: 2456, color: '#22c55e' },
    { name: 'Forest Land', value: 1834, color: '#3b82f6' },
    { name: 'Water Bodies', value: 602, color: '#f59e0b' },
    { name: 'Grazing Land', value: 445, color: '#8b5cf6' }
  ];

  const monthlyTrends = [
    { month: 'Jan', applications: 145, approvals: 98, efficiency: 67 },
    { month: 'Feb', applications: 167, approvals: 112, efficiency: 67 },
    { month: 'Mar', applications: 189, approvals: 134, efficiency: 71 },
    { month: 'Apr', applications: 203, approvals: 156, efficiency: 77 },
    { month: 'May', applications: 178, approvals: 142, efficiency: 80 },
    { month: 'Jun', applications: 234, approvals: 187, efficiency: 80 }
  ];

  const performanceMetrics = [
    { metric: 'Processing Time', value: '45 days', trend: -12, status: 'improving' },
    { metric: 'Approval Rate', value: '63.8%', trend: +5.2, status: 'good' },
    { metric: 'Document Accuracy', value: '87.4%', trend: +2.1, status: 'good' },
    { metric: 'Beneficiary Satisfaction', value: '78.9%', trend: +8.3, status: 'improving' }
  ];

  const aiPredictions = [
    {
      title: 'Claim Processing Forecast',
      prediction: 'Expected 15% increase in applications next quarter',
      confidence: 87,
      recommendation: 'Increase officer allocation in high-demand districts'
    },
    {
      title: 'Seasonal Pattern Analysis',
      prediction: 'Peak applications expected in March-May period',
      confidence: 92,
      recommendation: 'Pre-position resources for seasonal surge'
    },
    {
      title: 'Document Quality Trends',
      prediction: 'Document completeness improving by 12% annually',
      confidence: 78,
      recommendation: 'Continue digital literacy programs'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'improving': return <TrendingUp className="w-4 h-4 text-primary" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-warning" />;
      default: return <Target className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: number) => {
    return trend > 0 ? 'text-success' : trend < 0 ? 'text-destructive' : 'text-muted-foreground';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-card rounded-lg p-6 border border-border">
          <h1 className="text-3xl font-bold gov-heading flex items-center space-x-3 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            <span>AI Insights Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Advanced analytics and AI-powered insights for FRA implementation
          </p>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.metric}
                  </CardTitle>
                  {getStatusIcon(metric.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`flex items-center space-x-1 text-sm ${getTrendColor(metric.trend)}`}>
                    <TrendingUp className="w-4 h-4" />
                    <span>{metric.trend > 0 ? '+' : ''}{metric.trend}% vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* State-wise Claims Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="w-5 h-5" />
                <span>State-wise Claims Analysis</span>
              </CardTitle>
              <CardDescription>Approved vs Pending claims by state</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stateWiseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="approved" fill="#22c55e" name="Approved" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                  <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Land Use Classification */}
          <Card>
            <CardHeader>
              <CardTitle>Land Use Classification</CardTitle>
              <CardDescription>AI-analyzed land type distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={landUseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {landUseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Processing Efficiency Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Processing Efficiency Trends</span>
            </CardTitle>
            <CardDescription>Monthly application volume and approval efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="applications"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Applications"
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="approvals"
                  stackId="1"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                  name="Approvals"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  name="Efficiency %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Predictions & Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>AI Predictions & Recommendations</span>
            </CardTitle>
            <CardDescription>Machine learning insights for policy optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {aiPredictions.map((prediction, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold">{prediction.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{prediction.confidence}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{prediction.prediction}</p>
                <div className="flex items-center space-x-2 p-3 bg-primary/5 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Recommendation: {prediction.recommendation}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Beneficiary Impact</h3>
              <p className="text-2xl font-bold text-primary mb-1">1,567</p>
              <p className="text-sm text-muted-foreground">Families benefited this year</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Land Secured</h3>
              <p className="text-2xl font-bold text-success mb-1">4,892</p>
              <p className="text-sm text-muted-foreground">Acres of forest rights secured</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Processing Speed</h3>
              <p className="text-2xl font-bold text-warning mb-1">45</p>
              <p className="text-sm text-muted-foreground">Average days to process</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};