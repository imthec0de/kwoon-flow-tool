import { Users, Calendar, TrendingUp, Award, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/dojo-hero.jpg";

const stats = [
  {
    title: "Active Students",
    value: "127",
    icon: Users,
    change: "+12 this month",
    trend: "up",
  },
  {
    title: "Classes This Week",
    value: "24",
    icon: Calendar,
    change: "6 classes/day avg",
    trend: "neutral",
  },
  {
    title: "Attendance Rate",
    value: "89%",
    icon: TrendingUp,
    change: "+3% vs last month",
    trend: "up",
  },
  {
    title: "Belt Tests",
    value: "8",
    icon: Award,
    change: "Scheduled next week",
    trend: "neutral",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Black Belt Grading",
    date: "March 15, 2025",
    participants: 8,
    type: "Belt Test",
  },
  {
    id: 2,
    title: "Monthly Seminar - Prof. Silva",
    date: "March 22, 2025",
    participants: 35,
    type: "Seminar",
  },
  {
    id: 3,
    title: "Inter-Dojo Tournament",
    date: "April 5, 2025",
    participants: 50,
    type: "Competition",
  },
];

const recentActivity = [
  {
    id: 1,
    student: "Alex Chen",
    action: "Achieved Black Belt 1st Dan",
    time: "2 hours ago",
    type: "achievement",
  },
  {
    id: 2,
    student: "Maria Rodriguez",
    action: "Perfect attendance this month",
    time: "5 hours ago",
    type: "milestone",
  },
  {
    id: 3,
    student: "James Wilson",
    action: "Registered for tournament",
    time: "1 day ago",
    type: "registration",
  },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-64 rounded-2xl overflow-hidden shadow-elevated">
        <img 
          src={heroImage} 
          alt="Dojo Training Space" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent flex items-center">
          <div className="px-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back, Sensei</h1>
            <p className="text-lg text-muted-foreground">Your dojo is thriving with {stats[0].value} active students</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="hover:shadow-glow transition-all hover:scale-105 animate-slide-up border-2"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-primary" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card className="shadow-elevated animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Upcoming Events</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold">{event.title}</h4>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {event.participants} participants
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-elevated animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Recent Activity</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  {activity.type === "achievement" && <Award className="h-5 w-5 text-accent" />}
                  {activity.type === "milestone" && <TrendingUp className="h-5 w-5 text-primary" />}
                  {activity.type === "registration" && <Calendar className="h-5 w-5 text-secondary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{activity.student}</h4>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
