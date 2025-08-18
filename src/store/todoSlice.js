
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import localforage from 'localforage';

// Загрузка состояния
export const loadState = createAsyncThunk('todos/loadState', async () => {
  const savedState = await localforage.getItem('todoState');
  return savedState || { todos: [], filter: 'all', search: '' };
});

// Сохранение состояния
const saveState = async (state) => {
 try {
  // console.log('Saving state:', state);
  await localforage.setItem('todoState', {
    //при сохранении состояния в saveState передаётся Proxy-объект вместо реального массива
    todos: state.todos.map(t => ({...t})), // Создаём копию каждого todo - избавляемся от Proxy
    filter: state.filter,
    search: state.search
  });
} catch (error) {
  console.error(
    'Error saving state to local storage:',
    error
  );
}
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    filter: 'all',
    search: '',
    loading: true
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.unshift({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    reorderTodos: (state, action) => {
      state.todos = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadState.fulfilled, (_ , action) => {
        // console.log('State loaded:', action.payload);
        return { 
        todos: action.payload.todos,
        filter: action.payload.filter,
        search: action.payload.search,
        loading: false
        };
      })
      .addMatcher(
        (action) => action.type.startsWith('todos/') && 
                  !action.type.includes('loadState'),
        (state) => {
          // Автосохранение
          saveState({
          todos: state.todos,
          filter: state.filter,
          search: state.search
        });
        }
      );
  }
});

export const { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  reorderTodos,
  setFilter,
  setSearch
} = todoSlice.actions;

export const selectFilteredTodos = createSelector(
    [
    state => state.todos.todos,
    state => state.todos.filter,
    state => state.todos.search
], (todos, filter, search) => {
//   const { todos, filter, search } = state.todos;
  const lowerSearch = search.toLowerCase();
  
  return todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(lowerSearch);
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && todo.completed) || 
      (filter === 'active' && !todo.completed);
      
    return matchesSearch && matchesFilter;
  });
}

);

export const selectAllTodos = (state) => state.todos.todos;
export default todoSlice.reducer;