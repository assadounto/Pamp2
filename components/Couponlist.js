import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import SunIcon from './icons/Sun';
import CouponIcon from './icons/Coupon'; // Replace with the actual path
import { makeStyles } from '@rneui/themed';
import { FontFamily } from '../GlobalStyles';
import { useTheme } from '@rneui/themed';
const CouponList = ({ data, navigation }) => {

    const { theme } = useTheme();
    const pop = useStyles();
    const renderItem = ({ item: coupon }) => (
        <TouchableOpacity
            onPress={() => {
                if (coupon.coupon_type === 'influencer')
                    return
                navigation.navigate('discountfull', { coupon })
            }}
            style={pop.coupon}
            key={coupon.id}
        >
            <View style={pop.icon}>
                {coupon.coupon_type === 'influencer' ? (
                    <SunIcon color={theme.colors.lg} />
                ) : (
                    <CouponIcon />
                )}
            </View>
            <Text style={pop.head}>
                {coupon.coupon_type === 'influencer' ? 'Available Points' : 'Your Discount'}
            </Text>
            <Text style={pop.dis}>{coupon.description}</Text>
            <View style={pop.bar} />
            <View style={pop.cont2}>
                <Text style={pop.apply}>Applied</Text>
                <Text style={[pop.apply, pop.hour]}>{coupon.expiry}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Ensure item.id is unique
        />
    );
};

export default CouponList;


const useStyles = makeStyles((theme) => ({
    hour: {
        textAlign: 'right',
        color: theme.colors.lg,
    },
    apply: {
        color: theme.colors.dg,
        fontFamily: FontFamily.sourceSansProRegular,
        fontSize: 10,
        flex: 1
    },
    cont2: {
        display: 'flex',
        flexDirection: 'row'
    }
    ,
    bar: {
        backgroundColor: theme.colors.tabColor,
        marginVertical: 10,
        height: 1
    },
    dis: {
        color: theme.colors.dg,
        fontFamily: FontFamily.sourceSansProBold,
        fontSize: 18,
        marginVertical: 10
    },
    head: {
        color: theme.colors.dg,
        fontFamily: FontFamily.sourceSansProRegular,
        fontSize: 12, marginBottom: 10
    }
    ,
    coupon: {
        marginTop: 20,
        backgroundColor: theme.colors.slate,
        borderRadius: 15,
        width: '90%',
        padding: 20,

        alignSelf: 'center'
    },
    rate: {
        fontFamily: FontFamily.sourceSansProSemibold,
        color: theme.colors.dg,
        fontSize: 24,
        marginBottom: 20
    },
    pop: {
        width: '95%',
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 10,

    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    h1: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 24,
        width: '80%',
        marginVertical: 20
    },
    h2: {
        fontFamily: FontFamily.sourceSansProRegular,
        fontSize: 14,
        width: '80%'
    },
    h3: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 14,
        marginVertical: 20

    },
    h4: {
        color: theme.colors.lg
    },
    notes:
    {
        alignSelf: 'flex-end',
        marginRight: 10,

    },
    input: {
        width: '90%',
        height: 46,
        borderColor: theme.colors.tabColor,
        borderWidth: 1,
        borderRadius: 10,
        padding: 13,
        paddingTop: 10,
        marginVertical: 10,
        color: theme.colors.dg
    },
    text2: {
        color: '#BBB9BC',
        fontFamily: FontFamily.sourceSansProRegular,
        marginHorizontal: 20,
        fontSize: 11


    }


}))

