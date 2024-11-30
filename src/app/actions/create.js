'use server'

import { client } from "@/lib/db"
import { redirect } from 'next/navigation'

export async function createBook(formData) {
  const {title, rating, author, blurb} = Object.fromEntries(formData);

  // Generate a random id
  const id = Math.floor(Math.random() * 100000);

  // Add the book to the Sorted Set
  const returnResult = await client.zAdd("books", {
    value: title,
    score: id
  }, { NX: true });

  if(!returnResult) console.log("Error : Books already exists !");
  else console.log("Success : Book added successfully !");

  // Insert data into a HashSet
  await client.hSet(`books:${id}`, {
    title,
    author,
    rating,
    blurb
  });

  // Redirect to home page
  redirect("/");
}