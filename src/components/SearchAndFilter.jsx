import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearch } from "../store/todoSlice";

function SearchAndFilter() {
    const dispatch = useDispatch();
    const { filter, search } = useSelector((state) => state.todos);

    return (
        <div className="mb-6">
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                {search && (
                    <button
                        onClick={() => dispatch(setSearch(''))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="flex space-x-4">
                {['all', 'active', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => dispatch(setFilter(f))}
                        className={`px-4 py-2 rounded-lg transition ${filter === f
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SearchAndFilter;