import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

if (process.env.NODE_ENV === 'test') {
    config({ path: '.env.test' });
  } else {
    config({ path: '.env' });
}

export const prisma = new PrismaClient({
    log:['query'],
})