import React from 'react';
import { Text, View,Alert, StyleSheet, SafeAreaView, Image, Modal, Pressable, FlatList } from 'react-native';
import { FontFamily } from '../src/GlobalStyles';
import { styles, colors } from '../src/Common_styles';
import { ListItem } from '@rneui/base';
import { generateTimeRange } from '../src/Functions';

const Opening = ({ data, modal, setModal }) => {
  function sortOpeningHours(openingHours) {
    const getDayIndex = (day) => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
  
    // Create a new array with the sorted opening hours
    const sortedOpeningHours = [...openingHours].sort((a, b) => getDayIndex(a.day) - getDayIndex(b.day));
  
    // Convert the sortedOpeningHours to JSON
    return sortedOpeningHours;
  }
  return (
    <>
      <Modal  animationType="slide" transparent={true} visible={modal}>
       <View style={{         alignSelf: 'center',  position:'absolute',bottom:30,      width: '95%',}} >
        <View style={[ { alignItems: 'center',
           
            backgroundColor: 'white',
        
            height: 54,
            borderRadius: 18,
      
   
           height: 400 }]}>
          <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
            style={md_style.momo_cont}
            data={sortOpeningHours(data)}
            renderItem={({ item }) => (
              <ListItem  style={{borderBottomColor:'#B0EBBD',borderBottomWidth:1}}>
                <Text style={md_style.text2}>{item.day}</Text>
                <ListItem.Content>
                  
                </ListItem.Content>
                {item.opening_time && item.closing_time && item.opened ?  (
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
            width: '100%',
            alignSelf: 'center',
          }}
          onPress={() => setModal(false)}
        >
          <Text style={md_style.text}>BACK</Text>
        </Pressable>
        </View>
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
