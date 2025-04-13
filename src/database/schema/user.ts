import { date, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { uuid } from "uuidv4";

export const user = pgTable("user", {
  pid: varchar("pid").notNull().primaryKey().$defaultFn(uuid),
  password: varchar("password"),
  dob: date("dob"),
  createdAt: timestamp("created_at").defaultNow(),
});
    
export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
