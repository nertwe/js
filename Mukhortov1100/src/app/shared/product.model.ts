export interface MyProduct {
  id?: number;
  name: string;
  code: string;
  price: number;
	producer: string;
	category: number;
	weight: number;
	quantity: number;
}

export enum MyProductCategory {
  furniture,
  technics, 
  books, 
  phones
}