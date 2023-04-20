import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
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


const CELL_COUNT = 4;
let error_color='#B0EBBD';
const VerifyEmail = ({navigation}) => {
  const user= useSelector((state)=>state.user.user)
    const [getEmailConfirm,{isSuccess,isLoading,data,isError}]= useGetEmailConfirmMutation()
    const [getPhoneConfirm]= useGetPhoneConfirmMutation()
  console.log(isSuccess);
  const [value, setValue] = useState('');
  const [wrong,setwrong] =useState('')
  const [count,setcount]=useState(0)
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [modalVisible, setModal] = useState(false);
  console.log(user)
  useEffect(() => {
    console.log(data);
    isError ? error_color ='red': ''
    if (isSuccess) {
      setModal(true);
      getPhoneConfirm({
        scope: 'user',
        phone: user.phone
      })
      setTimeout(() => {
        setModal(false);
        navigation.navigate('VerifyNumber');
      }, 4000);
    } 
    else  if (!isSuccess){
      console.log("pin wrong")
      
    }
  }, [isSuccess, navigation,handleSubmit]);

  const incall=()=>{
   error_color='red'

  }

  const handleSubmit = async () => {
    console.log(typeof value, value.length);
    
    if (value.length < 4) {
      alert('Please enter a valid code');
      return;
    }
    setcount(count+1)
    const age= await getEmailConfirm(value).then(()=>{
      isError && incall()
    });

  };
  return (
    <>
      <SafeAreaView style={styles1.root}>
        <Header
          main={'Verify Your Email'}
          sub={'Please enter the 4 digit code sent'}
          sub2={'to your email'}
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
            
            <Text
              key={index}
              style={[isError? styles1.wrong :styles1.cell, isFocused && styles1.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
         <Text style={[colors.lg, styles.bold, styles.tc]}>
         {wrong}
        </Text>
        <Text
          style={[colors.dg, styles.mt100, styles.tc,{fontFamily:FontFamily.sourceSansProSemibold}]}
          onPress={() => console.log('h')}>
          Resend Code
        </Text>

        <Text> </Text>
        <TouchableOpacity>
          <Button
            title="Verify Your Email"
            onPress={handleSubmit}
            loading={isLoading}
            buttonStyle={styles.button}
          />
        </TouchableOpacity>
          
        <Text style={[colors.lg, styles.bold, styles.tc]}>
          Change Phone Number
        </Text>

        <Pop
          main={'You have Succesfully verified your Email'}
          modal={modalVisible}
        />
      </SafeAreaView>
      {modalVisible && <Blur />}
    </>
  );
};

const styles1 = StyleSheet.create({
  root: {flex: 1, padding: 10,marginHorizontal:40},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 65,
    height: 66,
    lineHeight: 38,
    fontSize: 30,
    color: '#00463C',
    borderWidth: 2,
    borderColor:  error_color,
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
    borderColor: 'red',
  },
});
export default VerifyEmail;
