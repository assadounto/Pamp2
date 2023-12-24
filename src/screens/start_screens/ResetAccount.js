import React, {useState, useEffect} from 'react';
import { Animated, Easing } from 'react-native';
import { useResendEmailMutation, useVerifyPhoneMutation } from '../../redux/authapi';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  Alert,
} from 'react-native';
import Header from './header';
import {styles, colors} from '../../Common_styles';
import {Button} from '@rneui/base';
import Pop from './pop';
import Blur from './Blur';
import {useGetEmailConfirmMutation,useGetPhoneConfirmMutation} from '../../redux/authapi';
import { useSelector } from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { FontFamily } from '../../GlobalStyles';
import { useLazyVerifyResetCodeQuery } from '../../redux/authapi';
import BHeader from '../../../components/BHeader';
import { useLazyForgotAccountQuery } from '../../redux/authapi';
import Pop2 from './pop2';
const CELL_COUNT = 4;
let error_color='#B0EBBD';
const ResetAccount = ({navigation,route}) => {
  const { datas } = route?.params || {};
  const[ forgotAccount,{}]= useLazyForgotAccountQuery()

  const [shakeAnimation] = useState(new Animated.Value(0));

  const user= useSelector((state)=>state.user.userInfo)
    const [getEmailConfirm,{isSuccess,isLoading,data,isError}]= useGetEmailConfirmMutation()
    const [verify]= useLazyVerifyResetCodeQuery()
    const [VerifyResetCode,{data: infodata, isSuccess: verifySuccess,isError:verifyError}] = useLazyVerifyResetCodeQuery()
  console.log(user,'k');
  const [value, setValue] = useState('');
  const [wrong,setwrong] =useState('')
  const [error,seterror]=useState(false)
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [modalVisible, setModal] = useState(false);
  const [timerCount, setTimerCount] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  console.log(user)
  

  const incall=()=>{
   seterror(true)
   shakeAnimationStart();

  }
  const startTimer = () => {
     resend()
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
  
  const handleSubmit = async () => {
    console.log(typeof value, value.length);
   try{
    const {data}= await VerifyResetCode({
        email: datas.email,
        token: value
      })
      console.log(data)
      if(data.status=='ok'){
        setModal(true);
    
      setTimeout(() => {
        setModal(false);
        // next? navigation.navigate(next):
         navigation.navigate('PassReset',{datas:{
            email:datas.email,
            token: value
         }});
      }, 4000);
      } else{
       incall()
      }
      
   }catch(e){

  console.log(e.response.data)
   }
    
    
     
      }
   
const resend=()=>{
    forgotAccount({
        method: datas.method,
        email: datas.email
      })
}

  const styles1 = StyleSheet.create({
    root: {flex: 1, padding: 10,marginHorizontal:40},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20,marginHorizontal:40,
      transform: [
        {
          translateX: 1,
        },
      ],
    },
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
      borderColor: '#00463C',
    },
  });


  return (
    <>
      <View style={{}}>
      <Header
          main={'Reset your password'}
          sub={`Please enter the 4 digit code sent`}
        sub2={`to your ${datas.method}`}
        />
      

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue  }
          cellCount={CELL_COUNT}
          rootStyle={styles1.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
          
            <Animated.Text
            
              key={index}
              style={[
               styles1.cell,
                isFocused  && styles1.focusCell,
                {
                  transform: [
                    {
                      translateX: shakeAnimation.interpolate({
                        inputRange: [-1, 1],
                        outputRange: [-10, 10],
                      }),
                    },
                  ],
                },
              ]}              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Animated.Text>
          )}
        />
      
      <Text
  disabled={timerActive}
  style={[colors.dg, styles.mt100, styles.tc, { fontFamily: FontFamily.sourceSansProSemibold }]}
  onPress={startTimer}
>
  {timerActive ? `Resend Code (${timerCount}s)` : 'Resend Code'}
</Text>

<Text> </Text>
        <TouchableOpacity>
          <Button
            title="Verify Code"
            onPress={handleSubmit}
            loading={isLoading}
            buttonStyle={[styles.button,{width:300}]}
          />
        </TouchableOpacity>
          
       
        <Pop2
          main={'Reset code verified successfully'}
          modal={modalVisible}
        />
      </View>
      {modalVisible && <Blur />}
    </>
  );
};

export default  ResetAccount;