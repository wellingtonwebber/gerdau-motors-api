import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createLocation(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/locations', {
            schema: {
                    body: z.object({
                        code: z.string(),
                        sectorId: z.number().int().positive(),
                    }),
                response: {
                    201: z.object({
                        locationId: z.number().int().positive(),
                    })
                }
            }

        }, async (request, reply) => {

            const data = request.body

            const location = await prisma.location.create({
                data: {
                    code: data.code,
                    sector: {
                        connect: {
                          id: data.sectorId
                        }
                    },
                }
            })

            return reply.status(201).send({locationId: location.id})

        })
}

