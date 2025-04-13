import { date, pgTable, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { uuid } from "uuidv4";

export const adminRole = pgEnum("role", ["admin", "super_admin"]);

export const admin = pgTable("admin", {
    id: varchar("id").notNull().primaryKey().$defaultFn(uuid),
    email:varchar("email").notNull().unique(),
    password: varchar("password").notNull(),
    role: adminRole().notNull().default("admin"), 
    createdAt: timestamp("created_at").defaultNow(),
});

export type Admin = typeof admin.$inferSelect;
export type AdminInsert = typeof admin.$inferInsert;
