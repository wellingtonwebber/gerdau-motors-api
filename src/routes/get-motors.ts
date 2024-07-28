import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getMotors(app: FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/motors', {
            schema: {
                querystring: z.object({
                    itemsPerPage: z.string().nullish().default('10').transform(Number),
                    pageIndex: z.string().nullish().default('0').transform(Number),
                    sectorId: z.string().nullish().transform(Number),
                    areaId: z.string().nullish().transform(Number),
                }),
                response: {
                    200: z.object({
                        pages: z.number(),
                        items: z.number().int(),
                        motors:  z.array(
                            z.object({
                                id: z.string().uuid(),
                                code: z.string(),
                                power: z.number().positive(),
                                location: z.string(),
                                status: z.string()
                            })
                        ),
                    }),
                }
            }
        }, async (request, reply) => {

            const { pageIndex, itemsPerPage } = request.query


            const [motors, total] = await Promise.all([
                prisma.motor.findMany({
                  select: {
                    id: true,
                    code: true,
                    power: true,
                    location: {
                        select: {
                            code: true,
                        }
                    },
                    status: {
                        select: {
                            status: true,
                        }
                    }
                  },
                  take: itemsPerPage,
                  skip: pageIndex * itemsPerPage,
                }),
                prisma.motor.count({})
              ])

              const pages = Math.ceil(total / itemsPerPage)

            return reply.send({
                pages: pages,
                items: total,
                motors: motors.map(motor => {
                    return {
                        id: motor.id,
                        code: motor.code,
                        power: motor.power,
                        location: motor.location.code,
                        status: motor.status.status
                    }
                })

            })  
        })
    
}