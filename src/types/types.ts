import {StackNavigationProp} from '@react-navigation/stack';

export type CommonNavigationTypes = {
  navigation: StackNavigationProp<any>;
  route: StackNavigationProp<any>;
};

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
