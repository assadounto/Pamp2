import { useTheme } from '@rneui/themed';
import React ,{useState}from 'react';
import {
    View,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Pressable,
    Modal,
    TextInput,
  
    Keyboard,
    Text,Image, Alert, Platform
  } from 'react-native';
  import { styles,colors } from '../src/Common_styles';
  import {Avatar, Icon, CheckBox, Button} from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { showBottom } from '../src/redux/user';
import CheckBoxComponent from './Checkbox';
import axios from 'axios';
import { backendURL } from '../src/services/http';
import { userLogout } from '../src/redux/user';
import { verticalScale } from '../src/Dimensions';
import { useNavigation } from '@react-navigation/core';
const Delete_modal=({modal,setModal})=>{
  const { theme } = useTheme();
const navigation= useNavigation()
      const[loading,setloading]=useState(false)
      const user= useSelector(state=>state.user.userInfo)
      const [reason1, setReason1] = useState(false);
      const [reason2, setReason2] = useState(false);
      const [reason3, setReason3] = useState('');
    const dispatch=useDispatch()
    const [toph,setpop]=useState(40)
    const handlepressCancel=()=>{
        dispatch(showBottom(true))
          setModal(false)
          }

          const handlePressOK=async()=>{
           setloading(true)
           try{
             await axios.post(`${backendURL}/user/delete`,{id:user.id,reason1,reason2,reason3})
            
            setloading(false)
            setTimeout(() => {
              dispatch(userLogout());
              setModal(false)
            navigation.navigate('main')
              }, 2000);
           } catch(e){
            setloading(false)

            Alert.alert('Error', 'Something went wrong. Please try again later');
           }
           
            }

          React.useEffect(() => {
            const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
              setpop(Platform.OS==='ios'?verticalScale(320): verticalScale(30))
            });
        
            const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                setpop(40)
            });
        
return () => {
              keyboardDidShowListener.remove();
              keyboardDidHideListener.remove();
            };
          }, []);
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={
            handlepressCancel
        }>
        <View style={[ {position:'absolute', alignItems:'center',alignSelf:'center',borderRadius:20,width:'90%', bottom:toph, backgroundColor: theme.colors.card}]}>
          <Pressable
            onPress={handlepressCancel}
            style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 20}}>
            <Icon
              name="x"
              type="feather"
              size={30}
              color={theme.colors.dg}
              onPress={ handlepressCancel}
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
                { color: theme.colors.dg }
              ]}>
              Are you sure you want to leave Pamp?
            </Text>
            <Text
              style={[
                colors.dg2,
                styles.fs18,
                styles.tac,
                ,
                styles.mb20,
                styles.bold,
              {color:theme.colors.dg}]}>
              Tell us why
            </Text>
          </View>
          <View style={{width: 260}}>
            <CheckBoxComponent
             height={22}
             width={22}
            
             title={'I do not like the app'}
              state={reason1}
              onPress={()=>setReason1(!reason1)}
            />
            <CheckBoxComponent
               containerWidth={300}
               width={22}
               height={22}
               title={'I cannot find good vendors'}
              state={reason2}

              onPress={()=>setReason2(!reason2)}
            />
          </View>

          <TextInput
            style={{
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              borderColor: theme.colors.tabColor,
              padding: 10,
              color:theme.colors.dg,
              marginTop: 30,
              marginBottom: 40,
            }}
            placeholderTextColor={theme.colors.placeholder}
            placeholder={'other reason'}
            onChangeText={text => {
              console.log(reason3);
              setReason3(text);
            }}
          />
          <Button
          loading={loading}
            title="Confirm"
            onPress={handlePressOK}
            buttonStyle={{
              backgroundColor: '#CD3D49',
              width: 150,
              borderRadius: 40,
              height: 40,
              marginBottom: 20,
            }}
          />
        </View>
      </Modal>
    )
}

export default Delete_modal