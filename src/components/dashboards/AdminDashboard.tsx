import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
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
  Line 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  FileText, 
  Download,
  AlertTriangle,
  Target,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock state-level data
  const stateStats = {
    totalClaims: 2456,
    approved: 1567,
    pending: 623,
    rejected: 266,
    totalLandApproved: 4892.5,
    totalBeneficiaries: 1567,
    districts: 28
  };

  const districtWiseData = [
    { district: 'Bastar', approved: 234, pending: 45, rejected: 23 },
    { district: 'Kanker', approved: 187, pending: 38, rejected: 19 },
    { district: 'Kondagaon', approved: 156, pending: 29, rejected: 15 },
    { district: 'Sukma', approved: 143, pending: 52, rejected: 21 },
    { district: 'Narayanpur', approved: 128, pending: 34, rejected: 18 },
    { district: 'Dantewada', approved: 119, pending: 41, rejected: 16 }
  ];

  const landTypeData = [
    { name: 'Agricultural', value: 2456, color: '#22c55e' },
    { name: 'Forest', value: 1834, color: '#3b82f6' },
    { name: 'Water Bodies', value: 602, color: '#f59e0b' }
  ];

  const monthlyTrends = [
    { month: 'Jan', claims: 145, approvals: 98 },
    { month: 'Feb', claims: 167, approvals: 112 },
    { month: 'Mar', claims: 189, approvals: 134 },
    { month: 'Apr', claims: 203, approvals: 156 },
    { month: 'May', claims: 178, approvals: 142 },
    { month: 'Jun', claims: 234, approvals: 187 }
  ];

  const dssRecommendations = [
    {
      title: 'PM-KISAN Enrollment Drive',
      description: '1,234 FRA beneficiaries eligible for PM-KISAN scheme',
      priority: 'high',
      action: 'Launch enrollment campaign'
    },
    {
      title: 'Water Scarcity Alert',
      description: '15 villages showing low water index, require Jal Jeevan Mission focus',
      priority: 'high',
      action: 'Coordinate with Water Resources Dept'
    },
    {
      title: 'MGNREGA Integration',
      description: '567 households eligible for 100 days employment guarantee',
      priority: 'medium',
      action: 'Issue work cards and job allocation'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-card rounded-lg p-6 border border-border">
        <h1 className="text-2xl font-bold gov-heading mb-2">
          State Admin Dashboard - {user?.name}
        </h1>
        <p className="text-muted-foreground">
          State-level FRA analytics and policy decision support for {user?.state}
        </p>
        <div className="flex items-center space-x-2 mt-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{user?.state} State Administration</span>
        </div>
      </div>

      {/* State Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stateStats.totalClaims.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stateStats.approved.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stateStats.pending.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Beneficiaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">{stateStats.totalBeneficiaries.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Districts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stateStats.districts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Land Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-success">{stateStats.totalLandApproved.toLocaleString()} acres</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">
              {Math.round((stateStats.approved / stateStats.totalClaims) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District-wise Claims */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="w-5 h-5" />
              <span>District-wise Claims Status</span>
            </CardTitle>
            <CardDescription>Approved vs Pending claims by district</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtWiseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="approved" fill="#22c55e" name="Approved" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Land Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Land Type Distribution</CardTitle>
            <CardDescription>Approved land by usage type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={landTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {landTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Monthly Claims & Approval Trends</span>
          </CardTitle>
          <CardDescription>Track processing efficiency over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="claims" stroke="#3b82f6" name="New Claims" strokeWidth={2} />
              <Line type="monotone" dataKey="approvals" stroke="#22c55e" name="Approvals" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* DSS Policy Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>DSS Policy Recommendations</span>
              </CardTitle>
              <CardDescription>AI-driven insights for policy interventions</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/dss">
                View Full DSS
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {dssRecommendations.map((rec, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm">{rec.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                  {rec.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">Action: {rec.action}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-glow transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">State Report</h3>
                <p className="text-sm text-muted-foreground">Generate annual report</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold">Budget Analysis</h3>
                <p className="text-sm text-muted-foreground">Fund allocation review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold">Officer Training</h3>
                <p className="text-sm text-muted-foreground">Capacity building</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold">Data Export</h3>
                <p className="text-sm text-muted-foreground">Download datasets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};