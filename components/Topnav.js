import { useTheme } from '@rneui/themed';
import { Badge } from '@rneui/themed';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { horizontalScale, verticalScale } from '../src/Dimensions';
import MessageIcon from './icons/Message';
import { FontFamily } from '../GlobalStyles';

function MyTabBar({ state, descriptors, navigation, width, badge }) {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: verticalScale(20), marginHorizontal: horizontalScale(20), marginTop: verticalScale(10) }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={[width && { width: '100%', display: 'flex', flexDirection: 'row' }]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
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
              console.log('Tab Pressed:', route.name);
            }
          };

          return (
            <Pressable
              key={index}
              onPress={onPress}
              style={[width && { flexDirection: 'row', flex: 1 },
              { marginTop: 10, alignSelf: 'center', width: width && width },
              isFocused
                ? {
                  backgroundColor: theme.colors.activeTabBg,
                  borderRadius: 20,
                  paddingHorizontal: horizontalScale(12),
                  height: verticalScale(34),
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginLeft: 10,
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
                  justifyContent: 'space-around',
                },
              ]}
            >
              {label === 'Messages' && badge && (
                <Badge
                  badgeStyle={{ width: 12, height: 12, borderRadius: 50 }}
                  status="warning"
                  containerStyle={{ position: 'absolute', left: 10, top: -6 }}
                />
              )}

              <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {label === 'Messages' && <MessageIcon color={theme.colors.dg} />}
                <Text
                  style={{
                    color: isFocused ? '#FFFFFF' : theme.colors.dg,
                    marginLeft: 5,
                    fontSize: 13,
                    fontFamily: FontFamily.sourceSansProRegular,
                  }}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default MyTabBar;
