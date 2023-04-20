import React from 'react';
import {Text, View, SafeAreaView, Image, Modal, TextInput} from 'react-native';
import {styles, colors} from '../../Common_styles';
import {CheckBox, Button} from '@rneui/base';
import {Border} from '../../GlobalStyles';

const DelPop = ({main, modal}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={modal}>
      <View style={[styles.pop, {backgroundColor: 'gray'}]}>
        <Image
          source={require('../assets/x.png')}
          style={{alignSelf: 'flex-end',marginRight:20,marginTop:20}}
        />
        <View>
          <Text style={[colors.dgb, styles.fs18, styles.tac,styles.mb20]}>
            Are you sure you want to leave Pamp?
          </Text>
          <Text style={[colors.dgb, styles.fs18, styles.tac,,styles.mb20]}>Tell us why</Text>
          <CheckBox
            title={
              <Text style={[colors.dg, styles.terms]}>
                I don't like the app
              </Text>
            }
            checkedIcon={
              <View style={styles.checkc}>
                <Image
                  source={require('../../../assets/check3.png')}
                  style={styles.check}
                />
              </View>
            }
            //checked={receivePushNotifications}
            // onPress={() =>
            //  // setReceivePushNotifications(!receivePushNotifications)
            // }
          />
          <CheckBox
            title={
              <Text style={[colors.dg, styles.terms]}>
                Couldn't find vendors near me
              </Text>
            }
            checkedIcon={
              <View style={styles.checkc}>
                <Image
                  source={require('../../../assets/check3.png')}
                  style={styles.check}
                />
              </View>
            }
          />
        </View>
        <TextInput
          style={{
            borderWidth: 1,
            width: '80%',
            borderRadius: 10,
            borderColor: '#BBB9BC',
            padding:10,
            marginTop: 30,
            marginBottom:40

          }}
          placeholder={'other reason'}
        />
        <Button
          title="Confirm"
          buttonStyle={{
            backgroundColor: '#CD3D49',
            width: 200,
            borderRadius: 40,
            height: 60,
            marginBottom: 20
          }}
        />
      </View>
    </Modal>
  );
};

export default DelPop;
