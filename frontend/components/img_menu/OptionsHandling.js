import * as ImagePicker from 'expo-image-picker';


const saveImage = async (image, setImage, setMenuVisible) => {
    try {
        setImage(image);
        setMenuVisible(false);
    } catch (error) {
        console.log(error + " error in saveImage");
    }
}
export const handleCamera = async (setImage, setMenuVisible) => {
    try {
        await ImagePicker.requestCameraPermissionsAsync();
        const takePicture = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!takePicture.canceled) {
            await saveImage(takePicture.assets[0].uri, setImage, setMenuVisible);
        }

    } catch (error) {
        console.log(error + " error in handleCamera");
    }
}

export const handleGallery = async (setImage, setMenuVisible) => {
    try {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const pickedPicutreFromGallery = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!pickedPicutreFromGallery.canceled) {
            await saveImage(pickedPicutreFromGallery.assets[0].uri, setImage, setMenuVisible);
        }

    } catch (error) {
        console.log(error + " error in handleGallery");
    }
};

export const handleRemove = (setImage, setMenuVisible) => {
    try {
        saveImage(null, setImage, setMenuVisible);
    } catch (error) {
        console.log(error + " error u handleRemove")
        setMenuVisible(false);
    }
};
