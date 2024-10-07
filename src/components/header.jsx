import React, { Component } from "react";
import { newsCategory } from "../news";

class Header extends Component {
  // state = {
  //   searchTerm: "",
  // };
  handleOnChange = (e) => {
    e.target.name = e.target.value;
  };
  

  render() {
    const { category, changeCategory,searchTerm,performSearch } = this.props;
    // console.log(category);
    return (
      <div className="my-4">
        <h1 className="text-center mb-4" style={{ fontWeight: "300" }}>
          Block Buster Headlines
        </h1>
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          // value=""
          onChange={this.handleChange}
          onKeyUp={(event)=>{
            if(event.key==="Enter"){
              performSearch(event.target.value)
            }
          }}

        />
        <div className="my-4">
          {newsCategory &&
            Object.keys(newsCategory).map((item) => {
              if (category === newsCategory[item]) {
                return (
                  <button
                    className="btn btn-sm me-2 mb-2 btn-warning"
                    onClick={() => changeCategory(newsCategory[item])}
                  >
                    {`#${newsCategory[item]}`}
                  </button>
                );
              } 
                return (
                  <button
                    className="btn btn-sm me-2 mb-2 btn-light"
                    onClick={() => changeCategory(newsCategory[item])}
                  >
                    {`#${newsCategory[item]}`}
                  </button>
                );
              
            })}
        </div>
      </div>
    );
  }
}

export default Header;
