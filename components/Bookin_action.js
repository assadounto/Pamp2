import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontFamily } from '../src/GlobalStyles';
import { styles, colors } from '../src/Common_styles';
import Cancel_pop from './Cancel_pop';
import Notes_pop from './Notes_pop';
import rebook from '../assets/rebook.png';
import rebook2 from '../assets/rebook5.png';
import note from '../assets/note.png';
import note2 from '../assets/note5.png';
import cancel1 from '../assets/cancel.png';
import cancel2 from '../assets/cancel5.png';
import { useSelector } from 'react-redux';
import MessageIcon from './icons/Message';
import MailIcon from './icons/Mail';
import { useNavigation } from '@react-navigation/core';
import Calender from './Calender';
import CalenderIcon from './icons/Calender';

const Booking_action = ({ info, setblur, rebk, data }) => {
  const navigation= useNavigation()
  const user = useSelector((state) => state.user.userInfo)

  const actionDictionary = {
    rebook: [ 'cancelled',  'declined', 'ongoing', 'no show'],
    notes: ['cancelled', 'completed', 'no show', 'declined'],
    cancel: ['cancelled', 'completed', 'no show', 'ongoing', 'declined'],
  };

  const disabledActions = actionDictionary.rebook.includes(data.status)
  const isNotesDisabled = actionDictionary.notes.includes(data.status);
  const isCancelDisabled = actionDictionary.cancel.includes(data.status);

  const [cancel_modal, setCancel] = useState(false);
  const [notes, setNotes] = useState(false);

  const md_style = useStyles();
  const { theme } = useTheme();
  return (
    <View style={md_style.cont}>
      <View>
        <TouchableOpacity
          disabled={disabledActions}
          style={[md_style.action, disabledActions && md_style.cancel]}
          onPress={() => rebk()}>
          <CalenderIcon style={{ width: 22, height: 22, alignSelf: 'center' }} color={disabledActions? theme.colors.disabled : theme.colors.lg} />

        </TouchableOpacity>
        <Text style={[md_style.text, disabledActions && { color: theme.colors.disabled }]}>Rebook</Text>
      </View>

      <View>
        <TouchableOpacity
         disabled={isNotesDisabled}
          style={[md_style.action, isNotesDisabled && md_style.cancel]}
          onPress={() => navigation.navigate('Chat', { vendor: data.vendor, userId:user.id, vendorId: data.vendor.id, userType:'user' })}
          >
          <MessageIcon style={{ width: 22, height: 22, alignSelf: 'center' } }color={isNotesDisabled?theme.colors.disabled:theme.colors.lg} />
        
        </TouchableOpacity>
        <Text style={[md_style.text, isNotesDisabled && { color: theme.colors.disabled }]}>Message</Text>
      </View>

      <View>
        <TouchableOpacity
          disabled={isCancelDisabled}
          style={[md_style.action, isCancelDisabled ? md_style.cancel : md_style.cancel_red]}
          onPress={() => {
            setblur(true);
            setCancel(true);
          }}>
          <CalenderIcon style={{ width: 22, height: 22, alignSelf: 'center' }} color={isCancelDisabled ?theme.colors.disabled:  "#cd3d49"} />
        </TouchableOpacity>
        <Text style={[md_style.text, isCancelDisabled&& {color: theme.colors.disabled}]}>Cancel</Text>
      </View>
      <Cancel_pop data={data} setblur={setblur} modal={cancel_modal} cancel={cancel_modal} setcancel={setCancel} />
      <Notes_pop id={data.id} setblur={setblur} modal={notes} setcancel={setNotes} />
    </View>
  );
};

export default Booking_action;

const useStyles = makeStyles((theme) => ({
  action: {
    borderColor: theme.colors.lgb,
    borderWidth: 1,
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
  },
  cancel: {
    borderColor: theme.colors.disabled,
  },
  cancel_red: {
    borderColor: '#CD3D49',
  },
  cont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 20,
  },

  text: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontFamily: FontFamily.sourceSansProSemibold,
    color: theme.colors.dg,
  },
}));
