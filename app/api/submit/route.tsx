import { NextResponse } from 'next/server';
//import { getDbConnection } from '../../lib/db';
//import { z } from 'zod'
/*
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "Must be at least 18 years old"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match",
});*/
//const formSchema = z.object({ name: z.string
// ().min(3, "Name is required") });
export async function POST(request: Request) {
  console.log(request.json())
  /*const data = await request.json();
  try {
    formSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {

      return NextResponse.json({ error: 'Validation errors:' + error });
    }
  }*/
  try {
    //let iccid = JSON.parse(JSON.stringify(request.body))

    const res = request.json()
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}