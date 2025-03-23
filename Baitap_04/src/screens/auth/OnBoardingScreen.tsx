import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Chào mừng bạn đến với OREBI!",
    description: "Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất.",
    animation: require("../../assets/lottie/shopping.json"),
  },
  {
    id: 2,
    title: "Mua sắm dễ dàng, giao hàng nhanh chóng",
    description:
      "Tận hưởng trải nghiệm mua sắm mượt mà với giao diện thân thiện.",
    animation: require("../../assets/lottie/delivery.json"),
  },
  {
    id: 3,
    title: "Ưu đãi hấp dẫn mỗi ngày",
    description:
      "Nhận ngay mã giảm giá và nhiều chương trình khuyến mãi đặc biệt.",
    animation: require("../../assets/lottie/discount.json"),
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      swiperRef.current.scrollBy(1); 
    } else {
      navigation.navigate("WelcomeScreen"); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút Bỏ qua */}
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate("WelcomeScreen")}>
        <Text style={styles.skipText}>Bỏ qua</Text>
      </TouchableOpacity>

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        loop={false}
        showsButtons={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        onIndexChanged={(index) => setCurrentIndex(index)}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <LottieView source={slide.animation} autoPlay loop style={styles.lottie} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </Swiper>

      {/* Thanh tiến trình */}
      <View style={styles.progressContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.progressDot, currentIndex === index && styles.progressDotActive]}
          />
        ))}
      </View>

      {/* Nút Tiếp tục / Bắt đầu */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? "Bắt đầu ngay" : "Tiếp tục"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  lottie: {
    width: width * 0.8,
    height: height * 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#ff5733",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  progressDotActive: {
    backgroundColor: "#ff5733",
    width: 12,
    height: 12,
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: "#ff5733",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff5733",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
