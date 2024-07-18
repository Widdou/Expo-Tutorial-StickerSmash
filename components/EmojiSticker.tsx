import { View, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }) {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);  
  const rotation = useSharedValue(1);
  const savedRotation = useSharedValue(1);

  const drag = Gesture.Pan()
  .onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  // const pinchSize = Gesture.Pinch()
  // .onUpdate((e) => {
  //   scale.value = savedScale.value * e.scale;
  // })
  // .onEnd(() => {
  //   savedScale.value = scale.value;
  //   console.log('Sticker Scale: ', scale)
  // });

  // const rotationGesture = Gesture.Rotation()
  //   .onUpdate((e) => {
  //     rotation.value = savedRotation.value + e.rotation;
  //   })
  //   .onEnd(() => {
  //     savedRotation.value = rotation.value;
  //   });

  const doubleTap = Gesture.Tap()
  .numberOfTaps(2)
  .onStart(() => {
    if (scaleImage.value !== imageSize * 2) {
      scaleImage.value = scaleImage.value * 2;
    } else {
      scaleImage.value = scaleImage.value / 2;
    }
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  //@ts-ignore
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value, },
        { translateY: translateY.value, },
        // { rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
        // transform: [{ scale: scale.value }],
      ],
    };
  });
  


  return (
    // <GestureDetector gesture={rotationGesture}>
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -250, left: 160-imageSize/2 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
    // {/* </GestureDetector> */}
  );
}
