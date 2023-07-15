import { Image } from "@rneui/base";
import React from "react";
import { Text, View } from "react-native-animatable";
import { FontFamily } from "../GlobalStyles";

const Closed=({name})=>{
return(
    <><Text
    style={{color: '#00463C', fontSize: 20,
     fontFamily: 'Source Sans Pro',
      fontWeight: '700', 
      marginLeft:30,
      marginBottom:20
     }}
    >Time</Text><View style={{
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',

        borderRadius: 20,
        shadowColor: '#707070',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 2,
        shadowOffset: { width: 5, height: 0 },
        backgroundColor: 'white',

    }}

    >
            <Text style={{
                color: '#86D694',
                fontSize: 24,
                marginVertical: 40,

                textAlign: 'center',
                fontFamily: FontFamily.sourceSansProSemibold,
                lineHeight: 24,
                wordWrap: 'break-word'
            }}>
                {`${name}\n is closed today`}
            </Text>
            <Image
                resizeMode="contain"
                style={{ alignSelf: 'center', width: 200, height: 200 }}
                source={require('../assets/Closed.png')} />
            <Text

                style={{
                    marginVertical: 40,
                    color: '#B0EBBD',
                    fontSize: 14,
                    fontFamily: FontFamily.sourceSansProRegular,
                    fontWeight: '400',
                    lineHeight: 17
                }}

            >Select another time</Text>
        </View></>
)
}

export default Closed