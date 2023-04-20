import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
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
import user from '../../redux/user';
import {setImage} from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const userImage = useSelector(state => state.user.image1);
  const [modal, setModal] = useState(false);
  const [reason1, setReason1] = useState(false);
  const [reason2, setReason2] = useState(false);
  const [reason3, setReason3] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
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

      setSelectedImage(source);
      dispatch(setImage(source));
      console.log('source', source);
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
    });

    // dispatch(uploadImage(formData))
    fetch('http://localhost:3000/user/image', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.log('upload succes', res);
        //alert('Upload success!');
      })
      .catch(error => {
        console.log('upload error', error);
        //alert('Upload failed!');
      });
  };

  return (
    <SafeAreaView style={[colors.Pc]}>
      <BHeader title="Profile" color={colors.Pc} />

      <ScrollView
        style={[]}
        contentContainerStyle={[]}
        refreshControl={
          <RefreshControl
            //refreshing={isFetching || isLoading}
            onRefresh={() => {}}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{alignSelf: 'center', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              onPickImage();
            }}>
            <Avatar
              rounded
              size="large"
              source={selectedImage || userImage}
              //title={me?.firstName[0]}
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
                size={14}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.Pcont]}>
          <View style={[styles.Pmain]}>
            <Pressable onPress={() => navigation.navigate('edit_profile')}>
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
                }}
              />
            </Pressable>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>First name</Text>
              <Text style={[styles.P2, colors.dg2]}>Rich</Text>
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Last name</Text>
              <Text style={[styles.P2, colors.dg2]}>Adu</Text>
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Phone number</Text>
              <Text style={[styles.P2, colors.dg2]}>+2333</Text>
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Email address</Text>
              <Text style={[styles.P2, colors.dg2]}>adukuete</Text>
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Date of birth </Text>
              <Text
                style={[styles.P2, colors.dg2]}
                onPress={() => navigation.navigate('edit_profile')}>
                +Add
              </Text>
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Gender </Text>
              <Text
                style={[styles.P2, colors.dg2]}
                onPress={() => navigation.navigate('edit_profile')}>
                +Add
              </Text>
            </View>
            <View style={[styles.Pmargin]}>
              <Text style={styles.P1}>Addresss </Text>
              <Text
                style={[styles.P2, colors.dg2]}
                onPress={() => navigation.navigate('edit_profile')}>
                +Add
              </Text>
            </View>
          </View>
        </View>
        <Pressable onPress={() => setModal(true)}>
          <View style={[styles.Pmain, styles.flex, styles.Da]}>
            <Image
              source={require('../../../assets/account.png')}
              style={{width: 30, height: 25, marginTop: 6}}
            />
            <Text
              style={[
                {textAlignVertical: 'center', marginLeft: 18},
                styles.P1,
              ]}>
              Delete account
            </Text>
          </View>
        </Pressable>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={[styles.pop, {backgroundColor: '#ffff'}]}>
          <Pressable
            onPress={() => setModal(!modal)}
            style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}>
            <Icon
              name="x"
              type="feather"
              size={30}
              onPress={() => setModal(!modal)}
            />
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
          <View style={{width: 260}}>
            <CheckBox
              style={{borderColor: 'red', borderWidth: 1}}
              title={
                <Text
                  style={[
                    colors.dg,
                    {
                      marginLeft: 8,
                      fontFamily: FontFamily.sourceSansProSemibold,
                    },
                    styles.bold,
                  ]}>
                  I don't like the app
                </Text>
              }
              checkedIcon={
                <View style={styles.checkc}>
                  <Image
                    source={require('../../../assets/check3.png')}
                    style={styles.check}
                  />
                </View>
              }
              checked={reason1}
              onPress={() => {
                setReason1(!reason1);
              }}
            />
            <CheckBox
              title={
                <Text style={[colors.dg, {marginLeft: 8}, styles.bold]}>
                  Couldn't find vendors near me
                </Text>
              }
              checkedIcon={
                <View style={styles.checkc}>
                  <Image
                    source={require('../../../assets/check3.png')}
                    style={styles.check}
                  />
                </View>
              }
              checked={reason2}
              onPress={() => {
                setReason2(!reason2);
              }}
            />
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
            }}
          />
          <Button
            title="Confirm"
            buttonStyle={{
              backgroundColor: '#CD3D49',
              width: 200,
              borderRadius: 40,
              height: 60,
              marginBottom: 20,
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
