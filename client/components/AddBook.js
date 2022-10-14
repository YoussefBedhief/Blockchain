import { ethers } from "ethers";
import { useState } from "react";
import { ContractAdress } from "../utils/constant";
import Library from "../utils/Library.json";

function AddBook() {
  const [txError, setTxError] = useState(null);

  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookYear, setBookYear] = useState("");
  const [bookImage, setBookImage] = useState("");

  const submitBook = async () => {
    let book = {
      name: bookName,
      year: parseInt(bookYear),
      author: bookAuthor,
      image: bookImage,
    };

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

        let libraryTx = await LibraryContract.addBook(
          book.name,
          book.year,
          book.author,
          book.image,
          book.filter
        );

        console.log(libraryTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error Submitting new Book", error);
      setTxError(error.message);
    }
  };
  return (
    <div className="flex items-end flex-col mt-4 shadow-md p-5">
      <div class="grid gap-6 mb-6 md:grid-cols-2 content-center">
        <div>
          <label
            for="book_name"
            class="block mb-2 text-sm font-medium text-purple-600 "
          >
            Book name
          </label>

          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-600 block w-full p-2.5  "
            type="text"
            placeholder="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>{" "}
        <div>
          <label
            for="author_name"
            class="block mb-2 text-sm font-medium text-purple-600 "
          >
            Author name
          </label>

          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-600 block w-full p-2.5  "
            type="text"
            placeholder="Book Author"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
        </div>
        <div>
          <label
            for="author_name"
            class="block mb-2 text-sm font-medium text-purple-600 "
          >
            Book Year
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-600  block w-full p-2.5  "
            type="text"
            placeholder="Book Year"
            value={bookYear}
            onChange={(e) => setBookYear(e.target.value)}
          />
        </div>
        <div>
          <label
            for="author_name"
            class="block mb-2 text-sm font-medium text-purple-600 "
          >
            Book Image
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-600 block w-full p-2.5  "
            type="text"
            placeholder="Book Image"
            value={bookImage}
            onChange={(e) => setBookImage(e.target.value)}
          />
        </div>
      </div>
      <div className="justify-center">
        <button
          className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 mt-5 py-2.5 text-center mr-2 mb-2"
          onClick={submitBook}
        >
          Add Book
        </button>
      </div>
    </div>
  );
}

export default AddBook;
