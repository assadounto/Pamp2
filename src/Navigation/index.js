import React from 'react';
import {useSelector} from 'react-redux';
import ApplicationNavigator from './Application';
import AuthNavigator from './AuthNavigator';
import VerificationStack from './VerificationStack';
const Navigator_index = () => {
  const {userInfo, userToken, email_confirmed} = useSelector(
    state => state.user,
  );
  // if (userInfo && userToken) {
  //   if (!email_confirmed) {
  //     return <VerificationStack />;
  //   }
    return <ApplicationNavigator />;
    
  // }
  // return <AuthNavigator />;
};

export default Navigator_index;
