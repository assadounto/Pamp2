import React, { useState } from 'react';
import { View, Text, Pressable,ScrollView,Image} from 'react-native';
import { styles ,colors} from '../src/Common_styles';

export default function Staff({ data, onSelect }) {
  const [userOption, setUserOption] = useState('');
   
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <ScrollView horizontal={true} contentContainerStyle={{ marginLeft: 10 }} showsHorizontalScrollIndicator={false}>
          {data.map((item) => {
              return (

                  <View style={{display:'flex',flexDirection:'column',marginRight:20}}>
                      <Pressable
                          style={item.name === userOption ? { borderWidth: 5, borderRadius: 50, borderColor: colors.lg.color ,marginBottom:10} : { borderWidth: 5,  borderColor: '#ffffff',borderRadius: 50 ,marginBottom:10}}
                          onPress={() => selectHandler(item.name)}>
                          <Image
                              source={require('../assets/ellipse-132.png')}
                              style={{ width: 90, height: 90, borderRadius: 50 }} />

                      </Pressable>
                      <Text style={{textAlign:'center',color:colors.dg.color}}
                      > {item.name}</Text></View>

              );
          })}
      </ScrollView>
  );
}