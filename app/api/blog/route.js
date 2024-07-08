import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { writeFile } from 'fs/promises'

const LoadDB = async () => {
    await ConnectDB();
};
LoadDB(); // api connected into MongoDB

export async function GET() {
    return NextResponse.json({ msg: "API Working" });
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