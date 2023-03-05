import fs from 'fs/promises';

import { writeFileSafely } from '../utils/writeFileSafely';
import { generateCreateFields } from './generateCreateFields';
import { generateDeleteWhereFields } from './generateDeleteWhereFields';
import { generateFields } from './generateFields';
import { generateFindManyFields } from './generateFindManyFields';
import { generateFindUniqueFields } from './generateFindUniqueFields';
import { generateUpdateDataFields } from './generateUpdateDataFields';
import { generateUpdateWhereFields } from './generateUpdateWhereFields';

export async function generateDtos(dmmf, outputPath) {
  await fs.mkdir(`${outputPath}`, { recursive: true });

  const exports = [];

  for (const model of dmmf.datamodel.models) {
    const fields = generateFields(model.fields);
    const createFields = generateCreateFields(model.fields);
    const findManyFields = generateFindManyFields(model.fields);
    const findUniqueFields = generateFindUniqueFields(model.fields, model);
    const deleteWhereFields = generateDeleteWhereFields(model.fields, model);
    const updateDataFields = generateUpdateDataFields(model.fields);
    const updateWhereFields = generateUpdateWhereFields(model.fields, model);

    const content = `
      import { ApiProperty } from '@nestjs/swagger';

      import { Transform } from 'class-transformer';
      import { IsDate, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
      
      export class ${model.name}Dto {
        ${fields}
      }
            
      export class Create${model.name}Dto {
        ${createFields}
      }
      
      export class DeleteWhere${model.name}Dto {
        ${deleteWhereFields}
      }
            
      export class FindMany${model.name}Dto {
        ${findManyFields}
      }
      
      export class FindUnique${model.name}Dto {
        ${findUniqueFields}
      }
                 
      export class Update${model.name}Dto {
        ${updateDataFields}
      }
            
      export class UpdateWhere${model.name}Dto {
        ${updateWhereFields}
      }
      `;

    const classes = [
      `${model.name}Dto`,
      `Create${model.name}Dto`,
      `DeleteWhere${model.name}Dto`,
      `FindMany${model.name}Dto`,
      `FindUnique${model.name}Dto`,
      `Update${model.name}Dto`,
      `UpdateWhere${model.name}Dto`
    ];

    exports.push(`export { ${classes.join(', ')} } from './${model.name}Dto';`);

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
