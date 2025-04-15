import { HttpContextService } from "@/common/http-context";
import { NodePgDatabase, } from "drizzle-orm/node-postgres";
import Container, { Inject, Service } from "typedi";
import * as schema from "@/database/schema";
import { eq, desc } from "drizzle-orm";

@Service()
class PersonaService {
  
  @Inject(() => HttpContextService)
  private readonly httpContext!: HttpContextService;

  private readonly db!: NodePgDatabase<typeof schema>

  constructor() {
      this.db = Container.get("database");
  }

  async getAll() {
  return await this.db
    .select()
    .from(schema.persona)
    .orderBy(desc(schema.persona.createdAt));
}

  async create(userId: string, listingName: string, personaDetails: string) {
   const [persona] =  await this.db.insert(schema.persona).values({
      userId,
      approved: false,
      listingName,
      personaDetails
    }).returning();

    return persona;
  }

  async updateApproval(id: string, approved: boolean) {
    await this.db
      .update(schema.persona)
      .set({ approved })
      .where(eq(schema.persona.id, id));

    return { success: true };
  }

}

export default PersonaService;