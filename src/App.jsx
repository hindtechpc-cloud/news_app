// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // const API_KEY = "522951e63598ffbfd3ed568963d68d32";
// const API_KEY = "5d999d82ef547dd6d5681e20af970f9f";

// const BASE_URL = "https://gnews.io/api/v4/top-headlines";
// const App = () => {
//   const [articles, setArticles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("general");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [darkMode, setDarkMode] = useState(false);
//   // ✅ Fetch news
//   const fetchNews = async (query = search) => {
//     try {
//       setLoading(true);
//       setError("");
//       const response = await axios.get(BASE_URL, {
//         params: {
//           lang: "en",
//           topic: category,
//           q: query || undefined,
//           token: API_KEY,
//           max: 10,
//         },
//       });
//       setArticles(response.data.articles);
//     } catch (err) {
//       setError("Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, [category]);

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (search.trim().length > 0) {
//         fetchNews(search);
//       } else {
//         fetchNews();
//       }
//     }, 600);
//     return () => clearTimeout(delay);
//   }, [search]);
//   // ✅ Toggle dark mode
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     if (newMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   const categories = [
//     "general",
//     "world",
//     "nation",
//     "business",
//     "technology",
//     "sports",
//     "health",
//   ];

//   return (
//     <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-all duration-300">
//       {/* Header */}
//       <header className="flex justify-between items-center p-4 bg-primary dark:bg-secondary-dark text-white shadow">
//         <h1 className="text-2xl font-heading font-bold">📰 News Feed App</h1>
//         <button
//           onClick={toggleDarkMode}
//           className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-white"
//         >
//           {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//         </button>
//       </header>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="flex justify-center mb-6">
//           <input
//             type="text"
//             placeholder="Search news..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600"
//           />
//         </div>

//         {/* Categories */}
//         <div className="flex flex-wrap justify-center mb-6 gap-2">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setCategory(cat)}
//               className={`px-3 py-1 rounded-full border ${
//                 category === cat
//                   ? "bg-primary text-white border-primary"
//                   : "bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300"
//               } hover:bg-primary-light hover:text-white transition`}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* News Section */}
//         {loading ? (
//           <p className="text-center text-lg font-semibold">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500 font-semibold">{error}</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {articles.length === 0 ? (
//               <p className="col-span-full text-center">No news found.</p>
//             ) : (
//               articles.map((article, index) => (
//                 <div
//                   key={index}
//                   className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-lg overflow-hidden transition"
//                 >
//                   {article.image && (
//                     <img
//                       src={article.image}
//                       alt={article.title}
//                       className="w-full h-48 object-cover"
//                     />
//                   )}
//                   <div className="p-4">
//                     <h2 className="text-lg font-semibold mb-2">
//                       {article.title}
//                     </h2>
//                     <p className="text-sm mb-2">
//                       {article.description || "No description available."}
//                     </p>
//                     <a
//                       href={article.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-primary dark:text-accent font-medium"
//                     >
//                       Read more →
//                     </a>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;





import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "5d999d82ef547dd6d5681e20af970f9f";
const BASE_URL = "https://gnews.io/api/v4/top-headlines";
const PROXY_URL = "https://api.allorigins.win/get?url=";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Fetch news safely (with proxy)
  const fetchNews = async (query = search) => {
    try {
      setLoading(true);
      setError("");

      const apiUrl = `${BASE_URL}?lang=en&topic=${category}&q=${query || ""}&token=${API_KEY}&max=10`;

      // 🪄 Use proxy to bypass CORS
      const response = await axios.get(`${PROXY_URL}${encodeURIComponent(apiUrl)}`);

      // allorigins wraps actual JSON in `contents`
      const parsed = JSON.parse(response.data.contents);
      setArticles(parsed.articles || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch news when category changes
  useEffect(() => {
    fetchNews();
  }, [category]);

  // Fetch news when user types (debounced)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim().length > 0) {
        fetchNews(search);
      } else {
        fetchNews();
      }
    }, 600);
    return () => clearTimeout(delay);
  }, [search]);

  // ✅ Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const categories = [
    "general",
    "world",
    "nation",
    "business",
    "technology",
    "sports",
    "health",
    
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-all duration-300">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-blue-600 dark:bg-gray-800 text-white shadow">
        <h1 className="text-2xl font-bold">📰 News Feed App </h1>
        <button
          onClick={toggleDarkMode}
          className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Search Bar */}
      <div className="p-4">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mb-6 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full border transition ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* News Section */}
        {loading ? (
          <p className="text-center text-lg font-semibold">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length === 0 ? (
              <p className="col-span-full text-center">No news found.</p>
            ) : (
              articles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg overflow-hidden transition"
                >
                  <img
                    src={
                      article.image ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">
                      {article.title}
                    </h2>
                    <p className="text-sm mb-2">
                      {article.description || "No description available."}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-medium"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
