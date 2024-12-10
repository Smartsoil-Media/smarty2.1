import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Lesson {
  title: string
  completed: boolean
}

interface CourseCardProps {
  id: string
  title: string
  instructor: string
  description: string
  lessons: Lesson[]
  lastLesson: string
  children?: React.ReactNode
}

export function CourseCard({ id, title, instructor, description, lessons, lastLesson, children }: CourseCardProps) {
  const completedLessons = lessons.filter(lesson => lesson.completed).length
  const totalLessons = lessons.length
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <Card className="w-full bg-card border-border shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-card-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">Instructor: {instructor}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-card-foreground mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-card-foreground">
            <span>Progress</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="w-full bg-secondary">
            <div className="bg-accent h-full" />
          </Progress>
        </div>
        <p className="mt-4 text-sm text-card-foreground">Last completed: {lastLesson}</p>
        <p className="mt-2 text-sm text-card-foreground">{completedLessons} of {totalLessons} lessons completed</p>
      </CardContent>
      <CardFooter>
        {children}
      </CardFooter>
    </Card>
  )
}

