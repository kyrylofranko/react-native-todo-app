import React, { useReducer, useContext } from 'react';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";
import { Http } from "../../helpers/http";

const API_URL = 'https://react-native-todo-app-5bb3c.firebaseio.com';


export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchTodos = async () => {
    showLoader();
    clearError();

    try {
      const data = await Http.get(`${API_URL}/todos.json`);
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))

      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError('Oops, something went wrong...')
    } finally {
      hideLoader();
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const addTodo = async (title) => {
    clearError();

    try {
      const data = await Http.post(`${API_URL}/todos.json`, { title });

      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError('Oops, something went wrong...');
    }
  };

  const updateTodo = async (title, id) => {
    clearError();

    try {
      await Http.patch(`${API_URL}/todos/${id}.json`, { title })

      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError('Oops, something went wrong...')
    }
  };
  const removeTodo = (id) => {
    const todo = state.todos.find(t => t.id === id);

    Alert.alert(
      'Deleting todo',
      `Are you sure you want to delete, ${todo.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            clearError();

            try {
              changeScreen(null);
              await Http.delete(`${API_URL}/todos/${id}.json`)

              dispatch({ type: REMOVE_TODO, id })
            } catch (e) {
              showError('Oops, something went wrong...')

            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      loading: state.loading,
      error: state.error,
      addTodo,
      removeTodo,
      updateTodo,
      fetchTodos,
    }}>
      {children}
    </TodoContext.Provider>
  );
}
