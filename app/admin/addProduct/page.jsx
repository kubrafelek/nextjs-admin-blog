"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Kübra Felek",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Kübra Felek",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl font-medium">Upload thumbnail</p>
        <label htmlFor="image" className="">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          className=""
          hidden
          required
        />

        <p className="text-xl mt-4">Blog Title</p>
        <input
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          id=""
          placeholder="Enter blog title"
          required
        />

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          id=""
          placeholder="Write something..."
          required
        />

        <p className="text-xl mt-4">Select Category</p>
        <select
          name="category"
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
          id=""
          onChange={onChangeHandler}
          value={data.category}
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          Add Blog
        </button>
      </form>
    </>
  );
};

export default page;
