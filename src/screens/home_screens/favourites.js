import React ,{useMemo}from "react"
import { View,Text,Pressable,Image,ImageBackground,SafeAreaView } from "react-native"
import MasonryList from '@react-native-seoul/masonry-list';
import { styles ,colors} from "../../Common_styles";
import { FontFamily } from "../../GlobalStyles";
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from "@rneui/base";

const data= [
    {    
        id: 0,
        imgURL:
          'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
        text: 'Pioneer ',
      },
      {
        id: 1,
        imgURL:
          'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
        text: 'Precedant',
      },
      {
        id: 2,
        imgURL:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
        text: 'Leverette',
      },
      {
        id: 3,
        imgURL:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
        text: 'Briget',
      },
      {
        id: 4 ,
        imgURL:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
        text: 'Rivet',
      },
      {
        id: 5 ,
        imgURL:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
        text: 'Drew ',
      },
      
]
const Favourites=()=>{
    
    const Item = ({item}) => (
        <View style={{marginLeft:10 ,flex:1}}>
        <ImageBackground 
        imageStyle={{ borderRadius: 20}} source={{uri: item.imgURL}} key={item.id} style={[{marginRight:10,height:200,marginTop: item.id  == 0 ? 60 : 20,flex: 1}]}>
          <Icon 
          style={{alignSelf:'flex-end',margin:10}}
                      name='heart'
                      type="ionicon"
                      //onPress={() => setShowPassword(!showPassword)}
                      color='white'
                    />
           <LinearGradient
    colors={[
      'rgba(176, 235, 189,0.1)',
      'rgba(176, 235, 189,0.5)',
      'rgba(176, 235, 189,0.8)',
    ]}
    style={{ height:60, position:'relative',top:95,borderBottomLeftRadius:20, borderBottomRightRadius:20, justifyContent: 'center'}}>
      <View style={{display:'flex',flexDirection:'row',marginLeft:20}}>
      <View style={{  borderRadius: 20,width:27, height: 27,
         backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
      <Image
        source={{uri: item.imgURL}}
        style={{
          
          borderRadius: 20,
          height: 22,
          width:22,
          
        }}
        resizeMode="cover"
      />
      </View>
      <Text
        style={{
          margin:5,
        fontFamily:FontFamily.sourceSansProSemibold,
        fontSize:12,
        color:'white'
        }}
      >
        {item.text}
      </Text>
      </View>
    </LinearGradient>
      
    </ImageBackground>
    </View>
      );


    return(
      <SafeAreaView style={{flex:1}}>
        <Text style={{marginLeft:30,fontFamily:FontFamily.sourceSansProBold,fontSize:26,color:'#86D694'}}>My Fav</Text>
<MasonryList
  data={data}
  keyExtractor={(item)=> item.id}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={({item}) => <Item item={item} style={{}}  />}
  //refreshing={isLoadingNext}
  onRefresh={() => refetch({first: ITEM_CNT})}
  onEndReachedThreshold={0.1}
  //onEndReached={() => loadNext(ITEM_CNT)}
/>
</SafeAreaView>
    )
}

export default Favourites