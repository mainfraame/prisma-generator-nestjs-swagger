import {
  GeneratorConfig,
  generatorHandler,
  GeneratorOptions
} from '@prisma/generator-helper';

import fs from 'fs/promises';
import path from 'path';
import { performance } from 'perf_hooks';

import { generateDtos } from './helpers/generateDtos';
import { log } from './utils/log';

type Settings = Partial<
  GeneratorConfig & {
    defaultOutput?: string;
    startTime?: number;
    isNodeModulesDir?: boolean;
  }
>;

let settings: Settings = {
  defaultOutput: ''
};

generatorHandler({
  onGenerate: async (options: GeneratorOptions) => {
    try {
      if (await fs.stat(settings.defaultOutput).catch(() => false)) {
        await fs.rm(settings.defaultOutput, { recursive: true });
      }

      await fs.mkdir(settings.defaultOutput, { recursive: true });

      await generateDtos(options.dmmf, settings.defaultOutput);

      if (settings.defaultOutput.includes('node_modules')) {
        await fs.writeFile(
          `${settings.defaultOutput}/package.json`,
          JSON.stringify(
            {
              name: '@generated/swagger',
              description: 'auto generated nestjs swagger dtos',
              version: '1.0.0',
              main: './dist/index.cjs',
              module: './dist/index.js',
              types: './src/index.ts',
              exports: {
                '.': {
                  types: './src/index.ts',
                  import: './dist/index.js',
                  default: './dist/index.cjs'
                },
                './package.json': './package.json'
              },
              files: ['dist', 'src'],
              license: 'MIT',
              peerDependencies: {
                '@nestjs/swagger': '*',
                'class-generator': '*',
                'class-transformer': '*'
              },
              sideEffects: false
            },
            null,
            2
          )
        );
      }

      log.success(
        'Generated NestJs DTOs',
        `to ${settings.defaultOutput.replace(process.cwd(), '')} in ${(
          performance.now() - settings.startTime
        ).toFixed(0)}ms`
      );
    } catch (e) {
      log.error('Failed To Generate NestJs DTOs', {
        message: e.message,
        stack: e.stack
      });

      process.exit(1);
    }
  },
  onManifest(config: Settings) {
    const defaultOutput = path.join(
      process.cwd(),
      config.defaultOutput ?? 'node_modules/@generated/swagger'
    );

    settings = {
      ...config,
      defaultOutput,
      isNodeModulesDir: defaultOutput.includes('node_modules'),
      startTime: performance.now()
    };

    return settings;
  }
});
