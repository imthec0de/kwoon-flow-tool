import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Star, TrendingUp } from "lucide-react";

const progressData = [
  {
    id: 1,
    category: "Technical Skills",
    metrics: [
      { name: "Forms/Kata", current: 12, total: 15, level: "Advanced" },
      { name: "Sparring Techniques", current: 45, total: 60, level: "Intermediate" },
      { name: "Self-Defense", current: 28, total: 30, level: "Expert" },
    ],
  },
  {
    id: 2,
    category: "Physical Fitness",
    metrics: [
      { name: "Strength", current: 85, total: 100, level: "Advanced" },
      { name: "Flexibility", current: 72, total: 100, level: "Intermediate" },
      { name: "Endurance", current: 90, total: 100, level: "Expert" },
    ],
  },
  {
    id: 3,
    category: "Mental Development",
    metrics: [
      { name: "Focus & Discipline", current: 88, total: 100, level: "Advanced" },
      { name: "Leadership", current: 75, total: 100, level: "Advanced" },
      { name: "Philosophy", current: 65, total: 100, level: "Intermediate" },
    ],
  },
];

const achievements = [
  {
    id: 1,
    title: "Tournament Champion",
    description: "1st Place - Regional Competition 2024",
    icon: Trophy,
    color: "text-accent",
  },
  {
    id: 2,
    title: "Perfect Attendance",
    description: "6 months streak",
    icon: Target,
    color: "text-primary",
  },
  {
    id: 3,
    title: "Leadership Award",
    description: "Outstanding mentorship to junior students",
    icon: Star,
    color: "text-secondary",
  },
  {
    id: 4,
    title: "Rapid Progress",
    description: "Advanced 2 belt ranks in 8 months",
    icon: TrendingUp,
    color: "text-primary",
  },
];

export const ProgressTracking = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Progress Tracking</h2>
        <p className="text-muted-foreground">
          Monitor student development across technical, physical, and mental aspects
        </p>
      </div>

      {/* Progress Categories */}
      <div className="grid gap-6 lg:grid-cols-3">
        {progressData.map((category, index) => (
          <Card 
            key={category.id} 
            className="shadow-elevated animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <CardTitle className="text-xl">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.metrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {metric.current}/{metric.total}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {metric.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full gradient-primary transition-all"
                      style={{ width: `${(metric.current / metric.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements Section */}
      <Card className="shadow-elevated animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center mb-3">
                  <achievement.icon className={`h-8 w-8 text-primary-foreground`} />
                </div>
                <h4 className="font-semibold mb-1">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Belt Progression Timeline */}
      <Card className="shadow-elevated animate-scale-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle className="text-2xl">Belt Progression Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-foreground" />
            <div className="space-y-6 pl-12">
              {[
                { belt: "Black Belt 1st Dan", date: "March 2025", status: "current" },
                { belt: "Brown Belt", date: "June 2024", status: "completed" },
                { belt: "Purple Belt", date: "December 2023", status: "completed" },
                { belt: "Blue Belt", date: "June 2023", status: "completed" },
                { belt: "Yellow Belt", date: "January 2023", status: "completed" },
              ].map((rank, index) => (
                <div key={index} className="relative">
                  <div className={`absolute -left-[46px] h-8 w-8 rounded-full ${
                    rank.status === "current" 
                      ? "gradient-primary shadow-glow" 
                      : "bg-muted"
                  } flex items-center justify-center`}>
                    {rank.status === "current" ? (
                      <div className="h-3 w-3 rounded-full bg-primary-foreground" />
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                    )}
                  </div>
                  <div className={`p-4 rounded-lg ${
                    rank.status === "current" 
                      ? "bg-primary/10 border-2 border-primary" 
                      : "bg-muted/50"
                  }`}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{rank.belt}</h4>
                      {rank.status === "current" && (
                        <Badge className="gradient-primary text-primary-foreground">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{rank.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
