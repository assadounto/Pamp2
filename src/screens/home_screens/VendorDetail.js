import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView,StyleSheet,Image ,Pressable,FlatList,SafeAreaView,Dimensions, Modal} from 'react-native'
import LikkleSalonContainer from '../../../components/LikkleSalonContainer'
import { Icon,Input ,Button,CheckBox} from '@rneui/base'
import { colors } from '../../Common_styles'
import { FontFamily } from '../../GlobalStyles'
import { styles } from '../../Common_styles'
import RadioButton from '../../../components/RadioButton'
import { FontSize } from '../../../GlobalStyles'
import Staff from '../../../components/Staff'
import { ImageBackground } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { useDispatch,useSelector } from 'react-redux'
import { setbooking,setVendor,set_staff,setvendorimg } from '../../redux/booking'
import { convertMinutesToHoursAndMinutes ,modifyItemList} from '../../Functions'
import { useFetchVendorQuery } from '../../redux/authapi'
import { setvendorname,setvendorid } from '../../redux/booking'
import axios from 'axios'
import FastImage from 'react-native-fast-image'
import { backendURL } from '../../services/http'
import Opening from '../../../components/Openning'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Blur from '../start_screens/Blur'
import Loading from '../../../components/loading'
import { checkVendorStatus } from '../../Functions'
import { use } from '../../redux/homeapi'
import CustomImageSlider from '../../../components/CustomSlider'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
const getFormattedPrice = (price) => `$${price.toFixed(2)}`;
const windowHeight = Dimensions.get('window').height;
const swiperHeight = windowHeight * 0.5; // Set the swiper height to 50% of the window height

const VendorDetail = ({navigation,route}) => {
  const user = useSelector((state)=>state.user.userInfo)
  const [fav,setFav]=useState(false)
  const {id}= route.params
  const [data1,setdata]=useState()
  const [modal,setModal]=useState(false)
  const [checkedState, setCheckedState] = useState(
  
  );

   const checkVendorStatus = (openingHours) => {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
  
    const vendor = openingHours.find((item) => item.day === currentDay.split(',')[0]);
  console.log(vendor,currentDay)
    if (!vendor || !vendor.opening_time || !vendor.closing_time || !vendor.opened) {
      return 'Closed';
    }
  
  
    const openingHour = parseInt(vendor.opening_time.split(':')[0]);
    const openingMinute = parseInt(vendor.opening_time.split(':')[1]);
    const closingHour = parseInt(vendor.closing_time.split(':')[0]);
    const closingMinute = parseInt(vendor.closing_time.split(':')[1]);
  
    if (currentDay === 'Saturday' || currentDay === 'Sunday') {
      return 'Open';
    }
  
    if (
      currentHour > openingHour &&
      currentHour < closingHour
    ) {
      return 'Open';
    } else if (
      currentHour === openingHour &&
      currentMinute >= openingMinute
    ) {
      return 'Open';
    } else if (
      currentHour === closingHour &&
      currentMinute <= closingMinute
    ) {
      return 'Open';
    } else {
      return 'Closed';
    }
  };
  


  const createFav=async()=>{
    try {
     const {data}= await axios.post(`${backendURL}/favorites`,{vendor_id: id,user_id:user.id})
     data.message=='added'? setFav(true): setFav(false)
    }
    catch(e){
      console.log(e)
    }
  }

  const[itemList,setitem]=useState([])
  const [parentState, setparentState] = useState(
   
  );
  ///const {data,isLoading}=useFetchVendorQuery(id)
   useEffect(()=>{
   async  function get(){
        const{ data }=await axios.get(`${backendURL}/details?id=${id}&user_id=${user.id}`)
        
        
         data && console.log(data,'k')
          setFav(data.favorited)
          setdata(
            {
              images: [data.cover_url,...data.other_images_urls],
              id: data.id,
              image: data.cover_url,
              logo: data.avatar_url,
              name:data.username,
              lon: data.lon,
              lat: data.lat,
              location: data.name,
              dist: '4km',
              items: data.top_services.split(",").map((item)=>{
             return {
                value: item
              }
            }
              ),
              staff:data.staff,
        
              tops:data.top_services.split(",").map((item)=>{
                return {
                   value: item
                 }
               })   ,
              topping2:data.service_categories.map((cat)=>{
                return {
                  id: cat.id,
                  name:cat.name,
                  total:0,
                  time:0,
                  services:0,
                  items_name:'',
                  items: cat.services.map((service)=>{
                    return {
                      id: service.id,
                      name2: service.name,
                      time: service.time,
                      appointment_color: service.appointment_color,
                      price: service.price,
                    }
                  })
                }
              })
             
              ,
              rating: '4.5',
              desc: data.description,
              hours: data.opening_hours
            }
          
          )
       setparentState( new Array(data.service_categories.length).fill(false))
       setCheckedState({
        images: [data.cover_url],
        id: data.id,
        image: data.cover_url,
        logo: data.avatar_url,
        name:data.username,
        rating:'',
        location: data.name,
        dist: '',
        items: data.top_services.split(",").map((item)=>{
       return {
          value: item
        }
      }
        ),
        staff:data.staff,
  
        tops:data.top_services.split(",").map((item)=>{
          return {
             value: item
           }
         })   ,
        topping2:data.service_categories.map((cat)=>{
          return {
            id: cat.id,
            name:cat.name,
            appointment_color:cat.appointment_color,
            total:0,
            time:0,
            services:0,
            items_name:'',
            items: cat.services.map((service)=>{
              return {
                id: service.id,
                name2: service.name,
                time: service.time,
                appointment_color: service.appointment_color,
                price: service.price,
              }
            })
          }
        })
       
        ,
        rating: '4.5',
        desc: 'We are at you services. We give you the best of services you can think of',
      }
    )
          }
      
          get()
   
    },[])
  
  
   const[maps,setMaps]=useState({
    
   })
 

  
   
  
  console.log(id)
  const dispatch = useDispatch()
  const [staff,setStaff]= useState('');
  

    const handleBookingSubmit=()=>{
      dispatch(setbooking(checkedState))
      console.log(checkedState)
      dispatch(setvendorname(data1.name))
      dispatch(setvendorid(data1.id))
      dispatch(setvendorimg(data1.logo))
      dispatch(setVendor(data1.hours))
      dispatch(set_staff(staff))
    navigation.navigate('SelectDate',{id: id,rebooked: false})
    }
    const all= [];



    const [total, setTotal] = useState(0);
  //console.log(topping2.length)
  const handleOnChange = (position, categoryName) => {
    const updatedCheckedState = { ...checkedState };
    const categoryIndex = updatedCheckedState.topping2.findIndex((category) => category.name === categoryName);
    
    if (categoryIndex !== -1) {
      const itemIndex = updatedCheckedState.topping2[categoryIndex].items.findIndex((item) => item.id === position);
      
      if (itemIndex !== -1) {
        const isChecked = updatedCheckedState.topping2[categoryIndex].items[itemIndex].check;
        
        updatedCheckedState.topping2[categoryIndex].items[itemIndex].check = !isChecked;
        
        if (isChecked) {
          // Item is unchecked, update the total, time, and services
          updatedCheckedState.topping2[categoryIndex].total -= updatedCheckedState.topping2[categoryIndex].items[itemIndex].price;
          updatedCheckedState.topping2[categoryIndex].time -= updatedCheckedState.topping2[categoryIndex].items[itemIndex].time;
          updatedCheckedState.topping2[categoryIndex].services -= 1;
          updatedCheckedState.topping2[categoryIndex].items_name = modifyItemList(itemList, updatedCheckedState.topping2[categoryIndex].items[itemIndex].name2, false);
        } else {
          // Item is checked, update the total, time, and services
          updatedCheckedState.topping2[categoryIndex].total += updatedCheckedState.topping2[categoryIndex].items[itemIndex].price;
          updatedCheckedState.topping2[categoryIndex].time += updatedCheckedState.topping2[categoryIndex].items[itemIndex].time;
          updatedCheckedState.topping2[categoryIndex].services += 1;
          updatedCheckedState.topping2[categoryIndex].items_name = modifyItemList(itemList, updatedCheckedState.topping2[categoryIndex].items[itemIndex].name2, true);
        }
        
        setCheckedState(updatedCheckedState);
      }
    }
  };
  
  
    const handleOnChange2 = (position) => {
      const updatedCheckedState = parentState.map((item, index) =>
        index === position ? !item : item
      );
    
      
      setparentState(updatedCheckedState);
  
    }
  return (

  
    
    <>{checkedState? <><ScrollView showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      containerStyle={{
        backgroundColor: colors.w.color,
        // flex:1
      }}
    >
<CustomImageSlider images={data1.images} border={true}/>
    
      <View style={{ position: 'absolute', top: 60, right: 30 }}>
        <Icon
        onPress={createFav}
          name='heart'
          type='ionicon'
          size={30}
          
          color={fav ?colors.lg.color: '#FFFFFF'} />
      </View>
      <View style={{ position: 'absolute', top: 60, left: 20 }}>
        <Icon
          name='chevron-back-outline'
          type='ionicon'
          size={30}
          onPress={()=>navigation.goBack()}
          color={'#FFFFFF'} />
      </View>


      <View 
  style={{
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    width: 80,
    height: 79,
    position: 'relative',
    top: -40,
    left: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  }}
        >
          <FastImage
                         style={{borderRadius: 50, width: 70, height: 69, }} 
  
            source={{
              uri: data1.logo,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover} />
            </View>
            <View style={{
  width: 60, 
  position: 'absolute', 
  right: 30, 
  top: swiperHeight-20, /* Changed from top: 400 to top: '50%' */
  backgroundColor: 'white', 
  display: 'flex', 
  flexDirection: 'row', 
  width: 74, 
  height: 44, 
  alignItems: 'center', 
  borderRadius: 40, 
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.30,
  shadowRadius: 3.84,
  elevation: 8,
  justifyContent: 'center'
}}>
  <Icon
    name='star'
    type='ionicons'
    color={colors.lg.color} />
  <Text>
    {data1.rating}
  </Text>
</View>

      <View style={{ position: 'relative', marginTop: -40, marginBottom: 80, padding: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ marginBottom: 15, fontFamily: FontFamily.sourceSansProBold, fontSize: 24, fontWeight: 'bold', color: colors.dg.color }}>{data1.name}</Text>
          <TouchableOpacity onPress={()=>setModal(true)} style={{paddingHorizontal:5,marginLeft:5, marginTop:5, height:20,backgroundColor:checkVendorStatus(data1.hours) == 'Open'? colors.lg.color : 'red',borderRadius:20}}>{checkVendorStatus(data1.hours) === 'Open' ? (
                    <Text style={{marginHorizontal:5}} >open</Text>
                  ) : (
                    <Text style={{color: 'white',marginHorizontal:5,fontFamily:FontFamily.sourceSansProSemibold }}>closed</Text>
                  )}</TouchableOpacity>
         <View style={{position:'absolute', top:0,right:30} }>

         <Icon 
         name='share-2' 
         type='feather' 
         color={'00463C'} 
          />
         </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {data1.tops.map((item) => {
            return (

              <Pressable
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  height: 30,
                  padding: 5,
                  paddingHorizontal:17,
                  marginBottom: 15,
                  borderColor: '#B0EBBD',
                  borderWidth: 1,
                  marginRight: 10
                }}
                onPress={() => selectHandler(item.value)}>
                <Text style={[styles.option, colors.dg]}> {item.value}</Text>
              </Pressable>

            )
          })}
        </View>
        <Text style={{ fontFamily: FontFamily.sourceSansProRegular, fontSize: 18, color: '#00463C', marginBottom: 15 }}> {data1.location}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Icon name='location-outline' type='ionicon' color={colors.lg.color} />
          <Text style={{ color: colors.lg.color, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16 }}> {data1.dist} - <Text onPress={() => console.log(navigation.navigate('Mapview', {
           data: data1
          }))} style={{ color: colors.dg2.color }}>Show on map</Text></Text>
        </View>
        <Text style={{ fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, marginBottom: 20, marginTop: 20 }}> {data1.desc}</Text>
        <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 18, color: '#00463C', marginBottom: 15 }}> Services</Text>
        {checkedState.topping2.map(({ name, items, total, time, services, items_name }, index) => {
          return (
            <View style={[styles.t6, { borderBottomColor: colors.lg.color, borderBottomWidth: 1, marginBottom: 20 }]}>
              <CheckBox
                title={<>
                  <View><Text style={[colors.dg, {marginTop:0,fontFamily: FontFamily.sourceSansProBold, fontSize:18, marginLeft: 10 }]}>
                    {name}
                  </Text>
                    {time != 0 &&
                      <Text style={[colors.dg, { marginLeft: 10, fontFamily: FontFamily.sourceSansProRegular, fontSize: 12, color: '#BBB9BC' }]}>
                        {convertMinutesToHoursAndMinutes(time)}-{services} service
                      </Text>}
                  </View>
                  {total > 0 &&
                    <Text style={[colors.dg, {fontFamily: FontFamily.sourceSansProBold, fontSize:19,top:-9, marginLeft: 'auto' }]}>
                      {'\u20B5'} {total}
                    </Text>}
                </>}
                uncheckedIcon={<Image
                  resizeMode='contain'
                  style={{width:33,height:33}}
                    source={require('../../../assets/rectangle1063.png')}
                     />}
                checkedIcon={
                  <Image
                  style={{width:33,height:33}}
                  resizeMode='contain'
                    source={require('../../../assets/group2210.png')}
                     />
                }
                checked={parentState[index]}
                onPress={() => handleOnChange2(index)} />
              {parentState[index] === true && items.map(({ name2, time, id, price, check }, _index2) => {
                return (
                  <View style={{ marginLeft: 30 }}>
                    <CheckBox
                      title={<>


                      <Text  numberOfLines={2} ellipsizeMode="tail" style={[colors.dg, {  marginLeft: 10 }]}>
                        {name2}
                      </Text>



                        <Text style={[{ fontSize: 10, color: '#BBB9BC' }]}>
                          {' '} {convertMinutesToHoursAndMinutes(time)}
                        </Text>
                        <Text style={[colors.dg, {fontFamily: FontFamily.sourceSansProBold,  marginLeft: 'auto' }]}>
                          {'\u20B5'} {price}
                        </Text></>}
                      checkedIcon={<View style={[{ backgroundColor: colors.lg.color, width: 15, height: 15, borderRadius: 5 }]}>

                      </View>}
                      uncheckedIcon={<View style={[{ width: 15, height: 15, borderRadius: 5, borderColor: colors.lg.color, borderWidth: 1 }]}>

                      </View>}
                      checked={check}
                      onPress={() => handleOnChange(id, name)} />
                  </View>
                )
              })}
            </View>
          )
        })}
        <Text style={{ marginTop: 30, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 26, color: colors.dg.color }}>Book with staff</Text>
        <Text style={{ color: '#BBB9BC', marginBottom: 20 }}>optional</Text>
        <Staff data={data1.staff} onSelect={(value) => setStaff(value)} />
      </View>


    </ScrollView>
    <Opening data={data1.hours} modal={modal} setModal={setModal}/>
    <View style={{ position: 'absolute', top: '90%', alignSelf: 'center', backgroundColor: '#ffff',height:200, width: '100%', marginBottom: 0 }}>
        <Button
          title={'Book'}
          // containerStyle={}
          buttonStyle={{
            width: 184,
            height: 54,
            //margin: 'auto',
            marginBottom: 20,
            marginTop: 10,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: colors.dg2.color,
            shadowColor: colors.dg2.color, shadowOpacity: 0., shadowRadius: 5, shadowOffset: { width: 5, height: 0 }
          }}
          onPress={handleBookingSubmit} />
      </View> 
     {modal && <Blur/>}
      </>:<Loading/>}</>


  )
}

const styles2= StyleSheet.create({
  cont:{
    height:430,
    width: '100%',
    alignSelf: 'center',

  }

})
export default VendorDetail 
