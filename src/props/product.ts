export interface Product {
  id: string;
  name: string;
  code: string;
  article: string;
  quantity: string;
  vip: number;
  vip10: number;
  vip25: number;
  vip50: number;
  vip75: number;
  miniature: string;
  pathName: string;
  archived: boolean;
  description: string;
  externalCode: string;
  updated: string;
  cp: string;
  to_order: string | null;
  oil_discriptions: string | null;
  material: string;
  volume: string;
  variants: Variant[];
}

interface Variant {
  quantity: string;
  attributes: string[][];
}
