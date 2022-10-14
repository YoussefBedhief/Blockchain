import { ethers } from "ethers";
import { useState } from "react";
import { ContractAdress } from "../utils/constant";
import Library from "../utils/Library.json";
import Book from "./Book";
function ListBook() {
  const [txError, setTxError] = useState(null);

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const LibraryContract = new ethers.Contract(
          ContractAdress,
          Library.abi,
          signer
        );

        let booksFiltreded = await LibraryContract.getFiltredBooks();

        let booksUnFiltreded = await LibraryContract.getNonFilteredBooks();

        console.log(booksUnFiltreded);
        console.log("Books:- ");
        console.log(booksFiltreded);

        let books = booksFiltreded.concat(booksUnFiltreded);
        setBooks(books);
        console.log(books);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setTxError(error.message);
    }
  };
  return (
    <div className="flex flex-col ">
      <div className="flex justify-center">
        <button
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 mt-5 py-2.5 text-center mr-2 mb-2"
          onClick={getBooks}
        >
          Get Books
        </button>
      </div>
      <p className="font-semibold text-[35px] text-center mb-4 text-violet-600">
        Books List
      </p>
      {books.map((book) => (
        <div className="flex justify-center md:justify-start flex-nowrap ">
          <div className="flex p-4 flex-row ">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <img
                alt="Book image URL"
                className="flex-shrink-0 rounded-lg w-48 h-72 object-cover object-center sm:mb-0 mb-4"
                src={book.image}
              />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">
                  {book.name}
                </h2>
                <div className="text-gray-500 mb-3">by {book.author}</div>
                <p className="mb-4">{parseInt(book.year._hex, 16)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListBook;
