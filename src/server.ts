import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createMotor } from "./routes/create-motor";

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createMotor)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running')
})
