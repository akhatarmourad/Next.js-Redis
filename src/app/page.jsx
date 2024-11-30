import { client } from '@/lib/db'
import Link from 'next/link'

const getBooks = async () => {
  const result = await client.zRangeWithScores("books", 0, -1);

  const books = Promise.all(result.map((book) => {
    return client.hGetAll(`books:${book.score}`);
  }));

  return books;
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="btn">Add a new book</Link>
      </nav>
      
      <div>
        {
          books.map((book) => {
            return (
              <div key={book.title} className='card'>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.blurb}</p>
                <p>{book.rating}</p>
              </div>
            );
          })
        }
      </div>
    </main>
  )
}
