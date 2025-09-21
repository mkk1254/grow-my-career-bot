import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  FileText, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  GraduationCap, 
  Newspaper,
  Brain,
  Star,
  Target,
  TrendingUp
} from "lucide-react";

interface AnalysisResult {
  extractedSkills: string[];
  hasSkills: string[];
  needsSkills: string[];
  roadmap: { level: string; skills: string[] }[];
  certifications: { free: string[]; paid: string[] };
  newsHighlights: string[];
  quiz: { question: string; answer: string }[];
}

const CareerMentorApp = () => {
  const [inputType, setInputType] = useState<"resume" | "manual">("resume");
  const [resumeText, setResumeText] = useState("");
  const [manualSkills, setManualSkills] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeSkills = () => {
    setIsLoading(true);
    
    // Mock analysis - in real app, this would call an AI API
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        extractedSkills: inputType === "resume" 
          ? ["JavaScript", "React", "HTML", "CSS", "Git"]
          : manualSkills.split(",").map(s => s.trim()),
        hasSkills: ["JavaScript", "React", "HTML", "CSS"],
        needsSkills: ["TypeScript", "Node.js", "Database Design", "System Design", "Testing", "DevOps"],
        roadmap: [
          { level: "Beginner", skills: ["TypeScript Basics", "Node.js Fundamentals"] },
          { level: "Intermediate", skills: ["Database Design", "API Development"] },
          { level: "Advanced", skills: ["System Architecture", "Performance Optimization"] }
        ],
        certifications: {
          free: ["freeCodeCamp Full Stack", "MDN Web Docs Certification"],
          paid: ["AWS Developer Associate", "MongoDB University"]
        },
        newsHighlights: [
          "React 19 introduces new concurrent features for better performance",
          "TypeScript 5.3 adds improved type inference capabilities",
          "Node.js 21 brings enhanced security and performance improvements"
        ],
        quiz: [
          { question: "What is TypeScript's main advantage?", answer: "Static typing for better code reliability" },
          { question: "Name a popular Node.js framework", answer: "Express.js" },
          { question: "What does API stand for?", answer: "Application Programming Interface" }
        ]
      };
      
      setAnalysisResult(mockResult);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-career-primary to-career-secondary text-white">
              <Target className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-career-primary to-career-secondary bg-clip-text text-transparent mb-4">
            AI Career Mentor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analyze your skills, discover your gaps, and get personalized guidance to reach your dream career
          </p>
        </div>

        {!analysisResult ? (
          <Card className="max-w-2xl mx-auto shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-career-primary" />
                Let's Analyze Your Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input Type Selection */}
              <div className="flex gap-2">
                <Button 
                  variant={inputType === "resume" ? "default" : "outline"}
                  onClick={() => setInputType("resume")}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Resume
                </Button>
                <Button 
                  variant={inputType === "manual" ? "default" : "outline"}
                  onClick={() => setInputType("manual")}
                  className="flex-1"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Manual Entry
                </Button>
              </div>

              {/* Input Fields */}
              {inputType === "resume" ? (
                <div className="space-y-2">
                  <Label htmlFor="resume">Paste your resume text here:</Label>
                  <Textarea
                    id="resume"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Copy and paste your resume content here..."
                    className="min-h-32"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="skills">List your current skills (comma-separated):</Label>
                  <Textarea
                    id="skills"
                    value={manualSkills}
                    onChange={(e) => setManualSkills(e.target.value)}
                    placeholder="JavaScript, React, Python, SQL, Project Management..."
                    className="min-h-20"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="career">What's your target career role?</Label>
                <Input
                  id="career"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g., Senior Full Stack Developer, Data Scientist, Product Manager..."
                />
              </div>

              <Button 
                onClick={analyzeSkills}
                disabled={isLoading || !careerGoal || (!resumeText && !manualSkills)}
                className="w-full bg-gradient-to-r from-career-primary to-career-secondary hover:opacity-90 transition-all duration-300"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Analyzing Your Skills...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analyze My Career Path
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Greeting & Summary */}
            <Card className="shadow-elevated">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-career-primary" />
                  <h2 className="text-2xl font-bold">✨ Greeting & Summary</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  You're already on a great path! Let's build on your existing skills and create a roadmap to your dream role as a <span className="font-semibold text-career-primary">{careerGoal}</span>.
                </p>
              </CardContent>
            </Card>

            {/* Extracted Skills */}
            <Card className="shadow-elevated">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-career-primary" />
                  <h2 className="text-2xl font-bold">📄 Extracted Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.extractedSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Skills You Have */}
              <Card className="shadow-elevated">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <h2 className="text-2xl font-bold">✅ Skills You Already Have</h2>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.hasSkills.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Skills to Learn */}
              <Card className="shadow-elevated">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-6 h-6 text-destructive" />
                    <h2 className="text-2xl font-bold">❌ Skills You Need to Learn</h2>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.needsSkills.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Roadmap */}
            <Card className="shadow-elevated">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-career-primary" />
                  <h2 className="text-2xl font-bold">🛣️ Personalized Roadmap</h2>
                </div>
                <div className="space-y-6">
                  {analysisResult.roadmap.map((level, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-career-primary to-career-secondary text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold">{level.level}</h3>
                      </div>
                      <div className="ml-12 flex flex-wrap gap-2">
                        {level.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      {index < analysisResult.roadmap.length - 1 && (
                        <div className="w-px h-6 bg-border ml-4 mt-3" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="shadow-elevated">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-career-primary" />
                  <h2 className="text-2xl font-bold">🎓 Certifications & Resources</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-success mb-3">Free Options:</h3>
                    <ul className="space-y-2">
                      {analysisResult.certifications.free.map((cert, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-career-accent mb-3">Paid Options:</h3>
                    <ul className="space-y-2">
                      {analysisResult.certifications.paid.map((cert, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-career-accent" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tech News */}
            <Card className="shadow-elevated">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Newspaper className="w-6 h-6 text-career-primary" />
                  <h2 className="text-2xl font-bold">📰 Tech News Highlights</h2>
                </div>
                <div className="space-y-3">
                  {analysisResult.newsHighlights.map((news, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted">
                      <p className="text-sm">{news}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quiz */}
            <Card className="shadow-elevated">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-career-primary" />
                  <h2 className="text-2xl font-bold">🧩 Quick Quiz</h2>
                </div>
                <div className="space-y-4">
                  {analysisResult.quiz.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <p className="font-medium mb-2">Q{index + 1}: {item.question}</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Answer:</strong> {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Motivational Closing */}
            <Card className="shadow-elevated">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-career-accent" />
                  <h2 className="text-2xl font-bold">🌟 Motivational Closing Note</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  You've got the foundation, now let's turn your dream career into reality! 
                  Remember, every expert was once a beginner. Stay consistent, keep learning, and celebrate small wins along the way.
                </p>
                <Button 
                  onClick={() => {
                    setAnalysisResult(null);
                    setResumeText("");
                    setManualSkills("");
                    setCareerGoal("");
                  }}
                  className="bg-gradient-to-r from-career-primary to-career-secondary hover:opacity-90"
                  size="lg"
                >
                  Start New Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerMentorApp;