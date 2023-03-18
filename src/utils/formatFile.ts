import prettier from 'prettier';

import { log } from './log';

export const formatFile = async (content: string): Promise<string> => {
  const options = await prettier
    .resolveConfig(process.cwd())
    .catch(() => Promise.resolve(null));

  if (!options) {
    log.warn('No Prettier Config Found To Format NestJs DTOs');
    return content;
  }

  try {
    return prettier.format(content, {
      ...options,
      parser: 'typescript'
    });
  } catch (e) {
    log.warn('Failed To Format NestJs DTOs', {
      message: e.message,
      stack: e.stack
    });

    return content;
  }
};
