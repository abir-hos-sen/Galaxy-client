import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const registerApiSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const spaceEntrySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.enum(['Mission', 'Planet', 'Star', 'Galaxy', 'Nebula', 'Astronaut']),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(250, 'Max 250 characters'),
  fullDescription: z.string().min(20, 'Full description must be at least 20 characters'),
  imageUrl: z.string().url('Invalid image URL').or(z.string().min(1, 'Image path is required')),
  additionalImages: z.array(z.string().url('Invalid image URL').or(z.string())).default([]),
  date: z.coerce.date(),
  distanceFromEarth: z.string().min(1, 'Distance from Earth is required'),
  agency: z.string().min(1, 'Agency is required'),
  status: z.enum(['Active', 'Completed', 'Planned']),
  location: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
