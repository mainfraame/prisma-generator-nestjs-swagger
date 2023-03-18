import { VERSION } from '../constants';

export const log = {
  error: (message: string, object?: Record<string, unknown>) => {
    process.stdout.write(
      `✗ ${message} (${VERSION} | library)${object ? ':' : ''}\n`
    );

    if (object) {
      process.stdout.write(`${JSON.stringify(object, null, 2)}\n`);
    }
  },
  success: (message: string, additional?: string) => {
    process.stdout.write(
      `✔ ${message} (${VERSION} | library)${
        additional ? ` ${additional}` : ''
      }\n`
    );
  },
  warn: (message: string, object?: Record<string, unknown>) => {
    process.stdout.write(
      `⚠ ${message} (${VERSION} | library)${object ? ':' : ''}\n`
    );

    if (object) {
      process.stdout.write(`${JSON.stringify(object, null, 2)}\n`);
    }
  }
};
