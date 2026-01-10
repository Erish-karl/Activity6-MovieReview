import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import api from "./api";
import Reviews from "./pages/Reviews";
import Home from "./pages/Home";
import About from "./pages/About"; // <-- import About component

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
  const navigate = useNavigate();

  // Fetch all movies from API
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

  // Add review handler
  const handleAddReview = async (
    e: React.FormEvent<HTMLFormElement>,
    movieId: number
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const reviewer = (form[0] as HTMLInputElement).value;
    const rating = parseFloat((form[1] as HTMLInputElement).value);
    const comment = (form[2] as HTMLTextAreaElement).value;

    try {
      await api.post(`/reviews/${movieId}`, { reviewer, rating, comment });
      fetchMovies(); // refresh movies and reviews
      form.reset();
      alert("✅ Review submitted successfully!");
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-slate-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1
            className="text-2xl font-bold text-sky-600 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            🎬 MovieReview
          </h1>
          <nav className="space-x-6 text-gray-600 font-medium">
            <Link to="/home" className="hover:text-sky-500">
              Home
            </Link>
            <Link to="/reviews" className="hover:text-sky-500">
              Reviews
            </Link>
            <Link to="/about" className="hover:text-sky-500">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            <section className="max-w-6xl mx-auto px-6 py-12">
              <h3 className="text-2xl font-semibold mb-6">🎥 Movies</h3>

              {movies.length === 0 ? (
                <p className="text-gray-500 text-center">No movies available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {movies.map((movie) => (
                    <div
                      key={movie.id}
                      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                    >
                      {/* Image */}
                      <div className="w-full h-56 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={movie.imageUrl || "/film.png"}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Movie Info */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="font-bold text-lg mb-1">{movie.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{movie.description}</p>

                        {/* Average rating */}
                        <div className="flex items-center text-yellow-500 mb-2">
                          <Star fill="gold" className="w-5 h-5" />
                          <span className="ml-2 text-gray-800 font-medium">
                            {movie.averageRating?.toFixed(1)} / 5 ({movie.reviews.length} reviews)
                          </span>
                        </div>

                        {/* Reviews (scrollable if many) */}
                        {movie.reviews.length > 0 && (
                          <ul className="text-gray-600 text-sm mb-2 flex-1 overflow-y-auto max-h-64 space-y-1">
                            {movie.reviews.map((review) => (
                              <li
                                key={review.id}
                                className="border-l-2 border-yellow-400 pl-2 py-1 bg-gray-50 rounded"
                              >
                                <strong>{review.reviewer}</strong>: {review.comment} ({review.rating})
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Add Review */}
                        <form
                          onSubmit={(e) => handleAddReview(e, movie.id)}
                          className="flex flex-col gap-1 mt-2"
                        >
                          <input
                            type="text"
                            placeholder="Your name"
                            required
                            className="border p-1 rounded"
                          />
                          <input
                            type="number"
                            min={1}
                            max={5}
                            placeholder="Rating"
                            required
                            className="border p-1 rounded"
                          />
                          <textarea
                            placeholder="Comment"
                            required
                            className="border p-1 rounded"
                          />
                          <button
                            type="submit"
                            className="bg-sky-600 text-white px-2 py-1 rounded mt-1 hover:bg-sky-700 transition"
                          >
                            Submit Review
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          }
        />

        {/* Reviews Page */}
        <Route path="/reviews" element={<Reviews />} />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-sky-600 text-white text-center py-6 mt-auto">
        <p>© 2025 MovieReview | All Rights Reserved</p>
      </footer>
    </div>
  );
}
