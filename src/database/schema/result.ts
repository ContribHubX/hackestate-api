import { customType, integer, pgTable, timestamp, varchar,  } from "drizzle-orm/pg-core";
import { uuid } from "uuidv4";
import { user } from "./user";

const bytea = customType<{
  data: Buffer;
  default: false;
}>({
  dataType() {
    return "bytea";
  },
});

export const testResult = pgTable("test_results", {
  id: varchar("id").notNull().primaryKey().$defaultFn(uuid),
  userPid: varchar("user_pid")
    .notNull()
    .references(() => user.pid, { onDelete: "cascade" }),
  testName: varchar("test_name").notNull(),
  binaryPdf: bytea("binary_pdf").notNull(),
  size: integer("size").notNull(),
  testDate: timestamp("test_date", { mode: "date" }).notNull(),
});

export type TestResult = typeof testResult.$inferSelect;
export type TestResultInsert = typeof testResult.$inferInsert;
