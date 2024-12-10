import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CourseContent from './CourseContent'

// Mock function to fetch course data
async function getCourse(courseId: string) {
  // In a real application, this would fetch data from an API or database
  const courses = [
    { id: '1', title: 'Introduction to Regenerative Farming' },
    { id: '2', title: 'Advanced Soil Health Techniques' },
    { id: 'pasture-cropping', title: 'Pasture Cropping', instructor: 'Colin Seis', modules: [
      {
        title: "Introduction to Pasture Cropping",
        lessons: [
          { title: "What is Pasture Cropping?", completed: true },
          { title: "Benefits of Pasture Cropping", completed: true },
          { title: "Getting Started", completed: false },
        ],
      },
      {
        title: "Soil Preparation",
        lessons: [
          { title: "Assessing Your Soil", completed: false },
          { title: "Preparing the Pasture", completed: false },
          { title: "Soil Amendments", completed: false },
        ],
      },
      {
        title: "Crop Selection and Planting",
        lessons: [
          { title: "Choosing the Right Crops", completed: false },
          { title: "Planting Techniques", completed: false },
          { title: "Managing Crop-Pasture Interactions", completed: false },
        ],
      },
    ],
  },
  { id: 'grazing-management', title: 'Grazing Management', instructor: 'Judi Earl', modules: [
      {
        title: "Introduction to Grazing Management",
        lessons: [
          { title: "Principles of Grazing Management", completed: true },
          { title: "Understanding Grass Growth Patterns", completed: true },
          { title: "Assessing Pasture Quality", completed: false },
        ],
      },
      {
        title: "Planning and Implementation",
        lessons: [
          { title: "Developing a Grazing Plan", completed: false },
          { title: "Implementing Grazing Strategies", completed: false },
          { title: "Monitoring and Adjustment", completed: false },
        ],
      },
      {
        title: "Advanced Grazing Techniques",
        lessons: [
          { title: "Rotational Grazing", completed: false },
          { title: "Adaptive Grazing", completed: false },
          { title: "Multi-species Grazing", completed: false },
        ],
      },
    ],
  },
  { id: 'cover-cropping', title: 'Cover Cropping', instructor: 'Kevin Elmy', modules: [
      {
        title: "Basics of Cover Cropping",
        lessons: [
          { title: "Introduction to Cover Crops", completed: true },
          { title: "Types of Cover Crops", completed: false },
          { title: "Benefits of Cover Cropping", completed: false },
        ],
      },
      {
        title: "Planning and Implementation",
        lessons: [
          { title: "Selecting Cover Crops", completed: false },
          { title: "Planting and Management", completed: false },
          { title: "Integration with Cash Crops", completed: false },
        ],
      },
      {
        title: "Advanced Cover Cropping Techniques",
        lessons: [
          { title: "Cover Crop Mixtures", completed: false },
          { title: "Termination Strategies", completed: false },
          { title: "Nutrient Cycling", completed: false },
        ],
      },
    ],
  },
  ]
  return courses.find(course => course.id === courseId)
}

type Params = {
  courseId: string;
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const course = await getCourse(params.courseId)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: course.title,
  }
}

export default async function CoursePage({ params }: { params: Params }) {
  const course = await getCourse(params.courseId)

  if (!course) {
    notFound()
  }

  return <CourseContent course={course} />
}

