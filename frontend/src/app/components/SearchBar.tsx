interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export default function SearchBar({ query, setQuery, onSearch, onClear }: SearchBarProps) {
  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Search listings (e.g., 'near Indian food')"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <button onClick={onSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Search
      </button>
      {query && (
        <button
          onClick={onClear}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      )}
    </div>
  );
}