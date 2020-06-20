import React, { useState } from 'react';
import { StyleSheet, Modal, View, TextInput, Alert } from 'react-native';
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ value, visible, onCancel, onSave }) => {
  const [title, setTitle] = useState(value);

  const handleSave = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        'Error',
        `Minimal length on title is 3. It has ${title.trim().length} now.`,

      );
    } else {
      onSave(title);
    }
  };

  const handleCancel = () => {
    setTitle(value)
    onCancel();
  }

  return (
    <Modal
      animationType='slide'
      visible={visible}
    >
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Type a new title..."
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton
            bgColor={THEME.DANGER_COLOR}
            onPress={handleCancel}
          >
            Cancel
          </AppButton>
          <AppButton onPress={handleSave}>
            Save
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
