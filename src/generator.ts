import {
  GeneratorConfig,
  generatorHandler,
  GeneratorOptions
} from '@prisma/generator-helper';
import { logger } from '@prisma/internals';

import fs from 'fs/promises';
import path from 'path';

import { GENERATOR_NAME } from './constants';
import { generateDtos } from './helpers/generateDtos';

const { version } = require('../package.json');

type Settings = Partial<
  GeneratorConfig & {
    prettyName?: string;
    defaultOutput?: string;
    version?: string;
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
              main: 'index.cjs',
              module: 'index.js',
              types: 'index.ts',
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

      logger.info(`${GENERATOR_NAME}::completed`);
    } catch (e) {
      logger.error(`${GENERATOR_NAME}::error`, e);
      process.exit(1);
    }
  },
  onManifest(config: Settings) {
    settings = {
      ...config,
      defaultOutput: path.join(
        process.cwd(),
        config.defaultOutput ?? 'node_modules/@generated/swagger'
      ),
      prettyName: GENERATOR_NAME,
      version
    };

    return settings;
  }
});
