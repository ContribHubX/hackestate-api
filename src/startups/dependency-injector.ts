import { Container } from "typedi";
import { database } from "@/database";

export const dependencyInjection = () => {
    try {
        Container.set("database", database);
    } catch(error) {
        console.error(error);
    }
}
