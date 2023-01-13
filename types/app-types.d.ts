declare module "app-types" {
  export interface IBanner {
    image: string;
    buttonText: string;
    product: string;
    desc: string;
    smallText: string;
    midText: string;
    largeText1: string;
    largeText2: string;
    discount: string;
    saleTime: string;
  }

  export interface IProduct {
    image: string;
    name: string;
    slug: string;
    price: number;
    details: string;
  }
}
