import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt=""
          width={400}
          height={400}
          className="border-b border-black"
        />
      </Link>
      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tighter text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-sm tracking-tighter text-gray-700">
          {description}
        </p>
      </div>
      <div className="inline-flex items-center py-2 font-semibold text-center">
        <Link href={`/blogs/${id}`}>
          Read More{" "}
          <Image src={assets.arrow} alt="" width={12} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
