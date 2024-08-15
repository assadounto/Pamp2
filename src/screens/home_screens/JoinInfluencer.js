import { View, Text } from "react-native-animatable";
import { makeStyles, useTheme, ListItem } from "@rneui/themed";
import BHeader from "../../../components/BHeader";
import { useContext } from "react";
import SafeAreaTop from "../../../components/SafeAreaTop";
import MoneyIcon from "../../../components/icons/money";
import MoneyBag from "../../../components/icons/Moneybag";
import SendBig from "../../../components/icons/SendBig";
import HandShake from "../../../components/icons/Handshake";
import { Icon, color } from "@rneui/base";
import { FontFamily } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { th } from "date-fns/locale";
import ButtonDown from "../../../components/ButtonDown";
import { ThemeContext } from "../../ThemeContext";


const JoinInfluencer = ({navigation}) => {
    const { theme, } = useTheme();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    console.log(isDarkMode)
    const styles = useStyles()
    const Rewards = [
        {
            title: 'Earn Rewards\nfor getting pampered',
            icon: <MoneyBag color={theme.colors.tabColor} />
        },
        {
            title: 'Share more earn more',
            icon: <SendBig color={theme.colors.tabColor} />
        },
        {
            title: 'Collaborate and earn even more',
            icon: <HandShake color={theme.colors.tabColor} />
        },
    ]
    const how = ['Promote the code you receive', 'Create content with code', "The more the code is used, the \nmore you earn"]
    return (
        <><SafeAreaTop>
            <BHeader />
            <ScrollView contentContainerStyle={styles.scroll}>
                <View>
                    <View style={styles.parent}>
                        <Text style={styles.title}>{"Pamp Rewards \nProgram"}</Text>
                        {Rewards.map((item, index) => {
                            return (
                                <ListItem
                                    containerStyle={[styles.listCont]}>
                                    <ListItem.Content>
                                        <ListItem.Title style={[styles.Rewards_title]}>{item.title}</ListItem.Title>
                                    </ListItem.Content>
                                    {item.icon}
                                </ListItem>
                            );
                        })}
                        <Text style={styles.listTitle}>How it works</Text>
                        <View style={styles.listCont}>
                            {how.map((item, index) => {
                                return (
                                    <View style={styles.howCont}>
                                        <View style={[styles.dot,styles.card]} />
                                        <Text style={styles.howTitle}>{item}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <Text style={styles.listTitle}>To join, you must:</Text>
                        <View style={styles.listCont}>
                            <View style={styles.howCont}>
                                <View style={styles.dot} />
                                <Text style={styles.howTitle}>Be at least <Text style={styles.green}>18 years </Text>old</Text>
                            </View>
                            <View style={styles.howCont}>
                                <View style={styles.dot} />
                                <Text style={styles.howTitle}>Be following <Text style={styles.green}>Pamp</Text> {"on all social \nmedia platform"}</Text>
                            </View>
                            <View style={styles.howCont}>
                                <View style={styles.dot} />
                                <Text style={styles.howTitle}>Have at least<Text style={styles.green}> 2K+ </Text>{"followers on \nsocial media"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaTop><ButtonDown title={'Join'} handleSubmit={()=>navigation.navigate('JoinNow')} /></>
    )
}


const useStyles = makeStyles((theme) => ({
    card:{
        backgroundColor:theme.colors.tabColor
    },
    scroll: {
        paddingBottom: 200
    },
    parent: {
        alignSelf: 'center',
        width: '90%',
        gap: 10
    },
    title: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 38,
        color: theme.colors.dg

    },
    listTitle: {
        fontSize: 22,
        marginTop: 20,
        fontFamily: FontFamily.sourceSansProSemibold,
        color: theme.colors.dg
    },
    green: { color: theme.colors.lg },
    howCont: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        margin: 10
    },
    howTitle: {
        fontSize: 16,
        fontFamily: FontFamily.sourceSansProRegular,
        color: theme.colors.dg

    },
    dot: {
        width: 6,
        height: 6,
        marginTop: 7,
        borderRadius: 50,
        marginHorizontal:5,
        backgroundColor: theme.colors.lg
    },
    Rewards_title: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 18,
        color: theme.colors.dg
    },
    listCont: { borderRadius: 15, padding: 15, backgroundColor: theme.colors.slate }

}));

export default JoinInfluencer
