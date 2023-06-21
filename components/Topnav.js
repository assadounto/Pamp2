import { Animated, View, TouchableOpacity,Text,Pressable} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
function MyTabBar({state, descriptors, navigation}) {
    return (
        <View style={{marginBottom:20,marginLeft:20,marginTop:10}}>
      <ScrollView
      showsHorizontalScrollIndicator={false}

      horizontal={true}
      //style={{height:70,}}
     
      >
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
  
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
  
          return (
           
            <Pressable
            onPress={onPress}
                onLongPress={onLongPress}
              style={[
                {flexDirection: 'row'},
                isFocused
                  ? {
                      backgroundColor: '#86D694',
                      borderRadius: 20,
                     paddingHorizontal:12,
                      height:34,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginLeft:10
                    }
                  : {backgroundColor: 'white',
                  marginLeft:10,
                  borderRadius: 20,
                  paddingHorizontal:12,
                  height:34,
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderColor:'#B0EBBD',
    borderWidth: 1,
                  justifyContent: 'space-around'},
              ]}
              key={index}
             >
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                activeOpacity={0.8}
                disabled={isFocused}>
               
  
                {isFocused ?( 
                  <Text
                    style={{
                      color: '#FFFFFF',
                      marginLeft: 5,
                      fontSize: 13,
                      fontFamily: FontFamily.sourceSansProRegular,
                    }}>
                    {label}
                  </Text>
                ):<Text
                style={{
                  color: colors.dg.color,
                  marginLeft: 5,
                  fontSize: 13,
                  fontFamily: FontFamily.sourceSansProRegular,
                }}>
                {label}
              </Text>}
              </TouchableOpacity>
            </Pressable>
          );
        })}
     </ScrollView>
     </View>
    );
  }

// ...
export default MyTabBar