import React, {Fragment} from 'react';
import {View, Text} from 'react-native-animatable';
import {Input, Icon} from '@rneui/base';
import {styles, colors} from '../../Common_styles';
import UHeader from '../../../components/UHeader';
import {useGetcategoriesQuery} from '../../redux/authapi';
import {Pressable, FlatList, Image, Platform} from 'react-native';
import RadioButton from '../../../components/RadioButton';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import { request, PERMISSIONS, RESULT, RESULTS } from "react-native-permissions";
import { FontFamily } from '../../GlobalStyles';
import img from '../../../assets/s.png'

const Home = ({navigation}) => {
  const [option, setOption] = React.useState('Popular');
const {data,isLoading,isSuccess} = useGetcategoriesQuery(option)

     console.log(data && data)
  function getUserLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
     console.log(position)
      },
      (error) => {
        console.log(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }
   
    
  React.useEffect(()=>{
    request(Platform.OS==='ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            "This feature is not available (on this device / in this context)"
          );
          break;
        case RESULTS.DENIED:
          console.log(
            "The permission has not been requested / is denied but requestable"
          );
          break;
        case RESULTS.LIMITED:
          console.log("The permission is limited: some actions are possible");
          break;
        case RESULTS.GRANTED:
          console.log("The permission is granted");
          // Permission has been granted - app can request location coordinates
          getUserLocation();
          break;
        case RESULTS.BLOCKED:
          console.log("The permission is denied and not requestable anymore");
          break;
      }
    });
  })

 
  // const data = useGetCategoriesQuery();
 
  const data2 = [
    { value: 'Popular' },
    { value: 'Recently viewed' },
    { value: 'Top Rated Hail salons' },
    {value: 'Top Rated Beauty Salons'},
    { value: 'Top Rated Spa' },
  ];

  const selectHandler=(value)=>{
     getlo()
    setOption(value)
    console.log(value)

  }
  const Item = ({title, id, source}) => (
    <Pressable onPress={()=>navigation.navigate('Searches1')} style={{borderRadius:20,marginTop:20,padding:10,backgroundColor:'white',width:'90%',alignSelf:'center',shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0}}} >
    <View >
      <View style={{backgroundColor: '#ffff',alignItems:'center'}}>
        <Image
          source={source}
          style={{width: '95%', height: 300, borderRadius: 20}}
        />
        
      </View>
    </View>
    <Text style={[colors.dg,{marginLeft:20,marginTop:10,fontFamily:FontFamily.sourceSansProSemibold,fontSize:24,marginBottom:10}]}>{title}</Text>
    </Pressable>
  );

  return (
    <View style={{backgroundColor: 'white'}}>
      <UHeader navigation={navigation}/>
      {/* <Input
        placeholder="Search for a service"
        inputContainerStyle={[styles.textInput, styles.tc,{width:344,height:63,paddingTop:8}]}
        leftIcon={<Icon name="search" type="feather" color={'#BCC4CC'} />}
        onFocus
        
        ={() => navigation.navigate('Search')}
      /> */}

<Image
          source={img}
          style={{width:344,height:63,paddingTop:8,alignSelf:'center',marginBottom:15}}
        />
      <RadioButton data={data2} onSelect={(value) => setOption(value) }/>
      <FlatList style={{marginBottom:300}}
        data={data}
        renderItem={({item}) => (
          <Item title={item.name} id={item.id}   source={ {uri: item.photo_url }}/>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Home;
