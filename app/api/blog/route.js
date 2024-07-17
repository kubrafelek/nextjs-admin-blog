import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { writeFile } from 'fs/promises'
const fs = require('fs');

const LoadDB = async () => {
    await ConnectDB();
};
LoadDB(); // api connected into MongoDB

export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs });
    }
}

export async function POST(request) {

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title: `${formData.get("title")}`,
        description: `${formData.get("description")}`,
        category: `${formData.get("category")}`,
        author: `${formData.get("author")}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get("authorImg")}`
    }
    await BlogModel.create(blogData); // data will be saved in MongoDB
    console.log("Blog saved");

    return NextResponse.json({ success: true, msg: "Blog added successfully" });
}

// Delete blog API 
export async function DELETE(request) {

    const id = request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);
    fs.unlinkSync(`./public${blog.image}`, () => { }); // delete image from public folder
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
}