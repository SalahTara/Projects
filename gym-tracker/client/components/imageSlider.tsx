import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

// Replace these with your own image URLs or require()s
const IMAGES = [
  {
    id: "1",
    uri: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
  },
  {
    id: "2",
    uri: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
  },
  {
    id: "3",
    uri: "https://images.pexels.com/photos/34950/pexels-photo.jpg",
  },
];

type ImageItem = (typeof IMAGES)[number];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<ImageItem>);

export default function ImageSlider() {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item }: ListRenderItemInfo<ImageItem>) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={IMAGES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll as any} // TS sometimes complains; this shuts it up
        scrollEventThrottle={16}
      />

      <View style={styles.dotsContainer}>
        {IMAGES.map((_, index) => (
          <Dot key={index} index={index} scrollX={scrollX} />
        ))}
      </View>
    </View>
  );
}

type DotProps = {
  index: number;
  scrollX: SharedValue<number>;
};

function Dot({ index, scrollX }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const position = scrollX.value / width;

    const opacity = interpolate(
      position,
      [index - 1, index, index + 1],
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      position,
      [index - 1, index, index + 1],
      [0.8, 1.3, 0.8],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width,
    height: 525,
    // borderRadius: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
});
