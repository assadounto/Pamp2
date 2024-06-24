import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React from "react";
import { View, Linking } from "react-native";
import BHeader from "../../../components/BHeader";
import { StyleSheet } from "react-native";
import { ListItem, Icon } from "@rneui/base";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { SafeAreaView } from "react-native-safe-area-context";

const Help = () => {
  const { theme } = useTheme();
  const styles=useStyles()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, }} >

      <BHeader title="Help & Support" color={theme.colors.lg} />
      <View
        style={[
          {
            borderRadius: 15,
            padding: 6,
            backgroundColor: theme.colors.card,
            width: '90%',
            alignSelf: 'center',
            marginTop: 30,
          },
        ]}>
        <ListItem
          containerStyle={[{ borderRadius: 15, backgroundColor: theme.colors.slate }]}
          onPress={() => {
            console.log('Sending email...');
            Linking.openURL('mailto:support@trypamp.com');
          }}>
          <Icon name="mail-outline" type="ionicon" color={colors.lg.color} />
          <ListItem.Content>
            <ListItem.Title style={[styles.title]}>Send us a message </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron style={{color:theme.colors.dg}} size={25} />
        </ListItem>
      </View>
    </SafeAreaView>
  )
}

export default Help

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.colors.dg,
    fontFamily: FontFamily.sourceSansProBold
  }
}))