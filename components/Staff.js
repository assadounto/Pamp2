import React, { useState } from 'react';
import { View, Text, Pressable,ScrollView,Image, StyleSheet} from 'react-native';
import { styles ,colors} from '../src/Common_styles';
import FastImage from 'react-native-fast-image';
export default function Staff({ data, onSelect }) {
  const [userOption, setUserOption] = useState('');
  const [prev, setPrev] = useState('');

  const selectHandler = value => {
    if (prev === value) {
      setUserOption('');
      onSelect('');
      setPrev('');
      return;
    } else {
      setUserOption(value);
      onSelect(value);
      setPrev(value);
    }
  };
  return (
    <ScrollView horizontal={true} contentContainerStyle={{ marginLeft: 10 }} showsHorizontalScrollIndicator={false}>
          {data.map((item) => {
              return (

                  <View style={{display:'flex',flexDirection:'column',marginRight:20}}>
                      <Pressable
                          style={item.name === userOption ? { borderWidth: 5, borderRadius: 50, borderColor: colors.lg.color ,marginBottom:10} : { borderWidth: 5,  borderColor: '#ffffff',borderRadius: 50 ,marginBottom:10}}
                          onPress={() => selectHandler(item.name)}>
                              <FastImage
                              source={{uri: item.image, headers: { Authorization: 'someAuthToken' },
                              priority: FastImage.priority.normal,}}
                              style={s_style.image} 
                              />
                      </Pressable>
                      <Text style={{textAlign:'center',color:colors.dg.color}}
                      > {item.name}</Text></View>

              );
          })}
      </ScrollView>
  );
}

const s_style= StyleSheet.create({

 image: { width: 90, height: 90, borderRadius: 50 }
})


