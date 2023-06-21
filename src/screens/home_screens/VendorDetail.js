import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView,StyleSheet,Image ,Pressable,FlatList,SafeAreaView} from 'react-native'
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
import { useDispatch } from 'react-redux'
import { setbooking } from '../../redux/booking'
import { use } from '../../redux/homeapi'
import { convertMinutesToHoursAndMinutes ,modifyItemList} from '../../Functions'

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

const VendorDetail = ({navigation}) => {
  const dispatch = useDispatch()
  const [staff,setStaff]= useState('');
  const data1 =
    {
      image: '../../../assets/rectangle-9764.png',
      logo:'../../../assets/group-1820.png',
      name:'Likke Salon',
      staff:[
        {name:'Giddi',
        photo:'../../../assets/group-1820.png'
       }, {name:'Rich',
       photo:'../../../assets/group-1820.png'
      }

      ],

      tops:[
        { value: 'Make up' },
      { value: 'Hair' },
      { value: 'Nails' },
      ],
      topping2: [
        {
          name: "Hair",
          total:0,
          time:0,
          services:0,
          items_name:'',
          items:[
            {
              id: 666,
              name2: "Haircut",
              price: 50,
              check:false,
              time: 60
            },
            {
              id: 1,
              name2: "Braids",
              price: 150,
              check:false,
              time: 90
            },
            {
              id: 2,
              name2: "Twist",
              price: 50,
              check:false,
              time: 90
            },
            {
              id: 4,
              name2: "Knotting",
              price: 50,
              check:false,
              time: 90
            },
          ]
        },
        {
          
          name: "Nails",
          total:0,
          time:0,
          services:0,
          items_name:'',
          items: [
            {
              id: 3,
              name2: "Capsicum",
              price: 1.2,
              check:false,
              time: 60
            },
            {
              id: 4,
              name2: "Paneer",
              price: 2.0,
              check:false,
              time: 60
            },
            {
              id: 5,
              name2: "Red Paprika",
              price: 2.5,
              check:false,
              time: 60
            },
          ]
        }
      ]
      ,
      rating: '4.5',
      location:'Nestle Road',
      dist: '2000m from you',
      desc: 'We are at you services. We give you the best of services you can think of',
    }
  

    const handleBookingSubmit=()=>{
      dispatch(setbooking(checkedState))
      console.log(checkedState)
    navigation.navigate('SelectDate')
    }
    const all= [];


data1.topping2.map((item)=> { 
 return item.items.map((item2)=>{
 return  all.push(item2)
  })
})
    const [checkedState, setCheckedState] = useState(
      data1
    );
    const[itemList,setitem]=useState([])
    const [parentState, setparentState] = useState(
      new Array(data1.topping2.length).fill(false)
    );
    const [total, setTotal] = useState(0);
  //console.log(topping2.length)
    const handleOnChange = (position,name) => {
      const found = checkedState.topping2.findIndex(element=> element.name == name);
      console.log('name',found)
      console.log('pos',position)
      const new_obj={...checkedState}
   
      // const updatedCheckedState = checkedState.topping2[found].items.map((item, index) =>
      //   index === position ? {...item, check: !item.check} : item.check
      
      // );

      const object = checkedState.topping2[found].items.findIndex(element=>element.id === position)
      
      new_obj.topping2[found].items[object]= {...new_obj.topping2[found].items[object],check: !new_obj.topping2[found].items[object].check}
      if (new_obj.topping2[found].items[object].check){
      new_obj.topping2[found].total+=new_obj.topping2[found].items[object].price
      new_obj.topping2[found].time+=new_obj.topping2[found].items[object].time
      new_obj.topping2[found].items_name= modifyItemList(itemList, new_obj.topping2[found].items[object].name2, true)    
      new_obj.topping2[found].services+=1
      }
      else if(!new_obj.topping2[found].items[object].check){
        new_obj.topping2[found].total-=new_obj.topping2[found].items[object].price
        new_obj.topping2[found].time-=new_obj.topping2[found].items[object].time
        new_obj.topping2[found].items_name= modifyItemList(itemList, new_obj.topping2[found].items[object].name2, false)    
        new_obj.topping2[found].services-=1
      }
      else {
        new_obj.topping2[found].total=0
        new_obj.topping2[found].time=0
        new_obj.topping2[found].items_name=0
        new_obj.topping2[found].services=0
      }
      setCheckedState(new_obj);
        console.log(new_obj.topping2)
      // const totalPrice = updatedCheckedState.reduce(
      //   (sum, currentState, index) => {
      //     if (currentState === true) {
      //       return sum + all[index].price;
      //     }
      //     return sum;
      //   },
      //   0
      // );
  
      // setTotal(totalPrice);
    };
  
    const handleOnChange2 = (position) => {
      const updatedCheckedState = parentState.map((item, index) =>
        index === position ? !item : item
      );
    
      
      setparentState(updatedCheckedState);
    }

    

  return (

  
    
    <><ScrollView showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      containerStyle={{
        backgroundColor: colors.w.color,
       // flex:1
      }}
    >

      <SliderBox
      dotStyle={{height:8,width:8,marginHorizontal:-5}}
    sliderBoxHeight={450}
    ImageComponentStyle={{borderBottomLeftRadius: 25,borderBottomRightRadius: 25}}
  imageLoadingColor="#FFFFFF"
      images={[   
         require('../../../assets/vend1.png'),
         require('../../../assets/vend3.png'),
         require('../../../assets/vendor3.png'),
          ]}>
      
         </SliderBox> 
         <View  style={{position: 'absolute',top:60,right:20}}>
        <Icon
          name='heart-outline'
          type='ionicon'
          size={30}
         
          color={'#FFFFFF'}
           />
        </View>
        <View  style={{position: 'absolute',top:60,left:20}}>
        <Icon
          name='chevron-back-outline'
          type='ionicon'
          size={30}
         
          color={'#FFFFFF'}
           />
        </View>
        
      
      <Image
        source={require('../../../assets/group-1820.png')}

        style={{ width: 70, height: 69, position: 'relative', top: -30, left: 20 }} />
      <View style={{
        width: 60, position: 'absolute', right:30, top: 420, backgroundColor: 'white', display: 'flex', flexDirection: 'row', width: 74, height: 44, alignItems: 'center', borderRadius: 40, shadowColor: "#000",
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
      <View style={{ position: 'relative', marginTop:-40,marginBottom:80,  padding: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ marginBottom: 15, fontFamily: FontFamily.sourceSansProBold, fontSize: 24, fontWeight: 'bold', color: colors.dg.color }}>{data1.name}</Text>
          <Icon name='share-2' type='feather' color={'00463C'} style={{ marginLeft: 200 }} />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {data1.tops.map((item) => {
            return (

              <Pressable
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  height: 34,
                  padding: 8,
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
          <Text style={{ color: colors.lg.color, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16 }}> {data1.dist} - <Text onPress={() => console.log(navigation.navigate('Mapview',{
            rating: data1.rating,
            dist: data1.desc,
            name: data1.name,
            image: data1.image

          }))} style={{ color: colors.dg2.color }}>Show on map</Text></Text>
        </View>
        <Text style={{ fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, marginBottom: 20, marginTop: 20 }}> {data1.desc}</Text>
        <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 18, color: '#00463C', marginBottom: 15 }}> Services</Text>
        {checkedState.topping2.map(({ name, items, total,time,services,items_name }, index) => {
          return (
            <View style={[styles.t6, { borderBottomColor: colors.lg.color, borderBottomWidth: 1,marginBottom:20 }]}>
              <CheckBox
                title={<>
                <View><Text style={[colors.dg, { marginLeft: 10 }]}>
                  {name}
                </Text>
                { time!=0 &&
                <Text style={[colors.dg, { marginLeft: 10,fontFamily:FontFamily.sourceSansProRegular,fontSize:12,color:'#BBB9BC'}]}>
               {convertMinutesToHoursAndMinutes(time)}-{services} service
                </Text>}
                </View>
                  {total > 0 &&
                    <Text style={[colors.dg, { marginLeft: 'auto' }]}>
                      {'\u20B5'} {total}
                    </Text>}
                </>}
                  uncheckedIcon={
                    <View style={[styles.checkc,{backgroundColor:'white',borderColor:colors.lg.color,borderWidth:1}]}>
                    </View>
        
                }
                checkedIcon={<View style={styles.checkc}>
                  <Image
                    source={require('../../../assets/check3.png')}
                    style={styles.check} />
                </View>}
                checked={parentState[index]}
                onPress={() => handleOnChange2(index)} />
              {parentState[index] === true && items.map(({ name2,time, id, price, check }, _index2) => {
                return (
                  <View style={{ marginLeft: 30 }}>
                    <CheckBox
                      title={<><Text style={[colors.dg, { marginLeft: 10 }]}>
                        {name2}
                      </Text>

                        <Text style={[{ fontSize: 10, color: '#BBB9BC' }]}>
                          {' '} {convertMinutesToHoursAndMinutes(time)}
                        </Text>
                        <Text style={[colors.dg, { marginLeft: 'auto' }]}>
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


    </ScrollView><View style={{ position: 'absolute', top: '90%', alignSelf: 'center', backgroundColor: '#ffff', width: '100%', marginBottom: 0}}>
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
          onPress={
           handleBookingSubmit
        } 
          />
      </View></>


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
