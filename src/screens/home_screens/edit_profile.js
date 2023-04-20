import React from 'react';
import BHeader from '../../../components/BHeader';
import {colors, styles} from '../../Common_styles';
import {View, TextInput, Text, ScrollView, SafeAreaView} from 'react-native';
import {Button} from '@rneui/base';

const Edit_profile = () => {
  return (
    <SafeAreaView style={[styles.EP]}>
      <BHeader title="Edit info" color={colors.bw} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={[styles.P1, {paddingHorizontal: 20}]}>First name</Text>
        <TextInput style={[styles.EI]} />
        <Text style={[styles.P1, {paddingHorizontal: 20}]}>Last name</Text>
        <TextInput style={[styles.EI]} />
        <Text style={[styles.P1, {paddingHorizontal: 20}]}>Phone number</Text>
        <TextInput style={[styles.EI]} />
        <Text style={[styles.P1, {paddingHorizontal: 20}]}>Email Addresss</Text>
        <TextInput style={[styles.EI]} />
        <Text style={[styles.P1, {paddingHorizontal: 20}]}>Date of birth</Text>
        <TextInput style={[styles.EI]} />
        <Text style={[styles.P1, {paddingHorizontal: 20}]}>Gender</Text>
        <TextInput style={[styles.EI]} />
        <Text style={[styles.P1, {paddingHorizontal: 20}]}>Address</Text>
        <TextInput style={[styles.EI]} />
        <Button
          title="Save"
          buttonStyle={{
            backgroundColor: '#86D694',
            width: '50%',
            borderRadius: 20,
            alignSelf: 'center',
            height: 50,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Edit_profile;
