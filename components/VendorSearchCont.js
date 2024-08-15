import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import { Icon, Input } from '@rneui/base'
import { FontFamily } from '../GlobalStyles'
import { View, Text, ScrollView, StyleSheet, Image, Pressable, FlatList, Alert, ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image'
import { styles, colors } from '../src/Common_styles'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Emptyfav from './EmptyFav'
import { backendURL } from '../src/services/http'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ImageCont from './Image'
import SvgUri from 'react-native-svg-uri';
import { useDispatch } from 'react-redux'
import { setRecentvendors } from '../src/redux/user'

import VerifiedIcon from './icons/Verified';

import HomeIcon from './icons/Home';
import Home2Icon from './icons/Home2';
import MoneyIcon from './icons/money';
import MoneyBag from './icons/Moneybag';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingSkeleton from './LoadingSketon';
const Tab = createMaterialTopTabNavigator();

const VendorSearchCon = ({total_entry, loadmore,loading, datas, notext, navigation, category }) => {

  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const postVendorUserId = async (vendorId,dist) => {
    dispatch(setRecentvendors(vendorId))
    navigation.navigate('VendorDetail',
      {
        id: vendorId,
        dist
      }
    )
    try {
      const response = await axios.post(
        `${backendURL}/views`,
        {
          vendor_id: vendorId,
          user_id: 20,
        }
      );
     
      // Handle the response as needed (e.g., show a success message)
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error:', error);
      throw error;
    }
  };


  function generateRatingsSummary(ratings) {

    // Initial template
    let summary = {
      total_ratings: ratings.length,
      ratings: {
        "5": 0,
        "4": 0,
        "3": 0,
        "2": 0,
        "1": 0,
      },
      average_rating: 0.0,
    };

    // Iterate through ratings to populate the summary
    let totalScore = 0;
    for (let i = 0; i < ratings.length; i++) {
      let ratingValue = ratings[i].rating.toString();
      if (summary.ratings[ratingValue] !== undefined) {
        summary.ratings[ratingValue] += 1;
        totalScore += ratings[i].rating;
      }
    }

    // Calculate average rating
    if (ratings.length !== 0) {
      summary.average_rating = parseFloat(
        (totalScore / ratings.length).toFixed(2)
      );
    }



    // Return the summary
    return summary;
  }

  const Item = ({ image, badge, logo, name, items, location, dist, id, ratings, home, cover_thumbnail,avatar_thumbnail }) => (
    <TouchableOpacity key={id} onPress={() => postVendorUserId(id, dist)} style={[styles.cont, {
      shadowColor: '#707070',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 2,
      shadowOffset: { width: 5, height: 0 }, marginTop: 10, marginBottom: 10
    }]}>
      
        <ImageCont  show={true} uri={image} styles={{ alignSelf: 'center', width: '100%', height: 200, borderRadius: 20 }} />

    

      <View
        style={{
       
          borderRadius: 50,
          backgroundColor: theme.colors.ring,
          width: 49,
          height: 49,
          position: 'relative',
          top: -30,
          left: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          alignItems:'center',
          justifyContent:'center',
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 4,
        }}
      >
        <ImageCont  uri={logo} 
        smallStyle={{ }} styles={{
      borderRadius: 50, width: 43, height: 43, }} />

      </View>


      <View style={{
        position: 'absolute', right: 30, top: 200, backgroundColor: theme.colors.ring, display: 'flex', flexDirection: 'row', width: 64, height: 34, alignItems: 'center',justifyContent:'center', borderRadius: 40, shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.84,

        elevation: 8,
        justifyContent: 'center',
        gap: 5
      }}>
        <Icon
          name='star'
          type='ionicons'
          size={15}
          color={theme.colors.lg
          }
        />
        <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, color: theme.colors.dg, fontSize: 14 }}>
          {ratings.average_rating == 0 ? '0.0' : ratings.average_rating}
        </Text>
      </View>
      <View style={{ position: 'relative', top: -20 }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row',gap:5, marginBottom: 15, }}>
          <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 24, fontWeight: 'bold', color: theme.colors.dg }}>{name}
          </Text>
          {
            badge && <VerifiedIcon color={theme.colors.lg} />
          }
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ display: 'flex',alignItems:'center',justifyContent:'center', flexDirection: 'row' }}>
          {items?.map((item) => {
            return (

              <Pressable
                style={
                  {
                    backgroundColor: theme.colors.card,
                    borderRadius: 15,
                    height: 33,
                    padding: 8,
                    marginBottom: 15,
                    paddingHorizontal: 16,
                    borderColor: theme.colors.tabColor,
                    borderWidth: 1,
                    marginRight: 10
                  }
                }
              >
                <Text style={[styles.option, {fontSize:13, color: theme.colors.dg }]}>{item.value}</Text>
              </Pressable>
            );
          
          })}
        {home&&!datas&& <View style={{marginTop:-20}}>
            <Home2Icon />
          </View> }
        </ScrollView>
        {/* <Text style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:18,color:'#00463C',marginBottom:15}}> {location}</Text> */}
        <View style={{ display: 'flex',alignItems:'center', flexDirection: 'row' }}>
          <Icon name='map-pin' type='feather'  size={15} color={theme.colors.lg} />
          <Text style={{ color: theme.colors.lg, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 15 }}> {parseInt(dist)} m. from you</Text>
        </View>

      </View>
    </TouchableOpacity>
  );

  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <>
     
        <>
        {
          !notext && (
            <>
              {loading && datas.length === 0 ? (
                <Text
                  style={{
                    fontFamily: FontFamily.sourceSansProSemibold,
                    fontSize: 22,
                    color: theme.colors.dg,
                    marginLeft: 40,
                    marginTop: 20,
                    fontWeight: 'bold',
                  }}
                >
                  Searching for {category}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: FontFamily.sourceSansProSemibold,
                    fontSize: 22,
                    color: theme.colors.dg,
                    marginLeft: 40,
                    marginTop: 20,
                    fontWeight: 'bold',
                  }}
                >
                  {total_entry} {total_entry > 1 ? 'results' : 'result'} found for {category}
                </Text>
              )}
            </>
          )
        }

          {loading && datas.length==0  ?<LoadingSkeleton/>: <FlatList
          contentContainerStyle={{paddingBottom:250}}
            data={datas}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadmore}
          ListEmptyComponent={<Emptyfav
            col={'#BBB9BC'}
            body={`Could not find anything relating to ${category || 'the search yet'}. Please try adjusting search filters or location`}
            top={50}
          />}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator style={{marginTop:20}} size='large' color={theme.colors.lg} /> : null}
            renderItem={({ item }) => (
              <Item
              item={item}
                  home={item.home}
                ratings={generateRatingsSummary(item.ratings)}
                name={item.name} id={item.id} badge={item.badge} dist={item.dist} logo={item.logo} items={item.items} cover_thumbnail={item.cover_thumbnail} avatar_thumbnail={item.avatar_thumbnail}  image={item.image} />
            )}
           />}</> 
    </>
  )
}

export default VendorSearchCon

const useStyles = makeStyles((theme) => ({
  cont: {
    height: 400,
    backgroundColor: theme.colors.card,
    padding: 20,
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 20
  }

}))