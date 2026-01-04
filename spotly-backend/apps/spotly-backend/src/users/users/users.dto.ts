import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address'),
});
export class CreateUserDto extends createZodDto(createUserSchema) {}
