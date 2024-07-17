# Expo-Tutorial-StickerSmash

Based on the [Tutorial Expo Framework Official Tutorial](https://docs.expo.dev/tutorial/create-your-first-app/)

# Run the App
```
npm install
npx expo start
```

To run on the web, just execute the command to start the development server, and press the `W` key.
To run on a device, be it Android or iOS, simply download the `Expo Go` app, which enables you to run the bundle on the device.


### Dependecies:
- TypeScript
- React-DOM
- React-Native-Web
- @expo/vector-icons
- expo-image-picker
- 

-------------------------------------------------------------------------------

# Initialize a new Expo App

``npx create-expo-app StickerSmash --template blank``

<details>
  <summary>Expand Details</summary>

  ## Enable the project to run on the Web
  ``npx expo install react-dom react-native-web @expo/metro-runtime``

</details>

-------------------------------------------------------------------------------

## Using Vector Icons

``npx expo install @expo/vector-icons``

-------------------------------------------------------------------------------

## Picking an image from the device's library

<details>
  <summary>Expand</summary>

</details>

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

## Picking an image from the device's library

``npx expo install expo-image-picker``

Provides access to the system's UI to select images and videos from the phone's library or take a photo with the camera.

<details>
  <summary>Expand</summary>

  `expo-image-picker` provides the `launchImageLibraryAsync()` method that displays the system UI for choosing an image or a video from the device's media library.

```JavaScript App.js
  // ...rest of the import statements remain unchanged
 import * as ImagePicker from 'expo-image-picker'; 

  export default function App() {
    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result);
      } else {
        alert('You did not select any image.');
      }
    };

    // ...rest of the code remains same
  }
```
Let's learn what the above code does.

The `launchImageLibraryAsync()` receives an object in which different options are specified. This object is an ImagePickerOptions object. We can pass the object to specify different options when invoking the method.
When `allowsEditing` is set to true, the user can crop the image during the selection process on Android and iOS but not on the web.

--------

```JavaScript ./components/ImageViewer.js

  import { StyleSheet, Image } from 'react-native';

  export default function ImageViewer({ placeholderImageSource, selectedImage }) {

    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

    return (
      <Image source={imageSource} style={styles.image} />
    );
  }
```

</details>

-------------------------------------------------------------------------------
