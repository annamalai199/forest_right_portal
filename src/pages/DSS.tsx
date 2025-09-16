import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Settings, 
  Target, 
  Users, 
  DollarSign, 
  Droplet,
  Leaf,
  Home,
  GraduationCap,
  Heart,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export const DSS = () => {
  const { user } = useAuth();

  // Role-based recommendations
  const getRecommendations = () => {
    switch (user?.role) {
      case 'user':
        return userRecommendations;
      case 'officer':
        return officerRecommendations;
      case 'admin':
        return adminRecommendations;
      default:
        return userRecommendations;
    }
  };

  const userRecommendations = [
    {
      id: 1,
      scheme: 'PM-KISAN',
      title: 'Direct Income Support',
      description: 'You are eligible for ₹6,000 annual direct benefit transfer',
      eligibility: 'eligible',
      priority: 'high',
      icon: DollarSign,
      steps: [
        'Visit nearest Common Service Center',
        'Carry FRA land documents',
        'Complete Aadhaar verification',
        'Submit bank account details'
      ],
      benefits: '₹6,000/year in 3 installments',
      deadline: '2024-03-31'
    },
    {
      id: 2,
      scheme: 'Jal Jeevan Mission',
      title: 'Household Water Connection',
      description: 'Your village qualifies for piped water supply under JJM',
      eligibility: 'eligible',
      priority: 'high',
      icon: Droplet,
      steps: [
        'Village committee to submit application',
        'Community contribution arrangement',
        'Site survey and technical approval',
        'Implementation by approved contractor'
      ],
      benefits: 'Free water connection + 55L/day assured supply',
      deadline: '2024-06-30'
    },
    {
      id: 3,
      scheme: 'MGNREGA',
      title: 'Employment Guarantee',
      description: 'Guaranteed 100 days employment available',
      eligibility: 'eligible',
      priority: 'medium',
      icon: Users,
      steps: [
        'Apply for job card at Gram Panchayat',
        'Submit work demand application',
        'Join allocated work projects',
        'Ensure attendance marking'
      ],
      benefits: '₹220/day wages for 100 days',
      deadline: 'Ongoing'
    }
  ];

  const officerRecommendations = [
    {
      id: 1,
      title: 'Accelerated Claim Processing',
      description: 'Current backlog: 42 pending claims. Recommended action plan.',
      priority: 'high',
      icon: Target,
      metrics: { current: 42, target: 20, deadline: '30 days' },
      actions: [
        'Organize weekend verification camps',
        'Deploy additional survey teams',
        'Implement digital document verification',
        'Set up mobile verification units'
      ]
    },
    {
      id: 2,
      title: 'Village-Level Awareness Campaign',
      description: 'Low application rate in 8 villages. Outreach recommended.',
      priority: 'medium',
      icon: Users,
      metrics: { villages: 8, coverage: '45%', target: '80%' },
      actions: [
        'Schedule village meetings',
        'Distribute multilingual materials',
        'Train local facilitators',
        'Use mobile announcement systems'
      ]
    },
    {
      id: 3,
      title: 'Inter-Department Coordination',
      description: 'Sync with Revenue, Forest, and Tribal Welfare departments.',
      priority: 'medium',
      icon: Settings,
      metrics: { departments: 3, meetings: 'Monthly', coordination: '70%' },
      actions: [
        'Schedule monthly coordination meetings',
        'Create shared digital dashboards',
        'Establish joint verification protocols',
        'Implement cross-department training'
      ]
    }
  ];

  const adminRecommendations = [
    {
      id: 1,
      title: 'State Policy Optimization',
      description: 'AI analysis suggests policy improvements for better outcomes.',
      priority: 'high',
      icon: Target,
      impact: { beneficiaries: '25,000+', efficiency: '+35%', cost: '₹2.5Cr savings' },
      policies: [
        'Digitize entire FRA workflow',
        'Implement GPS-based land verification',
        'Create unified tribal welfare portal',
        'Establish mobile courts for quick resolution'
      ]
    },
    {
      id: 2,
      title: 'Budget Reallocation',
      description: 'Fund distribution optimization based on district performance.',
      priority: 'high',
      icon: DollarSign,
      impact: { districts: 28, allocation: '₹45Cr', efficiency: '+28%' },
      allocations: [
        'Increase allocation to high-performing districts',
        'Create incentive fund for target achievement',
        'Allocate emergency fund for pending cases',
        'Technology upgrade fund allocation'
      ]
    },
    {
      id: 3,
      title: 'Capacity Building Program',
      description: 'Officer training program to improve processing efficiency.',
      priority: 'medium',
      icon: GraduationCap,
      impact: { officers: 156, training: '40 hours', improvement: '+25%' },
      modules: [
        'Digital systems training',
        'Legal procedures workshop',
        'Community engagement techniques',
        'Conflict resolution skills'
      ]
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

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility) {
      case 'eligible': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'not_eligible': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const recommendations = getRecommendations();

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
            <Settings className="w-8 h-8 text-primary" />
            <span>Decision Support System</span>
          </h1>
          <p className="text-muted-foreground">
            AI-powered recommendations for {user?.role === 'user' ? 'eligible schemes' : 
            user?.role === 'officer' ? 'district operations' : 'state policy decisions'}
          </p>
          <div className="flex items-center space-x-2 mt-3">
            <Badge className="bg-primary text-primary-foreground">
              {user?.role?.toUpperCase()} DASHBOARD
            </Badge>
            <span className="text-sm text-muted-foreground">
              {user?.role === 'user' ? `Village: ${user?.district}` : 
               user?.role === 'officer' ? `District: ${user?.district}` : 
               `State: ${user?.state}`}
            </span>
          </div>
        </div>

        {/* User-specific content */}
        {user?.role === 'user' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Eligible Schemes</h3>
                  <p className="text-2xl font-bold text-success">3</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Total Benefits</h3>
                  <p className="text-2xl font-bold text-primary">₹6,000+</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Pending Applications</h3>
                  <p className="text-2xl font-bold text-warning">1</p>
                </CardContent>
              </Card>
            </div>

            {userRecommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <Card key={rec.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{rec.title}</span>
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority.toUpperCase()}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{rec.scheme}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getEligibilityColor(rec.eligibility)}>
                        {rec.eligibility.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{rec.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Application Steps:</h4>
                        <ol className="space-y-2">
                          {rec.steps.map((step, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </span>
                              <span className="text-sm">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Benefits:</h4>
                          <p className="text-sm bg-success/10 text-success-foreground p-3 rounded-lg">
                            {rec.benefits}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Deadline:</h4>
                          <p className="text-sm font-medium">{rec.deadline}</p>
                        </div>
                        <Button className="w-full">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Officer/Admin-specific content */}
        {(user?.role === 'officer' || user?.role === 'admin') && (
          <div className="space-y-6">
            {recommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <Card key={rec.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{rec.title}</span>
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority.toUpperCase()}
                            </Badge>
                          </CardTitle>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Implement
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{rec.description}</p>
                    
                    {user?.role === 'officer' && rec.metrics && (
                      <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="text-center">
                          <div className="font-bold text-lg">{rec.metrics.current}</div>
                          <div className="text-sm text-muted-foreground">Current</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-success">{rec.metrics.target}</div>
                          <div className="text-sm text-muted-foreground">Target</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-primary">{rec.metrics.deadline}</div>
                          <div className="text-sm text-muted-foreground">Timeline</div>
                        </div>
                      </div>
                    )}

                    {user?.role === 'admin' && rec.impact && (
                      <div className="grid grid-cols-3 gap-4 p-4 bg-primary/5 rounded-lg">
                        <div className="text-center">
                          <div className="font-bold text-lg text-primary">{rec.impact.beneficiaries || rec.impact.districts}</div>
                          <div className="text-sm text-muted-foreground">
                            {rec.impact.beneficiaries ? 'Beneficiaries' : 'Districts'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-success">{rec.impact.efficiency}</div>
                          <div className="text-sm text-muted-foreground">Efficiency Gain</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-warning">{rec.impact.cost || rec.impact.allocation}</div>
                          <div className="text-sm text-muted-foreground">
                            {rec.impact.cost ? 'Cost Impact' : 'Budget'}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold mb-3">Recommended Actions:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(rec.actions || rec.policies || rec.allocations || rec.modules || []).map((action, index) => (
                          <div key={index} className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};