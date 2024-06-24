import React from 'react';
import { Image } from 'react-native';
import { Text, View, Pressable } from 'react-native';
import { styles, colors } from '../../Common_styles';
import { FontFamily } from '../../GlobalStyles';
import chart from '../../../assets/chat.png'
import { useTheme } from '@rneui/themed';
import { formatDate } from '../../Functions';
import SvgUri from 'react-native-svg-uri';
const Completed = ({ data }) => {
  const { theme } = useTheme()
  const [color, usecolor] = React.useState('#F9B015')
  return (
    <Pressable onPress={() => usecolor('red')}>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 40,
          gap: 10

        }} >
        <Image source={chart} style={{ marginTop: 10 }} />

        <View>
          <View style={{
            display: 'flex',
            flexDirection: 'row', gap: 5,
          }}>
            {!data.read &&
              <View style={{ width: 9, height: 9, borderRadius: 50, backgroundColor: color, marginTop: 5 }}></View>
            }

            <Text style={[ { color: theme.colors.dg, fontFamily: FontFamily.sourceSansProBold, fontSize: 17 }]}>{data.title}</Text>
          </View>
          <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: "#999999", width: 300 }}>{data.body}</Text>
          <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: theme.colors.dg, marginTop: 5 }}>{formatDate(data.created_at)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Completed;
