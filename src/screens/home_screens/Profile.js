import React, {useState, useEffect} from 'react';
import { backendURL } from '../../services/http';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BHeader from '../../../components/BHeader';
import {Avatar, Icon, CheckBox, Button} from '@rneui/base';
import {Image} from 'react-native-animatable';
import {FontFamily} from '../../GlobalStyles';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors, styles} from '../../Common_styles';
import {Text} from 'react-native-animatable';
import DelPop from './pop';
import FastImage from 'react-native-fast-image';
import user, { userLogout } from '../../redux/user';
import {setImage} from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import Blur from '../start_screens/Blur';
import axios from 'axios';
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const userimg = useSelector(state => state.user.image1);  const [modal, setModal] = useState(false);
  const [reason1, setReason1] = useState(false);
  const [reason2, setReason2] = useState(false);
  const [reason3, setReason3] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
    
  const handledelete=async()=>{
    dispatch(userLogout());
await axios.post(`${backendURL}/delete`,{id:user.id,reason1,reason2,reason3})

  }
  const onPickImage = () => {
    launchImageLibrary({mediaType: 'photo', crop: true}, response => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        //displayError('There was an error while picking the image')
        return;
      }

      const source = response.assets[0];

      setSelectedImage(Platform.OS==='android'?'file://'+source:source);
      dispatch(setImage(Platform.OS==='android'? 'file://'+source.uri: source.uri));
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
    formData.append('id',user.id)
    // dispatch(uploadImage(formData))
    fetch(`${backendURL}/user/image`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => {

         dispatch(setImage( res.image))
        console.log('upload succes', res);
        //alert('Upload success!');
      })
      .catch(error => {
        console.log('upload error', error);
        //alert('Upload failed!');
      });
  };

  return (
    <><SafeAreaView style={[colors.Pc]}>
      <BHeader top={Platform.OS==='ios'?0:20} title="Profile" color={colors.dg2.color} />

      <ScrollView
        style={[]}
        contentContainerStyle={[{}]}
        
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{ alignSelf: 'center', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              onPickImage();
            } }>
            <FastImage
            
            source={selectedImage || user?.image ? { uri: user?.image,headers: { Authorization: 'someAuthToken' } }  : require('../../../assets/place.png')} 

             style={{borderRadius: 50,width:80,height:80 }
             
           }
         
          />

            <View
              style={[
                {
                  backgroundColor: colors.lg.color,
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
              <Icon
                name="edit-2"
                type="feather"
                size={18}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: 12,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: colors.lg.color,
                  padding: 5,
                  color: colors.dg2.color,
                }} />
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
          <View style={[styles.Pmain, styles.flex, styles.Da,{marginBottom:150}]}>
            <Image
              source={require('../../../assets/account.png')}
              style={{ width: 30, height: 25, marginTop: 6 }} />
            <Text
              style={[
                { textAlignVertical: 'center', marginTop: 5, marginLeft: 18 },
                styles.P1,
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
      } }>
        <View style={[styles.pop, { position:'absolute', alignItems:'center',alignSelf:'center',borderRadius:20,width:'90%', bottom:30, backgroundColor: '#ffff' }]}>
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
              } } />
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
              } } />
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
            } } />
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
      {modal && <Blur/>}
      </>

    
  );
};

export default Profile;
