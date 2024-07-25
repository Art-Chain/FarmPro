const BASE_URL = 'https://12d2-210-92-23-213.ngrok-free.app/';
type StringLike = string | number | boolean | undefined | null | bigint;
const createEndpoint = (server: string) => (str: TemplateStringsArray, ...args: StringLike[]) => {
  const result = str.reduce((prev, curr, i) => prev + curr + (args[i] ?? ''), '');

  return `${server.endsWith('/') ? server : `${server}/`}${result[0] === '/' ? result.slice(1) : result}`;
};

export const server = createEndpoint(BASE_URL);
