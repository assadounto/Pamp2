import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Animated, Easing } from 'react-native';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Header from './header';
import {styles, colors} from '../../Common_styles';
import {Button} from '@rneui/base';
import Pop from './pop';
import Blur from './Blur';
import { useVerifyPhoneMutation } from '../../redux/authapi';
import { useGetPhoneConfirmMutation } from '../../redux/authapi';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export const styles1 = StyleSheet.create({
  root: {flex: 1, padding: 20,marginHorizontal:41},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20,transform: [
        {
          translateX: 1,
        },
      ],},
  cell: {
    width: 65,
    height: 66,
    lineHeight: 38,
    fontSize: 30,
    color: '#00463C',
    borderWidth: 2,
    borderColor: '#B0EBBD',
    textAlign: 'center',
    borderRadius: 15,
    padding: 15,
  },
  wrong: {
      width: 65,
      height: 66,
      lineHeight: 38,
      fontSize: 30,
      color: '#00463C',
      borderWidth: 2,
      borderColor:  'red',
      textAlign: 'center',
      borderRadius: 15,
      padding: 15,
    },
  focusCell: {
    borderColor: '#000',
  },
  dim: {
    backgroundColor: '#463C3C',
  },
});

const CELL_COUNT = 4;

const VerifyNumber = ({navigation}) => {
    const [shakeAnimation] = useState(new Animated.Value(0));

    const user= useSelector((state)=>state.user.user)
   const [timerCount, setTimerCount] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [getPhoneConfirm]= useGetPhoneConfirmMutation()
  const [verifyPhone,{isSuccess,isLoading,data,isError}]= useVerifyPhoneMutation()
  const [value, setValue] = useState('');
  const [wrong,setwrong] =useState('')
  const [finish,setfinish]=useState(false)
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [modalVisible, setModal] = useState(false);
  React.useEffect(() => {
    console.log(data);
    if (isSuccess) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
        navigation.navigate('noti');
      }, 4000);
    } 
    else  if (!isSuccess){
      console.log("pin wrong")
      
    }
  }, [isSuccess, navigation,handleSubmit]);
  const incall=()=>{
    shakeAnimationStart()

  }


  const shakeAnimationStart = () => {
    shakeAnimation.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  };


  const startTimer = () => {
    getPhoneConfirm({
        scope: 'user',
        phone: user.phone
      })
   if (!timerActive) {
    

     setTimerActive(true);
     setTimerCount(60);
     // Start the timer countdown
     const interval = setInterval(() => {
       setTimerCount((prevCount) => prevCount - 1);
     }, 1000);
 
     // Stop the timer when it reaches 0
     setTimeout(() => {
       clearInterval(interval);
       setTimerActive(false);
     }, 60000);
   }
 };


  const handleSubmit = async () => {
    console.log(typeof value, value.length);
    
    if (value.length < 4) {
      alert('Please enter a valid code');
      return;
    }
    const phone = await verifyPhone(value).then(()=>{
      isError && incall()
    });

  };
  return (
    <>
      <SafeAreaView style={[styles1.root]}>
        <Header
          main={'Verify Phone Number'}
          sub={'Please enter the 4 digit code sent'}
          sub2={'to ypur phone number'}
        />
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles1.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Animated.Text
              key={index}
              style={[styles1.cell, isFocused && styles1.focusCell,{
                transform: [
                  {
                    translateX: shakeAnimation.interpolate({
                      inputRange: [-1, 1],
                      outputRange: [-10, 10],
                    }),
                  },
                ], 
              }]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Animated.Text>
          )}
        />
        <Text
         disabled={timerActive}
          style={[colors.dg, styles.mt100, styles.tc]}
          onPress={startTimer}>
         {timerActive ? `Resend Code (${timerCount}s)` : 'Resend Code'}
        </Text>

        <Text> </Text>
        <TouchableOpacity>
          <Button
            title="Verify Phone Number"
            onPress={() => {
              handleSubmit()
            }}
            loading={isLoading}
            buttonStyle={styles.button}
          />
        </TouchableOpacity>

        <Text style={[colors.lg, styles.bold, styles.tc]}>
          Change Phone Number
        </Text>
        <Pop
          main={'You have Succesfully verified your Phone Number'}
          modal={modalVisible}
        />
      </SafeAreaView>
      {modalVisible && <Blur />}
    </>
  );
};

export default VerifyNumber;
