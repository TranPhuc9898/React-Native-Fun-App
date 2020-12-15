import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {Product} from '../types/types';

enum MY_COLLECTION {
  PRODUCTS = 'products',
}

const uploadImage = async (fileName: string, uploadUri: string) => {
  const task = storage().ref(fileName).putFile(uploadUri);
  const result = await task;
  return result;
};

const getDownloadUrl = async (fileName: string) => {
  const url = storage().ref(fileName).getDownloadURL();
  return url;
};

const addProduct = async (product: Product) => {
  return await firestore().collection(MY_COLLECTION.PRODUCTS).add(product);
};

export {uploadImage, getDownloadUrl, addProduct};
