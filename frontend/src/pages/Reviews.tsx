import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import api from "../api";

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  imageUrl: string;
}

export default function Reviews() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get<Movie[]>("/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">🎥 Movie Reviews</h3>
      {movies.length === 0 ? (
        <p className="text-gray-500 text-center">No movies available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-2">{movie.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{movie.description}</p>
                <div className="flex items-center text-yellow-500">
                  <Star fill="gold" className="w-5 h-5" />
                  <span className="ml-2 text-gray-800 font-medium">
                    {movie.rating.toFixed(1)} / 5
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
