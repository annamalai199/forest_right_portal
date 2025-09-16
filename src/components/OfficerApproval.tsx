import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  MapPin, 
  FileText, 
  Clock,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

interface ClaimData {
  id: string;
  ownerName: string;
  surveyNumber: string;
  area: string;
  village: string;
  district: string;
  submittedDate: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  coordinates: [number, number];
  documents: string[];
}

const mockClaims: ClaimData[] = [
  {
    id: 'FRA/CGH/BST/2024/004',
    ownerName: 'Ramesh Kumar Singh',
    surveyNumber: 'Survey No. 234/1',
    area: '2.5 acres',
    village: 'Kondagaon',
    district: 'Bastar',
    submittedDate: '2024-02-20',
    status: 'pending',
    coordinates: [81.2849, 19.1383],
    documents: ['patta_scan.jpg', 'identity_proof.pdf']
  },
  {
    id: 'FRA/CGH/BST/2024/005',
    ownerName: 'Sunita Devi',
    surveyNumber: 'Survey No. 156/2',
    area: '1.8 acres',
    village: 'Tokapal',
    district: 'Bastar',
    submittedDate: '2024-02-18',
    status: 'under_review',
    coordinates: [81.3849, 19.2383],
    documents: ['patta_scan.jpg', 'identity_proof.pdf', 'survey_doc.pdf']
  }
];

export const OfficerApproval = () => {
  const [claims, setClaims] = useState<ClaimData[]>(mockClaims);
  const [selectedClaim, setSelectedClaim] = useState<ClaimData | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [remarks, setRemarks] = useState('');
  const { toast } = useToast();

  const handleClaimAction = async (claimId: string, action: 'approve' | 'reject', remarks?: string) => {
    setActionInProgress(claimId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { ...claim, status: action === 'approve' ? 'approved' : 'rejected' }
        : claim
    ));
    
    setActionInProgress(null);
    setRemarks('');
    
    toast({
      title: action === 'approve' ? "Claim Approved" : "Claim Rejected",
      description: `Claim ${claimId} has been ${action}d successfully`,
      variant: action === 'approve' ? "default" : "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10 border-success/20';
      case 'rejected': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'under_review': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-warning bg-warning/10 border-warning/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Pending Claims for Review</span>
            <Badge variant="secondary" className="ml-2">
              {claims.filter(c => c.status === 'pending' || c.status === 'under_review').length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Owner Name</TableHead>
                <TableHead>Land Details</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-mono text-sm">{claim.id}</TableCell>
                  <TableCell className="font-medium">{claim.ownerName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{claim.surveyNumber}</div>
                      <div className="text-muted-foreground">{claim.area}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{claim.village}</div>
                      <div className="text-muted-foreground">{claim.district}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(claim.submittedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(claim.status)} border`}>
                      {getStatusIcon(claim.status)}
                      <span className="ml-1 capitalize">{claim.status.replace('_', ' ')}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedClaim(claim)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Review Claim: {selectedClaim?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedClaim && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-sm font-medium">Owner Information</Label>
                                    <div className="mt-1 p-3 bg-muted rounded-lg">
                                      <p className="font-medium">{selectedClaim.ownerName}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedClaim.village}, {selectedClaim.district}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm font-medium">Land Details</Label>
                                    <div className="mt-1 p-3 bg-muted rounded-lg space-y-1">
                                      <p><span className="font-medium">Survey No:</span> {selectedClaim.surveyNumber}</p>
                                      <p><span className="font-medium">Area:</span> {selectedClaim.area}</p>
                                      <div className="flex items-center space-x-2 mt-2">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-mono">
                                          {selectedClaim.coordinates.join(', ')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-sm font-medium">Documents</Label>
                                    <div className="mt-1 space-y-2">
                                      {selectedClaim.documents.map((doc, idx) => (
                                        <div key={idx} className="flex items-center space-x-2 p-2 bg-muted rounded">
                                          <FileText className="w-4 h-4 text-primary" />
                                          <span className="text-sm">{doc}</span>
                                          <Button variant="ghost" size="sm" className="ml-auto">
                                            <Eye className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="remarks" className="text-sm font-medium">
                                      Officer Remarks
                                    </Label>
                                    <Textarea
                                      id="remarks"
                                      value={remarks}
                                      onChange={(e) => setRemarks(e.target.value)}
                                      placeholder="Add verification notes or comments..."
                                      className="mt-1"
                                      rows={4}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                                <Button
                                  variant="outline"
                                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                  onClick={() => handleClaimAction(selectedClaim.id, 'reject', remarks)}
                                  disabled={actionInProgress === selectedClaim.id}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject Claim
                                </Button>
                                <Button
                                  className="text-success border-success bg-success hover:bg-success/90 text-success-foreground"
                                  onClick={() => handleClaimAction(selectedClaim.id, 'approve', remarks)}
                                  disabled={actionInProgress === selectedClaim.id}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve Claim
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {(claim.status === 'pending' || claim.status === 'under_review') && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-success border-success hover:bg-success hover:text-success-foreground"
                            onClick={() => handleClaimAction(claim.id, 'approve')}
                            disabled={actionInProgress === claim.id}
                          >
                            {actionInProgress === claim.id ? (
                              <Clock className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleClaimAction(claim.id, 'reject')}
                            disabled={actionInProgress === claim.id}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};