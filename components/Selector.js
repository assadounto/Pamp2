
import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { Text, View, SafeAreaView,Pressable,ScrollView, Image, Modal } from 'react-native';

import { verticalScale,horizontalScale } from '../src/Dimensions';
import { FontFamily } from '../GlobalStyles';
const Selector = ({ items, setItem,name ,label}) => {
    const { theme } = useTheme();
    const styles = useStyles();
    return (
        <>
        <Text style={{marginVertical:18,fontSize:15,fontFamily:FontFamily.sourceSansProSemibold,color:theme.colors.dg}}>{label}</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ display: 'flex', flexDirection: 'row' }}>
            {items.map((item) => {
                return (

                    <Pressable
                        onPress={() => setItem(item)}
                        style={{
                            backgroundColor: item === name ? theme.colors.lgb : theme.colors.card,
                            borderRadius: 25,
                            height: 34,
                            padding: 8,
                            marginBottom: 15,
                            paddingHorizontal: 20,
                            borderColor: theme.colors.tabColor,
                            borderWidth: 1,
                            marginRight: 10
                        }}
                    >
                        <Text style={[{ fontSize:13, color: item === name ? '#FFFFFF' : theme.colors.dg }]}>{item}</Text>
                    </Pressable>

                );
            })}
        </ScrollView></>
    );
};

const useStyles = makeStyles((theme) => ({
    pop2: {
        position: 'absolute',
        bottom: verticalScale(40),
        backgroundColor: theme.colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: horizontalScale(20),
        alignSelf: 'center',
        padding: horizontalScale(40),
        alignContent: 'center',

        width: '95%',
        height: verticalScale(250),
    },



}))

export default Selector;







