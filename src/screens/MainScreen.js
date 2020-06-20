import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, View, Image, StyleSheet, Linking, Dimensions } from 'react-native';
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";
import { AppText } from "../components/ui/AppText";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { AppLoader } from "../components/ui/AppLoader";
import { AppButton } from "../components/ui/AppButton";

export const MainScreen = () => {
  const {
    todos,
    addTodo,
    removeTodo,
    fetchTodos,
    loading,
    error
  } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    }

    Dimensions.addEventListener('change', update);

    return () => {
      Dimensions.removeEventListener('change', update);
    }
  })

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Try again</AppButton>
      </View>
    );
  }

  return (
    <View>
      <AddTodo
        addTodo={addTodo}
      />
      <View style={{ marginTop: THEME.BLOCK_MARGINTOP }}>
        {todos.length
          ? (
            <View style={{ width: deviceWidth }}>
              <FlatList
                keyExtractor={item => item.id}
                data={todos}
                renderItem={({ item }) => (
                  <Todo
                    todo={item}
                    onRemove={removeTodo}
                    onOpen={changeScreen}
                  />
                )}
              />
            </View>
          )
          : (
            <View style={styles.imgWrap}>
              <Image
                source={require('../../assets/no-items.png')}
                style={styles.image}
              />
            </View>
          )}
      </View>
      <View style={styles.footer}>
        <AppText>Developed by</AppText>
        <AppText style={styles.footerLink}
                 onPress={() => Linking.openURL('https://github.com/kiramarks')}
        >
          Kira Marks
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    height: 300,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  footer: {
    marginTop: THEME.BLOCK_MARGINTOP,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerLink: {
    color: THEME.MAIN_COLOR,
    marginLeft: 4
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginBottom: 10,
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  }
});
