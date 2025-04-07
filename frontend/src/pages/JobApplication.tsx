import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
} from "lucide-react";

export default function JobApplication() {
  // Sample data for demo purposes
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      status: "Active",
      applicationsCount: 24,
      applications: [
        {
          id: 101,
          name: "Alex Johnson",
          status: "Pending Review",
          date: "2025-04-02",
          experience: "5 years",
          match: 85,
        },
        {
          id: 102,
          name: "Jamie Smith",
          status: "Interviewed",
          date: "2025-04-01",
          experience: "3 years",
          match: 72,
        },
        {
          id: 103,
          name: "Taylor Lee",
          status: "Rejected",
          date: "2025-03-28",
          experience: "2 years",
          match: 60,
        },
        {
          id: 104,
          name: "Morgan Richards",
          status: "Offer Sent",
          date: "2025-03-27",
          experience: "7 years",
          match: 95,
        },
      ],
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "New York",
      status: "Active",
      applicationsCount: 18,
      applications: [
        {
          id: 201,
          name: "Riley Cooper",
          status: "Pending Review",
          date: "2025-04-05",
          experience: "4 years",
          match: 78,
        },
        {
          id: 202,
          name: "Jordan White",
          status: "Interviewed",
          date: "2025-04-03",
          experience: "6 years",
          match: 88,
        },
      ],
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
      status: "Closed",
      applicationsCount: 32,
      applications: [
        {
          id: 301,
          name: "Casey Brown",
          status: "Hired",
          date: "2025-03-20",
          experience: "8 years",
          match: 92,
        },
        {
          id: 302,
          name: "Sam Wilson",
          status: "Rejected",
          date: "2025-03-18",
          experience: "5 years",
          match: 75,
        },
        {
          id: 303,
          name: "Avery Green",
          status: "Rejected",
          date: "2025-03-17",
          experience: "3 years",
          match: 68,
        },
      ],
    },
  ];

  const [selectedApplicant, setSelectedApplicant] = useState<{
    id: number;
    name: string;
    status: string;
    date: string;
    experience: string;
    match: number;
  } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const getStatusBadge = (status) => {
    const statusMap = {
      "Pending Review": {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="h-4 w-4 mr-1" />,
      },
      Interviewed: {
        color: "bg-blue-100 text-blue-800",
        icon: <User className="h-4 w-4 mr-1" />,
      },
      Rejected: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="h-4 w-4 mr-1" />,
      },
      "Offer Sent": {
        color: "bg-purple-100 text-purple-800",
        icon: <AlertCircle className="h-4 w-4 mr-1" />,
      },
      Hired: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="h-4 w-4 mr-1" />,
      },
    };

    const style = statusMap[status] || {
      color: "bg-gray-100 text-gray-800",
      icon: null,
    };

    return (
      <div
        className={`flex items-center px-2 py-1 rounded-full ${style.color}`}
      >
        {style.icon}
        <span>{status}</span>
      </div>
    );
  };

  const handleViewApplicant = (applicant) => {
    setSelectedApplicant(applicant);
    setOpenDialog(true);
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search jobs..." className="pl-8 w-64" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="closed">Closed Jobs</TabsTrigger>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {jobs
              .filter((job) => job.status === "Active")
              .map((job) => (
                <AccordionItem key={job.id} value={`job-${job.id}`}>
                  <Card>
                    <CardHeader className="p-0">
                      <AccordionTrigger className="px-6 py-4">
                        <div className="flex flex-1 justify-between items-center">
                          <div>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription className="flex gap-2 mt-1">
                              <Badge variant="outline">{job.department}</Badge>
                              <Badge variant="outline">{job.location}</Badge>
                            </CardDescription>
                          </div>
                          <Badge className="mr-8 text-sm">
                            {job.applicationsCount} Applicants
                          </Badge>
                        </div>
                      </AccordionTrigger>
                    </CardHeader>
                    <AccordionContent>
                      <CardContent className="pt-4">
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date Applied</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead>Match %</TableHead>
                                <TableHead></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {job.applications.map((applicant) => (
                                <TableRow key={applicant.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                          {applicant.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      {applicant.name}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    {getStatusBadge(applicant.status)}
                                  </TableCell>
                                  <TableCell>{applicant.date}</TableCell>
                                  <TableCell>{applicant.experience}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div
                                          className="bg-green-500 h-2 rounded-full"
                                          style={{
                                            width: `${applicant.match}%`,
                                          }}
                                        />
                                      </div>
                                      <span>{applicant.match}%</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      onClick={() =>
                                        handleViewApplicant(applicant)
                                      }
                                    >
                                      View
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {jobs
              .filter((job) => job.status === "Closed")
              .map((job) => (
                <AccordionItem key={job.id} value={`job-${job.id}`}>
                  <Card>
                    <CardHeader className="p-0">
                      <AccordionTrigger className="px-6 py-4">
                        <div className="flex flex-1 justify-between items-center">
                          <div>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription className="flex gap-2 mt-1">
                              <Badge variant="outline">{job.department}</Badge>
                              <Badge variant="outline">{job.location}</Badge>
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="mr-8 text-sm">
                            {job.applicationsCount} Applicants
                          </Badge>
                        </div>
                      </AccordionTrigger>
                    </CardHeader>
                    <AccordionContent>
                      <CardContent className="pt-4">
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date Applied</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead>Match %</TableHead>
                                <TableHead></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {job.applications.map((applicant) => (
                                <TableRow key={applicant.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                          {applicant.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      {applicant.name}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    {getStatusBadge(applicant.status)}
                                  </TableCell>
                                  <TableCell>{applicant.date}</TableCell>
                                  <TableCell>{applicant.experience}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div
                                          className="bg-green-500 h-2 rounded-full"
                                          style={{
                                            width: `${applicant.match}%`,
                                          }}
                                        />
                                      </div>
                                      <span>{applicant.match}%</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      onClick={() =>
                                        handleViewApplicant(applicant)
                                      }
                                    >
                                      View
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {jobs.map((job) => (
              <AccordionItem key={job.id} value={`job-${job.id}`}>
                <Card>
                  <CardHeader className="p-0">
                    <AccordionTrigger className="px-6 py-4">
                      <div className="flex flex-1 justify-between items-center">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription className="flex gap-2 mt-1">
                            <Badge variant="outline">{job.department}</Badge>
                            <Badge variant="outline">{job.location}</Badge>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-3 mr-8">
                          <Badge
                            variant={
                              job.status === "Active" ? "default" : "secondary"
                            }
                          >
                            {job.status}
                          </Badge>
                          <Badge variant="outline" className="text-sm">
                            {job.applicationsCount} Applicants
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent>
                    <CardContent className="pt-4">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Applicant</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Date Applied</TableHead>
                              <TableHead>Experience</TableHead>
                              <TableHead>Match %</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {job.applications.map((applicant) => (
                              <TableRow key={applicant.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>
                                        {applicant.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    {applicant.name}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(applicant.status)}
                                </TableCell>
                                <TableCell>{applicant.date}</TableCell>
                                <TableCell>{applicant.experience}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: `${applicant.match}%` }}
                                      />
                                    </div>
                                    <span>{applicant.match}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    onClick={() =>
                                      handleViewApplicant(applicant)
                                    }
                                  >
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          {selectedApplicant && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Applicant Profile</DialogTitle>
                <DialogDescription>
                  Review application details for {selectedApplicant.name}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-12 gap-4 pt-4">
                <div className="col-span-4 flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-xl">
                      {selectedApplicant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 font-semibold text-lg">
                    {selectedApplicant.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Applied on {selectedApplicant.date}
                  </p>
                  <div className="mt-2">
                    {getStatusBadge(selectedApplicant.status)}
                  </div>

                  <div className="mt-6 w-full">
                    <p className="text-sm font-medium mb-1">Match Score</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${selectedApplicant.match}%` }}
                        />
                      </div>
                      <span className="font-medium">
                        {selectedApplicant.match}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-8">
                  <Tabs defaultValue="resume">
                    <TabsList className="w-full">
                      <TabsTrigger value="resume" className="flex-1">
                        Resume
                      </TabsTrigger>
                      <TabsTrigger value="assessment" className="flex-1">
                        Assessment
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="flex-1">
                        Notes
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="resume" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">
                            EXPERIENCE
                          </h4>
                          <p>
                            {selectedApplicant.experience} of industry
                            experience
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-500">
                            SKILLS
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline">React</Badge>
                            <Badge variant="outline">TypeScript</Badge>
                            <Badge variant="outline">UI/UX</Badge>
                            <Badge variant="outline">Problem Solving</Badge>
                            <Badge variant="outline">Team Leadership</Badge>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-500">
                            EDUCATION
                          </h4>
                          <p>Bachelor's in Computer Science</p>
                          <p className="text-sm text-gray-500">
                            University of Technology (2018-2022)
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="assessment">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Technical Assessment</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full w-4/5" />
                            </div>
                            <span>80%</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium">Cultural Fit</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full w-3/4" />
                            </div>
                            <span>75%</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notes">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-700">
                          Candidate showed strong problem-solving skills during
                          the technical interview. Good communication but could
                          improve on team collaboration examples.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <div className="flex gap-2">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">Next</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive">Reject</Button>
                  <Button>Move to Interview</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
