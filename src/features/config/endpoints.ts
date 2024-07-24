const BASE_URL = 'https://4bdb-61-72-170-128.ngrok-free.app/';
type StringLike = string | number | boolean | undefined | null | bigint;
const createEndpoint = (server: string) => (str: TemplateStringsArray, ...args: StringLike[]) => {
  const result = str.reduce((prev, curr, i) => prev + curr + (args[i] ?? ''), '');

  return `${server}/${result[0] === '/' ? result.slice(1) : result}`;
};

export const server = createEndpoint(BASE_URL);
