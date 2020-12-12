import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {Layout, Button} from '@ui-kitten/components';
import * as Yup from 'yup';

import NumberFormat from 'react-number-format';
import Input from '../../pureComponent/Input';
import commonStyles from '../../theme/commonStyles';

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
});

const FormProductModal = () => {
  return (
    <Layout
      style={StyleSheet.flatten([commonStyles.fullScreen, commonStyles.p3])}>
      <Formik
        initialValues={{
          productName: '',
          productDescription: '',
          productPrice: '',
        }}
        validationSchema={FormProductSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          console.log('TCL: FormProductModal -> values', values);
        }}>
        {({handleChange, handleSubmit, values, errors, setFieldValue}) => {
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
                // decimalScale={2}
                // fixedDecimalScale={true}
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

              <Button style={commonStyles.mt3} onPress={handleSubmit}>
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
});

export default FormProductModal;
