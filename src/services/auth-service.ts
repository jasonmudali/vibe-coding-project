import { db } from "../db";
import { users, sessions } from "../db/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

export const loginUser = async (data: any) => {
  // 1. Find user by email
  const userRecords = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
  const user = userRecords[0];
  
  if (!user) {
    return { success: false, message: "Email atau password salah" };
  }

  // 2. Compare password
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  
  if (!isPasswordValid) {
    return { success: false, message: "Email atau password salah" };
  }

  // 3. Generate UUID token
  const token = randomUUID();

  // 4. Store token in sessions table
  await db.insert(sessions).values({
    token: token,
    user_id: user.id,
  });

  return { success: true, token };
};
