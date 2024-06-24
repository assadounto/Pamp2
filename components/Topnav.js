import { useTheme } from '@rneui/themed';
import { makeStyles, Badge } from '@rneui/themed';
import { Animated, View, TouchableOpacity, Text, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { horizontalScale, verticalScale } from '../src/Dimensions';
import MessageIcon from './icons/Message';
function MyTabBar({ state, descriptors, navigation, width ,badge}) {
  return (
    <View style={{ marginBottom: verticalScale(20), marginHorizontal: horizontalScale(20), marginTop: verticalScale(10) }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}

        horizontal={true}
      //style={{height:70,}}
      contentContainerStyle={[width&&{width:'100%', display:'flex',flexDirection:'row'}]}

      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

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



          const { theme } = useTheme();
          return (

            <Pressable
              onPress={onPress}
              onLongPress={onLongPress}
              style={[width&& { flexDirection: 'row', flex: 1, },
                {  marginTop:10, alignSelf: 'center', width: width && width },
                isFocused
                  ? {
                    backgroundColor: theme.colors.activeTabBg,
                    borderRadius: 20,
                    paddingHorizontal: horizontalScale(12),
                    height: verticalScale(34),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginLeft: 10
                  }
                  : {
                    backgroundColor: theme.colors.background,
                    marginLeft: 10,
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    height: verticalScale(34),
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderColor: theme.colors.tabColor,
                    borderWidth: 1,
                    justifyContent: 'space-around'
                  },
              ]}
              key={index}
            >
              {label==='Messages'  && badge&& <Badge
              badgeStyle={{ width: 12, height: 12, borderRadius: 50 }}
              status="warning"

              containerStyle={{ position: 'absolute',left:10, top: -6}} />}
             
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  {
                    gap:10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                activeOpacity={0.8}
                disabled={isFocused}>
                {
                  label === 'Messages' && <View style={{}} ><MessageIcon color={theme.colors.dg} /></View>

                }
                {isFocused ? (
                  <Text
                    style={{
                      color: '#FFFFFF',
                      marginLeft: 5,
                      fontSize: 13,
                      fontFamily: FontFamily.sourceSansProRegular,
                    }}>
                    {label}
                  </Text>
                ) : <Text
                  style={{
                    color: theme.colors.dg,
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