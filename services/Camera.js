import * as ImagePicker from "expo-image-picker";

class Camera {
  cameraPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      return result.base64;
    }
  };

  openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      return result.base64;
    }
  };
}
const camera = new Camera();

export default camera;
