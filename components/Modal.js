import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import { Background } from '@react-navigation/elements';
import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Modal, Pressable, FlatList } from 'react-native';
import { FontFamily } from '../src/GlobalStyles';
import { styles, colors } from '../src/Common_styles';
import { verticalScale,horizontalScale } from '../src/Dimensions';



const Modal_Pop = ({ main,data, modal, onchange, setOption }) => {
    const styles = useStyles();
    const { theme } = useTheme();
    return (
        <><Modal animationType="slide" transparent={true} visible={modal}>

            <View style={[styles.pop2, {backgroundColor:theme.colors.card, padding: 0, height: 200, bottom: 110 }]}>
                <FlatList style={styles.momo_cont}
                    data={data}
                    renderItem={({ item }) => (

                        <View style={styles.info} ><Text onPress={() => { setOption(item); onchange(false) }} style={styles.text}>{item}</Text></View>

                    )}
                    keyExtractor={item => item}


                />
            </View>




            <Pressable style={{
                alignItems: 'center', position: 'absolute', bottom: 40,
                justifyContent: 'center', backgroundColor: theme.colors.card, marginTop: 10, height: 54,
                borderRadius: 18, width: '95%', alignSelf: 'center'
            }} onPress={() => onchange(false)}><Text style={styles.text}>BACK</Text></Pressable>
        </Modal>
        </>
    );
};

export default Modal_Pop;
const useStyles = makeStyles((theme) => ({
    momo_cont: {
        width: '90%',

    },
    pop2: {
        position: 'absolute',
        bottom: verticalScale(40),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: horizontalScale(20),
        alignSelf: 'center',
        padding: horizontalScale(40),
        alignContent: 'center',

        width: '95%',
        height: verticalScale(250),
    },
    info: {
        borderBottomColor: theme.colors.tabColor,
        borderBottomWidth: 0.5,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 16,
        color: theme.colors.dg

    }
}))