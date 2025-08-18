import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { reorderTodos, selectFilteredTodos, selectAllTodos } from "../store/todoSlice";
import TodoItem from "./TodoItem";
function TodoList() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    const allTodos = useSelector(selectAllTodos);
    const loading = useSelector(state => state.todos.loading);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            // полный список    
            const oldIndex = allTodos.findIndex(todo => todo.id === active.id);
            const newIndex = allTodos.findIndex(todo => todo.id === over.id);
            // копия всего списка
            const newTodos = [...allTodos];
            // перемещаем задачу в нужное место
            const [movedTodo] = newTodos.splice(oldIndex, 1);
            newTodos.splice(newIndex, 0, movedTodo);

            dispatch(reorderTodos(newTodos));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    return (
        <div className="mt-4">
            {filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No tasks found
                </div>
            ) : (
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={filteredTodos.map(todo => todo.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {filteredTodos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                id={todo.id}
                                text={todo.text}
                                completed={todo.completed}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            )}
        </div>
    )
}

export default TodoList;