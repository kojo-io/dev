import {IEnvironment} from "./ienvironment";

const apiHost = 'safedoktoruser.azurewebsites.net';
const apiUrl = `http://${apiHost}/api/`

export const environment : IEnvironment = {
  apiHost,
  apiUrl,
  enableDebugTools: false,
  logLevel: 'debug',
  production: true
};
