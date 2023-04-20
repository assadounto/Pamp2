import React, { useState } from 'react';
import { View, Text, Pressable,ScrollView} from 'react-native';
import { styles ,colors} from '../src/Common_styles';

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(data[0].value);
   
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <ScrollView  horizontal={true} contentContainerStyle={{marginLeft:10}} showsHorizontalScrollIndicator={false}>  
      {data.map((item) => {
        return (
           
          <Pressable
            style={
              item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.value)}>
            <Text style={[styles.option,   item.value === userOption ? colors.w: colors.dg]}> {item.value}</Text>
          </Pressable>
       
        );
      })}
    </ScrollView>
  );
}