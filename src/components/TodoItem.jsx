import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/todoSlice";
function TodoItem({ id, text, completed }) {
    const dispatch = useDispatch();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 'auto'
    };


    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center p-4 mb-2 bg-white rounded-lg shadow ${completed ? 'bg-green-50' : ''
                }`}
        >
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(toggleTodo(id))}
                className="h-5 w-5 text-blue-600 rounded mr-3"
            />
            <span className={`flex-grow ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {text}
            </span>
            <button
                onClick={() => dispatch(deleteTodo(id))}
                className="ml-2 text-red-500 hover:text-red-700"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
            <div
                {...attributes}
                {...listeners}
                className="ml-3 cursor-move p-1 text-gray-400 hover:text-gray-600"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            </div>
        </div>
    );

}

export default TodoItem;