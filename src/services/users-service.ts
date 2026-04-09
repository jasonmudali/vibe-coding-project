import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const registerUser = async (data: any) => {
  // Check if email already exists
  const existingUser = await db.select().from(users).where(eq(users.email, data.email));
  
  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Insert user
  await db.insert(users).values({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return { success: true, message: "User created successfully" };
};
