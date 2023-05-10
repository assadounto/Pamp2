import React from 'react';
import {Text, View, SafeAreaView, Image, Modal, TextInput,StyleSheet,Pressable} from 'react-native';
import MapView,{ PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import mark from '../assets/m.png'
import { Icon } from '@rneui/base';
const Mapview = ({route,navigation}) => {
  const {name,dist,rating,image} =route.params
  const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  return (
    <><MapView
      initialRegion={{
        latitude: 5.614818,
        longitude: -0.205874,
        latitudeDelta: 0.00122,
        longitudeDelta: 0.00121,
      }}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
    >


      <Marker
        coordinate={{ latitude: 5.614818, longitude: -0.205874 }}

        image={mark}
        >
        {/* <CustomMarker image={image}/> */}
      </Marker>
    </MapView>
      <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 60, left: 20 }}>
        <Icon

          name='chevron-back-outline'
          type='ionicon'
          size={30} />
      </Pressable></>
  );
};


// const CustomMarker=({image})=>{
//   return(
//     <View style={{ opacity:100,
//        backgroundColor:'#00000029',width:318,height:130,borderRadius:20,display:'flex',flexDirection:'row'}}> 
//       <Image style ={{resizeMode: 'contain' ,height:110,width:110}} source={require('../../../assets/rectangle-9091.png')}> 
     
//       </Image>
//       <View>
//       <Text>Likkle Salon</Text>
//        <Text>Airport Residential Road</Text>
//        <Text>Likkle Salon</Text>
//       </View>
       
//     </View>
//   )
// }

export default Mapview;
