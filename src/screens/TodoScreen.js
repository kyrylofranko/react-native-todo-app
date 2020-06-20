import React, { useContext, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoScreen = () => {
  const { todos, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const [modal, setModal] = useState(false);
  const todo = todos.find(t => t.id === todoId);

  const handleSave = async (title) => {
    await updateTodo(title, todo.id);
    setModal(false);
  }

  return (
    <View>
      <EditModal
        visible={modal}
        value={todo.title}
        onSave={handleSave}
        onCancel={() => setModal(false)}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            bgColor={THEME.BACK_BUTTON_COLOR}
            onPress={() => changeScreen(null)}
          >
            <AntDesign name='back' size={20} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            bgColor={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <AntDesign name='delete' size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    padding: 15,
    marginBottom: 20,
  },
  button: {
    width: Dimensions.get('window').width / 3,
  },
  title: {
    fontSize: 20,
  }
});
