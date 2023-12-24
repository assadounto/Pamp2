import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, ScrollView,StyleSheet,Image ,Pressable,FlatList,SafeAreaView,Dimensions, Modal,Share, Alert} from 'react-native'
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
import { setbooking,setVendor,set_staff,setvendorimg, setBooking } from '../../redux/booking'
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
import { da } from 'date-fns/locale'
import { setVPM } from '../../redux/user'
import SvgUri from 'react-native-svg-uri';
import { useFocusEffect } from '@react-navigation/native';

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;
const windowHeight = Dimensions.get('window').height;
const swiperHeight = windowHeight * 0.5; // Set the swiper height to 50% of the window height

const VendorDetail = ({navigation,route}) => {
  const user = useSelector((state)=>state.user.userInfo)
  const location = useSelector((state)=>state.user.location)
  const [fav,setFav]=useState(false)
  const {id,datas}= route?route.params:{}
  const [data1,setdata]=useState()
  const [modal,setModal]=useState(false)
  const [checkedState, setCheckedState] = useState(
   
  );
 
  //data &&setCheckedState(data)
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

    console.log(location);

    // Return the summary
    return summary;
  }




  const handleShare = () => {
    Share.share({
      message: `Check this vendor out… 👀: ${backendURL}/home/show/${data1.id}`,
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared with activity type of result.activityType
          } else {
            // Shared
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  
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
  console.log()

 
  
  ///const {data,isLoading}=useFetchVendorQuery(id)
   useEffect(()=>{
    
   async  function get(){
        const{ data }=await axios.get(`${backendURL}/details?id=${id}&user_id=${user.id}&lat=${location.lat}&lon=${location.lon}`)
        
        
         data && console.log(data.distance,'klllll')
          setFav(data.favorited)
          dispatch(setVPM(data.payment_method))
          dispatch(setvendorname(data.username))
          dispatch(setvendorid(data.id))
          dispatch(setvendorimg(data.avatar_url))
          dispatch(setVendor(data.opening_hours))
          dispatch(set_staff(staff))
          setdata(
            { 
              payment_method: data.payment_method,
              images: [data.cover_url,...data.other_images_urls],
              id: data.id,
              image: data.cover_url,
              logo: data.avatar_url,
              name:data.username,
              lon: data.lon,
              lat: data.lat,
              location: data.name,
              dist: data.distance,
              badge: data.badge,
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
              sum_rating: generateRatingsSummary(data.ratings),
              ratings:data.ratings,
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
        dist:  data.distance,
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
            list:[],
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

  

  const dispatch = useDispatch()
  const [staff,setStaff]= useState('');
  

  const handleBookingSubmit = () => {
    // Check if any service is selected
    const isAnyServiceSelected = checkedState.topping2.some(category =>
      category.items.some(item => item.check)
    );
  
    if (!isAnyServiceSelected) {
      // If no service is selected, show an alert or handle it in a way that suits your UI
      Alert.alert('No Service Selected', 'Please select at least one service before submitting.');
      return;
    }
  
    // Dispatch set_staff action
    dispatch(set_staff(staff));
  
    // Dispatch setBooking action
    dispatch(setBooking(JSON.stringify(checkedState)));
  
    // Navigate to the next screen
    navigation.navigate('SelectDate', { id: id, rebooked: false });
  };
    const all= [];



    const [total, setTotal] = useState(0);
  //console.log(topping2.length)
  const handleOnChange = (position, categoryName) => {
    setCheckedState((prevState) => {
      const newState = { ...prevState };
      const categoryIndex = newState.topping2.findIndex((category) => category.name === categoryName);
  
      if (categoryIndex !== -1) {
        const itemIndex = newState.topping2[categoryIndex].items.findIndex((item) => item.id === position);
  
        if (itemIndex !== -1) {
          newState.topping2[categoryIndex].items[itemIndex].check = !newState.topping2[categoryIndex].items[itemIndex].check;
  
          // Update total, time, services, etc.
          if (newState.topping2[categoryIndex].items[itemIndex].check) {
            newState.topping2[categoryIndex].total += newState.topping2[categoryIndex].items[itemIndex].price;
            newState.topping2[categoryIndex].time += newState.topping2[categoryIndex].items[itemIndex].time;
            newState.topping2[categoryIndex].services += 1;
            newState.topping2[categoryIndex].list= [...newState.topping2[categoryIndex].list,newState.topping2[categoryIndex].items[itemIndex].name2];
            newState.topping2[categoryIndex].items_name = modifyItemList(newState.topping2[categoryIndex].list, newState.topping2[categoryIndex].items[itemIndex].name2, true);
            console.log(newState.topping2[categoryIndex].items[itemIndex].name2,'list',newState.topping2[categoryIndex].list)
          } else {
            newState.topping2[categoryIndex].total -= newState.topping2[categoryIndex].items[itemIndex].price;
            newState.topping2[categoryIndex].time -= newState.topping2[categoryIndex].items[itemIndex].time;
            newState.topping2[categoryIndex].services -= 1;
            newState.topping2[categoryIndex].items_name = modifyItemList(newState.topping2[categoryIndex].list, newState.topping2[categoryIndex].items[itemIndex].name2, false);
          }
        }
      }
  
      return newState;
    });
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
          name={fav?'heart': 'heart-outline'}
          type='ionicon'
          size={30}
          
          color={'#FFFFFF'} />
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
            <Pressable onPressIn={()=>navigation.navigate('Reviews',{data: data1.ratings})} style={{
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
  <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:20,color:colors.dg.color}}>
    {data1.sum_rating?.average_rating==0?'0.0': data1.sum_rating.average_rating}
  </Text>
</Pressable>

      <View style={{ position: 'relative', marginTop: -10, marginBottom: 80, }}>
        <View style={{left:20, display: 'flex', flexDirection: 'row' }}>
          <Text style={{ marginBottom: 15, fontFamily: FontFamily.sourceSansProBold, fontSize: 24, fontWeight: 'bold', color: colors.dg.color }}>{data1.name}</Text>
         
      {
        data1.badge?<View style={{marginTop:8,marginLeft:5}}>
        <SvgUri
        
        source={require('../../../assets/svgs/verified.svg')}/>
        </View>: <Fragment/>
      }  
       <TouchableOpacity onPress={()=>setModal(true)} style={{paddingHorizontal:5,marginLeft:5, marginTop:7, height:20,backgroundColor:checkVendorStatus(data1.hours) == 'Open'? '#86D694': '#CD3D49',borderRadius:20}}>{checkVendorStatus(data1.hours) === 'Open' ? (
                    <Text style={{marginHorizontal:5,color:'white'}} >open</Text>
                  ) : (
                    <Text style={{color: 'white',marginHorizontal:5,fontFamily:FontFamily.sourceSansProSemibold }}>closed</Text>
        )}</TouchableOpacity>
         <View style={{position:'absolute', top:0,right:60} }>

         <Icon 
         onPress={handleShare}
         name='paper-plane-outline' 
         type='ionicon' 
         color={'#00463C'} 
          />
         </View>
        </View>

        <View style={{ left:20, display: 'flex', flexDirection: 'row' }}>
          {data1.tops.map((item) => {
            return (

              <Pressable
              key={item.id}
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
                >
                <Text style={[styles.option, colors.dg]}> {item.value}</Text>
              </Pressable>

            )
          })}
        </View>
        <Text style={{left:20, fontFamily: FontFamily.sourceSansProRegular, fontSize: 18, color: '#00463C', marginBottom: 15 }}> {data1.location}</Text>
        <View style={{left:20, display: 'flex', flexDirection: 'row' }}>
          <Icon name='map-pin' type='feather' color={colors.lg.color} />
          <Text style={{ color: colors.lg.color, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16 }}> {parseInt(data1.dist/1000)}km - <Text onPress={() => navigation.navigate('Mapview', {
           data: data1
          })} style={{ color: colors.dg2.color }}>Show on map</Text></Text>
        </View>
        <Text style={{left:20, fontFamily: FontFamily.sourceSansProRegular, color:colors.dg.color, fontSize: 15, marginBottom: 20, marginTop: 20,paddingRight:60 }}> {data1.desc}</Text>
        <Text style={{left:20, fontFamily: FontFamily.sourceSansProBold, fontSize: 18, color: '#00463C', marginBottom: 15 }}> Services</Text>
        {checkedState.topping2.map(({ name, items, total, time, services, items_name }, index) => {
          return (
            <View    key={name} style={[styles.t6, {width:'100%',borderBottomColor: colors.lg.color, borderBottomWidth: 1, marginBottom: 20 ,left:20 }]}>
              <View style={{left:-15}}>
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
                    <Text style={[colors.dg, {fontFamily: FontFamily.sourceSansProBold, fontSize:19,top:-9, marginLeft: 'auto',right:20 }]}>
                      {'\u20B5'} {total}
                    </Text>}
                </>}
                uncheckedIcon={<Image
                  resizeMode='contain'
                  style={{width:30,height:30}}
                    source={require('../../../assets/rectangle1063.png')}
                     />}
                checkedIcon={
                  <Image
                  style={{width:30,height:30}}
                  resizeMode='contain'
                    source={require('../../../assets/group2210.png')}
                     />
                }
                checked={parentState[index]}
                onPress={() => handleOnChange2(index)} />
                </View>
              {parentState[index] === true && items.map(({ name2, time, id, price, check }, _index2) => {
                return (
                  <View   key={id} style={{ marginLeft: 30}}>
                    <CheckBox
                      key={id}
                      title={<>
                      <Text  numberOfLines={2} ellipsizeMode="tail" style={[colors.dg, {  marginLeft: 10 }]}>
                        {name2}
                      </Text>



                        <Text style={[{ fontSize: 10, color: '#BBB9BC' ,}]}>
                          {' '}{convertMinutesToHoursAndMinutes(time)}
                        </Text>
                        <Text style={[colors.dg, {fontFamily: FontFamily.sourceSansProBold,right:40,  marginLeft: 'auto' }]}>
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
      {data1.staff.length!=0 &&<><Text style={{ left: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 26, color: colors.dg.color }}>Book with staff</Text><Text style={{ left: 20, color: '#BBB9BC', marginBottom: 20 }}>optional</Text><View style={{ marginLeft: '3%', marginBottom: 30 }}>
          <Staff data={data1.staff} onSelect={(value) => setStaff(value)} />
        </View></>}
      </View>


    </ScrollView>
    <Opening   key={data1.id} data={data1.hours} modal={modal} setModal={setModal}/>
    <View style={{ position: 'absolute', top: '90%', alignSelf: 'center', backgroundColor: '#ffff',height:200, width: '100%', marginBottom: 0 }}>
        <Button
         titleStyle={{fontFamily:FontFamily.sourceSansProBold}}
          title={'Book'}
          // containerStyle={}
          buttonStyle={{
            width: 184,
            height: 54,
            //margin: 'auto',
            marginBottom: 20,
            marginTop: 10,
            alignSelf: 'center',
            borderRadius: 25,
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
