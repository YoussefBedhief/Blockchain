import PropTypes from "prop-types";

const Book = ({ id, name, year, author, image }) => {
  return (
    <div>
      <div className="first">
        <span>{name}</span>
        <br />
        <span>{author}</span>
        <br />
        <span>{year}</span>
        <br />
        <img src={image} alt="book cover image" />
        <br />
      </div>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  finished: PropTypes.string.isRequired,
};
