import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";


function AddTodo() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo(text.trim()));
            setText('');
        }
    };
    return (
            <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-lg transition"
        >
          Add
        </button>
      </div>
    </form>
  );
    
}

export default AddTodo