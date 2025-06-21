import joi from 'joi';

interface EnvironmentVariables {
  NATS_SERVER: string;
}

export const environment = joi
  .object({
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
  natsServer: env.NATS_SERVER,
};
