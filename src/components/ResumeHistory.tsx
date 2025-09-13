import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { History, Eye, FileText, Star, Calendar, User, Mail, Phone, Award, TrendingUp, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock historical data - in real implementation, this would come from your backend
const mockHistoryData = [
  {
    id: 1,
    filename: "sarah_johnson_resume.pdf",
    uploaded_at: "2024-01-15T10:30:00Z",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    rating: 8.5,
    extracted_data: {
      core_skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "MongoDB"],
      soft_skills: ["Leadership", "Problem Solving", "Team Collaboration", "Communication"],
      experience_years: 5,
      education: "Master's in Computer Science"
    },
    llm_analysis: {
      resume_rating: 8.5,
      improvement_areas: "Consider adding more quantifiable achievements and specific project outcomes. Include metrics that demonstrate your impact in previous roles.",
      upskill_suggestions: [
        { skill: "Machine Learning", reason: "High demand in current market" },
        { skill: "DevOps/CI-CD", reason: "Complements your full-stack development skills" }
      ]
    }
  },
  {
    id: 2,
    filename: "michael_chen_resume_v2.pdf",
    uploaded_at: "2024-01-10T14:45:00Z",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 987-6543",
    rating: 7.2,
    extracted_data: {
      core_skills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes"],
      soft_skills: ["Analytical Thinking", "Detail-oriented", "Time Management"],
      experience_years: 3,
      education: "Bachelor's in Software Engineering"
    },
    llm_analysis: {
      resume_rating: 7.2,
      improvement_areas: "Expand the professional summary section and add more specific achievements with numbers and results.",
      upskill_suggestions: [
        { skill: "Cloud Architecture", reason: "Essential for senior backend roles" },
        { skill: "Microservices", reason: "Aligns with current architecture trends" }
      ]
    }
  },
  {
    id: 3,
    filename: "emma_wilson_resume.pdf", 
    uploaded_at: "2024-01-08T09:15:00Z",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+1 (555) 456-7890",
    rating: 9.1,
    extracted_data: {
      core_skills: ["UX/UI Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      soft_skills: ["Creativity", "Empathy", "Communication", "Collaboration"],
      experience_years: 6,
      education: "Master's in Human-Computer Interaction"
    },
    llm_analysis: {
      resume_rating: 9.1,
      improvement_areas: "Excellent resume overall. Consider adding more quantitative metrics to showcase the impact of your design work.",
      upskill_suggestions: [
        { skill: "Design Systems", reason: "Growing importance in large organizations" },
        { skill: "Front-end Development", reason: "Valuable skill for modern UX designers" }
      ]
    }
  }
];

interface ResumeHistoryProps {
  onSelectResume?: (resumeId: number) => void;
}

const ResumeHistory: React.FC<ResumeHistoryProps> = ({ onSelectResume }) => {
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchResumes = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResumes(mockHistoryData);
      setIsLoading(false);
    };

    fetchResumes();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8.5) return 'text-secondary';
    if (rating >= 7) return 'text-accent';
    return 'text-destructive';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 8.5) return { variant: 'secondary' as const, text: 'Excellent' };
    if (rating >= 7) return { variant: 'default' as const, text: 'Good' };
    return { variant: 'destructive' as const, text: 'Needs Work' };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="gradient-primary p-4 rounded-full w-fit mx-auto">
            <History className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Loading Resume History...</h2>
          <p className="text-muted-foreground">Fetching your previous analyses</p>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shadow-medium animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-1/4"></div>
                  </div>
                  <div className="h-10 w-20 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="gradient-primary p-4 rounded-full w-fit mx-auto">
          <History className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Resume Analysis History</h2>
        <p className="text-muted-foreground">
          View and compare your previous resume analyses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-medium">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{resumes.length}</div>
            <div className="text-sm text-muted-foreground">Total Analyses</div>
          </CardContent>
        </Card>
        <Card className="shadow-medium">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">
              {Math.max(...resumes.map(r => r.rating)).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Highest Rating</div>
          </CardContent>
        </Card>
        <Card className="shadow-medium">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {(resumes.reduce((sum, r) => sum + r.rating, 0) / resumes.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Resume List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Resume Analyses</h3>
        
        {resumes.length === 0 ? (
          <Card className="shadow-medium">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Resumes Analyzed Yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first resume to get started with AI-powered analysis
              </p>
              <Button variant="upload" onClick={() => onSelectResume?.(0)}>
                Upload Resume
              </Button>
            </CardContent>
          </Card>
        ) : (
          resumes.map((resume) => (
            <Card key={resume.id} className="shadow-medium hover:shadow-strong transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-lg">{resume.filename}</h3>
                      <Badge {...getRatingBadge(resume.rating)}>
                        {getRatingBadge(resume.rating).text}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{resume.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(resume.uploaded_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{resume.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span className={`font-semibold ${getRatingColor(resume.rating)}`}>
                          {resume.rating}/10
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {resume.extracted_data.core_skills.slice(0, 3).map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {resume.extracted_data.core_skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resume.extracted_data.core_skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedResume(resume)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          {resume.filename}
                        </DialogTitle>
                        <DialogDescription>
                          Detailed analysis from {formatDate(resume.uploaded_at)}
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedResume && (
                        <div className="space-y-6 mt-4">
                          {/* Personal Info */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-base">
                                <User className="w-4 h-4 text-primary" />
                                Personal Information
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-muted-foreground" />
                                  <span>{selectedResume.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span>{selectedResume.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{selectedResume.phone}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Rating */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-base">
                                <Star className="w-4 h-4 text-accent" />
                                Resume Rating
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-4">
                                <div className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                                  {selectedResume.llm_analysis.resume_rating}/10
                                </div>
                                <div className="flex-1">
                                  <Progress 
                                    value={selectedResume.llm_analysis.resume_rating * 10} 
                                    className="h-2"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Skills */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                  <Award className="w-4 h-4 text-primary" />
                                  Technical Skills
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2">
                                  {selectedResume.extracted_data.core_skills.map((skill: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                  <TrendingUp className="w-4 h-4 text-secondary" />
                                  Soft Skills
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2">
                                  {selectedResume.extracted_data.soft_skills.map((skill: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Improvements */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-base">
                                <TrendingUp className="w-4 h-4 text-accent" />
                                Improvement Areas
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {selectedResume.llm_analysis.improvement_areas}
                              </p>
                            </CardContent>
                          </Card>

                          {/* Upskill Suggestions */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-base">
                                <Lightbulb className="w-4 h-4 text-secondary" />
                                Recommended Skills
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {selectedResume.llm_analysis.upskill_suggestions.map((suggestion: any, index: number) => (
                                <div key={index} className="p-3 bg-muted rounded-lg">
                                  <h4 className="font-medium text-sm mb-1">{suggestion.skill}</h4>
                                  <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumeHistory;