import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createMotor } from "./routes/create-motor";
import { getMotor } from "./routes/get-motor";
import { getMotors } from "./routes/get-motors";
import { createArea } from "./routes/create-area";
import { createSector } from "./routes/create-sector";
import { createLocation } from "./routes/create-location";
import { createStatus } from "./routes/create-status";

export const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createMotor)
app.register(getMotor)
app.register(getMotors)
app.register(createArea)
app.register(createSector)
app.register(createLocation)
app.register(createStatus)
