const ClassValidators = {
  BigInt: '@IsNumber()',
  Decimal: '@IsNumber()',
  Float: '@IsNumber()',
  Int: '@IsNumber()',
  Boolean: '@IsBoolean()',
  DateTime: '@IsDate()',
  String: '@IsString()'
};

export function mapPrismaTypeToClassValidator(prismaType) {
  return prismaType === 'Json'
    ? ''
    : ClassValidators[prismaType] ?? '@IsString()';
}
