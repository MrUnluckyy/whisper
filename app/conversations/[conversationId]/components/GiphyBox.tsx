"use client";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { HiGif } from "react-icons/hi2";
import axios from "axios";
import { HiSearch } from "react-icons/hi";
import { RiEmojiStickerFill } from "react-icons/ri";
import { TenorGifs } from "@/app/types";

interface GiphyBoxProps {
  type?: "gifs" | "stickers";
  onSelected: (item: string) => void;
}
// FIND TENOR API TYPES
const GiphyBox: FC<GiphyBoxProps> = ({ type = "gifs", onSelected }) => {
  const [gifs, setGifs] = useState<TenorGifs[]>([]);
  const [searchKey, setSearchKey] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (image: string) => {
    const elem = document.activeElement as HTMLDivElement;
    if (elem) {
      elem?.blur();
    }
    onSelected(image);
  };

  useEffect(() => {
    if (searchKey?.length === 0) {
      axios
        .get("https://tenor.googleapis.com/v2/featured", {
          params: {
            key: process.env.NEXT_PUBLIC_TENOR_KEY,
            limit: 5,
          },
        })
        .then((data) => {
          console.log(data);

          setGifs(data.data.results);
        })
        .catch((err: any) => {
          console.log("ERROR", err);
        });
    }
  }, [searchKey?.length]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
    if (e.target?.value?.length) {
      axios
        .get(`https://tenor.googleapis.com/v2/search`, {
          params: {
            key: process.env.NEXT_PUBLIC_TENOR_KEY,
            q: e.target.value,
            limit: 5,
          },
        })
        .then((data) => {
          if (data.data.results.length) {
            console.log("search", data.data.results);
            setGifs(data.data.results);
          } else {
            setGifs([]);
          }
        })
        .catch((error: any) => {
          console.log("Search Gif", error);
        });
    }
  };

  console.log(gifs);

  return (
    <div className="dropdown dropdown-top">
      <div ref={dropdownRef} tabIndex={0} role="button">
        {type === "gifs" ? (
          <HiGif size={30} />
        ) : (
          <RiEmojiStickerFill size={30} />
        )}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] card card-compact bg-base-300 h-[300px] overflow-y-auto"
      >
        <div className="card-body">
          <label className="input input-sm input-bordered flex items-center gap-2">
            <HiSearch />
            <input
              type="text"
              className="grow input-xs"
              placeholder="Search"
              onChange={handleChange}
            />
          </label>
          <div className="flex flex-col">
            {gifs?.map((gif) => (
              <img
                key={gif.id}
                id={gif.id}
                src={gif.media_formats.gif.url}
                alt={gif.title || "gif"}
                className="cursor-pointer"
                onClick={() => {
                  handleSelect(gif.media_formats.gif.url);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiphyBox;
