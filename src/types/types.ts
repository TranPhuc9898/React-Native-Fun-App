type Image = {
  landscape: string;
  portrait: string;
  thumbnails: string[];
};

export type Product = {
  id: string;
  brandName?: string;
  brandId?: string;
  productId?: string;
  productName: string;
  productDescription: string;
  productImage: Image;
  productPrice: string;
};
