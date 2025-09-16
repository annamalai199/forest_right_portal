import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { OfficerApproval } from '@/components/OfficerApproval';
import { 
  FileCheck, 
  FileClock, 
  FileX, 
  Users, 
  MapPin, 
  CheckCircle, 
  XCircle,
  Download 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const OfficerDashboard = () => {
  const { user } = useAuth();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Mock claims data for officer view
  const pendingClaims = [
    {
      id: 'FRA/CGH/KNK/2024/003',
      beneficiary: 'Sunita Devi',
      village: 'Bhanupratappur',
      landArea: 3.2,
      submittedDate: '2024-02-15',
      status: 'pending'
    },
    {
      id: 'FRA/CGH/KNK/2024/004',
      beneficiary: 'Mohan Lal',
      village: 'Korar',
      landArea: 2.1,
      submittedDate: '2024-02-12',
      status: 'pending'
    },
    {
      id: 'FRA/CGH/KNK/2024/005',
      beneficiary: 'Kamala Bai',
      village: 'Narharpur',
      landArea: 1.8,
      submittedDate: '2024-02-10',
      status: 'under_review'
    }
  ];

  const districtStats = {
    totalClaims: 156,
    approved: 89,
    pending: 42,
    rejected: 25,
    totalLandApproved: 245.8
  };

  const handleClaimAction = async (claimId: string, action: 'approve' | 'reject') => {
    setActionLoading(claimId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setActionLoading(null);
    // In real app, this would update the claim status
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-card rounded-lg p-6 border border-border">
        <h1 className="text-2xl font-bold gov-heading mb-2">
          Officer Dashboard - {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Manage FRA claims and verification for {user?.district} District
        </p>
        <div className="flex items-center space-x-2 mt-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{user?.district} District, {user?.state}</span>
        </div>
      </div>

      {/* District Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <FileCheck className="w-4 h-4" />
              <span>Total Claims</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{districtStats.totalClaims}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Approved</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{districtStats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <FileClock className="w-4 h-4 text-warning" />
              <span>Pending</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{districtStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <FileX className="w-4 h-4 text-destructive" />
              <span>Rejected</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{districtStats.rejected}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Land Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">{districtStats.totalLandApproved} acres</div>
          </CardContent>
        </Card>
      </div>

      {/* Officer Approval Section */}
      <OfficerApproval />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-glow transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Village Surveys</h3>
                <p className="text-sm text-muted-foreground">Conduct field verification</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold">Document Review</h3>
                <p className="text-sm text-muted-foreground">Verify submitted documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold">Generate Reports</h3>
                <p className="text-sm text-muted-foreground">Export monthly progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};