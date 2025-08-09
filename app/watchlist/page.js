'use client';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../store/watchlistSlice'; // ✅ adjust path
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { FaStar } from 'react-icons/fa';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: '400' });


const inter = Inter({ subsets: ['latin'], weight: '400' });

export default function WatchlistPage() {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.items);

  return (
    <div className="p-5">
      <h1 className={`text-3xl font-bold mb-4 ${inter.className}`}>Your Watchlist</h1>

      {watchlist.length === 0 ? (
        // eslint-disable-next-line react/no-unescaped-entities
        <p className={`text-gray-400 ${inter.className}`}>You haven't added any movies yet.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {watchlist.map((movie) => (
            <li key={movie.id} className="shadow rounded p-2 relative">
              <div className="relative inline-block">
                <Image
                  width={300}
                  height={180}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-t"
                />
                <button
                  onClick={() => dispatch(removeFromWatchlist(movie.id))}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-700 transition z-10"
                  aria-label="Remove from Watchlist"
                >
                  ✕
                </button>
              </div>
              <div className="-mt-1 px-2 py-2">
              <p className={`mt-2 font-bold text-white ${playfair.className} ml-2`}>{movie.title}</p>
              <p className={`mt-2 font-medium text-white ${playfair.className} ml-2`}><span className="font-bold">Votes:</span> {movie.popularity}</p>
                <p className={`mt-2 font-medium text-white ${playfair.className} flex items-center gap-2 ml-2 pb-2`}>
                        <FaStar className="text-yellow-500" /> {movie.vote_average}
                      </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
