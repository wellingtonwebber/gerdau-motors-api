import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getMotor(app: FastifyInstance) {

    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/motor/:motorId', {
            schema: {
                params: z.object({
                    motorId: z.string().uuid(),
                }),
                response: {
                    200: z.object({
                        motor:  z.object({
                            id: z.string().uuid(),
                            code: z.string(),
                            manufacturer: z.string().nullable(),
                            power: z.number().positive(),
                            voltage: z.number().int().positive(),
                            current: z.number().positive(),
                            rpm: z.number().int().positive(),
                            frame: z.string().nullable(),
                            type: z.string().nullable(),
                            model: z.string().nullable(),
                            statusId: z.number().int().positive()
                        })
                    }),
                }
            }
        }, async (request, reply) => {

            const { motorId } = request.params

            const motor = await prisma.motor.findUnique({
                where: {
                    id: motorId
                }
            })

            if (motor === null){
                throw new Error(`Cannot find motor by this ID: ${motorId}`)
            }

            return reply.send({
                motor
            })
        })
    
}