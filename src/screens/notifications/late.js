import React from 'react';
import { Image } from 'react-native';
import {Text, View,Pressable} from 'react-native';
import { Button } from '@rneui/base';
import {styles, colors} from '../../Common_styles';
import { FontFamily } from '../../GlobalStyles';
import mail from '../../../assets/rebook.png'
import Pop2 from '../start_screens/pop2';
const Late = () => {
    const [modalVisible, setModal] = React.useState(false);
    const [color,usecolor]= React.useState('#F9B015')
    return (
  <><Pressable onPress={() => usecolor('red')} style={{ backgroundColor: 'white', borderRadius: 20, paddingTop: 20, marginHorizontal: 20 }}>
            <View
                style={{
                    marginTop:20,
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 20,
                    gap: 10
                }}>
                <Image source={mail} style={{ marginTop: 10 }} />
                <View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row', gap: 5,
                    }}>
                        <View style={{ width: 9, height: 9, borderRadius: 50, backgroundColor: color, marginTop: 5 }}></View>
                        <Text style={[colors.dg, { fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13 }]}>Your appointment with Likke salon</Text>
                        <Text style={{ position: 'absolute', right: 10, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: "#999999" }}>2d ago</Text>
                    </View>
                    <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: "#999999", width: 300 }}>The best place to reach service providers that'll pamper you exactly how you want</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 20 }}>
                        <Button onPress={()=>setModal(true)} buttonStyle={{ borderRadius: 40, backgroundColor: 'red', width: 120, height: 40 }} title='cancel'>

                        </Button>
                        <Button buttonStyle={{ borderRadius: 40, backgroundColor: colors.lg.color, width: 120, height: 40 }} title='Rebook'>

                        </Button>
                    </View>

                </View>
            </View>
        </Pressable><Pop2
                main={'You have Succesfully verified your Phone Number'}
                modal={modalVisible} /></>
    );
};

export default Late;
