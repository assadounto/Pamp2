import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Header, Image } from '@rneui/base';
import { ListItem, Icon } from '@rneui/base';
import { useSelector } from 'react-redux';

import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { formatDateToAgo } from '../src/Functions';



const WithdrawalCard = ({ item }) => {
  const location = useSelector(state => state.user.location)

  const { theme } = useTheme();

  return (
    <View style={{ marginHorizontal: 25, marginBottom: 15 }}>
      <ListItem
        containerStyle={[{ borderRadius: 30, paddingVertical: 20, backgroundColor: theme.colors.slate }]}
        onPress={() => {

        }}>
        {
          <Icon style={{ marginLeft: 5 }} name='smartphone' color={colors.dg2.color} type="feather" />
        }


        <ListItem.Content>
          <ListItem.Title style={[{ color: theme.colors.dg, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 14 }]}>
            {item?.status || 'pending'}
          </ListItem.Title>
          <ListItem.Title style={[{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 10, color: theme.colors.dg, }]}>
            {formatDateToAgo(item?.created_at)}
          </ListItem.Title>
        </ListItem.Content>
        <Text style={[{ color: theme.colors.dg, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 20 }]}>{`${location.currency || "₵"}${item?.amount}`}</Text>
      </ListItem>

    </View>
  );
};

// THeader.propTypes = {
//   back: PropTypes.bool,
//   subtitle: PropTypes.string,
//   title: PropTypes.string.isRequired,
// };

// THeader.defaultProps = {
//   subtitle: '',
//   back: true,
// };

export default WithdrawalCard;
