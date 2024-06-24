import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';


import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BHeader from '../../../components/BHeader';
import { colors, styles } from '../../Common_styles';
import { View, TextInput, Text, ScrollView, Platform, SafeAreaView, Pressable, StyleSheet, Linking, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Button, color } from '@rneui/base';
import { SliderBox } from "react-native-image-slider-box";
import { Icon, ListItem, Image } from '@rneui/base';
import { FontFamily } from '../../GlobalStyles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Booking_action from '../../../components/Bookin_action';
import Blur from '../start_screens/Blur';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { backendURL } from '../../services/http';
import { setBooking, setVendor, setvendorid, setvendorimg, setvendorname } from '../../redux/booking';
import { useSelector } from 'react-redux';
import { convertMinutesToHoursAndMinutes, getTotalByKey } from '../../Functions';
import CustomImageSlider from '../../../components/CustomSlider';
import AppJob from '../../../components/AppJob';
import { da } from 'date-fns/locale';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Loading from '../../../components/loading';

const Booking_detail = ({ route, navigation }) => {
  const { id } = route.params

  const dispatch = useDispatch()
  const [info, setInfo] = useState()
  const user = useSelector((state) => state.user.userInfo)
  const [noti, shownoti] = React.useState(false);
  const [data, setdata] = useState(null)
  const [cancelled, setCancelled] = useState(false)
  const [blur, setblur] = useState(false)
  const [fav, setFav] = useState(data?.favorite)
  const { theme } = useTheme();

  id && console.log(id)


  const statuses = ["declined", "rebook", "completed", "cancelled", "confirmed", "no show", "booked", "unconfirmed", "pending"]

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      const response = await axios.get(backendURL + `/booking/info?id=${user.id}&booking_id=${id}`);
      setdata(response.data); // Use an empty array as a fallback if the response data is undefined
      setFav(response.data.favorite)
      console.log(response.data.amount_paid, 'jj');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const bgc = {
    cancelled: '#CD3D49',
    completed: theme.colors.lgb,
    confirmed: theme.colors.lgb,
    booked: theme.colors.dgb,
    rebook: theme.colors.dgb,
    "no show": '#CD3D49',
    unconfirmed: theme.colors.dgb,
    declined: '#CD3D49',
    pending: data?.services[0] ? data.services[0].color : 'red'


  }

  const c = {
    cancelled: 'white',
    confirmed: 'white',
    completed: 'white',
    declined: 'white',
    booked: 'white',
    pending: 'white',
    "no show": 'white',
    unconfirmed: 'white',
    rebook: 'white'
  }


  function capitalizeFirstLetter(str) {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${data.vendor.lat},${data.vendor.lon}`;
    console.log(fav, 'jjjjjjjjjj')
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log('Google Maps is not installed');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(error => console.log('Error opening Google Maps:', error));
  };

  const createFav = async () => {

    try {
      const info = await axios.post(`${backendURL}/favorites`, { vendor_id: data.vendor.id, user_id: user.id })
      info.data.message == 'added' ? setFav(true) : setFav(false)
    }
    catch (e) {
      console.log(e)
    }
  }
  const rebook = () => {
    console.log(data.vendor.cover)
    dispatch(setvendorname(data.vendor.username))
    dispatch(setvendorimg(data.vendor.logo))
    dispatch(setvendorid(data.vendor.id))
    dispatch(setVendor(data.hours))
    if (data?.status == 'confirmed' && data.cancelable) {
      navigation.navigate('SelectDate', { rebooked: true, id: data.id })
    }
    else if (data?.status == 'booked' || data?.status == 'unconfirmed') {
      dispatch(setBooking({ topping2: data.items, name: data.vendor.username }))
      navigation.navigate('SelectDate', { rebooked: true, id: data.id })
    }
    else if (data?.status == 'rebook' || data?.status == 'unconfirmed') {
      dispatch(setBooking({ topping2: data.items, name: data.vendor.username }))
      navigation.navigate('SelectDate', { rebooked: true, id: data.id })
    }
    else if (data?.status == 'completed') {
      dispatch(setBooking(JSON.stringify({ topping2: data.items, name: data.vendor.username })))
      navigation.navigate('SelectDate', { rebooked: false, id: data.id })
    }
    else {
      Alert.alert('Info', 'You cannot rebook since its within 48hours to appointment.However you can send notes to vendor requesting a reschedule. If vendor approves, you can rebook')
    }
  }

  const copyToClipboard = () => {
    Clipboard.setString(`https://www.google.com/maps/search/?api=1&query=${data.vendor.lat},${data.vendor.lon}`);
    shownoti(true)
    setTimeout(() => {
      shownoti(false)
    }, 3000
    )
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  function formatTime(timeString) {
    const date = new Date(timeString);
    const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return formattedTime;
  }

  function formatDate(dateString) {
    const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  function formatServiceNames(services) {
    const maxLength = 25; // Maximum length of the final formatted string
    const names = services.map(service => service.name);
    let formattedString = names.join(" & ");

    if (formattedString.length > maxLength) {
      formattedString = formattedString.substring(0, maxLength - 3) + "...";
    }

    return formattedString;
  }
  const styles = useStyles();
  return (

    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      {
        data ? <>

          <CustomImageSlider images={[data?.vendor.cover, ...data?.vendor.otherImages]} />
          <View style={{ position: 'absolute', top: 60, right: 20 }}>
            <Icon
              onPress={createFav}
              name={fav ? 'heart' : 'heart-outline'}
              type='ionicon'
              size={30}

              color={'#FFFFFF'} />
          </View><Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 60, left: 20 }}>
            <Icon
              name='chevron-back-outline'
              type='ionicon'
              size={30}

              color={'#FFFFFF'} />
          </Pressable><View>
            <Text style={{ marginTop: 10, color: theme.colors.dg, fontFamily: FontFamily.sourceSansProBold, fontSize: 27, marginHorizontal: 20 }}>{formatDate(data.date)}</Text>
            <View >
              <Text style={{ color: theme.colors.dg, fontFamily: FontFamily.sourceSansProBold, fontSize: 27, marginHorizontal: 15 }}> at {formatTime(data.time)}{'  '}
                <View style={[{
                  marginTop: 7,
                  paddingHorizontal: 10, height: 20, borderRadius: 20,
                  alignContent: 'center', justifyContent: 'center'
                }, statuses.includes(data.status) ? { backgroundColor: bgc[data.status] } : { backgroundColor: info?.color }]}>
                  <Text style={[{ fontSize: 11, textAlign: 'center', fontFamily: FontFamily.sourceSansProSemibold }, statuses.includes(data.status) ? { color: c[data.status] } : { color: 'white' }, styles.sewInTypo]}>{statuses.includes(data.status) ? capitalizeFirstLetter(data.status) : info && capitalizeFirstLetter(info.status)}</Text></View>
              </Text>
            </View>
          </View><AppJob info={info} vendor={data.vendor} setInfo={setInfo} services={data.services} time={data.time} /><View style={{ marginHorizontal: 20, marginVertical: 30 }}>
            <ListItem
              containerStyle={[{ backgroundColor: theme.colors.background, paddingVertical: 20, borderBottomColor: theme.colors.tabColor, borderTopColor: theme.colors.tabColor, borderBottomWidth: 0.5, borderTopWidth: 0.5 }]}
              onPress={() => {
                //dispatch(setDefault(pay))
                navigation.navigate('VendorDetail',
                  {
                    id: data.vendor.id,
                  });
              }}>
              <FastImage
                style={{ width: 40, height: 40, borderRadius: 50 }}

                source={{
                  uri: data.vendor.logo,
                  headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover} />


              <ListItem.Content>
                <ListItem.Title style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 20, color: theme.colors.dg }}>
                  {data.vendor.username}
                </ListItem.Title>
                <ListItem.Title style={{ fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: theme.colors.dg }}>
                  {data.vendor.name}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color={theme.colors.dg} size={30} />
            </ListItem>

          </View><Booking_action info={info} rebk={rebook} data={data} setblur={setblur} setCancelled={setCancelled} /><View style={{ marginTop: 20, marginVertical: 10, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 5, height: 0 }, elevation: 4, backgroundColor: theme.colors.card, borderRadius: 20, width: '90%', alignSelf: 'center' }}>


            <View style={{ padding: 20, borderBottomColor: colors.lg.color, borderBottomWidth: 1 }}>
              {data.items.filter(({ total }) => total != 0).map(({ name, items_name, appointment_color, total, time, services }, _index2) => {


                return (
                  <View style={{ marginBottom: 15, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: 10, top: 5, marginRight: 10, height: 10, borderRadius: 10, backgroundColor: appointment_color }}></View>
                    {data.items.length != 1 && _index2 + 1 !== data.items.length ?
                      <View style={{ position: 'absolute', left: 5, top: 15, height: 45, width: 0.6, backgroundColor: '#BBB9BC' }}></View> : null}
                    <View style={{ width: '70%' }}>

                      <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: theme.colors.dg }}>{name} - <Text style={{ color: '#BBB9BC', fontSize: 13, marginTop: -17 }}>{items_name}</Text></Text>
                      <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: '#BBB9BC' }}> {convertMinutesToHoursAndMinutes(time)}</Text>

                    </View>
                    <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 18, color: theme.colors.dg, position: 'absolute', right: 9 }}>¢{total}</Text>
                  </View>
                );
              })}

            </View>
            <View style={{ padding: 20, display: 'flex', flexDirection: 'row', height: 80 }}>
              <Text style={{ left: 30, position: 'absolute', top: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: theme.colors.dg }}>
                Discount
              </Text>
              <View style={{ position: 'absolute', right: 30, top: 20 }}>
                <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 18, color: theme.colors.lg }}>
                  ¢{data.discount_amount || 0}
                </Text>
              </View>

            </View>
            <View style={{ marginTop: -20, padding: 20, display: 'flex', flexDirection: 'row', height: 80 }}>
              <Text style={{ left: 30, position: 'absolute', top: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: theme.colors.dg }}>
                Total
              </Text>
              <View style={{ position: 'absolute', right: 30, top: 20 }}>
                <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 18, color: theme.colors.lg }}>
                  ¢{data.total - (data.discount_amount)}
                </Text>
              </View>

            </View>
            {data.payment_method == 'Pay with cash' &&
              <View style={{ display: 'flex', flexDirection: 'row' }}>

                <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: theme.colors.dg, left: 30, marginBottom: 20, flex: 1 }}>
                  Initial deposit
                </Text>
                <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: theme.colors.dg, flex: 1, textAlign: 'right', marginRight: 30 }}>¢{data.amount_paid}</Text></View>}
          </View><Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 20, color: theme.colors.dg, marginTop: 55, marginHorizontal: 30, marginBottom: 14 }}>Location</Text>
          <MapView
            initialRegion={{
              latitude: data.vendor.lat ? parseFloat(data.vendor.lat) : 5.614818,
              longitude: data.vendor.lon ? parseFloat(data.vendor.lon) : -0.205874,
              latitudeDelta: 0.00122,
              longitudeDelta: 0.00121,
            }}
            style={{ width: '90%', height: 300, alignSelf: 'center', borderRadius: 20 }}
            provider={PROVIDER_GOOGLE}
          ></MapView><Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 20, color: theme.colors.dg, marginTop: 55, marginHorizontal: 30, marginBottom: 14 }}>Address</Text><Text style={{ fontFamily: FontFamily.sourceSansProRegular, fontSize: 20, color: theme.colors.dg, marginHorizontal: 30, marginBottom: 14 }}>{data.vendor.name}</Text><View style={{ marginTop: 30, marginBottom: 50, width: '90%', alignSelf: 'center' }}>

            <ListItem
              containerStyle={[{ backgroundColor: theme.colors.background, paddingVertical: 20, borderTopColor: theme.colors.tabColor, borderBottomColor: theme.colors.tabColor, borderBottomWidth: 1, borderTopWidth: 1 }]}
              onPress={() => {
                // dispatch(setDefault(pay))
                copyToClipboard();
              }}>
              <Icon
                name="copy-outline"
                type="ionicon"
                size={20}
                color={colors.lg.color} />

              <ListItem.Content>
                <ListItem.Title style={{ color: theme.colors.dg }}>
                  Copy address
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color={theme.colors.dg} size={20} />
            </ListItem>
            <ListItem
              containerStyle={[{ backgroundColor: theme.colors.background, paddingVertical: 20, borderBottomColor: theme.colors.tabColor, borderBottomWidth: 1 }]}
              onPress={() => {
                // dispatch(setDefault(pay))
                openGoogleMaps();
              }}>
              <Icon
                name="map-pin"
                type="feather"
                size={20}
                color={colors.lg.color} />

              <ListItem.Content>
                <ListItem.Title style={{color:theme.colors.dg}}>
                  Get directions
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color={theme.colors.dg} size={20} />
            </ListItem>

          </View>
        </>

          : <Loading />
      }
      {
        noti &&
        <View style={style2.copy_info}>
          <Text style={style2.copy_info_text}>Location copied Successfully!</Text>
        </View>
      }
      {blur && <Blur />}
    </ScrollView>
  )
};

const useStyles = makeStyles((theme) => ({
  booked: {
    backgroundColor: theme.colors.dg
  },
  completed: {
    backgroundColor: theme.colors.lgb
  },
  cancel: {
    backgroundColor: 'red'
  },

  copy_info: {
    width: '90%',
    position: 'absolute',
    alignSelf: 'center',
    top: "70%",
    height: 32,
    borderRadius: 23,
    backgroundColor: theme.colors.lgb
  },
  copy_info_text: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: 14,
    left: 20,
    top: 5,
    color: theme.colors.dg
  }
}))
export default Booking_detail;

