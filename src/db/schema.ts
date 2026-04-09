import { mysqlTable, serial, varchar, timestamp, bigint } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: bigint("id", { unsigned: true, mode: "number" }).autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const sessions = mysqlTable("sessions", {
  id: bigint("id", { unsigned: true, mode: "number" }).autoincrement().primaryKey(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  user_id: bigint("user_id", { unsigned: true, mode: "number" }).notNull().references(() => users.id),
  created_at: timestamp("created_at").defaultNow(),
});
