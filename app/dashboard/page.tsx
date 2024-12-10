"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Leaf, Home, BookOpen, Sprout, Settings, LogOut, BarChart, MessageSquare, ShoppingBag, Package, Film } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from './sidebar'
import { CourseCard } from "@/components/course-card"
import { FarmFeed } from "@/components/farm-feed"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { VideoGallery } from "@/components/video-gallery"

const courses = [
  {
    id: "pasture-cropping",
    title: "Pasture Cropping",
    instructor: "Colin Seis",
    description: "Learn innovative techniques to integrate crops into perennial pastures, enhancing soil health and productivity.",
    lessons: [
      { title: "Introduction to Pasture Cropping", completed: true },
      { title: "Soil Preparation", completed: false },
      { title: "Crop Selection", completed: false },
    ],
    lastLesson: "Introduction to Pasture Cropping"
  },
  {
    id: "grazing-management",
    title: "Grazing Management",
    instructor: "Judi Earl",
    description: "Master the art of rotational grazing and pasture management for improved livestock health and land regeneration.",
    lessons: [
      { title: "Principles of Grazing Management", completed: true },
      { title: "Developing a Grazing Plan", completed: false },
      { title: "Monitoring and Adjustment", completed: false },
    ],
    lastLesson: "Principles of Grazing Management"
  },
  {
    id: "cover-cropping",
    title: "Cover Cropping",
    instructor: "Kevin Elmy",
    description: "Discover the benefits of cover crops in improving soil structure, reducing erosion, and increasing biodiversity.",
    lessons: [
      { title: "Introduction to Cover Crops", completed: true },
      { title: "Selecting Cover Crops", completed: false },
      { title: "Managing Cover Crops", completed: false },
    ],
    lastLesson: "Introduction to Cover Crops"
  }
]

// Mock recent orders data
const initialRecentOrders = [
  { id: '1', date: '2023-05-01', total: 850, status: 'Delivered', items: [{ name: 'Red Grass', quantity: 2, size: '5kg' }] },
  { id: '2', date: '2023-05-03', total: 1200, status: 'Processing', items: [{ name: 'Kangaroo Grass', quantity: 1, size: '10kg' }] },
  { id: '3', date: '2023-05-05', total: 750, status: 'Shipped', items: [{ name: 'Wallaby Grass', quantity: 3, size: '5kg' }] },
]

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('home')
  const [recentOrders, setRecentOrders] = useState(initialRecentOrders)

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="space-y-6">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-card-foreground">Welcome to Your Regenerative Journey</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">Track your progress and grow with nature</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-card-foreground">65%</p>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                  </div>
                  <BarChart className="h-16 w-16 text-accent" />
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card border-border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-card-foreground">
                    <Sprout className="mr-2 h-5 w-5 text-accent" />
                    Soil Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-card-foreground">78/100</p>
                  <p className="text-sm text-muted-foreground">Great progress! Keep improving your soil.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-card-foreground">
                    <Leaf className="mr-2 h-5 w-5 text-accent" />
                    Biodiversity Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-card-foreground">6.2</p>
                  <p className="text-sm text-muted-foreground">Your farm's ecosystem is thriving!</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-card-foreground">
                    <BookOpen className="mr-2 h-5 w-5 text-accent" />
                    Learning Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-card-foreground">12 days</p>
                  <p className="text-sm text-muted-foreground">Keep up the great work!</p>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-card border-border shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-card-foreground">
                  <ShoppingBag className="mr-2 h-5 w-5 text-accent" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.name} ({item.size}) x{item.quantity}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'warning' : 'default'}>
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )
      case 'courses':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">My Learning Path</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course}>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href={`/courses/${course.id}`}>Continue Course</Link>
                  </Button>
                </CourseCard>
              ))}
            </div>
          </div>
        )
      case 'resources':
        return (
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">Regenerative Resources</CardTitle>
              <CardDescription className="text-muted-foreground">Expand your knowledge with these curated materials</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-card-foreground">
                  <Sprout className="mr-2 h-5 w-5 text-accent" />
                  <span>Soil Health Assessment Guide</span>
                </li>
                <li className="flex items-center text-card-foreground">
                  <Leaf className="mr-2 h-5 w-5 text-accent" />
                  <span>Biodiversity Monitoring Toolkit</span>
                </li>
                <li className="flex items-center text-card-foreground">
                  <BookOpen className="mr-2 h-5 w-5 text-accent" />
                  <span>Regenerative Farming Case Studies</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )
      case 'feed':
        return <FarmFeed />
      case 'media':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Regenerative Farming Media</h2>
            <p className="text-muted-foreground">Explore our collection of educational videos on regenerative farming techniques.</p>
            <VideoGallery />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background text-foreground">
        <DashboardSidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 overflow-auto">
          <header className="w-full bg-background border-b border-border p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-foreground">Regenerative Dashboard</h1>
              <ThemeToggle />
            </div>
          </header>
          <main className="max-w-7xl mx-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

