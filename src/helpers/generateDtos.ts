import fs from 'fs/promises';

import { writeFileSafely } from '../utils/writeFileSafely';
import { generateFields } from './generateFields';

export async function generateDtos(dmmf, outputPath) {
  await fs.mkdir(`${outputPath}`, { recursive: true });

  const exports = [];

  for (const model of dmmf.datamodel.models) {
    const fields = generateFields(model.fields);

    const content = `
      import { ApiProperty } from '@nestjs/swagger';

      import { IsDate, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
      
      export class ${model.name}Dto {
        ${fields}
      }
      `;

    exports.push(`export { ${model.name}Dto } from './${model.name}Dto';`);

    await writeFileSafely(`${outputPath}/${model.name}Dto.ts`, content);
  }

  await writeFileSafely(`${outputPath}/index.ts`, exports.join('\n'));

  await fs.writeFile(
    `${outputPath}/tsconfig.json`,
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2018',
          module: 'commonjs',
          lib: ['esnext'],
          strict: false,
          strictPropertyInitialization: false,
          esModuleInterop: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          removeComments: true,
          sourceMap: true,
          baseUrl: '.',
          moduleResolution: 'Node',
          outDir: './dist',
          rootDir: './src',
          newLine: 'lf'
        }
      },
      null,
      2
    )
  );
}
