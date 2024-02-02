import React, { useState, useRef, useEffect } from "react";
import "./Selector.css";

function Selector({
  mainTitle,
  title,
  items = [],
  initialSelection = [],
  selectedItem,
  ismultiselect = false,
  isError,
}) {
  const [open, setopen] = useState(false);
  const [selection, setselection] = useState(initialSelection);
  const toggle = () => setopen(!open);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setopen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const handleOnClick = (item) => {
    if (
      !selection.some(function (e) {
        return e.id == item.id;
      })
    ) {
      if (!ismultiselect) {
        setselection([item]);
        selectedItem([item]);
        setopen(false);
      } else if (ismultiselect) {
        setselection([...selection, item]);
        selectedItem([...selection, item]);
      }
    } else {
      let selectionAfterRemovel = selection;
      selectionAfterRemovel = selectionAfterRemovel.filter(
        (current) => current.id != item.id
      );
      setselection([...selectionAfterRemovel]);
      selectedItem([...selectionAfterRemovel]);
    }
  };

  const isIteminSelection = (item) => {
    if (
      selection.find(function (e) {
        return e.id == item.id;
      })
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="selector" ref={ref}>
      <div
        className={`selector-header ${isError ? "error" : ""}`}
        onClick={() => setopen(!open)}
      >
        <div className="header-title">
          <div className="title">{mainTitle}</div>
          {selection.length > 0 ? selection[0].item : title}
        </div>
        {/* {open ? <BiSolidUpArrow /> : <BiSolidDownArrow />} */}
      </div>
      {open && (
        <div className="list">
          {items.map((item, i) => (
            <div
              className="list-item"
              key={i}
              onClick={() => handleOnClick(item)}
            >
              <span className="text">{item.item}</span>
              {isIteminSelection(item) && <i className="fa fa-check" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Selector;
