import React, { Component } from "react";
class Pagination extends Component {
  state = {
    isEditable: false,
  };

  handleOnChange = (e) => {
    e.target.name = e.target.value;
  };

  render() {
    const { currentPage, totalPage, next, prev, isNext, isPrev } = this.props;

    return (
      <div className="d-flex my-5 align-items-center">
        
          <button className="btn btn-warning" disabled={!isPrev} onClick={()=>{
            prev()
          }}>
            previous
          </button>
        
        {/* <div className="flex-grow-1 text-center">
          {this.state.isEditable ? (
            <input
              type="number"
              min={1}
              max={totalPage}
              onBlur={() => this.setState({ isEditable: false })}
              onChange={this.handleOnChange}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  // handleOnkeyPress(e.target.value);
                  console.log("entered ", e.target.value);
                  this.setState({ isEditable: false });
                }
              }}
              autoFocus
            />
          ) : (
            <p
              style={{ userSelect: "none", lineHeight: "1.1" }}
              title="Double Tap to Jump Page"
              onDoubleClick={() =>
                this.setState({ isEditable: !this.state.isEditable })
              }
            >
              {currentPage} of {totalPage}
              <br />
              <small>Double Tap to Edit</small>
            </p>
          )}
        </div> */}
        <button className="btn btn-warning ms-auto" disabled={!isNext} onClick={()=>{
          next()
        }}>
          next
        </button>
      </div>
    );
  }
}

export default Pagination;
