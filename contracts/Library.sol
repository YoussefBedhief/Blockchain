// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
//Création du smart contract avec le mot clés contract
contract Library{
// Créer un event qui va nous traquer chaque livre son propriétaire
    event AddBook(address Recepient, uint BookId);
    event SetFinished(uint bookId, bool filter);


// Créer une nouvelle structure ou on définie les champs 
    struct Book{
        uint id;
        string name;
        uint year;
        string author;
        string image;
        bool filter;
    }
    //Créer un tableau de Book qui va jouer le role d'une mémoire ou on stock nos livre
    Book[] private BookList;
    // Création d'une mapping ou la clé est l'id du livre et la valeur est le propriétaire du livre
    mapping (uint256 => address) bookOwner;

    function addBook(string memory name, uint16 year, string memory author, string memory image, bool filter) external{
        uint BookId = BookList.length;
        BookList.push( Book(BookId, name, year, author, image, filter));
        bookOwner[BookId]= msg.sender;
        emit AddBook(msg.sender, BookId);
    }

     function _getBookList(bool filter) private view returns (Book[] memory) {
    Book[] memory temporary = new Book[](BookList.length);
    uint counter = 0;
    for(uint i=0; i<BookList.length; i++) {
      if(bookOwner[i] == msg.sender &&
        BookList[i].filter == filter
      ) {
        temporary[counter] = BookList[i];
        counter++;
      }
    }

    Book[] memory result = new Book[](counter);
    for(uint i=0; i<counter; i++) {
      result[i] = temporary[i];
    }
    return result;
  }

    function getFiltredBooks() external view returns(Book[] memory){
        return _getBookList(true);
    }
    function getNonFilteredBooks() external view returns(Book[] memory){
        return _getBookList(false);

    }
    function setFinished(uint bookId, bool filter) external {
    if (bookOwner[bookId] == msg.sender) {
      BookList[bookId].filter = filter;
      emit SetFinished(bookId, filter);
    }
  }
}