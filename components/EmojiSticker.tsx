import { View, Image } from 'react-native';

export default function EmojiSticker({ imageSize, stickerSource }) {
  return (
    <View style={{ top: -250, left: 160-imageSize/2 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
