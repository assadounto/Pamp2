import React, { useState } from 'react';
import { View, Text, Pressable,ScrollView} from 'react-native';
import { Icon } from '@rneui/base';
import { styles ,colors} from '../src/Common_styles';

export default function Categories({ data, onSelect}) {
  const [userOption, setUserOption] = useState();
   
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View  style={{marginLeft:10,display:'flex',flexDirection:'row',flexWrap:'wrap'}}>  
      {data.map((item,id) => {
        return (
           
          <Pressable
            style={
              item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.value)}>
              
            <Text style={[styles.option,   item.value === userOption ? colors.w: colors.dg]}>  {id==0 &&<Icon
       style={{marginTop:1}}
       name= 'star'
       type="feather"
      size={15}
      color='#BCC4CC'
      onPress={()=> setModalVisible(true)}
      />}{item.value}</Text>
          </Pressable>
       
        );
      })}
    </View>
  );
}