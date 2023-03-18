import { transform } from '@swc/core';

import fs from 'fs/promises';
import { basename, dirname } from 'path';

import { formatFile } from './formatFile';

export const writeFileSafely = async (path: string, content: any) => {
  const isNodeModules = path.includes('node_modules');

  const srcDir = `${dirname(path)}${isNodeModules ? '/src' : ''}`;
  const distDir = `${dirname(path)}/dist`;

  await fs.mkdir(srcDir, {
    recursive: true
  });

  if (isNodeModules) {
    await fs.mkdir(distDir, {
      recursive: true
    });
  }

  const srcFile = `${srcDir}/${basename(path)}`;
  const cjsFile = `${distDir}/${basename(path).replace(/\.ts$/, '.cjs')}`;
  const jsFile = `${distDir}/${basename(path).replace(/\.ts$/, '.js')}`;

  /** write ts */
  await fs.writeFile(srcFile, await formatFile(content));

  if (isNodeModules) {
    /** write esm */
    await fs.writeFile(
      jsFile,
      (
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
    );
  }

  if (isNodeModules) {
    /** write cjs */
    await fs.writeFile(
      cjsFile,
      (
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
    );
  }
};
