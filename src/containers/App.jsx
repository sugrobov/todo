import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddTodo from "../components/AddTodo";
import SearchAndFilter from "../components/SearchAndFilter";
import TodoList from "../components/TodoList";
import { loadState } from "../store/todoSlice";

function App() {
  const dispatch = useDispatch();
  /**
   * загрузка состояния
   */
  useEffect(() => {
    dispatch(loadState());
  }, [dispatch]);

return (
     <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Advanced Todo List
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <AddTodo />
          <SearchAndFilter />
          <TodoList />
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Drag and drop to reorder tasks
        </div>
      </div>
    </div>
)

}

export default App;
