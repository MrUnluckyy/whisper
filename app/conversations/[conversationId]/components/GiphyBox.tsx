"use client";
import { GifsResult } from "@giphy/js-fetch-api";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { HiGif } from "react-icons/hi2";
import axios from "axios";
import { HiSearch } from "react-icons/hi";
import { RiEmojiStickerFill } from "react-icons/ri";

interface GiphyBoxProps {
  type?: "gifs" | "stickers";
  onSelected: (item: string) => void;
}

const GiphyBox: FC<GiphyBoxProps> = ({ type = "gifs", onSelected }) => {
  const [gifs, setGifs] = useState<GifsResult["data"]>([]);
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
    if (searchKey.length === 0) {
      axios
        .get(`https://api.giphy.com/v1/${type}/trending`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_GIPHY_KEY,
            limit: 5,
          },
        })
        .then(({ data }: { data: GifsResult }) => {
          setGifs(data.data);
        })
        .catch((err: any) => {
          console.log("ERROR", err);
        });
    }
  }, [searchKey.length, type]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
    if (e.target.value.length > 1) {
      axios
        .get(`https://api.giphy.com/v1/${type}/search`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_GIPHY_KEY,
            q: e.target.value,
            limit: 5,
          },
        })
        .then((data) => {
          if (data.data.data.length) {
            setGifs(data.data.data);
          } else {
            setGifs([]);
          }
        })
        .catch((error: any) => {
          console.log("Search Gif", error);
        });
    }
  };

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
                key={gif.content_url}
                id={gif.url}
                src={gif.images.fixed_width.url}
                alt={gif.alt_text || "gif"}
                className="cursor-pointer"
                onClick={() => {
                  handleSelect(gif.images.fixed_width.url);
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
