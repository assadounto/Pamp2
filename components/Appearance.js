import React, { useState, useContext } from "react";
import { View, Text } from "react-native-animatable";
import { Overlay, ListItem, Icon, CheckBox } from "@rneui/base";
import { Pressable } from "react-native";
import { FontFamily } from "../GlobalStyles";
import { makeStyles, useTheme } from "@rneui/themed";
import SunIcon from "./icons/Sun";
import MoonIcon from "./icons/Moon";
import SparkleIcon from "./icons/Sparkle";
import { ThemeContext } from "../src/ThemeContext";

const Appearance = ({ modal, setModal }) => {
    const { isDarkMode, toggleTheme, themeMode } = useContext(ThemeContext);
    const styles = useStyles();
    const [selectedTheme, setSelectedTheme] = useState(themeMode);
    const { theme } = useTheme();

    const menuOne = [
        {
            title: "Light",
            icon: <SunIcon color={theme.colors.dg} />,
            value: "light",
        },
        {
            title: "Dark Mode",
            icon: <MoonIcon color={theme.colors.dg} />,
            value: "dark",
        },
        {
            title: "System",
            icon: <SparkleIcon color={theme.colors.dg} />,
            value: "system",
        },
    ];

    const handleThemeChange = (themeValue) => {
        setSelectedTheme(themeValue);
        toggleTheme(themeValue);
        setModal(false); // Close the modal
    };

    return (
        <Overlay
            onBackdropPress={() => setModal(false)}
            isVisible={modal}
            animationType="slide"
            overlayStyle={styles.overlay}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Appearance</Text>
                <Pressable onPress={() => setModal(!modal)} style={styles.close}>
                    <Icon
                        type="ionicon"
                        size={30}
                        name="close-outline"
                        color={theme.colors.dg}
                    />
                </Pressable>
                {menuOne.map((item, index) => {
                    const isChecked = selectedTheme === item.value;
                    return (
                        <ListItem
                            key={index}
                            containerStyle={styles.list}
                            onPress={() => handleThemeChange(item.value)}
                        >
                            {item.icon}
                            <ListItem.Content>
                                <ListItem.Title
                                    style={[
                                        {
                                            fontFamily: FontFamily.sourceSansProSemibold,
                                            color: theme.colors.dg,
                                        },
                                    ]}
                                >
                                    {item.title}{" "}
                                </ListItem.Title>
                            </ListItem.Content>

                            <CheckBox
                                containerStyle={{ height: 10, backgroundColor: theme.colors.slate }}
                                checkedIcon={
                                    <View
                                        style={[
                                            {
                                                backgroundColor: theme.colors.lgb,
                                                width: 20,
                                                height: 20,
                                                borderRadius: 5,
                                            },
                                        ]}
                                    ></View>
                                }
                                uncheckedIcon={
                                    <View
                                        style={[
                                            {
                                                width: 20,
                                                height: 20,
                                                borderRadius: 5,
                                                borderColor: theme.colors.lgb,
                                                borderWidth: 1,
                                            },
                                        ]}
                                    ></View>
                                }
                                checked={isChecked}
                                onPress={() => handleThemeChange(item.value)}
                            />
                        </ListItem>
                    );
                })}
            </View>
        </Overlay>
    );
};

export default Appearance;

const useStyles = makeStyles((theme) => ({
    close: {
        position: "absolute",
        right: 25,
        top: 10,
    },
    overlay: {
        width: "90%",
        borderRadius: 20,
        backgroundColor: theme.colors.slate,
        padding: 10,
        // Add marginTop to bring the modal down
        marginTop: '80%', // Adjust the percentage as needed
    },
    list: {
        borderColor: theme.colors.tabColor,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: theme.colors.slate,
    },
    container: {
        gap: 10,
        borderRadius: 15,
        padding: 6,
        backgroundColor: theme.colors.slate,
    },
    title: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 24,
        alignSelf: "center",
        marginTop: 10,
        color: theme.colors.dg,
        marginBottom: 20,
    },
    description: {
        alignSelf: "center",
        width: "90%",
        textAlign: "center",
        color: theme.colors.dg,
        padding: 10,
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 15,
    },
    button: {
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 30,
        backgroundColor: "#86D694",
        width: 150,
        height: 50,
        marginTop: 30,
    },
    buttonText: {
        alignSelf: "center",
        fontSize: 20,
        color: "#FFFFFF",
    },
    cancelText: {
        alignSelf: "center",
        textAlign: "center",
        marginTop: 20,
        fontSize: 20,
        fontFamily: FontFamily.sourceSansProRegular,
        color: theme.colors.dg,
    },
}));

