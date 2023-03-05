import { transform } from '@swc/core';

import fs from 'fs/promises';
import { dirname } from 'path';

import { formatFile } from './formatFile';

export const writeFileSafely = async (path: string, content: any) => {
  await fs.mkdir(dirname(path), {
    recursive: true
  });

  /** write ts */
  await fs.writeFile(path, await formatFile(content));

  /** write esm */
  await fs.writeFile(
    path.includes('node_modules') ? path.replace(/\.ts$/, '.js') : path,
    path.includes('node_modules')
      ? (
          await transform(await formatFile(content), {
            jsc: {
              target: 'es2020',
              parser: {
                syntax: 'typescript',
                decorators: true
              },
              transform: {
                legacyDecorator: true,
                decoratorMetadata: true
              },
              keepClassNames: true
            },
            module: {
              type: 'es6',
              strict: true
            },
            sourceMaps: 'inline'
          })
        ).code
      : await formatFile(content)
  );

  /** write cjs */
  await fs.writeFile(
    path.includes('node_modules') ? path.replace(/\.ts$/, '.cjs') : path,
    path.includes('node_modules')
      ? (
          await transform(await formatFile(content), {
            jsc: {
              target: 'es2020',
              parser: {
                syntax: 'typescript',
                decorators: true
              },
              transform: {
                legacyDecorator: true,
                decoratorMetadata: true
              },
              keepClassNames: true
            },
            module: {
              type: 'commonjs',
              strict: true
            },
            sourceMaps: 'inline'
          })
        ).code
      : await formatFile(content)
  );
};
