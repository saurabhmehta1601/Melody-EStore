declare module "app-types" {
  export interface IBanner {
    _id: string;
    image: SanityImageSource;
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
    _id: string;
    image: SanityImageSource;
    name: string;
    slug: {
      current: string;
    };
    price: number;
    details: string;
  }
}
