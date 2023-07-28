import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Modal, Pressable, FlatList } from 'react-native';
import { FontFamily } from '../src/GlobalStyles';
import { styles, colors } from '../src/Common_styles';
import { ListItem } from '@rneui/base';
import { generateTimeRange } from '../src/Functions';

const Opening = ({ data, modal, setModal }) => {
   
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
            marginTop: '90%', paddingTop: 20, height: 400 }]}>
          <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
            style={md_style.momo_cont}
            data={data}
            renderItem={({ item }) => (
              <ListItem style={{borderBottomColor:'#B0EBBD',borderBottomWidth:1}}>
                <Text style={md_style.text2}>{item.day}</Text>
                <ListItem.Content>
                  
                </ListItem.Content>
                {item.opening_time && item.closing_time ? (
                    <Text style={md_style.text}>
                     {generateTimeRange(item.opening_time,item.closing_time)}
                    </Text>
                  ) : (
                   <View style={{paddingTop:2, backgroundColor:'#CD3D49',borderRadius:22, width:90,height:24,alignItems:'center'}}><Text style={[md_style.closed]}>Closed</Text></View>
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
   marginBottom:30,
   
  },
  info: {
    borderBottomColor: '#B0EBBD',
    borderBottomWidth: 0.5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
 
    fontSize: 16,
    color: '#00463C',
    fontFamily: FontFamily.sourceSansProBold,
  },
  closed:{
    color: 'white',
    fontFamily: FontFamily.sourceSansProBold,
  },
  text2:{
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 16,
    color: '#00463C',
  }
});
