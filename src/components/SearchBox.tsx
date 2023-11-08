"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
const SearchBox = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="relative h-14 max-w-[380px] flex items-center">
      <BiSearch className="absolute left-4" size={22} />
      <input
        className="w-full h-full rounded-[500px] pl-12 text-sm"
        type="text"
        placeholder="What do you want to listen to?"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
