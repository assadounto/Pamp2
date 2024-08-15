import React from 'react';
import { View, Text } from 'react-native';
import { makeStyles, useTheme,ListItem,Button } from '@rneui/themed';
import MoonIcon from '../../../components/icons/Moon';
import { FontFamily } from '../../GlobalStyles';
import MessageIcon from '../../../components/icons/Message';
import ButtonDown from '../../../components/ButtonDown';
import SparkleIcon from '../../../components/icons/Sparkle';
import Filter from '../../../components/icons/Filter';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setNew } from '../../redux/user';
const WhatsNew = ({navigation}) => {
  const { theme } = useTheme();
  const dispatch=useDispatch()
  const styles = useStyles();
  const menuOne = [
    {
      title: "Dark Mode",
      desc:'Enjoy a sleek, easy-on-the-eyes interface while booking appointments.',
      icon: <MoonIcon size={30} color={theme.colors.lg} />,
      value: "light",
    },
    {
      title: "Search Filter",
      desc: 'Find the perfect vendor and services tailored to your needs effortlessly.',
      icon: <Filter width={30} height={30} color={theme.colors.lg} />,
      value: "dark",
    },
    {
      title: "Message",
      desc: 'Chat with vendors in real-time to discuss your upcoming appointments.',
      icon: <MessageIcon size={30} color={theme.colors.lg} />,
      value: "system",
    },
    {
      title: "And Lots More...",
      desc: 'Explore exciting features designed to make your booking experience even better!',
      icon: <SparkleIcon size={30} color={theme.colors.lg} />,
      value: "system",
    },
    
  ];

  const handleSubmit=()=>{
           dispatch(setNew(false))
           navigation.navigate('main')
  }
  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Discover What's New in Pamp</Text>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 200,}}>
      {menuOne.map((item, index) => {
        return (
          <ListItem
            key={index}
            containerStyle={styles.list}
          >
            {item.icon}
            <ListItem.Content>
              <ListItem.Title
                style={[
                  {
                    fontFamily: FontFamily.sourceSansProBold,
                    color: theme.colors.dg,
                    fontSize: 18
                  },
                ]}
              >
                {item.title}{" "}
              </ListItem.Title>
              <ListItem.Title
                style={[
                  {
                    fontFamily: FontFamily.sourceSansProRegular,
                    color: '#BBB9BC',
                    fontSize:14
                  },
                ]}
              >
                {item.desc}{" "}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
            );
                })}
        <Button
          title={'Continue'}
          buttonStyle={{
            width: '80%',
            height: 64,
            marginTop: 60,
            alignSelf: 'center',
            borderRadius: 23,
        

            backgroundColor: theme.colors.lgb,
          }}
          onPress={handleSubmit}
        />     
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {

    paddingTop:60,
    backgroundColor: theme.colors.background,
  },
  list:{
width:'80%',
alignSelf:"center",

  },
  text: {
    color: theme.colors.primary,
    fontFamily:FontFamily.sourceSansProBold,
    fontSize:36,
    color:theme.colors.dg,
    textAlign:'center',
    width:'70%',
alignSelf:'center',
marginBottom:30
  },
}));

export default WhatsNew;