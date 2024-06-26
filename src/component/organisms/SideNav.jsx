import styled from "styled-components";
import React from "react";

const SideNavStyles = styled.aside`
  position: sticky;
  top: 7rem;
  background-color: #d3d3d3;
  overflow-x: hidden;
  button {
    padding: 10px 20px;
    text-decoration: none;
    font-size: 12px;
    text-align: left;
    display: block;
  }
  .Categories {
    display: none;
    button {
      background: none;
    }
  }
  .DownArrow {
    position: absolute;
    right: 2rem;
    top: 0.5rem;
    font-size: 1.6rem;
    transform: rotate(90deg);
  }

  @media only screen and (min-width: 600px) {
    .DropButton {
      display: none;
    }
    .Categories {
      display: grid;
      background-color: #d3d3d3;
      button {
        padding: 10px 20px;
        text-decoration: none;
        font-size: 12px;
        text-align: left;
        display: block;
        color: black;
        background: none;
        &:hover {
          color: #f1f1f1;
          cursor: pointer;
        }
        &.selected {
          background: #949494;
        }
      }
    }
    grid-row: span
      ${(props) => {
        return Math.ceil(props.itemNum / 2);
      }};
  }
  @media only screen and (min-width: 992px) {
    grid-row: span
      ${(props) => {
        return Math.ceil(props.itemNum / 4);
      }};
  }
`;

export default function SideNav({
  itemNum,
  handleSelect,
  categoryData,
  selectedFilterVal = "",
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [selectedFilter, setSelectedFilter] = React.useState(
    selectedFilterVal ?? ""
  );

  // Only handle mobile menu
  const handleDropdown = () => {
    setIsOpen(!isOpen);
    if (window.innerWidth < 601) {
      let el = document.querySelector(".Categories");
      !isOpen ? (el.style.display = "none") : (el.style.display = "block");
    }
  };

  return (
    <SideNavStyles itemNum={itemNum}>
      <button className="DropButton" onClick={handleDropdown}>
        {selectedFilter !== "" ? selectedFilter : "Select a category"}
        <span className="DownArrow">{">"}</span>
      </button>
      <div className="Categories">
        {categoryData.map((item) => (
          <button
            onClick={(e) => {
              setSelectedFilter(e.target?.innerText);
              handleDropdown();
              handleSelect(e);
            }}
            key={item.id}
            className={`${selectedFilter === item.name ? "selected" : ""}`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </SideNavStyles>
  );
}
