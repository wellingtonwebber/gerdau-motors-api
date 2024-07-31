import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createSector(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/sectors', {
            schema: {
                    body: z.object({
                        name: z.string(),
                        areaId: z.number().int().positive(),
                    }),
                response: {
                    201: z.object({
                        sectorId: z.number().int().positive(),
                    })
                }
            }

        }, async (request, reply) => {

            const data = request.body

            const sector = await prisma.sector.create({
                data: {
                    name: data.name,
                    area: {
                        connect: {
                          id: data.areaId
                        }
                    },
                }
            })

            return reply.status(201).send({sectorId: sector.id})

        })
}

