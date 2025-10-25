export default function SearchBar({ query, setQuery, fetchNews }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 mb-4 justify-center"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
