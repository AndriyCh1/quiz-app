import { cleanEnv, str, port } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_USER: str(),
    POSTGRES_DB: str(),
  })  
}

export default validateEnv;
