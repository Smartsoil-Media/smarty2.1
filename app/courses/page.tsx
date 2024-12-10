"use client"

import { useState } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Leaf, GraduationCap, Users, Sprout } from 'lucide-react'
import { PricingToggle } from "@/components/pricing-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { CourseModal } from "@/components/course-modal"

const courses = [
  {
    title: "Pasture Cropping",
    instructor: "Colin Seis",
    description: "Learn innovative techniques to integrate crops into perennial pastures, enhancing soil health and productivity.",
    image: "/images/pasture-cropping.jpg",
    icon: Leaf,
    syllabus: [
      "Introduction to Pasture Cropping",
      "Soil Health and Preparation",
      "Crop Selection and Integration",
      "Management Techniques",
      "Harvesting and Post-Harvest Care"
    ],
    length: "6 weeks (3-5 hours per week)"
  },
  {
    title: "Grazing Management",
    instructor: "Judi Earl",
    description: "Master the art of rotational grazing and pasture management for improved livestock health and land regeneration.",
    image: "/images/grazing-management.jpg",
    icon: Users,
    syllabus: [
      "Principles of Rotational Grazing",
      "Pasture Assessment and Planning",
      "Livestock Integration",
      "Fencing and Water Systems",
      "Monitoring and Adjusting Grazing Patterns"
    ],
    length: "8 weeks (4-6 hours per week)"
  },
  {
    title: "Cover Cropping",
    instructor: "Kevin Elmy",
    description: "Discover the benefits of cover crops in improving soil structure, reducing erosion, and increasing biodiversity.",
    image: "/images/cover-cropping.jpg",
    icon: Sprout,
    syllabus: [
      "Introduction to Cover Crops",
      "Selecting the Right Cover Crops",
      "Planting and Establishment Techniques",
      "Managing Cover Crops",
      "Integrating Cover Crops in Crop Rotations"
    ],
    length: "5 weeks (3-4 hours per week)"
  }
]

export default function CoursesPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const handlePricingToggle = (yearly: boolean) => {
    setIsYearly(yearly)
  }

  const openCourseModal = (index: number) => {
    setSelectedCourse(index)
  }

  const closeCourseModal = () => {
    setSelectedCourse(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-8 w-8 mr-2 text-accent" />
          <span className="font-bold text-2xl text-foreground">Smartsoil</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="#courses">
              Courses
            </Link>
          </div>
          <MobileNav />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground">
                  Master Regenerative Farming
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our expert-led courses and transform your approach to agriculture. Learn sustainable practices that benefit both your land and your bottom line.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="courses" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-foreground">Our Courses</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <Card key={index} className="flex flex-col justify-between bg-card border-none shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <course.icon className="w-8 h-8 text-accent" />
                      <div>
                        <CardTitle className="text-foreground">{course.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">Instructor: {course.instructor}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={course.image}
                      alt={`${course.title} course`}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <p className="text-muted-foreground">{course.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => openCourseModal(index)}>Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="membership" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">Membership Options</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get access to all our courses with our affordable membership plans. Choose the option that works best for you.
                </p>
              </div>
              <PricingToggle onToggle={handlePricingToggle} />
              <div className="w-full max-w-sm space-y-2">
                <Card className="bg-secondary border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-foreground">All-Access Membership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-accent">
                      {isYearly ? "$299/year" : "$29.99/month"}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isYearly ? "Save $60 compared to monthly!" : "Or $299/year (save $60!)"}
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <GraduationCap className="mr-2 h-4 w-4 text-accent" />
                        Access to all courses
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <Users className="mr-2 h-4 w-4 text-accent" />
                        Exclusive community forum
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <Sprout className="mr-2 h-4 w-4 text-accent" />
                        Regular new content
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                      <Link href="/signup">Start Learning Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-card text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row items-center">
            <p className="text-xs">© 2024 Smartsoil. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
      {selectedCourse !== null && (
        <CourseModal
          isOpen={true}
          onClose={closeCourseModal}
          course={courses[selectedCourse]}
        />
      )}
    </div>
  )
}

