import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, CheckCircle } from "lucide-react";
import karateIcon from "@/assets/karate-icon.jpg";
import bjjIcon from "@/assets/bjj-icon.jpg";
import mmaIcon from "@/assets/mma-icon.jpg";

const classes = [
  {
    id: 1,
    name: "Kids Karate",
    time: "4:00 PM - 5:00 PM",
    instructor: "Sensei Johnson",
    students: 15,
    maxStudents: 20,
    level: "Beginner",
    location: "Main Dojo",
    icon: karateIcon,
    status: "upcoming",
  },
  {
    id: 2,
    name: "Adult BJJ",
    time: "6:00 PM - 7:30 PM",
    instructor: "Professor Silva",
    students: 22,
    maxStudents: 25,
    level: "All Levels",
    location: "Grappling Room",
    icon: bjjIcon,
    status: "upcoming",
  },
  {
    id: 3,
    name: "MMA Conditioning",
    time: "7:30 PM - 8:30 PM",
    instructor: "Coach Martinez",
    students: 18,
    maxStudents: 20,
    level: "Advanced",
    location: "Main Dojo",
    icon: mmaIcon,
    status: "upcoming",
  },
  {
    id: 4,
    name: "Women's Self Defense",
    time: "5:30 PM - 6:30 PM",
    instructor: "Sensei Johnson",
    students: 12,
    maxStudents: 15,
    level: "All Levels",
    location: "Training Room B",
    icon: karateIcon,
    status: "in-progress",
  },
];

export const ClassSchedule = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Today's Schedule</h2>
          <p className="text-muted-foreground">
            Thursday, March 14, 2025 - {classes.length} classes scheduled
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground shadow-glow">
          Add New Class
        </Button>
      </div>

      <div className="grid gap-4">
        {classes.map((classItem, index) => (
          <Card
            key={classItem.id}
            className="hover:shadow-glow transition-all hover:scale-[1.02] border-2 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                    <img 
                      src={classItem.icon} 
                      alt={classItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <CardTitle className="text-xl mb-1">{classItem.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {classItem.instructor}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{classItem.level}</Badge>
                        {classItem.status === "in-progress" && (
                          <Badge className="bg-primary text-primary-foreground">
                            <div className="h-2 w-2 rounded-full bg-primary-foreground mr-1 animate-pulse" />
                            Live
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{classItem.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>
                    <span className="font-medium">{classItem.students}</span>
                    <span className="text-muted-foreground">/{classItem.maxStudents}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{classItem.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">
                    {Math.round((classItem.students / classItem.maxStudents) * 100)}% Full
                  </span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full gradient-primary transition-all"
                  style={{ width: `${(classItem.students / classItem.maxStudents) * 100}%` }}
                />
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Roster
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Take Attendance
                </Button>
                {classItem.status === "upcoming" && (
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground">
                    Start Class
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
