import React, { useState } from 'react';
import { View, Text, Pressable,ScrollView, StyleSheet} from 'react-native';
import { Icon } from '@rneui/base';
import { colors} from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';

export default function Categories({ data, onSelect}) {
  const [userOption, setUserOption] = useState();
   
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View  style={{marginTop:20,alignSelf:'center',width:'90%', marginLeft:10,display:'flex',flexDirection:'row',flexWrap:'wrap'}}>  
      {data.map((item,id) => {
        return (
           
          <Pressable
            style={[
              item.value === userOption ? styles.selected : styles.unselected
            ,{display:'flex',flexDirection:'row'}]}
            onPress={() => selectHandler(item.value)}>
              {id==0 &&<Icon
       style={{}}
       name= 'star'
       type="feather"
      size={15}
    color={item.value === userOption? 'white' : '#BCC4CC'}
      onPress={()=> setModalVisible(true)}
      />}
            <Text style={[styles.option,   item.value === userOption ? colors.w: colors.dg]}>  {item.value}</Text>
          </Pressable>
       
        );
      })}
    </View>
  );
}
const styles=StyleSheet.create({
  option: {
    fontSize: 13,
    fontFamily: FontFamily.sourceSansProRegular,
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'white',
    borderRadius: 20,
    height:34,
    padding:8,
    marginBottom:15,
    borderColor:colors.dg2.color,
    borderWidth: 1,
    marginLeft:10

  },
  selected: {
    backgroundColor: colors.dg2.color,
    borderRadius: 20,
    color: 'white',
    height:34,
    padding:8,
    marginBottom:15,
    marginLeft:10
  },
})