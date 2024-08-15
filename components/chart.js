import React from "react";
import { StyleSheet, View } from "react-native"
import { BarChart } from "react-native-gifted-charts";
import { Dimensions } from "react-native";
import { Text } from "react-native-animatable";
import { FontFamily } from "../GlobalStyles";
import { colors } from "../src/Common_styles";
import Filters from "./Filter";
import { backendURL } from "../src/services/http";
import { makeStyles,useTheme } from '@rneui/themed';
import HorizontalLines from "./lines";
const screenWidth = Dimensions.get("window").width;
const Chart = ({ onPress1, onPress2, option1, option2, data }) => {
    
    const uses=()=>{
        let num=0
        data.map((item)=>item.value+=num)
        return num
    }
    const { theme } = useTheme()
    const styles = useStyles()
    const handleFilterPress = () => {
        console.log('Filter Pressed');
    };


    const dummyData = [
        { value: 50, label: 'Jan' },
        { value: 80, label: 'Feb' },
        { value: 70, label: 'Mar' },
        { value: 90, label: 'Apr' },
        { value: 100, label: 'May' },
        { value: 60, label: 'Jun' },
    ];


    return (
        <View style={{
            marginBottom: 20,
            paddingHorizontal: 20,
            width: screenWidth * 0.888,
            marginHorizontal: 30,
            marginVertical: 8,
            borderRadius: 16,
            padding: 10,
            paddingBottom: 30,

            backgroundColor: theme.colors.card,
            alignSelf: 'center'


        }}>



            <View style={styles.cont1}>
              
                <Text style={styles.text}>Total use - {uses()}</Text>

              
            </View>
            <View style={{  }}>
                <HorizontalLines
                    numberOfLines={6} // Number of horizontal lines
                    lineColor={theme.colors.tabColor} // Color of the horizontal lines
                    lineWidth={screenWidth * 0.9} // Width of the horizontal lines
                />


            <BarChart
                width={screenWidth * 0.7}
                disablePress
                isAnimated={true}
                dashGap={0}
                rulesThickness={0.1}
                rulesLength={30}
                spacing={40}
                barWidth={8}
               
               
                xAxisLabelTextStyle={{ color: theme.colors.othergreen, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 10 }}
                yAxisTextStyle={{ color: theme.colors.othergreen, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 10 }}
                noOfSections={5}
                barBorderRadius={4}
                frontColor={theme.colors.lg}
                data={data}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisLabelPrefix={''}
                dashWidth={7}
            
            />
            </View>
            <Filters onPress1={onPress1} value1={option1} />

        </View>

    )
}

export default Chart


const useStyles = makeStyles((theme) => ({
    cont1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginLeft: 10,
        marginBottom: 20,
        backgroundColor:theme.colors.card
    },
    text: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 11, marginRight: 10,
        color: theme.colors.dg
    },
    cash_cir: {
        marginRight: 5,
        width: 9,
        height: 9,
        borderRadius: 50,
        backgroundColor: theme.colors.lg
    }

}))