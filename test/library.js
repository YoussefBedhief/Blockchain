const { expect } = require("chai");
const { ethers } = require("hardhat");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

describe("Library contract", function () {
  let Library;
  let library;
  let owner;
  const FILTRED_BOOKS = 3;
  const NON_FILTRED_BOOKS = 5;
  let filtredBookList;
  let nonFiltredBookList;
  function verifyBook(bookChain, book) {
    expect(book.name).to.equal(bookChain.name);
    expect(book.year.toString()).to.equal(bookChain.year.toString());
    expect(book.author).to.equal(bookChain.author);
    expect(book.image).to.equal(bookChain.image);
  }

  function verifyBookList(booksFromChain, bookList) {
    expect(booksFromChain.length).to.not.equal(0);
    expect(booksFromChain.length).to.equal(bookList.length);
    for (let i = 0; i < bookList.length; i++) {
      const bookChain = booksFromChain[i];
      const book = bookList[i];
      verifyBook(bookChain, book);
    }
  }
  beforeEach(async function () {
    Library = await ethers.getContractFactory("Library");
    [owner] = await ethers.getSigners();
    library = await Library.deploy();

    filtredBookList = [];
    nonFiltredBookList = [];

    for (let i = 0; i < FILTRED_BOOKS; i++) {
      let book = {
        name: getRandomInt(1, 10000).toString(),
        year: getRandomInt(1800, 2022),
        author: getRandomInt(1, 10000).toString(),
        image: getRandomInt(1, 10000).toString(),
        filter: true,
      };
      await library.addBook(
        book.name,
        book.year,
        book.author,
        book.image,
        book.filter
      );
      filtredBookList.push(book);
    }
    for (let i = 0; i < NON_FILTRED_BOOKS; i++) {
      let book = {
        name: getRandomInt(1, 10000).toString(),
        year: getRandomInt(1800, 2022),
        author: getRandomInt(1, 10000).toString(),
        image: getRandomInt(1, 10000).toString(),
        filter: false,
      };
      await library.addBook(
        book.name,
        book.year,
        book.author,
        book.image,
        book.filter
      );
      nonFiltredBookList.push(book);
    }
  });

  describe("Add Book", function () {
    it("should emit AddBook event", async function () {
      let book = {
        name: getRandomInt(1, 1000).toString(),
        year: getRandomInt(1800, 2021),
        author: getRandomInt(1, 1000).toString(),
        image: getRandomInt(1, 1000).toString(),
        filter: false,
      };

      await expect(
        await library.addBook(
          book.name,
          book.year,
          book.author,
          book.image,
          book.filter
        )
      )
        .to.emit(library, "AddBook")
        .withArgs(owner.address, FILTRED_BOOKS + NON_FILTRED_BOOKS);
    });
  });
  describe("Get Book", function () {
    it("should return the correct non filtered books", async function () {
      const booksFromChain = await library.getNonFilteredBooks();
      expect(booksFromChain.length).to.equal(NON_FILTRED_BOOKS);
      verifyBookList(booksFromChain, nonFiltredBookList);
    });

    it("should return the correct filtred books", async function () {
      const booksFromChain = await library.getFiltredBooks();
      expect(booksFromChain.length).to.equal(FILTRED_BOOKS);
      verifyBookList(booksFromChain, filtredBookList);
    });
  });
});
