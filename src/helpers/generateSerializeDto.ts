export function generateSerializeDto() {
  return `
    export function serializer<T>(value: any): T {
    
      const filters: T = {};
      
      const entries = Object.entries(value)
        .filter(([key]) => typeof value[key] !== 'function');
    
      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
    
        if (value === undefined || value === null) {
          continue;
        }
        
        if (key === 'order' && value !== '' && typeof value === 'string') {
          const orders = value.split(',');
          
          for (let o = 0; o < orders.length; o++) {
            const [field, order] = orders[o].split('_');
            filters.orderBy = {
              ...filters.orderBy ?? {}, 
              [field]: (order || 'asc').toLowerCase() 
            };
          }
        } else if (key.endsWith('__contains') && typeof value === 'string') {
          filters.where = {
            ...filters.where,
            [key.split('__')[0]]: { contains: value }
          };
        } else if (key.endsWith('__startsWith') && typeof value === 'string') {
          filters.where = {
            ...filters.where,
            [key.split('__')[0]]: { startsWith: value }
          };
        } else if (key.endsWith('__endsWith') && typeof value === 'string') {
          filters.where = {
            ...filters.where,
            [key.split('__')[0]]: { endsWith: value }
          };
        } else if (
          (key.endsWith('__lt') && typeof value === 'number') ||
          (key.endsWith('__lt') && value instanceof Date)
        ) {
          filters.where = { ...filters.where, [key.split('__')[0]]: { lt: value } };
        } else if (
          (key.endsWith('__lte') && typeof value === 'number') ||
          (key.endsWith('__lte') && value instanceof Date)
        ) {
          filters.where = { ...filters.where, [key.split('__')[0]]: { lte: value } };
        } else if (
          (key.endsWith('__gt') && typeof value === 'number') ||
          (key.endsWith('__gt') && value instanceof Date)
        ) {
          filters.where = { ...filters.where, [key.split('__')[0]]: { gt: value } };
        } else if (
          (key.endsWith('__gte') && typeof value === 'number') ||
          (key.endsWith('__gte') && value instanceof Date)
        ) {
          filters.where = { ...filters.where, [key.split('__')[0]]: { gte: value } };
        } else {
          filters.where = { ...filters.where, [key]: value };
        }
      }

      return filters;
    }
  `;
}
