import { z } from 'zod';

export const courseSchema = z.object({
    id: z.string(),
    title: z.string().min(3, 'The Title Is LithThan 8 digiets'),
    instructor: z.string(),
    price: z.number().positive('Prise Is Shlould Pe A Nagitive Value'),
    isPublished: z.boolean().default(true),
    tags: z.array(z.string()),
});

export const courseQuerySchema = z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    tag: z.string().optional(),
    minPrice: z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
    maxPrice: z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
});


export type CourseQueryInput = z.infer<typeof courseQuerySchema>;

export const createCourseSchema = courseSchema.omit({ id: true });

export type Course = z.infer<typeof courseSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
