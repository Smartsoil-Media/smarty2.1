"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Leaf, ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CourseContent({ course }) {
  const [courseData, setCourseData] = useState(course)
  const [currentLesson, setCurrentLesson] = useState(() => {
    const moduleIndex = typeof window !== 'undefined' ? parseInt(new URLSearchParams(window.location.search).get('module') || '0') : 0
    const lessonIndex = typeof window !== 'undefined' ? parseInt(new URLSearchParams(window.location.search).get('lesson') || '0') : 0
    return {
      moduleIndex: isNaN(moduleIndex) ? 0 : moduleIndex,
      lessonIndex: isNaN(lessonIndex) ? 0 : lessonIndex,
    }
  })
  const [progress, setProgress] = useState(0)

  const currentModule = courseData?.modules[currentLesson.moduleIndex] || { lessons: [] }
  const currentLessonData = currentModule.lessons[currentLesson.lessonIndex] || {}

  useEffect(() => {
    calculateProgress()
  }, [courseData])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const moduleIndex = parseInt(params.get('module') || '0')
    const lessonIndex = parseInt(params.get('lesson') || '0')
    if (!isNaN(moduleIndex) && !isNaN(lessonIndex)) {
      setCurrentLesson({ moduleIndex, lessonIndex })
    }
  }, [])

  const calculateProgress = () => {
    const totalLessons = courseData?.modules.reduce((total, module) => total + module.lessons.length, 0) || 0;
    const completedLessons = courseData?.modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => lesson.completed).length, 0
    ) || 0;
    setProgress(Math.round((completedLessons / totalLessons) * 100))
  }

  const handleNextLesson = () => {
    if (currentLesson.lessonIndex < currentModule.lessons.length - 1) {
      setCurrentLesson(prev => ({ ...prev, lessonIndex: prev.lessonIndex + 1 }))
    } else if (currentLesson.moduleIndex < courseData?.modules.length - 1) {
      setCurrentLesson({ moduleIndex: currentLesson.moduleIndex + 1, lessonIndex: 0 })
    }
  }

  const handlePreviousLesson = () => {
    if (currentLesson.lessonIndex > 0) {
      setCurrentLesson(prev => ({ ...prev, lessonIndex: prev.lessonIndex - 1 }))
    } else if (currentLesson.moduleIndex > 0) {
      const prevModule = courseData?.modules[currentLesson.moduleIndex - 1]
      setCurrentLesson({ moduleIndex: currentLesson.moduleIndex - 1, lessonIndex: prevModule?.lessons.length - 1 || 0 })
    }
  }

  const handleCompleteLesson = () => {
    if (!currentLessonData.completed) {
      const updatedCourseData = { ...courseData }
      updatedCourseData.modules[currentLesson.moduleIndex].lessons[currentLesson.lessonIndex].completed = true
      setCourseData(updatedCourseData)
      handleNextLesson()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/dashboard">
          <Leaf className="h-6 w-6 mr-2" />
          <span className="font-bold">Smartsoil</span>
        </Link>
        <span className="ml-auto font-semibold">{courseData?.title}</span>
      </header>
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-background hidden md:block">
          <ScrollArea className="h-[calc(100vh-3.5rem)] bg-background text-foreground">
            <div className="p-4 space-y-4">
              <h2 className="font-semibold text-lg">{courseData?.title}</h2>
              <p>Instructor: {courseData?.instructor}</p>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500">{progress}% Complete</p>
              {courseData?.modules.map((module, moduleIndex) => (
                <Collapsible key={moduleIndex}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
                    {module.title}
                    <ChevronRight className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1 ml-4">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <button
                        key={lessonIndex}
                        className={`flex items-center text-sm py-1 ${
                          currentLesson.moduleIndex === moduleIndex &&
                          currentLesson.lessonIndex === lessonIndex
                            ? "text-primary font-medium"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                        onClick={() => setCurrentLesson({ moduleIndex, lessonIndex })}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4 mr-2" />
                        )}
                        {lesson.title}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Video Player Placeholder</p>
            </div>
            <h1 className="text-2xl font-bold">{currentLessonData.title}</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                This is where the lesson content would go. It could include text, images, and other
                interactive elements to help explain the concepts of {currentLessonData.title}.
              </p>
              <p>
                In a full implementation, this content would be dynamically loaded based on the
                current lesson.
              </p>
            </div>
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePreviousLesson}
                disabled={currentLesson.moduleIndex === 0 && currentLesson.lessonIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous Lesson
              </Button>
              <Button 
                onClick={handleCompleteLesson}
                disabled={currentLessonData.completed}
              >
                {currentLessonData.completed ? "Lesson Completed" : "Complete Lesson"}
              </Button>
              <Button
                variant="outline"
                onClick={handleNextLesson}
                disabled={
                  currentLesson.moduleIndex === courseData?.modules.length - 1 &&
                  currentLesson.lessonIndex === currentModule.lessons.length - 1
                }
              >
                Next Lesson <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

