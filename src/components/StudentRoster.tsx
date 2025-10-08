import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Award, Calendar, Mail } from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: 1,
    name: "Alex Chen",
    belt: "Black Belt",
    beltRank: "1st Dan",
    level: "Expert",
    attendance: 95,
    initials: "AC",
    email: "alex.chen@email.com",
    joinDate: "Jan 2020",
    classesThisMonth: 18,
    nextTest: "2nd Dan - Dec 2025",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    belt: "Brown Belt",
    beltRank: "Advanced",
    level: "Advanced",
    attendance: 92,
    initials: "MR",
    email: "maria.r@email.com",
    joinDate: "Mar 2021",
    classesThisMonth: 16,
    nextTest: "Black Belt - Jun 2025",
  },
  {
    id: 3,
    name: "James Wilson",
    belt: "Blue Belt",
    beltRank: "Intermediate",
    level: "Intermediate",
    attendance: 88,
    initials: "JW",
    email: "jwilson@email.com",
    joinDate: "Sep 2022",
    classesThisMonth: 14,
    nextTest: "Purple Belt - Apr 2025",
  },
  {
    id: 4,
    name: "Sophie Taylor",
    belt: "Yellow Belt",
    beltRank: "Beginner",
    level: "Beginner",
    attendance: 90,
    initials: "ST",
    email: "sophie.t@email.com",
    joinDate: "Jan 2024",
    classesThisMonth: 15,
    nextTest: "Orange Belt - May 2025",
  },
  {
    id: 5,
    name: "David Kim",
    belt: "Purple Belt",
    beltRank: "Intermediate",
    level: "Intermediate",
    attendance: 87,
    initials: "DK",
    email: "dkim@email.com",
    joinDate: "Jun 2022",
    classesThisMonth: 13,
    nextTest: "Brown Belt - Jul 2025",
  },
  {
    id: 6,
    name: "Emma Santos",
    belt: "Orange Belt",
    beltRank: "Beginner",
    level: "Beginner",
    attendance: 93,
    initials: "ES",
    email: "emma.s@email.com",
    joinDate: "Nov 2023",
    classesThisMonth: 17,
    nextTest: "Yellow Belt - Mar 2025",
  },
];

const beltColors: Record<string, string> = {
  "Black Belt": "bg-foreground text-background",
  "Brown Belt": "bg-secondary text-foreground",
  "Purple Belt": "bg-purple-600 text-white",
  "Blue Belt": "bg-blue-600 text-white",
  "Yellow Belt": "bg-accent text-foreground",
  "Orange Belt": "bg-orange-500 text-white",
};

export const StudentRoster = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.belt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Roster</h2>
          <p className="text-muted-foreground">
            Manage {students.length} active students and track their progress
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground shadow-glow">
          Add New Student
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students by name or belt..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student, index) => (
          <Card
            key={student.id}
            className="hover:shadow-glow transition-all hover:scale-105 border-2 animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                    {student.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{student.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{student.level}</p>
                  <Badge 
                    variant="outline" 
                    className={`mt-2 ${beltColors[student.belt]}`}
                  >
                    {student.belt}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Attendance Progress */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="font-semibold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    {student.attendance}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full gradient-primary transition-all"
                    style={{ width: `${student.attendance}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>This Month</span>
                  </div>
                  <p className="font-semibold">{student.classesThisMonth} classes</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Award className="h-3 w-3" />
                    <span>Joined</span>
                  </div>
                  <p className="font-semibold">{student.joinDate}</p>
                </div>
              </div>

              {/* Next Test */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Award className="h-3 w-3 text-accent" />
                  <span>Next Belt Test</span>
                </div>
                <p className="text-sm font-medium">{student.nextTest}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-3 w-3 mr-1" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No students found matching your search.</p>
        </div>
      )}
    </div>
  );
};
