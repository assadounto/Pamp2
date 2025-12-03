import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import BHeader from '../../../components/BHeader';
import Modal_Pop from '../../../components/Modal';
import axios from 'axios';
import { verticalScale, horizontalScale, moderateScale } from '../../Dimensions';
import { backendURL } from '../../services/http';
import { useSelector } from 'react-redux';
import { FontFamily } from '../../GlobalStyles';
import { useDispatch } from 'react-redux';
import { Icon, color } from '@rneui/base';
import TrendsCard from '../../../components/TrendsCard';
import AppliedIcon from '../../../components/icons/applied';
import MoneyIcon from '../../../components/icons/money';
import UsedIcon from '../../../components/icons/used';
import EyeIcon from '../../../components/icons/eye';
import Chart from '../../../components/chart';
import { ScrollView } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

import Blur from '../start_screens/Blur';
const Activity = ({ navigation }) => {
    const [period, setPeriod] = useState('Today');
    const [blur, setBlurr] = useState(false)
    const [data, setData] = useState([]);
    const { theme } = useTheme()
    const user = useSelector((state) => state.user.userInfo)
    const [noti, shownoti] = React.useState(false);
    const location = useSelector(state => state.user.location)

    const styles = useStyles()
    const [overallTotals, setOverallTotals] = useState({ impressions: 0, applications: 0, uses: 0 });
    const [thisMonthTotals, setThisMonthTotals] = useState({ impressions: 0, applications: 0, uses: 0 });
    const [lastMonthTotals, setLastMonthTotals] = useState({ impressions: 0, applications: 0, uses: 0 });
    const [percentageChange, setPercentageChange] = useState({ impressions: 0, applications: 0, uses: 0 });
    const amount = user.influencer_rate
    const total_earnings = amount * overallTotals.uses
    useEffect(() => {
        fetchData(period);
    }, [period]);

    const fetchData = async (selectedPeriod) => {
        try {
            const response = await axios.get(`${backendURL}/coupons/usage_data`, {
                params: { period: selectedPeriod, code: user.influencer_code }, // Replace 'YOUR_COUPON_CODE' with the actual coupon code
            });
            console.log('Response Data:', response.data); // Log response data for debugging

            const { grouped_data, overall_totals, this_month_totals, last_month_totals, percentage_change } = response.data;

            const chartData = Object.keys(grouped_data).map((key) => ({
                label: key,
                value: grouped_data[key] || 0, // Ensure value is defined
            }));
            setData(chartData);
            setOverallTotals(overall_totals);
            setThisMonthTotals(this_month_totals);
            setLastMonthTotals(lastMonthTotals);
            setPercentageChange(percentage_change);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData([]); // Set an empty array on error
            setOverallTotals({ impressions: 0, applications: 0, uses: 0 });
            setThisMonthTotals({ impressions: 0, applications: 0, uses: 0 });
            setLastMonthTotals({ impressions: 0, applications: 0, uses: 0 });
            setPercentageChange({ impressions: 0, applications: 0, uses: 0 });
        }
    };

    const copyToClipboard = () => {
        Clipboard.setString(user.influencer_code);
       Alert.alert('Code Copied','Code successfully copied to clipboard')
    }
    return (
        <><SafeAreaView style={{ backgroundColor: theme.mode === 'light' ? "#F7F7F9" : "#000" }}>
            <BHeader top={Platform.OS === 'ios' ? 0 : 20} title={'Your Activity'} />
            <ScrollView>
                <View style={styles.textcont}>
                    <Text style={[styles.text, { color: theme.colors.dg }]}>Earnings</Text>
                    <Text onPress={copyToClipboard} style={[styles.text, { color: theme.colors.lg }]}>{user.influencer_code}</Text>
                </View>


                <TouchableOpacity onPress={() => navigation.navigate('payoutandhistory')} style={styles.moneycont}>
                    <Text style={styles.textmoney}>{`${location.currency || "₵"}${(user?.balance || 0).toFixed(2)}`}</Text>
                    <Icon
                        size={29}
                        color={theme.colors.dg}
                        name='chevron-right'
                        type='feather' />
                </TouchableOpacity>
                <Text style={[{ fontFamily: FontFamily.sourceSansProBold, marginTop: 10, fontSize: 18, width: '80%', alignSelf: 'center', color: theme.colors.dg }]}>Overview</Text>
                <View style={styles.trendscont}>
                    <TrendsCard name={'Amount'} show={false} data={`${location.currency || "₵"}${(amount||0).toFixed(2)}`} icon={<MoneyIcon color={theme.colors.lg} />} />
                    <TrendsCard show={percentageChange.applications != 0} increase={percentageChange.applications} data={overallTotals.applications} name={'Applied'} icon={<AppliedIcon color={theme.colors.lg} />} />

                </View>
                <View style={styles.trendscont}>
                    <TrendsCard show={percentageChange.uses != 0} increase={percentageChange.uses} data={overallTotals.uses} name={'Used'} icon={<UsedIcon color={theme.colors.lg} />} />

                </View>


                <Chart
                    data={data}
                    option1={period}
                    onPress1={() => setBlurr(true)}
                />



            </ScrollView>
        </SafeAreaView>
            <Modal_Pop
                data={['Today', 'This week', 'This month', 'This year', 'Last year']}
                setOption={setPeriod}
                onchange={setBlurr}
                modal={blur}
                name='option1' />
            {
                blur && <Blur />
            }
        </>
    );
};

export const useStyles = makeStyles((theme) => ({
    trendscont: {
        gap: 20,
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
    },
    text: {
        fontFamily: FontFamily.sourceSansProSemibold, fontSize: 14

    },
    copy_info: {
        width: '90%',
        position: 'absolute',
        top: 10,
        height: 32,
        borderRadius: 23,
        backgroundColor: theme.colors.card
    },
    copy_info_text: {
        fontFamily: FontFamily.sourceSansProRegular,
        fontSize: 14,
        left: 20,
        top: 5,
        color: theme.colors.dg
    },
    textmoney: {
        fontSize: 45,
        color: theme.colors.lg,
        fontFamily: FontFamily.sourceSansProSemibold
    },
    textcont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: 'center'

    },

    moneycont: {
        height: 100,
        marginVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 25,

        backgroundColor: theme.colors.card,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center'

    },
    button: {
        width: horizontalScale(330),
        height: verticalScale(71),
        backgroundColor: '#86D694',
        borderWidth: horizontalScale(1),
        borderColor: '#86D694',
        marginBottom: verticalScale(10),
        alignSelf: 'center',
        borderRadius: horizontalScale(23),
    },
    textInput: {
        marginBottom: verticalScale(20),
        paddingHorizontal: horizontalScale(20),
        fontSize: moderateScale(14),
        width: horizontalScale(330),
        height: verticalScale(63),
        margin: 0,
        alignSelf: 'center',
        backgroundColor: theme.colors.slate,
        borderRadius: horizontalScale(23),
        borderWidth: 1,
        borderColor: theme.colors.slate,
        fontFamily: FontFamily.sourceSansProRegular
    },
}))

export default Activity;
