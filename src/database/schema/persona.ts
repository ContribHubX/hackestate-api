import { pgTable, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { uuid } from "uuidv4";
import { user } from "./user";

export const persona = pgTable("persona", {
  id: varchar("id").notNull().primaryKey().$defaultFn(uuid),
  userId: varchar("user_id").notNull().references(() => user.id), 
  listingName: varchar("listing_name").notNull(),
  personaDetails: varchar("persona_details").notNull(),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Persona = typeof persona.$inferSelect;
export type PersonaInsert = typeof persona.$inferInsert;

