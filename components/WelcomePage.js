import Link from "next/link";
import React from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { Inter } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "700",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

export default function WelcomePage() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/theatre.jpeg"
        alt="theatre"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center px-4 text-center text-white">
        <h1
          className={`font-bold font-sans text-5xl mb-6 ${orbitron.className}`}
        >
          MovieMaze
        </h1>

        <div className="max-w-3xl mb-6">
          <p className={`text-sm text-gray-300 ${inter.className}`}>
            Explore the world of cinema like never before. MovieMaze is your
            ultimate destination for discovering trending movies, watching
            trailers, and diving into detailed information about your favorite
            films — all in a sleek, dark-themed interface. Whether you are
            searching for a hidden gem or keeping up with the latest
            blockbusters, MovieMaze makes the journey seamless and exciting.
            Find it. Watch it. Love it. Only on MovieMaze.
          </p>
        </div>
        <div className="w-fit border border-gray-500 rounded-md">
          <Link
            href="/movies"
            className={`p-2 flex items-center gap-2 text-white hover:bg-amber-50 hover:text-black transition-all hover:p-1 hover:rounded-md ${inter.className}`}
          >
            <FaRegCirclePlay />
            Explore Movies
          </Link>
        </div>
      </div>
    </div>
  );
}
