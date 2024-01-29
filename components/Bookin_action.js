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

const Booking_action = ({ info, setblur, rebk, data }) => {
  const actionDictionary = {
    rebook: ['confirmed',"rebook", 'booked',  'completed', 'unconfirmed','no show'],
    notes: ['cancelled', 'completed','no show','declined'],
    cancel: ['cancelled', 'completed','no show','ongoing','declined'],
  };

  const disabledActions = actionDictionary.rebook.includes(data.status) ? [] : ['rebook'];
  const isNotesDisabled = actionDictionary.notes.includes(data.status);
  const isCancelDisabled = actionDictionary.cancel.includes(data.status);

  const [cancel_modal, setCancel] = useState(false);
  const [notes, setNotes] = useState(false);

  return (
    <View style={md_style.cont}>
      <View>
        <TouchableOpacity
          disabled={disabledActions.includes('rebook')}
          style={[md_style.action, disabledActions.includes('rebook') && md_style.cancel]}
          onPress={() => rebk()}>
          <Image source={disabledActions.includes('rebook') ? rebook2 : rebook} style={{ width: 22, height: 22, alignSelf: 'center' }} />
        </TouchableOpacity>
        <Text style={md_style.text}>Rebook</Text>
      </View>

      <View>
        <TouchableOpacity
          disabled={isNotesDisabled}
          style={[md_style.action, isNotesDisabled && md_style.cancel, isCancelDisabled && md_style.cancel]}
          onPress={() => {
            setblur(true);
            setNotes(true);
          }}>
          <Image source={isNotesDisabled ? note2 : note} style={{ width: 22, height: 22, alignSelf: 'center' }} />
        </TouchableOpacity>
        <Text style={md_style.text}>Notes</Text>
      </View>

      <View>
        <TouchableOpacity
          disabled={isCancelDisabled}
          style={[md_style.action, isCancelDisabled && md_style.cancel_red, isCancelDisabled && md_style.cancel]}
          onPress={() => {
            setblur(true);
            setCancel(true);
          }}>
          <Image
            source={isCancelDisabled ? cancel2 : cancel1}
            style={{ width: 22, height: 22, alignSelf: 'center',  }}
          />
        </TouchableOpacity>
        <Text style={md_style.text}>Cancel</Text>
      </View>

      <Cancel_pop data={data} setblur={setblur} modal={cancel_modal} cancel={cancel_modal} setcancel={setCancel} />
      <Notes_pop id={data.id} setblur={setblur} modal={notes} setcancel={setNotes} />
    </View>
  );
};

export default Booking_action;

const md_style = StyleSheet.create({
  action: {
    borderColor: colors.lg.color,
    borderWidth: 1,
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
  },
  cancel: {
    borderColor: '#EFEFEF',
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
    color: colors.dg.color,
  },
});
