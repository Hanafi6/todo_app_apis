import type { Course } from '@/scema/scema.ts'



export const courses: Course[] = [
    { id: 'c1', title: 'Next.js 15 Full-Stack', instructor: 'Mahmoud Hassan', price: 99.99, isPublished: true, tags: ['React', 'Next.js'] },
    { id: 'c2', title: 'Node.js Core & Express', instructor: 'Mahmoud Hassan', price: 79.99, isPublished: true, tags: ['Node.js', 'Express'] },
    { id: 'c3', title: 'State Management with Redux', instructor: 'Mahmoud Hassan', price: 49.99, isPublished: false, tags: ['Redux'] },
    { id: 'c4', title: 'TypeScript Advanced Patterns', instructor: 'Ahmed Ali', price: 89.99, isPublished: true, tags: ['TypeScript'] },
    { id: 'c5', title: 'Prisma ORM & PostgreSQL', instructor: 'Mahmoud Hassan', price: 69.99, isPublished: true, tags: ['Database', 'Node.js'] },
    { id: 'c6', title: 'Docker for Web Developers', instructor: 'Sara Omar', price: 59.99, isPublished: false, tags: ['DevOps'] },
    { id: 'c7', title: 'Docker for Web Developers', instructor: 'Sara Omar', price: 60.99, isPublished: false, tags: ['DevOps'] },
    { id: 'c8', title: 'Docker for Web Developers', instructor: 'Sara Omar', price: 72, isPublished: false, tags: ['DevOps'] },
    { id: 'c9', title: 'Docker for Web Developers', instructor: 'Sara Omar', price: 88, isPublished: false, tags: ['DevOps'] },
    { id: 'c10', title: 'Docker for Web Developers', instructor: 'Sara Omar', price: 45, isPublished: false, tags: ['DevOps'] },
    { id: 'c11', title: 'Docker for Web Developers', instructor: 'Sara Omar', price: 80, isPublished: false, tags: ['DevOps'] },
];