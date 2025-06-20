import joi from 'joi';

interface EnvironmentVariables {
  JWT_SECRET: string;
  NATS_SERVER: string;
}

export const environment = joi
  .object({
    JWT_SECRET: joi.string().required(),
    NATS_SERVER: joi.string().required(),
  })
  .unknown(true)
  .required();

const { error, value } = environment.validate({ ...process.env });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env: EnvironmentVariables = value;

export const config = {
  jwtSecret: env.JWT_SECRET,
  natsServer: env.NATS_SERVER,
};
