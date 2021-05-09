import { useState, useRef, useEffect } from "react";
import { results } from "./db";
import logo from "../src/assets/images/logo.png";
const data = results;

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(false);
  const [currentChar, setCurrentChar] = useState("");
  const searchRef = useRef();
  const isTyping = search.replace(/\s+/, "").length > 0;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (e) => {
    if (!searchRef.current.contains(e.target)) {
      setSearch("");
    }
  };

  const getSelectedData = (item) => {
    setCurrentChar(item);
  };

  useEffect(() => {
    const inputWrapper = document.querySelector(".input-wrapper");

    if (isTyping || currentChar) {
      const filteredResult = data.filter((item) =>
        item.name
          .toLocaleLowerCase()
          .trim()
          .includes(search.toLocaleLowerCase().trim())
      );
      setResult(filteredResult.length > 0 ? filteredResult : false);
      inputWrapper.classList.add("inpTyping");
    } else {
      inputWrapper.classList.remove("inpTyping");
      setResult(false);
    }
  }, [search]);

  return (
    <div className="wrapper">
      <div className="banner">
        <img src={logo} alt="Logo" />
      </div>
      <div className="search" ref={searchRef}>
        <div className="input-wrapper">
          <input
            type="text"
            value={search}
            className={isTyping || currentChar ? "typing" : null}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isTyping && (
          <div className="search-result">
            {result &&
              result.map((item) => (
                <div
                  onClick={() => getSelectedData(item)}
                  key={item.id}
                  className="search-result-item"
                >
                  {item.name}
                </div>
              ))}
            {!result && (
              <div className="result-not-found">
                "{search} / Look for Star Wars character, not the Lotr.."
              </div>
            )}
          </div>
        )}
        {currentChar ? (
          <div id="current">
            <table>
              <tbody>
                <tr>
                  <td>{currentChar.name}</td>
                  <td>{currentChar.birth_year}</td>
                  <td>{currentChar.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
