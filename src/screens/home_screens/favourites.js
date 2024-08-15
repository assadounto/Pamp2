import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState } from "react";
import { View, Text, ActivityIndicator, Platform, TouchableOpacity } from "react-native";
import MasonryList from '@react-native-seoul/masonry-list';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from "@rneui/base";
import Emptyfav from "../../../components/EmptyFav";
import axios from "axios";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { backendURL } from "../../services/http";
import { useFocusEffect } from "@react-navigation/core";
import { FontFamily } from '../../GlobalStyles';

const Favourites = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const user = useSelector((state) => state.user.userInfo);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        if (data.length === 0) {
          getFav();
        }
      }
    }, [user?.id])
  );

  const getFav = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendURL}/favorites?user_id=${user?.id}`);
      const formattedData = data.map((item, id) => ({
        id: id,
        vendor: item.vendor,
        cover_image: item.cover_image,
        logo_image: item.logo_image
      }));
      setData(formattedData);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const item = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('VendorDetail', { id: item.vendor.id })}
      style={{ marginLeft: 10, flex: 1 }}
    >
      <FastImage
        loadingIndicatorSource={require('../assets/edit.png')}
        source={{ uri: item.cover_image }}
        key={item.id}
        style={{ borderRadius: 20,  marginRight: 10, height: 200, marginTop: item.id === 0 ? 60 : 20, flex: 1 }}
      >
        <Icon
          onPress={() => console.log(item.id)}
          style={{ alignSelf: 'flex-end', margin: 10 }}
          name='heart'
          type="ionicon"
          color='white'
        />
        <LinearGradient
          colors={[
            'rgba(134, 214, 148, 0.0)', // Heavier at the bottom
            'rgba(134, 214, 148, 1.0)', // Fading in the middle
            'rgba(134, 214, 148, 1.0)'  // Lighter at the top
          ]}
          locations={[0, 0.5, 1]} // Adjust the gradient stops for smoothness
          style={{
            height: 60,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: 'center',
            paddingHorizontal: 20
          }}
        >
          <View style={{marginTop:10, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              borderRadius: 20,
              width: 27,
              height: 27,
              backgroundColor: theme.colors.card,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FastImage
                style={{ borderRadius: 20, height: 22, width: 22 }}
                source={{ uri: item.logo_image }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <Text
              style={{
                marginLeft: 5,
                fontFamily: FontFamily.sourceSansProSemibold, // Use your font
                fontSize: 12,
                color: 'white', maxWidth: 100,
              }}
              numberOfLines={1} // Ensure text is truncated to a single line
              ellipsizeMode="tail" //
            >
              {item.vendor.username}
            </Text>
          </View>
        </LinearGradient>
      </FastImage>
    </TouchableOpacity>
  );

  const Event = () => {
    if (user?.id) {
      return (
        loading ?
          <ActivityIndicator style={{ alignSelf: 'center', marginTop: '50%' }} size='small' /> :
          data.length === 0 ?
            <Emptyfav
              title={"No Favourites"}
              body={"You don't have any favourites yet"}
              top={85}
            /> :
            <MasonryList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={item}
              onRefresh={() => getFav()}
              onEndReachedThreshold={0.1}
            />
      );
    }
    return (
      <Emptyfav
        title={"No Favourites"}
        mt={10}
        col={'#BBB9BC'}
        body="Login or sign up to manage your upcoming and past appointments"
        showBtn={true}
      />
    );
  };

  return (
    <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 20 : 50 }}>
      <Text style={{ marginLeft: 30, fontFamily: 'SourceSansPro-Bold', fontSize: 26, color: theme.colors.lg }}>
        My Favs
      </Text>
      <Event />
    </View>
  );
};

export default Favourites;
