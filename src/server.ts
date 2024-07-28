import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createMotor } from "./routes/create-motor";
import { getMotor } from "./routes/get-motor";
import { getMotors } from "./routes/get-motors";

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createMotor)
app.register(getMotor)
app.register(getMotors)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running')
})
