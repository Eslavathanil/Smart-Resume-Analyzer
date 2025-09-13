import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, Star, TrendingUp, Lightbulb, User, Mail, Phone, Award } from 'lucide-react';

// Mock data for demo - in real implementation, this would come from your backend
const mockAnalysisResult = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  extracted_data: {
    core_skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "MongoDB"],
    soft_skills: ["Leadership", "Problem Solving", "Team Collaboration", "Communication"],
    experience_years: 5,
    education: "Master's in Computer Science",
    certifications: ["AWS Solutions Architect", "Google Cloud Professional"]
  },
  llm_analysis: {
    resume_rating: 8.5,
    improvement_areas: "Consider adding more quantifiable achievements and specific project outcomes. Include metrics that demonstrate your impact in previous roles. The technical skills section could benefit from more detailed descriptions of your proficiency levels.",
    upskill_suggestions: [
      { skill: "Machine Learning", reason: "High demand in current market and aligns with your technical background" },
      { skill: "DevOps/CI-CD", reason: "Complements your full-stack development skills and increases marketability" },
      { skill: "System Design", reason: "Essential for senior-level positions you're targeting" },
      { skill: "Data Analytics", reason: "Valuable addition to your existing technical skill set" }
    ]
  }
};

interface ResumeUploadProps {
  onAnalysisComplete?: (result: any) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalysisComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const simulateUpload = useCallback(async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressSteps = [
      { progress: 20, message: "Uploading file..." },
      { progress: 40, message: "Extracting text..." },
      { progress: 60, message: "Analyzing content..." },
      { progress: 80, message: "Generating insights..." },
      { progress: 100, message: "Complete!" }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setUploadProgress(step.progress);
    }

    // Show results after a brief delay
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult);
      setIsUploading(false);
      onAnalysisComplete?.(mockAnalysisResult);
    }, 500);
  }, [onAnalysisComplete]);

  const handleFileUpload = useCallback((file: File) => {
    if (file.type === 'application/pdf') {
      simulateUpload();
    } else {
      alert('Please upload a PDF file');
    }
  }, [simulateUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const resetUpload = useCallback(() => {
    setAnalysisResult(null);
    setUploadProgress(0);
    setIsUploading(false);
  }, []);

  if (analysisResult) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="success-bounce">
            <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Analysis Complete!</h2>
          <p className="text-muted-foreground">Your resume has been thoroughly analyzed by our AI system.</p>
          <Button onClick={resetUpload} variant="outline" size="sm">
            Upload Another Resume
          </Button>
        </div>

        {/* Personal Information */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{analysisResult.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{analysisResult.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{analysisResult.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Resume Rating */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              Resume Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
                {analysisResult.llm_analysis.resume_rating}/10
              </div>
              <div className="flex-1">
                <Progress 
                  value={analysisResult.llm_analysis.resume_rating * 10} 
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {analysisResult.llm_analysis.resume_rating >= 8 ? 'Excellent' : 
                   analysisResult.llm_analysis.resume_rating >= 6 ? 'Good' : 'Needs Improvement'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysisResult.extracted_data.core_skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="shadow-soft">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Soft Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysisResult.extracted_data.soft_skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="shadow-soft">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Improvement Areas */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {analysisResult.llm_analysis.improvement_areas}
            </p>
          </CardContent>
        </Card>

        {/* Upskill Suggestions */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-secondary" />
              Recommended Skills to Learn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisResult.llm_analysis.upskill_suggestions.map((suggestion: any, index: number) => (
              <div key={index} className="p-4 bg-muted rounded-lg shadow-soft">
                <h4 className="font-semibold text-foreground mb-2">{suggestion.skill}</h4>
                <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
          Smart Resume Analyzer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get AI-powered insights to improve your resume and advance your career
        </p>
      </div>

      {/* Upload Section */}
      <Card className="shadow-strong max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Upload Your Resume</CardTitle>
          <CardDescription className="text-center">
            Upload a PDF file to get detailed analysis and personalized recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isUploading ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="upload-pulse inline-block p-4 rounded-full gradient-primary mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Analyzing Your Resume...</h3>
                <p className="text-muted-foreground">This may take a few moments</p>
              </div>
              <Progress value={uploadProgress} className="h-3" />
              <p className="text-center text-sm text-muted-foreground">
                {uploadProgress < 20 ? 'Uploading file...' :
                 uploadProgress < 40 ? 'Extracting text...' :
                 uploadProgress < 60 ? 'Analyzing content...' :
                 uploadProgress < 80 ? 'Generating insights...' : 'Almost done!'}
              </p>
            </div>
          ) : (
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
                isDragOver 
                  ? 'border-primary bg-primary/5 shadow-glow' 
                  : 'border-border hover:border-primary hover:bg-primary/5'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Drag and drop your resume here
              </h3>
              <p className="text-muted-foreground mb-4">
                or click to browse files
              </p>
              <div className="space-y-2">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="resume-upload"
                />
                <Button
                  variant="upload"
                  size="lg"
                  asChild
                  className="cursor-pointer"
                >
                  <label htmlFor="resume-upload">
                    Choose PDF File
                  </label>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Supports PDF files up to 10MB
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="shadow-medium text-center">
          <CardContent className="pt-6">
            <div className="gradient-primary p-3 rounded-full w-fit mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Smart Extraction</h3>
            <p className="text-sm text-muted-foreground">
              Automatically extracts and organizes your information
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-medium text-center">
          <CardContent className="pt-6">
            <div className="gradient-secondary p-3 rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Get personalized feedback from advanced AI models
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-medium text-center">
          <CardContent className="pt-6">
            <div className="gradient-accent p-3 rounded-full w-fit mx-auto mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Career Guidance</h3>
            <p className="text-sm text-muted-foreground">
              Receive actionable recommendations for improvement
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeUpload;