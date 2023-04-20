import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {Header} from '@rneui/base';



const THeader = ({title}) => {
  const {Fonts, Colors, Common} = useTheme();

  return (
    <Header
      containerStyle={[
        {
          backgroundColor: Colors.mediumLight,
        },
      ]}>
      <Text
        style={[
          Fonts.textLeft,
          Fonts.textRegular,
          Common.text.bold,
          Common.text.primary,
          {
            width: 100,
          },
        ]}>
        {title}
      </Text>
    </Header>
  );
};

THeader.propTypes = {
  back: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

THeader.defaultProps = {
  subtitle: '',
  back: true,
};

export default THeader;
