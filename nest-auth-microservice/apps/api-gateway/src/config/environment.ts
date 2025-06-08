import joi from 'joi';

interface EnvironmentVariables {
  PORT: number;
  NATS_SERVER: string;
}

export const environment = joi
  .object({
    PORT: joi.number().required().default(3000),
    NATS_SERVER: joi.string().required().default('nats://localhost:4222'),
  })
  .unknown(true)
  .required();

const { error, value } = environment.validate({ ...process.env });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env: EnvironmentVariables = value;

export const config = {
  port: env.PORT,
  natsServer: env.NATS_SERVER,
};
