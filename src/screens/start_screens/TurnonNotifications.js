import React, {useState} from 'react';
import {View, ImageBackground, Text, StyleSheet, Pressable} from 'react-native';
import {FontFamily} from '../../../GlobalStyles';
import {setNotification} from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/user';
import pop2 from './pop';
import Blur from './Blur';
import Pop2 from './pop2';
import {useGetCategoriesQuery} from '../../redux/authapi';
const Turnon = ({navigation}) => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.user.notifications);
  const user = useSelector(state => state.user.user);
  const [modalVisible, setModal] = useState(false);

  const notify = () => {
    dispatch(setNotification(true));
    setModal(true);
    setTimeout(() => {
      setModal(false);
     
      dispatch(login({user: user}));
    }, 4000);
   
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Group2.png')}
        style={styles.c1}>
        <ImageBackground
          source={require('../../../assets/notification-bell1.png')}
          style={styles.c3}
        />
        <View style={styles.c2}>
          <Text
            style={[
              {
                fontFamily: FontFamily.sourceSansProSemibold,
                fontSize: 31,
                alignSelf: 'center',
                marginTop: 40,
                color: '#00463C',
              },
            ]}>
            Turn on notifications
          </Text>
          <Text style={styles.c5}>
            Don't miss appointments, promos and exclusive offers.{' '}
          </Text>

          <Pressable style={styles.c6} onPress={notify}>
            <Text style={styles.c7}>Turn on</Text>
          </Pressable>
          <Pressable onPress={()=>dispatch(login({user: user}))}>
            <Text style={styles.cl}>Maybe later</Text>
          </Pressable>
        </View>
      </ImageBackground>
      {notification && (
        <Pop2 main={'Notification sucessfully turned on'} modal={modalVisible} />
      )}
      {modalVisible && <Blur />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
  c1: {width: '100%', height: '100%'},
  c2: {
    width: '90%',
    height: '35%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
    top: 400,
    borderRadius: 20,
  },
  c3: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    position: 'absolute',
    top: 120,
  },
  c4: {
    marginTop: 20,
    width: 170,
    height: 100,
    alignSelf: 'center',
  },
  c5: {
    alignSelf: 'center',
    width: 220,
    textAlign: 'center',
    color: '#00463C',
    padding: 10,
    fontSize: 15,
  },
  c6: {
    alignSelf: 'center',
    borderRadius: 23,
    backgroundColor: '#86D694',
    width: 150,
    height: 50,
    marginTop: 30,
  },
  c7: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    padding: 10,
  },
  cl: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontFamily: FontFamily.sourceSansProRegular,

    color: '#00463C',
  },
});
export default Turnon;
