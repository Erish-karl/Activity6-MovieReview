import React, { useEffect, useState } from "react";
import { Star, Film } from "lucide-react";
import api from "../api";

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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        📝 All User Reviews
      </h3>

      {movies.length === 0 ? (
        <p className="text-gray-500 text-center">No movies available.</p>
      ) : (
        <div className="flex flex-col space-y-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Movie Header */}
              <div className="flex items-center p-4 border-b border-gray-200">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mr-4">
                  {movie.imageUrl ? (
                    <img src={movie.imageUrl} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Film className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{movie.title}</h4>
                  <p className="text-gray-600 text-sm">{movie.description}</p>
                  <div className="flex items-center mt-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-yellow-500" />
                    <span className="ml-2 text-gray-800 font-medium">
                      {movie.averageRating?.toFixed(1)} / 5 ({movie.reviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="p-4 max-h-96 overflow-y-auto space-y-2">
                {movie.reviews.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">No reviews yet.</p>
                ) : (
                  movie.reviews.map((review) => (
                    <div key={review.id} className="border-l-4 border-yellow-400 pl-3 bg-gray-50 rounded p-2">
                      <p className="text-gray-800 font-semibold">
                        {review.reviewer} <span className="text-yellow-500 font-medium">({review.rating}/5)</span>
                      </p>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
