import React from "react";
import { View, Text, Image, Pressable, Linking } from "react-native";
import { FontFamily } from "../GlobalStyles";

const Socials = () => {
  const handleSocialPress = (url) => {
    // Use Linking to open the URL in the browser or app
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred while opening the link: ", err)
    );
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Text
        style={{
          color: "#707070",
          fontFamily: FontFamily.sourceSansProRegular,
          fontSize: 15,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Follow us on
      </Text>
      <View style={{ display: "flex", flexDirection: "row", alignSelf: "center", gap: 20 }}>
        <Pressable onPress={() => handleSocialPress("https://www.facebook.com/trypamp")}>
          <Image source={require("../assets/facebook.png")} />
        </Pressable>
        <Pressable onPress={() => handleSocialPress("https://www.instagram.com/trypamp")}>
          <Image source={require("../assets/instagram.png")} />
        </Pressable>
        <Pressable onPress={() => handleSocialPress("https://twitter.com/trypamp")}>
          <Image source={require("../assets/twitter.png")} />
        </Pressable>
        <Pressable onPress={() => handleSocialPress("https://www.tiktok.com/@trypampgh")}>
          <Image source={require("../assets/tiktok.png")} />
        </Pressable>
      </View>
    </View>
  );
};

export default Socials;
