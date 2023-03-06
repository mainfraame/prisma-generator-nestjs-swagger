const TransformerType = {
  BigInt: "({value}) => typeof value === 'string' ? +value : value",
  Boolean: "({value}) => typeof value === 'string' ? Boolean(value) : value",
  Date: "({value}) => typeof value === 'string' ? new Date(value) : value",
  DateTime: "({value}) => typeof value === 'string' ? new Date(value) : value",
  Decimal: "({value}) => typeof value === 'string' ? +value : value",
  Int: "({value}) => typeof value === 'string' ? +value : value",
  Json: '',
  String: '',
  Float: "({value}) => typeof value === 'string' ? +value : value"
};

export const mapTransformerType = (type) => {
  return TransformerType[type];
};
