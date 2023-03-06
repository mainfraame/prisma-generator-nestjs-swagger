import { orderBy } from 'lodash';

export function generatePaginationFields(model, includeFilters = false) {
  if (!includeFilters) {
    return '';
  }

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
