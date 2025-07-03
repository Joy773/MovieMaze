/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { addToWatchlist } from "../store/watchlistSlice"; // ✅ Add this
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Orbitron, Inter, Cinzel } from "next/font/google";
import Image from "next/image";

const cinzel = Cinzel({ subsets: ["latin"], weight: "700" });
const orbitron = Orbitron({ subsets: ["latin"], weight: "700" });
const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function Movies() {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.items); // ✅ lowercase for convention

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const endpoint = query
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        const res = await fetch(endpoint);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchMovies();
    }, 400);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div>
          <h1 className={`text-3xl ${orbitron.className}`}>MovieMaze</h1>
        </div>
        <div className="flex justify-center items-center">
          <ul className="flex gap-5">
            <li className={`hover:text-sky-400 hover:pt-1 ${inter.className}`}>
              <Link href="/watchlist">Watchlist</Link>
            </li>
            <li className={`hover:text-sky-400 hover:pt-1 ${inter.className}`}>
              <Link href="/">Movies</Link>
            </li>
            <li className={`hover:text-sky-400 hover:pt-1 ${inter.className}`}>
              <Link href="/">TV Shows</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full mt-3">
        <input
          type="text"
          placeholder="Search Movies, TV Shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>

      {/* Movie List */}
      <div className="p-4">
        <h1 className={`text-2xl font-bold mb-4 ${inter.className}`}>
          {query ? "Search Results" : "Popular Movies"}
        </h1>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.length > 0 ? (
              movies.map((movie) => {
                const isInWatchlist = watchlist.some((item) => item.id === movie.id);
                return (
                  <li key={movie.id} className="bg-white shadow rounded p-2 relative">
                    <Image
                      width={500}
                      height={300}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded"
                    />
                    <p className={`mt-2 font-bold text-stone-800 ${inter.className}`}>
                      {movie.title}
                    </p>
                    <p className={`mt-2 font-medium text-stone-800 ${inter.className}`}>
                      <span className="font-bold">Votes:</span> {movie.popularity}
                    </p>

                    {/* Add or Show Checkmark */}
                    {isInWatchlist ? (
                      <span
                        className="absolute top-2 right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
                        title="Already in Watchlist"
                      >
                        ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => dispatch(addToWatchlist(movie))}
                        className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-blue-700 transition"
                        aria-label="Add to Watchlist"
                      >
                        +
                      </button>
                    )}
                  </li>
                );
              })
            ) : (
              <p className="text-gray-400">
                {query ? "No results found." : "No movies to show."}
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
