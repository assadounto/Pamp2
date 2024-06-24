import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { backendURL } from '../../services/http';
import { verticalScale, horizontalScale, moderateScale } from '../../Dimensions';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  Modal,
  Keyboard,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BHeader from '../../../components/BHeader';
import { Avatar, Icon, CheckBox, Button } from '@rneui/base';
import { Image } from 'react-native-animatable';
import { FontFamily } from '../../GlobalStyles';
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, styles } from '../../Common_styles';
import { Text } from 'react-native-animatable';
import DelPop from './pop';
import FastImage from 'react-native-fast-image';
import user, { userLogout } from '../../redux/user';
import { setImage } from '../../redux/user';
import { useDispatch, useSelector } from 'react-redux';
import Blur from '../start_screens/Blur';
import axios from 'axios';
import EditIcon from '../../../components/icons/Edit';
import Bin from '../../../components/icons/Bin';
const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const userimg = useSelector(state => state.user.image1); const [modal, setModal] = useState(false);
  const [reason1, setReason1] = useState(false);
  const [reason2, setReason2] = useState(false);
  const [reason3, setReason3] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [toph, setpop] = useState(40)
  const handledelete = async () => {
    dispatch(userLogout());
    await axios.post(`${backendURL}/delete`, { id: user.id, reason1, reason2, reason3 })

  }
  const onPickImage = () => {
    launchImageLibrary({ mediaType: 'photo', crop: true }, response => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        //displayError('There was an error while picking the image')
        return;
      }

      const source = response.assets[0];

      setSelectedImage(Platform.OS === 'android' ? 'file://' + source : source);
      dispatch(setImage(Platform.OS === 'android' ? 'file://' + source.uri : source.uri));
      console.log('source', source.uri);
      onUploadImage(source);
    });
  };

  // send image to server
  const onUploadImage = source => {
    const formData = new FormData();
    formData.append('image', {
      uri: source.uri,
      type: source.type,
      name: source.fileName,
    }
    );
    formData.append('id', user.id)
    // dispatch(uploadImage(formData))
    fetch(`${backendURL}/user/image`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => {

        dispatch(setImage(res.image))
        console.log('upload succes', res);
        //alert('Upload success!');
      })
      .catch(error => {
        console.log('upload error', error);
        //alert('Upload failed!');
      });
  };


  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setpop(Platform.OS === 'ios' ? verticalScale(320) : verticalScale(30))
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setpop(40)
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <><SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <BHeader top={Platform.OS === 'ios' ? 0 : 20} title="Profile" color={theme.colors.lg} />

      <ScrollView
        style={[]}
        contentContainerStyle={[{}]}

        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{ alignSelf: 'center', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              onPickImage();
            }}>
            <FastImage

              source={selectedImage || user?.image ? { uri: user?.image, headers: { Authorization: 'someAuthToken' } } : require('../../../assets/place.png')}

              style={{ borderRadius: 50, width: 80, height: 80 }

              }

            />

            <View
              style={[
                {
                  backgroundColor: theme.colors.lgb,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderRadius: 50,
                  padding: 4,
                },
              ]}>
              <Icon
                name="camera"
                color={colors.w.color}
                type="feather"
                size={14} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.Pcont]}>
          <View style={[styles.Pmain]}>
            <Pressable onPress={() => navigation.replace('edit_profile')}>
             <EditIcon
                size={18}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: 15,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: theme.colors.lgb,
                  padding: 5,
                  color: theme.colors.lg,
                }}
             />
             
            </Pressable>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>First name</Text>
              <Text style={[styles.P2, colors.dg2]}>{user.username}</Text>
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Last name</Text>
              {user?.name ? <Text style={[styles.P2, colors.dg2]}>{user.name}</Text> : <Text
                style={[styles.P2, colors.dg2]}
                onPress={() => navigation.navigate('edit_profile')}>
                +Add
              </Text>}
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Phone number</Text>
              {user?.phone ? <Text style={[styles.P2, colors.dg2]}>{user.phone}</Text> : <Text
                style={[styles.P2, colors.dg2]}
                onPress={() => navigation.navigate('edit_profile')}>
                +Add
              </Text>}

            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Email address</Text>
              <Text style={[styles.P2, colors.dg2]}>{user.email}</Text>
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Date of birth </Text>
              {user?.date_of_birth ? <Text style={[styles.P2, colors.dg2]}>{user.date_of_birth}</Text> : <Text
                style={[styles.P2, colors.dg2]}
                onPress={() => navigation.navigate('edit_profile')}>
                +Add
              </Text>}
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Gender </Text>
              {user?.gender ? <Text style={[styles.P2, colors.dg2]}>{user.gender}</Text> : <Text
                style={[styles.P2, colors.dg2]}
                onPress={() => navigation.navigate('edit_profile')}>
                +Add
              </Text>}
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Address </Text>
              {user?.address ? <Text style={[styles.P2, colors.dg2]}>{user.address}</Text> : <Text
                style={[styles.P2, colors.dg2]}
                onPress={() => navigation.navigate('edit_profile')}>
                +Add
              </Text>}
            </View>
          </View>
        </View>
        <Pressable onPress={() => setModal(true)}>
          <View style={[styles.Pmain, styles.flex, styles.Da, {alignItems:'center', marginBottom: 150 }]}>
            <Bin
              style={{ width: 30, height: 25,}}
              color={'#CD3D49'}
            />
           
            <Text
              style={[
                { color: '#CD3D49', textAlignVertical: 'center', marginTop: 5, marginLeft: 18 },
                
              ]}>
              Delete account
              
            </Text>
          </View>
        </Pressable>
      </ScrollView>

    </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={[styles.pop, { position: 'absolute', alignItems: 'center', alignSelf: 'center', borderRadius: 20, width: '90%', bottom: toph, backgroundColor: '#ffff' }]}>
          <Pressable
            onPress={() => setModal(!modal)}
            style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 20 }}>
            <Icon
              name="x"
              type="feather"
              size={30}
              onPress={() => setModal(!modal)} />
          </Pressable>
          <View>
            <Text
              style={[
                colors.dgb,
                styles.fs18,
                styles.tac,
                styles.mb20,
                styles.bold,
              ]}>
              Are you sure you want to leave Pamp?
            </Text>
            <Text
              style={[
                colors.lg,
                styles.fs18,
                styles.tac,
                ,

                styles.mb20,
                styles.bold,
              ]}>
              Tell us why
            </Text>
          </View>
          <View style={{ width: 260 }}>
            <CheckBox
              style={{ borderColor: 'red', borderWidth: 1 }}
              title={<Text
                style={[
                  colors.dg,
                  {
                    marginLeft: 8,
                    fontFamily: FontFamily.sourceSansProSemibold,
                  },
                  styles.bold,
                ]}>
                I don't like the app
              </Text>}
              checkedIcon={<View style={styles.checkc}>
                <Image
                  source={require('../../../assets/check3.png')}
                  style={styles.check} />
              </View>}
              checked={reason1}
              onPress={() => {
                setReason1(!reason1);
              }} />
            <CheckBox
              title={<Text style={[colors.dg, { marginLeft: 8 }, styles.bold]}>
                Couldn't find vendors near me
              </Text>}
              checkedIcon={<View style={styles.checkc}>
                <Image
                  source={require('../../../assets/check3.png')}
                  style={styles.check} />
              </View>}
              checked={reason2}
              onPress={() => {
                setReason2(!reason2);
              }} />
          </View>

          <TextInput
            style={{
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              borderColor: '#BBB9BC',
              padding: 10,
              marginTop: 30,
              marginBottom: 40,
            }}
            placeholder={'other reason'}
            onChangeText={text => {
              console.log(reason3);
              setReason3(text);
            }} />
          <Button
            onPress={handledelete}
            title="Confirm"
            buttonStyle={{
              backgroundColor: '#CD3D49',
              width: 200,
              borderRadius: 40,
              height: 60,
              marginBottom: 20,
            }} />
        </View>
      </Modal>
      {modal && <Blur />}
    </>


  );
};


const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  mt100: {
    marginTop: verticalScale(100),
  },
  mt10: {
    marginTop: verticalScale(10),
  },
  mb20: {
    marginBottom: verticalScale(20),
  },
  textInput: {
    marginBottom: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    fontSize: moderateScale(14),
    width: horizontalScale(330),
    height: verticalScale(63),
    margin: 0,

    alignSelf: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: horizontalScale(23),
    borderWidth: 1,
    borderColor: '#FAFAFA',
    fontFamily: FontFamily.sourceSansProRegular
  },
  t1: {
    fontSize: moderateScale(26),
    color: theme.colors.dg,
    marginBottom: 10,
    fontFamily: FontFamily.sourceSansProBold,
  },
  tbtn: {
    fontFamily: FontFamily.sourceSansProBold
  },
  t2: {
    fontSize: moderateScale(16),
    color: '#BBB9BC',
    textAlign: 'center',
    width: '60%',
    marginBottom: 10,
    fontFamily: FontFamily.sourceSansProRegular,
  },
  t3: {
    fontSize: moderateScale(15),
    color: theme.colors.dg,
    fontFamily: FontFamily.sourceSansProRegular,
    marginTop: verticalScale(-20),
    alignSelf: 'center',
  },
  t4: {
    fontSize: moderateScale(14),
    color: '#B0EBBD',
    fontFamily: FontFamily.sourceSansProBold,
    marginTop: verticalScale(20),
    alignSelf: 'center',
  },
  t5: {
    fontSize: moderateScale(14),
    color: '#000000',
    fontFamily: FontFamily.sourceSansProRegular,
    marginLeft: horizontalScale(20),
    alignSelf: 'center',
  },
  t6: {

    marginTop: -20,
    width: '85%'


  },
  m1: {
    margin: horizontalScale(10),
  },
  terms: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    fontFamily: FontFamily.sourceSansProRegular
  },
  check: {
    width: horizontalScale(18),
    height: verticalScale(18),
    resizeMode: 'center',
  },
  checkc: {
    width: horizontalScale(23),
    height: verticalScale(23),
    padding: horizontalScale(3),
    backgroundColor: '#B0EBBD',
    borderRadius: horizontalScale(5),
    alignItems: 'center',
    ustifyContent: 'center',
  },
  button: {
    width: horizontalScale(330),
    height: verticalScale(71),
    backgroundColor: '#86D694',
    borderWidth: horizontalScale(1),
    borderColor: '#86D694',
    marginBottom: verticalScale(10),
    alignSelf: 'center',
    borderRadius: horizontalScale(23),
  },
  scroll: {
    backgroundColor: theme.colors.background,
  },
  input: {
    marginTop: verticalScale(20),
  },
  input2: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {

    alignSelf: 'center',
  },
  press: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#DEDCDC',
    backgroundColor: 'white',
    borderRadius: horizontalScale(23),
    width: horizontalScale(300),
    height: verticalScale(71),
    alignSelf: 'center',
  },
  forgot: {
    color: '#BBB9BC',
    fontSize: moderateScale(14),
    marginTop: verticalScale(17),

    textAlign: 'right'
  },
  bold: {
    fontWeight: 'bold',
  },
  head: {
    alignItems: 'center',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(20),
    backgroundColor: 'white',
    marginBottomColor: 'white',
  },
  fs25: {
    fontSize: moderateScale(26),
  },
  fs18: {
    fontSize: moderateScale(18),
    width: moderateScale(230),
  },
  tc: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    fontFamily: FontFamily.sourceSansProRegular
  },

  resethead: {
    width: '80%',
  },
  pop: {
    marginTop: verticalScale(300),
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    padding: horizontalScale(10),

  },

  pop2: {
    position: 'absolute',
    bottom: verticalScale(40),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    padding: horizontalScale(40),
    alignContent: 'center',

    width: '95%',
    height: verticalScale(250),
  },
  popimg: {
    resizeMode: 'center',
  },
  tac: {
    textAlign: 'center',
  },
  f1: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: moderateScale(25),
  },
  Pmain: {
    borderRadius: horizontalScale(20),
    paddingHorizontal: horizontalScale(30),
    backgroundColor: theme.colors.slate,
    width: '90%',
    alignSelf: 'center',
    marginBottom: verticalScale(30),
  },
  Pcont: {
    backgroundColor: theme.colors.background,
    marginTop: verticalScale(30),
  },

  P1: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: moderateScale(18),
    color: theme.colors.dg
  },
  P2: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: moderateScale(15),
  },
  Pmargin: {
    marginBottom: horizontalScale(20),
  },
  Da: {
    padding: horizontalScale(10),
    marginBottom: verticalScale(50),
    height: verticalScale(60),
  },
  EP: {
    backgroundColor: '#ffff',
    width: '90%',
    alignSelf: 'center',
  },
  EI: {
    width: '90%',
    alignSelf: 'center',
    borderColor: '#86D694',
    paddingHorizontal: horizontalScale(10),
    borderWidth: horizontalScale(1),
    borderRadius: horizontalScale(10),
    marginBottom: verticalScale(20),
    height: verticalScale(42),
    color: "#86D694"
  },
  St1: {
    fontFamily: FontFamily.sourceSansProBold,
    fontSize: moderateScale(26),
    color: '#86D694',
    marginTop: verticalScale(60),
    marginLeft: horizontalScale(20),
    paddingBottom: verticalScale(10)
  },
  option: {
    fontSize: moderateScale(13),
    fontFamily: FontFamily.sourceSansProRegular,
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'white',
    borderRadius: horizontalScale(20),
    height: verticalScale(34),
    padding: horizontalScale(8),
    marginBottom: verticalScale(30),
    borderColor: '#B0EBBD',
    borderWidth: 1,
    marginHorizontal: horizontalScale(7)

  },

  selected: {
    backgroundColor: '#86D694',
    borderRadius: horizontalScale(20),
    color: 'white',
    height: verticalScale(34),
    padding: horizontalScale(8),
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(7)
  },
}));
export default Profile;
