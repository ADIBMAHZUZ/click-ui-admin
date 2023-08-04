import { QuotationType } from "src/app/shared/model/model";

export interface Product {
  title: string;
  material: string;
  price: number;
  quantity: number;
  total: number;
  period: number;
}

export interface Quotation {
  is_send: boolean;
  commission: number;
  librarian: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  products: Product[];
  publisher: { name: string; address: string; email: string; phone: string };
  ref_no: string;
  total: number;
  quotation_type: QuotationType;
}
