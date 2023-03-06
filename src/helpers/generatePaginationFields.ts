import { orderBy } from 'lodash';

export function generatePaginationFields(model, includeFilters = false) {
  if (!includeFilters) {
    return '';
  }

  const parsedFields = orderBy(
    model.fields
      .filter((field) => !field.relationName)
      .filter((field) => field.isId),
    ['name']
  );

  const field = parsedFields.length
    ? parsedFields
    : orderBy(
        (model.primaryKey?.fields ?? []).map((field) =>
          model.fields.find(({ name }) => name === field)
        ),
        ['name']
      )[0];

  return `
    @Transform(({ value }) => typeof value === 'string' ? +value : value)
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    skip?: number;
    
    @Transform(({ value }) => typeof value === 'string' ? +value : value)
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    take?: number;
        
    @ApiProperty({ required: false })
    @IsOptional()
    cursor?: Prisma.${model.name}WhereUniqueInput;
  `;
}
