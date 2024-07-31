import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createStatus(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/status', {
            schema: {
                    body: z.object({
                        status: z.string(),
                    }),
                response: {
                    201: z.object({
                        statusId: z.number().int().positive(),
                    })
                }
            }

        }, async (request, reply) => {

            const data = request.body

            const status = await prisma.status.create({
                data: {
                    status: data.status,
                }
            })

            return reply.status(201).send({statusId: status.id})

        })
}

