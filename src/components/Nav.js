import React from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import { THEME } from "../theme";
import { AppText } from "./ui/AppText";

export const Nav = () => {
  return (
    <View style={{
      ...styles.nav,
      ...Platform.select({
        ios: styles.navIos,
        android: styles.navAndroid,
      })}}>
      <AppText style={styles.text}>Todo App</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    height: 85,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: THEME.MAIN_COLOR,
  },
  navAndroid: {
    paddingBottom: 20,
  },
  navIos: {
    paddingBottom: Dimensions.get('window').width > 375 ? 10 : 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});
