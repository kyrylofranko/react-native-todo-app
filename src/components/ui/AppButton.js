import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { AppTextBold } from "./AppTextBold";
import { THEME } from "../../theme";

export const AppButton = (props) => {
  const {
    children,
    onPress,
    bgColor = THEME.MAIN_COLOR,
  } = props;

  const Container = Platform.OS === 'ios'
    ? TouchableOpacity
    : TouchableNativeFeedback;

  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <View style={{...styles.button, backgroundColor: bgColor }}>
        <AppTextBold style={styles.text}>{children}</AppTextBold>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    color: 'white',
  }
});
