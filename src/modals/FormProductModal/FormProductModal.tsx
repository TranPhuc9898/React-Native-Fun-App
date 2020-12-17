import React, {useState} from 'react';
import {View, StyleSheet, Platform, StyleProp} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Formik} from 'formik';
import {Layout, Button} from '@ui-kitten/components';
import * as Yup from 'yup';

import {
  getUploadUri,
  getUploadFileName,
  uploadImage,
  getDownloadUrl,
  addProduct,
} from '../../utils';

import NumberFormat from 'react-number-format';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Input, {ErrorText} from '../../pureComponent/Input';
import commonStyles from '../../theme/commonStyles';
import PreviewImage from '../../pureComponent/PreviewImage/PreviewImage';
import {ImageStyle} from 'react-native-fast-image';

const stringSchema = Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('This field is required');

const FormProductSchema = Yup.object().shape({
  brandName: stringSchema,
  productName: stringSchema,
  productDescription: stringSchema,
  productPrice: Yup.string().required('This field is required'),
  thumbnails: Yup.array()
    .of(Yup.string())
    .length(1, 'Thumbnails must be have at least 1 items'),
});

const MAX_UPLOAD_IMAGE = 6;

type FormProductModalNavigationProp = StackNavigationProp<any>;

type Props = {
  navigation: FormProductModalNavigationProp;
};

const FormProductModal: React.FC<Props> = ({navigation}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState<ImagePickerResponse[]>(
    [] as ImagePickerResponse[],
  );

  return (
    <Layout
      style={StyleSheet.flatten([commonStyles.fullScreen, commonStyles.p3])}>
      <Formik
        initialValues={{
          brandName: '',
          productName: '',
          productDescription: '',
          productPrice: '',
          thumbnails: [],
        }}
        validationSchema={FormProductSchema}
        onSubmit={async (values) => {
          await addProduct({
            id: '',
            brandName: values.brandName,
            productName: values.productName,
            productDescription: values.productDescription,
            productPrice: values.productPrice.replace('.', ''),
            productImage: {
              landscape: '',
              portrait: '',
              thumbnails: values.thumbnails,
            },
          });
          navigation.goBack();
        }}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldError,
        }) => {
          const handleUploadImage = () => {
            launchImageLibrary(
              {} as ImageLibraryOptions,
              async (response: ImagePickerResponse) => {
                const uri = response.uri;
                if (uri) {
                  setFieldError('thumbnails', undefined);
                  const updatedThumbnails = [...thumbnails, response];
                  setThumbnails(updatedThumbnails);
                  setUploadingIndex(updatedThumbnails.length - 1);

                  // const fileName = getUploadFileName(uri);
                  // const uploadUri = getUploadUri(uri, Platform.OS);
                  // setUploading(true);
                  // try {
                  //   await uploadImage(fileName, uploadUri);
                  //   const downloadUrl = await getDownloadUrl(fileName);
                  //   setFieldValue('thumbnails', [
                  //     ...values.thumbnails,
                  //     downloadUrl,
                  //   ]);
                  // } catch (error) {
                  //   console.error(error);
                  // }
                  // setUploading(false);
                }
              },
            );
          };
          return (
            <View style={commonStyles.fullScreen}>
              <Input
                style={commonStyles.mt3}
                status={
                  errors.brandName && touched.brandName ? 'danger' : 'primary'
                }
                errorMessage={errors.brandName}
                showError={!!errors.brandName && touched.brandName}
                label="Brand Name"
                placeholder="Ex: Luis Vuiton"
                value={values.brandName}
                onBlur={handleBlur('brandName')}
                onChangeText={handleChange('brandName')}
              />
              <Input
                style={commonStyles.mt3}
                status={
                  errors.productName && touched.productName
                    ? 'danger'
                    : 'primary'
                }
                errorMessage={errors.productName}
                showError={
                  errors.productName && touched.productName ? true : false
                }
                label="Product Name"
                placeholder="Ex: Dior Sauvage"
                value={values.productName}
                onBlur={handleBlur('productName')}
                onChangeText={handleChange('productName')}
              />
              <Input
                style={commonStyles.mt3}
                status={
                  errors.productDescription && touched.productDescription
                    ? 'danger'
                    : 'primary'
                }
                errorMessage={errors.productDescription}
                showError={
                  errors.productDescription && touched.productDescription
                    ? true
                    : false
                }
                multiline={true}
                textStyle={styles.multilineInput}
                label="Product Description"
                placeholder="Enter description about the product"
                value={values.productDescription}
                onBlur={handleBlur('productDescription')}
                onChangeText={handleChange('productDescription')}
              />
              <NumberFormat
                value={values.productPrice}
                thousandSeparator={'.'}
                decimalSeparator={','}
                displayType={'text'}
                renderText={(value) => (
                  <Input
                    style={commonStyles.mt3}
                    status={
                      errors.productPrice && touched.productPrice
                        ? 'danger'
                        : 'primary'
                    }
                    errorMessage={errors.productPrice}
                    showError={
                      errors.productPrice && touched.productPrice ? true : false
                    }
                    label="Product Price"
                    placeholder="Ex: 20000"
                    keyboardType={'number-pad'}
                    value={value}
                    onBlur={handleBlur('productPrice')}
                    onChangeText={handleChange('productPrice')}
                  />
                )}
              />

              <View>
                <View
                  style={StyleSheet.flatten([
                    commonStyles.flexWrap,
                    commonStyles.row,
                    commonStyles.alignItemsCenter,
                    commonStyles.p2,
                    commonStyles.mt3,
                    styles.previewImageContainer,
                    errors.thumbnails && touched.thumbnails
                      ? {borderColor: '#B00020'}
                      : {borderColor: '#3366ff'},
                  ])}>
                  {thumbnails.map((item, index) => {
                    const previewImageStyle: StyleProp<ImageStyle> = {
                      aspectRatio:
                        item.width && item.height
                          ? item.width / item.height
                          : 1 / 1,
                      width: 100,
                    };

                    return (
                      <PreviewImage
                        containerStyle={styles.previewImage}
                        imageStyle={previewImageStyle}
                        loading={uploading && uploadingIndex === index}
                        key={item.uri}
                        source={{uri: item.uri}}
                      />
                    );
                  })}
                  <Button
                    style={styles.buttonUpload}
                    disabled={
                      thumbnails.length === MAX_UPLOAD_IMAGE ||
                      uploading ||
                      isSubmitting
                    }
                    onPress={handleUploadImage}>
                    {'Upload Image'}
                  </Button>
                </View>
                {errors.thumbnails && touched.thumbnails && (
                  <ErrorText errorMessage={errors.thumbnails.toString()} />
                )}
              </View>
              <Button
                style={commonStyles.mt3}
                disabled={uploading || isSubmitting}
                onPress={handleSubmit}>
                {'Save'}
              </Button>
            </View>
          );
        }}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  multilineInput: {
    minHeight: 64,
    textAlignVertical: 'top',
    paddingTop: 0,
    paddingBottom: 0,
  },
  previewImage: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#3366ff',
    marginHorizontal: 6,
  },
  previewImageContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 8,
  },
  buttonUpload: {
    width: 110,
    height: 110,
  },
});

export default FormProductModal;
