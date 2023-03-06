import { mapTransformerType } from './mapTransformerType';

export function generateNumericFields(model, includeFilters = false) {
  return model.fields
    .filter(
      (field) =>
        field.kind === 'scalar' &&
        (field.type === 'BigInt' ||
          field.type === 'Decimal' ||
          field.type === 'Int' ||
          field.type === 'Float')
    )
    .map((field) => ({
      ...field,
      isRequired: includeFilters ? false : field.isRequired,
      transformType: mapTransformerType(field.type)
    }))
    .map((field) => {
      const code = `
        ${field.transformType ? `@Transform(${field.transformType})` : ''}
        @ApiProperty({ required: ${field.isRequired} })
        ${field.isRequired ? '' : '@IsOptional()'}
        @IsNumber()
        ${includeFilters ? 'private ' : ''}${field.name}${
        field.isRequired ? '' : '?'
      }: number;
        `;

      const filters = `
        ${field.transformType ? `@Transform(${field.transformType})` : ''}
        @ApiProperty({ required: false })
        @IsOptional()
        @IsNumber()
        ${includeFilters ? 'private ' : ''}${field.name}__lt?: number;
    
        ${field.transformType ? `@Transform(${field.transformType})` : ''}
        @ApiProperty({ required: false })
        @IsOptional()
        @IsNumber()
        ${includeFilters ? 'private ' : ''}${field.name}__lte?: number;
    
        ${field.transformType ? `@Transform(${field.transformType})` : ''}
        @ApiProperty({ required: false })
        @IsOptional()
        @IsNumber()
        ${includeFilters ? 'private ' : ''}${field.name}__gt?: number;
    
        ${field.transformType ? `@Transform(${field.transformType})` : ''}
        @ApiProperty({ required: false })
        @IsOptional()
        @IsNumber()
        ${includeFilters ? 'private ' : ''}${field.name}__gte?: number;
      `;

      return `${code}${includeFilters ? filters : ''}`;
    })
    .join('\n\n');
}
