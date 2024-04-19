import {IEnvironment} from "./ienvironment";

const apiHost = 'localhost:7106';
const apiUrl = `https://${apiHost}/api/`

export const environment: IEnvironment = {
  apiHost,
  apiUrl,
  enableDebugTools: false,
  logLevel: 'debug',
  production: false
};
