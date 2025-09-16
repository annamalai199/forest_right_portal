import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { PattaUpload } from '@/components/PattaUpload';
import { MapPin, FileText, CheckCircle, Clock, AlertCircle, ExternalLink, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserDashboard = () => {
  const { user } = useAuth();

  // Mock user data
  const userClaims = [
    {
      id: 'FRA/CGH/BST/2024/001',
      status: 'approved',
      landArea: 2.5,
      village: 'Kondagaon',
      approvedDate: '2024-01-15'
    },
    {
      id: 'FRA/CGH/BST/2024/002',
      status: 'pending',
      landArea: 1.8,
      village: 'Tokapal',
      submittedDate: '2024-02-10'
    }
  ];

  const eligibleSchemes = [
    {
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      eligibility: 'Eligible',
      amount: '₹6,000/year'
    },
    {
      name: 'Jal Jeevan Mission',
      description: 'Household water connection',
      eligibility: 'Eligible',
      amount: 'Free Connection'
    },
    {
      name: 'MGNREGA',
      description: 'Rural employment guarantee',
      eligibility: 'Eligible',
      amount: '100 days work'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending': return <Clock className="w-4 h-4 text-warning" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-card rounded-lg p-6 border border-border">
        <h1 className="text-2xl font-bold gov-heading mb-2">
          Welcome, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Manage your Forest Rights Act claims and access government schemes
        </p>
        <div className="flex items-center space-x-2 mt-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{user?.district}, {user?.state}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{userClaims.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Land</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {userClaims.filter(c => c.status === 'approved').reduce((acc, c) => acc + c.landArea, 0)} acres
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eligible Schemes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{eligibleSchemes.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Claims */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>My FRA Claims</span>
                </CardTitle>
                <CardDescription>Track your forest rights applications</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/atlas">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Map
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {userClaims.map((claim) => (
              <div key={claim.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{claim.id}</h3>
                  <Badge className={getStatusColor(claim.status)}>
                    {claim.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(claim.status)}
                    <span>Village: {claim.village}</span>
                  </div>
                  <div>Land Area: {claim.landArea} acres</div>
                  <div>
                    {claim.status === 'approved' && claim.approvedDate && 
                      `Approved: ${new Date(claim.approvedDate).toLocaleDateString()}`
                    }
                    {claim.status === 'pending' && claim.submittedDate && 
                      `Submitted: ${new Date(claim.submittedDate).toLocaleDateString()}`
                    }
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Eligible Schemes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Eligible Government Schemes</span>
            </CardTitle>
            <CardDescription>Schemes you can apply for based on your FRA status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {eligibleSchemes.map((scheme, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{scheme.name}</h3>
                  <Badge className="bg-success text-success-foreground">
                    {scheme.eligibility}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                <div className="text-sm font-medium text-primary">{scheme.amount}</div>
              </div>
            ))}
            
            <Button asChild className="w-full" variant="outline">
              <Link to="/dss">
                View All Recommendations
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Patta Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload New Patta Document</span>
          </CardTitle>
          <CardDescription>
            Upload your patta documents for automatic data extraction and FRA claim processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PattaUpload onDataExtracted={(data) => {
            console.log('Extracted data:', data);
            // Handle extracted data
          }} />
        </CardContent>
      </Card>
    </div>
  );
};