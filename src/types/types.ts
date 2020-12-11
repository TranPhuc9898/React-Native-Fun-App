type Image = {
  landscape: string;
  portrait: string;
  thumbnail: string[];
};

export type Product = {
  brandId: string;
  productId: string;
  productName: string;
  productDescription: string;
  productImage: Image;
};