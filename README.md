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

``./components/ImageViewer.js``
```JavaScript 

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


## Creating an Emoji Picker Modal

After an image is selected, the user has the option to append an sticker on top of the image.
This should behave just like when creating an instagram story, where you select the sticker and can move and scale it.



<details>
  <summary>Expand</summary>

``EmojiPicker.tsx``
  ```JavaScript  
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function EmojiPicker({ isVisible, children, onClose }) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}
  ```

</details>

### Adding Gestures (Move & Scale)

Install the dependency to handle gestures and animations:
``npx expo install react-native-gesture-handler react-native-reanimated``

To get gesture interactions to work in the app, we'll render ``<GestureHandlerRootView>`` from ``react-native-gesture-handler`` to wrap the top-level component of our app (also known as the "root component").

```JavaScript
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* ...rest of the code remains */}
    </GestureHandlerRootView>
  )
}
```

#### Using Animated Components

``import Animated from 'react-native-reanimated';``

The Animated component looks at the style prop of the component. It also determines which values to animate and applies updates to create an animation.

Reanimated exports animated components such as ``<Animated.View>``, ``<Animated.Text>``, or ``<Animated.ScrollView>``. We will apply animations to the ``<Animated.Image>`` component to make a double tap gesture work.

(React Native ReAnimated Docs)[https://docs.swmansion.com/react-native-reanimated/docs/core/createAnimatedComponent]

-------------------------------------------------------------------------------