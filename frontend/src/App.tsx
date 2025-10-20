import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import api from "./api";

interface Review {
  id: number;
  reviewer: string;
  comment: string;
  rating: number;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  reviews: Review[];
  averageRating: number;
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try {
      const response = await api.get<Movie[]>("/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddReview = async (e: React.FormEvent<HTMLFormElement>, movieId: number) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const reviewer = (form[0] as HTMLInputElement).value;
    const rating = parseFloat((form[1] as HTMLInputElement).value);
    const comment = (form[2] as HTMLTextAreaElement).value;

    try {
      await api.post(`/reviews/${movieId}`, { reviewer, rating, comment });
      fetchMovies(); // refresh movies after adding review
      form.reset();
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-sky-600">🎬 MovieReview</h1>
<nav className="space-x-6 text-gray-600 font-medium">
  <a href="/home" className="hover:text-sky-500">Home</a>
  <a href="/reviews" className="hover:text-sky-500">Reviews</a>
  <a href="/about" className="hover:text-sky-500">About</a>
</nav>
        </div>
      </header>

      {/* Movies Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">🎥 Movies</h3>

        {movies.length === 0 ? (
          <p className="text-gray-500 text-center">No movies available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden p-4">
                <img
  src={movie.imageUrl || `https://source.unsplash.com/600x400/?movie,cinema&sig=${movie.id}`}
  alt={movie.title}
  className="w-full h-48 object-cover"
/>

                <h4 className="font-bold text-lg mb-1">{movie.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{movie.description}</p>
                
                {/* Average rating */}
                <div className="flex items-center text-yellow-500 mb-2">
                  <Star fill="gold" className="w-5 h-5" />
                  <span className="ml-2 text-gray-800 font-medium">
                    {movie.averageRating?.toFixed(1)} / 5 ({movie.reviews.length} reviews)
                  </span>
                </div>

                {/* Show reviews */}
                {movie.reviews.length > 0 && (
                  <ul className="mb-2 text-gray-600 text-sm max-h-32 overflow-y-auto">
                    {movie.reviews.map(review => (
                      <li key={review.id}>
                        <strong>{review.reviewer}</strong>: {review.comment} ({review.rating})
                      </li>
                    ))}
                  </ul>
                )}

                {/* Add review form */}
                <form onSubmit={(e) => handleAddReview(e, movie.id)} className="flex flex-col gap-1">
                  <input type="text" placeholder="Your name" required className="border p-1 rounded"/>
                  <input type="number" min={1} max={5} placeholder="Rating" required className="border p-1 rounded"/>
                  <textarea placeholder="Comment" required className="border p-1 rounded"/>
                  <button type="submit" className="bg-sky-600 text-white px-2 py-1 rounded mt-1 hover:bg-sky-700 transition">
                    Submit Review
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-sky-600 text-white text-center py-6 mt-12">
        <p>© 2025 MovieReview | All Rights Reserved</p>
      </footer>
    </div>
  );
}
