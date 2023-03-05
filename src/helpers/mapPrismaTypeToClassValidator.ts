const ClassValidators = {
  BigInt: '@IsNumber()',
  Boolean: '@IsBoolean()',
  Decimal: '@IsNumber()',
  Float: '@IsNumber()',
  DateTime: '@IsDate()',
  Int: '@IsNumber()',
  String: '@IsString()'
};

export function mapPrismaTypeToClassValidator(prismaType) {
  return prismaType === 'Json'
    ? ''
    : ClassValidators[prismaType] ?? '@IsString()';
}
