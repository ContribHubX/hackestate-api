import { date, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { uuid } from "uuidv4";

export const userRole = pgEnum("user_roles", ["user", "agent", "developer"]);

export const user = pgTable("user", {
  id: varchar("id").notNull().primaryKey().$defaultFn(uuid),
  email: varchar("email").notNull(),
  name: varchar("name").notNull(),
  password: varchar("password").notNull(),
  contactNumber: varchar("contact_number").notNull(),
  role: userRole().notNull().default("user"), 
  createdAt: timestamp("created_at").defaultNow(),
  profileUrl: varchar("profile_url")
});
    
export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;

