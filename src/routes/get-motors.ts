import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getMotor(app: FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/motors', {
            schema: {
                params: z.object({
                    motorId: z.string().uuid(),
                }),
                response: {
                    200: z.object({
                        motors:  z.array(
                            z.object({
                                id: z.string().uuid(),
                                code: z.string(),
                                power: z.number().positive(),
                                voltage: z.number().int().positive(),
                                locationId: z.number().int().positive()
                            })
                        ),
                        total: z.number(),
                    }),
                }
            }
        }, async (request, reply) => {

            

        })
    
}