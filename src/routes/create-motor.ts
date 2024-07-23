import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createMotor(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/motors', {
            schema: {
                body: z.object({
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
                }),
                response: {
                    201: z.object({
                        motorId: z.string().uuid()
                    })
                }
            }

        }, async (request, reply) => {

            const data = request.body

            const motorWithSameCode = await prisma.motor.findUnique({
                where: {
                    code: data.code
                }
            })

            if (motorWithSameCode !==null) {
                throw new Error('Motor with same code already exists')
            }

            const motor = await prisma.motor.create({
                data: {
                    code: data.code,
                    manufacturer: data.manufacturer,
                    power: data.power,
                    voltage: data.voltage,
                    current: data.current,
                    rpm: data.rpm,
                    frame: data.frame,
                    type: data.type,
                    model: data.model,
                    statusId: data.statusId
                }
            })

            return reply.status(201).send({motorId: motor.id})

        })
}

