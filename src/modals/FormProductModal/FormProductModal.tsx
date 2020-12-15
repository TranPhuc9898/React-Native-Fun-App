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
import Input from '../../pureComponent/Input';
import commonStyles from '../../theme/commonStyles';
import PreviewImage from '../../pureComponent/PreviewImage/PreviewImage';
import {ImageStyle} from 'react-native-fast-image';

const FormProductSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required'),
  productDescription: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required'),
  productPrice: Yup.string().required('This field is required'),
  thumbnails: Yup.array().of(Yup.string()).length(1),
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
          productName: '',
          productDescription: '',
          productPrice: '',
          thumbnails: [],
        }}
        validationSchema={FormProductSchema}
        validateOnChange={false}
        onSubmit={async (values) => {
          await addProduct({
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
          handleChange,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          isSubmitting,
        }) => {
          const handleUploadImage = () => {
            launchImageLibrary(
              {} as ImageLibraryOptions,
              async (response: ImagePickerResponse) => {
                const uri = response.uri;
                if (uri) {
                  const updatedThumbnails = [...thumbnails, response];
                  setThumbnails(updatedThumbnails);
                  setUploadingIndex(updatedThumbnails.length - 1);
                  if (uri) {
                    const fileName = getUploadFileName(uri);
                    const uploadUri = getUploadUri(uri, Platform.OS);
                    setUploading(true);
                    try {
                      await uploadImage(fileName, uploadUri);
                      const downloadUrl = await getDownloadUrl(fileName);
                      setFieldValue('thumbnails', [
                        ...values.thumbnails,
                        downloadUrl,
                      ]);
                    } catch (error) {
                      console.error(error);
                    }
                    setUploading(false);
                  }
                }
              },
            );
          };
          return (
            <View style={commonStyles.fullScreen}>
              <Input
                style={commonStyles.mt3}
                status={errors.productName ? 'danger' : 'primary'}
                errorMessage={errors.productName}
                showError={!!errors.productName}
                label="Product Name"
                placeholder="Ex: Dior Sauvage"
                value={values.productName}
                onChangeText={handleChange('productName')}
              />
              <Input
                style={commonStyles.mt3}
                status={errors.productDescription ? 'danger' : 'primary'}
                errorMessage={errors.productDescription}
                showError={!!errors.productDescription}
                multiline={true}
                textStyle={styles.multilineInput}
                label="Product Description"
                placeholder="Enter description about the product"
                onChangeText={handleChange('productDescription')}
                value={values.productDescription}
              />
              <NumberFormat
                value={values.productPrice}
                thousandSeparator={'.'}
                decimalSeparator={','}
                displayType={'text'}
                renderText={(value) => (
                  <Input
                    style={commonStyles.mt3}
                    status={errors.productPrice ? 'danger' : 'primary'}
                    errorMessage={errors.productPrice}
                    showError={!!errors.productPrice}
                    label="Product Price"
                    placeholder="Ex: 20000"
                    keyboardType={'number-pad'}
                    onChangeText={handleChange('productPrice')}
                    value={value}
                  />
                )}
              />

              <View
                style={StyleSheet.flatten([
                  commonStyles.flexWrap,
                  commonStyles.row,
                  commonStyles.alignItemsCenter,
                  commonStyles.p2,
                  commonStyles.mt3,
                  styles.previewImageContainer,
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
                      containerStyle={styles.previewImageContainer}
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
  previewImageContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'blue',
    marginTop: 8,
    marginHorizontal: 4,
  },
  buttonUpload: {
    width: 110,
    height: 110,
  },
});

export default FormProductModal;
