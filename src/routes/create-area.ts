import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createArea(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/areas', {
            schema: {
                    body: z.object({
                        center: z.number().int().positive(),
                        name: z.string(),
                    }),
                response: {
                    201: z.object({
                        areaId: z.number().int().positive(),
                    })
                }
            }

        }, async (request, reply) => {

            const data = request.body

            const area = await prisma.area.create({
                data: {
                    center: data.center,
                    name: data.name,
                }
            })

            return reply.status(201).send({areaId: area.id})

        })
}

