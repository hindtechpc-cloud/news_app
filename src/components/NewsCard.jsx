export default function NewsCard({ article }) {
  const { title, urlToImage, description, url } = article;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={urlToImage || "https://via.placeholder.com/400x250"}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          {description
            ? description.slice(0, 100) + "..."
            : "No description available."}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Read More →
        </a>
      </div>
    </div>
  );
}
