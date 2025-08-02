import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Edit, 
  Calendar, 
  Users, 
  DollarSign, 
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  MoreHorizontal,
  FileText,
  MessageSquare,
  Activity
} from 'lucide-react';

// Mock project data
const mockProject = {
  id: 1,
  name: 'Website Redesign',
  description: 'Complete redesign of company website with modern UI/UX principles, responsive design, and improved user experience. This project includes user research, wireframing, design system creation, and full development.',
  status: 'active',
  priority: 'high',
  progress: 65,
  startDate: '2024-01-15',
  endDate: '2024-03-15',
  budget: 50000,
  spent: 32500,
  client: 'Internal',
  manager: 'Ahmed Hassan',
  teamMembers: [
    { id: 1, name: 'Ahmed Hassan', role: 'Project Manager', avatar: '/avatars/ahmed.jpg' },
    { id: 2, name: 'Sara Ahmed', role: 'Frontend Developer', avatar: '/avatars/sara.jpg' },
    { id: 3, name: 'Omar Khalil', role: 'Backend Developer', avatar: '/avatars/omar.jpg' },
    { id: 4, name: 'Fatima Ali', role: 'UI/UX Designer', avatar: '/avatars/fatima.jpg' },
    { id: 5, name: 'Mohamed Saleh', role: 'QA Engineer', avatar: '/avatars/mohamed.jpg' }
  ],
  objectives: [
    'Improve user experience and interface design',
    'Implement responsive design for all devices',
    'Optimize website performance and loading speed',
    'Integrate modern web technologies and frameworks'
  ],
  deliverables: [
    'User research and analysis report',
    'Wireframes and prototypes',
    'Design system and style guide',
    'Fully functional responsive website',
    'Testing and QA documentation'
  ]
};

// Mock tasks data
const mockTasks = [
  {
    id: 1,
    title: 'User Research and Analysis',
    description: 'Conduct user interviews and analyze current website usage',
    status: 'completed',
    priority: 'high',
    assignee: 'Fatima Ali',
    dueDate: '2024-01-25',
    progress: 100
  },
  {
    id: 2,
    title: 'Wireframe Creation',
    description: 'Create wireframes for all main pages',
    status: 'completed',
    priority: 'high',
    assignee: 'Fatima Ali',
    dueDate: '2024-02-05',
    progress: 100
  },
  {
    id: 3,
    title: 'Frontend Development',
    description: 'Implement responsive frontend using React and Tailwind CSS',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sara Ahmed',
    dueDate: '2024-02-20',
    progress: 70
  },
  {
    id: 4,
    title: 'Backend API Development',
    description: 'Develop REST APIs for content management',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Omar Khalil',
    dueDate: '2024-02-25',
    progress: 60
  },
  {
    id: 5,
    title: 'Quality Assurance Testing',
    description: 'Comprehensive testing across all devices and browsers',
    status: 'pending',
    priority: 'medium',
    assignee: 'Mohamed Saleh',
    dueDate: '2024-03-10',
    progress: 0
  }
];

// Mock activities data
const mockActivities = [
  {
    id: 1,
    type: 'task_completed',
    message: 'Wireframe Creation task completed',
    user: 'Fatima Ali',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'comment',
    message: 'Added comment on Frontend Development task',
    user: 'Sara Ahmed',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'file_uploaded',
    message: 'Uploaded design mockups',
    user: 'Fatima Ali',
    time: '1 day ago'
  },
  {
    id: 4,
    type: 'task_assigned',
    message: 'Backend API Development assigned to Omar Khalil',
    user: 'Ahmed Hassan',
    time: '2 days ago'
  }
];

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/projects')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{mockProject.name}</h1>
            <p className="text-muted-foreground">Project ID: #{id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/projects/${id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Project Status Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(mockProject.status)}>
                  {mockProject.status}
                </Badge>
                <Badge className={getPriorityColor(mockProject.priority)}>
                  {mockProject.priority} priority
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">Status & Priority</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{mockProject.startDate} - {mockProject.endDate}</span>
              </div>
              <div className="text-sm text-muted-foreground">Timeline</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">${mockProject.spent.toLocaleString()} / ${mockProject.budget.toLocaleString()}</span>
              </div>
              <div className="text-sm text-muted-foreground">Budget Utilization</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{mockProject.progress}% Complete</span>
              </div>
              <Progress value={mockProject.progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Project Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockProject.description}
                  </p>
                </CardContent>
              </Card>

              {/* Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Project Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockProject.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Deliverables */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockProject.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Client</div>
                    <div className="text-sm text-muted-foreground">{mockProject.client}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Project Manager</div>
                    <div className="text-sm text-muted-foreground">{mockProject.manager}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Team Size</div>
                    <div className="text-sm text-muted-foreground">{mockProject.teamMembers.length} members</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Budget</div>
                    <div className="text-sm text-muted-foreground">${mockProject.budget.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Tasks Completed</span>
                    <span className="text-sm font-medium">3/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Budget Used</span>
                    <span className="text-sm font-medium">{Math.round((mockProject.spent / mockProject.budget) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Days Remaining</span>
                    <span className="text-sm font-medium">
                      {Math.ceil((new Date(mockProject.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Tasks</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">{task.status}</span>
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Assigned to: {task.assignee}</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Progress: {task.progress}%</span>
                        <Progress value={task.progress} className="w-32 h-2" />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProject.teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Files</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium mb-2">No files uploaded yet</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload project files, documents, and resources here
                </p>
                <Button>Upload Files</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{activity.user}</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

