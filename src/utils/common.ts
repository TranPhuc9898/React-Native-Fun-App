export type PlatformOSType =
  | 'ios'
  | 'android'
  | 'macos'
  | 'windows'
  | 'web'
  | 'native';

const getUploadFileName = (uri: string) => {
  return uri.substring(uri.lastIndexOf('/') + 1);
};

const getUploadUri = (uri: string, platform: PlatformOSType) => {
  return platform === 'ios' ? uri.replace('file://', '') : uri;
};

export {getUploadFileName, getUploadUri};
