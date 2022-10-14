import AddBook from "../components/AddBook";
import ListBook from "../components/ListBook";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <div className="flex justify-center">
        {/* ListBook */}
        <div className="flex-grow">
          <ListBook />
        </div>
        {/* AddBook */}
        <AddBook />
      </div>
    </div>
  );
}
