import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Modal, Pressable, FlatList } from 'react-native';
import { FontFamily } from '../src/GlobalStyles';
import { styles, colors } from '../src/Common_styles';
import { ListItem } from '@rneui/base';

const Opening = ({ data, modal, setModal }) => {
    console.log(data)
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={[ { alignItems: 'center',
            
            backgroundColor: 'white',
            marginTop: 10,
            height: 54,
            borderRadius: 18,
            width: '95%',
            alignSelf: 'center', 
            marginTop: '90%', paddingTop: 20, height: 390 }]}>
          <FlatList
            style={md_style.momo_cont}
            data={data}
            renderItem={({ item }) => (
              <ListItem style={{borderBottomColor:'#B0EBBD',borderBottomWidth:1}}>
                <Text style={md_style.text}>{item.day}</Text>
                <ListItem.Content>
                  
                </ListItem.Content>
                {item.opening_time && item.closing_time ? (
                    <Text style={md_style.text}>
                      {item.opening_time} - {item.closing_time}
                    </Text>
                  ) : (
                    <Text style={md_style.text}>Closed</Text>
                  )}
              </ListItem>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginTop: 10,
            height: 54,
            borderRadius: 18,
            width: '95%',
            alignSelf: 'center',
          }}
          onPress={() => setModal(false)}
        >
          <Text style={md_style.text}>BACK</Text>
        </Pressable>
      </Modal>
    </>
  );
};

export default Opening;

const md_style = StyleSheet.create({
  momo_cont: {
    borderRadius:20,
    width: '90%',
    paddingHorizontal:10,
   marginBottom:30
  },
  info: {
    borderBottomColor: '#B0EBBD',
    borderBottomWidth: 0.5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 16,
    color: '#00463C',
  },
});
