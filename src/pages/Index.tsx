import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResumeUpload from '@/components/ResumeUpload';
import ResumeHistory from '@/components/ResumeHistory';
import { Upload, History, Brain, TrendingUp, Star, Lightbulb } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('upload');

  const handleAnalysisComplete = (result: any) => {
    // You could handle the result here, perhaps updating a global state
    console.log('Analysis completed:', result);
  };

  const handleSelectResume = (resumeId: number) => {
    if (resumeId === 0) {
      // Switch to upload tab
      setActiveTab('upload');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="gradient-primary p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
                Smart Resume Analyzer
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                About
              </Button>
              <Button variant="ghost" size="sm">
                Help
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 shadow-medium">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Resume
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upload" className="mt-0">
            <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <ResumeHistory onSelectResume={handleSelectResume} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="gradient-primary p-2 rounded-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold gradient-hero bg-clip-text text-transparent">
                  Smart Resume Analyzer
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered resume analysis to help you land your dream job.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  AI-Powered Analysis
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  Skill Assessment
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Career Guidance
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Technology</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>React + TypeScript</li>
                <li>Supabase Backend</li>
                <li>Gemini AI Integration</li>
                <li>Advanced NLP</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                    Contact Us
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                    Privacy Policy
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2024 Smart Resume Analyzer. Built with React, Supabase & AI. 
              <span className="ml-2">
                Ready for integration with your backend of choice.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;