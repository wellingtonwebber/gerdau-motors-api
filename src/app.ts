import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createMotor } from "./routes/create-motor";
import { getMotor } from "./routes/get-motor";
import { getMotors } from "./routes/get-motors";
import { createArea } from "./routes/create-area";
import { createSector } from "./routes/create-sector";
import { createLocation } from "./routes/create-location";
import { createStatus } from "./routes/create-status";

export const app = fastify()

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'Gerdau motors',
            description: 'Especificações da API para o back-end da aplicação Gerdau motors',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createMotor)
app.register(getMotor)
app.register(getMotors)
app.register(createArea)
app.register(createSector)
app.register(createLocation)
app.register(createStatus)
