import fastify from "fastify";
import { z } from 'zod';
import { PrismaClient } from '@prisma/client'

const app = fastify()

const prisma = new PrismaClient({
    log:['query'],
})

app.get('/', () => {
    return 'Hello world!'
})

app.post('/motors', async (request, reply) => {

    const createMotorSchema = z.object({
        code: z.string(),
        manufacturer: z.string().nullable(),
        voltage: z.number().int().positive(),
        current: z.number().positive(),
        rpm: z.number().int().positive(),
        frame: z.string().nullable(),
        type: z.string().nullable(),
        model: z.string().nullable(),
        status: z.string()
    })

    const data = createMotorSchema.parse(request.body)

    const motor = await prisma.motor.create({
        data: {
            code: data.code,
            manufacturer: data.manufacturer,
            voltage: data.voltage,
            current: data.current,
            rpm: data.rpm,
            frame: data.frame,
            type: data.type,
            model: data.model,
            status: data.status
        }
    })

    return reply.status(201).send({motorId: motor.id})

})

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running')
})
