import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from "../theme";

export const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const onSubmit = () => {
    if (value.trim()) {
      addTodo(value);
      setValue('');
      Keyboard.dismiss();
    } else {
      Alert.alert('Todo\'s title can\'t be empty')
    }
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        placeholder="Write a todo..."
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onSubmit}
        returnKeyType='next'
        autoCorrect={false}
        autoCapitalize='none'
      />
      <Button
        title="Add todo"
        titleStyle={{
          fontFamily: 'helvetica-bold',
          fontSize: 16,
          textAlignVertical: 'center',
        }}
        buttonStyle={{
          height: 35,
          backgroundColor: THEME.MAIN_COLOR,
        }}
        onPress={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '70%',
    paddingVertical: 8,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
