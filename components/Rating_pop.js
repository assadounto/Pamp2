import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Modal, TextInput, Animated, Keyboard } from 'react-native';
import { Button } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import { Icon } from '@rneui/base';
import axios from 'axios';
import { delete_rating } from '../src/redux/user';
import StarRating from 'react-native-star-rating-widget';
import { backendURL } from '../src/services/http';
import { useDispatch, useSelector } from 'react-redux';

const Rating_pop = ({ setmodal, vendor, modal, setInfoModal }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [loading,setLoading]=useState(false)
  const [rating, setRating] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const user = useSelector((state) => state.user.userInfo)
  const handlepressCancel = () => {
    setmodal(!modal);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(translateY, {
        toValue: -e.endCoordinates.height , // Move the modal up by half of the keyboard height
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(translateY, {
        toValue: 0, // Move the modal back to its original position
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateY]);

  const handlePressOK = async () => {
    setLoading(true)
    const { data } = await axios.post(`${backendURL}/rating`, { id: user?.id, vendor_id: vendor[0], rating, description: text });
    console.log(data);
    if (data === 'created') {
      dispatch(delete_rating(vendor.id));
      setmodal(false);
      setInfoModal(true);
      setTimeout(() => {
        setInfoModal(false);
      }, 3000);
    }
    setLoading(false)
  };

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <Modal animationType="slide" transparent={true} visible={modal}>
      <Animated.View style={[styles.pop, { transform: [{ translateY }] }]}>
        <View style={styles.notes}>
          <Icon
            onPress={handlepressCancel}
            name='close-outline'
            type='ionicon'
            size={40}
            color={theme.colors.dg}
          />
        </View>
        <Text style={styles.rate}>Rate your experience with {vendor[1]} </Text>
        <StarRating
          starSize={40}
          starStyle={{ marginRight: 0 }}
          color='#86D694'
          rating={rating}
          onChange={setRating}
        />
        <TextInput
          placeholderTextColor={theme.colors.placeholder}
          placeholder='Leave a message'
          onChangeText={setText}
          multiline={true}
          style={styles.input}
          blurOnSubmit={true}  // This will dismiss the keyboard on return
          onSubmitEditing={Keyboard.dismiss}  // Dismiss the keyboard
        />
        <Button
        loading={loading}
          onPress={handlePressOK}
          buttonStyle={{
            borderRadius: 40,
            backgroundColor: theme.colors.lgb,
            width: 120,
            height: 40,
          }}
          title='Send'
        />
      </Animated.View>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  rate: {
    fontFamily: FontFamily.sourceSansProSemibold,
    color: theme.colors.dg,
    marginBottom: 20,
    fontSize: 20,
  },
  pop: {
    width: '100%',
    backgroundColor: theme.colors.slate,
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
    bottom:0,
    paddingBottom: 30,
    position: 'absolute',
  },
  notes: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  input: {
    width: '90%',
    height: 100,
    color: theme.colors.dg,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 10,
    marginVertical: 30,
  },
}));

export default Rating_pop;
