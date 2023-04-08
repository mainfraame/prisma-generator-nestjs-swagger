import fs from 'fs/promises';

import { writeFileSafely } from '../utils/writeFileSafely';
import { generateBooleanFields } from './generateBooleanFields';
import { generateCreateFields } from './generateCreateFields';
import { generateDateFields } from './generateDateFields';
import { generateDeleteWhereFields } from './generateDeleteWhereFields';
import { generateFindManyFields } from './generateFindManyFields';
import { generateFindUniqueFields } from './generateFindUniqueFields';
import { generateJsonFields } from './generateJsonFields';
import { generateNumericFields } from './generateNumericFields';
import { generatePatchFields } from './generatePatchFields';
// import { generateSerializeDto } from './generateSerializeDto';
// import { generateSerializerInterceptor } from './generateSerializerInterceptor';
import { generateStringFields } from './generateStringFields';
import { generateUpdateFields } from './generateUpdateFields';

export async function generateDtos(dmmf, outputPath) {
  await fs.mkdir(`${outputPath}`, { recursive: true });

  const exports = [];

  for (const model of dmmf.datamodel.models) {
    const fields = [
      generateBooleanFields(model),
      generateDateFields(model),
      generateJsonFields(model),
      generateNumericFields(model),
      generateStringFields(model)
    ].join('\n\n');

    const createFields = generateCreateFields(model);
    const findManyFields = generateFindManyFields(model);
    const findUniqueFields = generateFindUniqueFields(model);
    const deleteWhereFields = generateDeleteWhereFields(model);
    const patchFields = generatePatchFields(model);
    const updateFields = generateUpdateFields(model);

    const includePrisma = [
      fields,
      createFields,
      deleteWhereFields,
      findManyFields,
      findUniqueFields,
      updateFields
    ].some((code) => {
      return code.includes('Prisma');
    });

    //import { serializer } from './serializer';

    const content = `
      import { ApiProperty } from '@nestjs/swagger';
      ${includePrisma ? `import { Prisma } from '@prisma/client';` : ''}
      
      import { Transform } from 'class-transformer';
      import { IsDate, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
      
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
            
      export class Patch${model.name}Dto {
        ${patchFields}
      }
           
      export class Update${model.name}Dto {
        ${updateFields}
      }
     
      `;

    const classes = [
      `${model.name}Dto`,
      `Create${model.name}Dto`,
      `DeleteWhere${model.name}Dto`,
      `FindMany${model.name}Dto`,
      `FindUnique${model.name}Dto`,
      `Patch${model.name}Dto`,
      `Update${model.name}Dto`
    ];

    exports.push(`export { ${classes.join(', ')} } from './${model.name}Dto';`);

    await writeFileSafely(`${outputPath}/${model.name}Dto.ts`, content);
  }

  await writeFileSafely(`${outputPath}/index.ts`, exports.join('\n'));
}
