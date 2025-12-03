import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';
import axios from 'axios';
import { makeStyles } from '@rneui/themed';
import { backendURL } from '../../services/http';
import { useTheme } from '@rneui/themed';
import SafeAreaTop from '../../../components/SafeAreaTop';
import CheckBoxComponent from '../../../components/Checkbox';
import ButtonDown from '../../../components/ButtonDown';
import ThankYou from '../../../components/ThankYou';
import { ScrollView } from 'react-native-gesture-handler';
import Instagram from '../../../components/icons/Instagram';
import Facebook from '../../../components/icons/Facebook';
import Tiktok from '../../../components/icons/Tiktok';
import Youtube from '../../../components/icons/Youtube';
import { verticalScale,horizontalScale,moderateScale } from '../../Dimensions';
import { FontFamily } from '../../GlobalStyles';

const JoinNow = ({ navigation }) => {
  const styles=useStyles()
  const user = useSelector((state) => state.user.userInfo);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const [agree, setAgree] = useState(true);
  const [formData, setFormData] = useState({
    id: user.id,
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation function for social media handles

  const isFormValid = () => {
    return (
      formData.instagram ||
      formData.facebook ||
      formData.tiktok ||
      formData.youtube
    );
  };


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(backendURL + '/influencer', formData);
      setLoading(false);
      setModal(true);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const socials = [
    {
      place: 'instagram.com/@example',
      icon: <Instagram color={theme.colors.tabColor} />,
      name: 'instagram',
    },
    {
      place: 'facebook.com/example',
      icon: <Facebook color={theme.colors.tabColor} />,
      name: 'facebook',
    },
    {
      place: 'tiktok/@example',
      icon: <Tiktok color={theme.colors.tabColor} />,
      name: 'tiktok',
    },
    {
      place: 'youtube/@example',
      icon: <Youtube color={theme.colors.tabColor} />,
      name: 'youtube',
    },
  ];

  return (
    <View style={{flex:1, paddingBottom:Platform.OS==='android' ? 60:0}}>


    <SafeAreaTop>
      <Text style={styles.text}>Join</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.childCont}>
          <TextInput
            placeholderTextColor={theme.colors.placeholder}
            style={[styles.textInput2]}
            value={user.username}
            editable={false}
          />
          <TextInput
            placeholderTextColor={theme.colors.placeholder}
            style={[styles.textInput2]}
            editable={false}
            value={user.name}
          />
          <TextInput
            placeholderTextColor={theme.colors.placeholder}
            style={[styles.textInput2]}
            value={user.email}
            editable={false}
          />
          <Text style={styles.listTitle}>Social Media Handles</Text>
          {socials.map((item, index) => {
            return (
              <View key={index} style={styles.inputCont}>
                <View style={styles.icon_cont}>{item.icon}</View>
                <TextInput
                  placeholderTextColor={theme.colors.placeholder}
                  placeholder={item.place}
                  style={[styles.textInput]}
                  onChangeText={(value) => handleChange(item.name, value)}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.check}>
          <CheckBoxComponent
            card={false}
            height={25}
            width={25}
            state={agree}
            title={<Text style={styles.checkText}>I agree to <Text style={styles.green}>T&C</Text></Text>}
          />
        </View>
      </ScrollView>
      
      <ThankYou navigation={navigation} setModal={setModal} modal={modal} />
     <View>
      
     </View>
      <ButtonDown
      
        disabled={!isFormValid()}
        loading={loading}
        handleSubmit={handleSubmit}
        title={'Submit'}
      />
    </SafeAreaTop>
        </View>
  );
};




const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    paddingBottom: 370
  },
  green: { color: theme.colors.lg },
  checkText: {
    fontFamily: FontFamily.sourceSansProSemibold,
    color: theme.colors.dg,
    marginLeft: 10
  },
  check: {
    marginTop: 20,
    marginLeft: 20
  },
  listTitle: {
    fontSize: 22,
    marginTop: 20,
    fontFamily: FontFamily.sourceSansProSemibold,
    color: theme.colors.dg,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20
  },
  icon_cont: {
    borderRightWidth: 1,
    borderColor: theme.colors.tabColor,
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  childCont: {
    gap: 10
  },
  text: {
    color: theme.colors.dg,
    fontSize: 26,
    fontFamily: FontFamily.sourceSansProSemibold,
    textAlign: 'center',
    marginBottom: 10
  },
  textInput2: {
    marginBottom: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    fontSize: moderateScale(14),
    width: horizontalScale(330),
    height: verticalScale(63),
    margin: 0,
    color: theme.colors.dg,
    alignSelf: 'center',
    backgroundColor: theme.colors.slate,
    borderRadius: horizontalScale(23),
    borderWidth: 1,
    borderColor: theme.colors.slate,
    fontFamily: FontFamily.sourceSansProRegular
  },
  textInput: {
    paddingHorizontal: horizontalScale(20),
    fontSize: moderateScale(14),
    margin: 0,
    width: '80%',
    color: theme.colors.dg,
    fontFamily: FontFamily.sourceSansProRegular
  },
  inputCont: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.slate,
    borderColor: theme.colors.tabColor,
    borderWidth: 1,
    alignItems: 'center',
    width: horizontalScale(330),
    height: verticalScale(63),
    borderRadius: horizontalScale(23),
  }
}));

export default JoinNow;