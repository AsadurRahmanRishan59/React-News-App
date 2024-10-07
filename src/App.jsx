import "./App.css";
import React from "react";

import Header from "./components/header";
import News, { newsCategory } from "./news";
import NewsList from "./components/newsList";
import Pagination from "./components/pagination";
import Loading from "./components/loading";

const news = new News(newsCategory.technology);

class App extends React.Component {
  state = {
    data: {},
    isLoading: true,
  };

  componentDidMount() {
    news
      .getNews()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
        this.setState({ isLoading: false });
      });
  }

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true });
    }

    news
      .next()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
        this.setState({ isLoading: false });
      });
  };

  prev = () => {
    if (this.state.data.isPrev) {
      this.setState({ isLoading: true });
    }

    news
      .prev()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
        this.setState({ isLoading: false });
      });
  };

  render() {
    const{article,isPrev,isNext,category,totalResults,currentPage,totalPage}=this.state.data
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-md-3">
            <Header
            />
            <div className="d-flex">
              <p className="text-black-50">
                {totalResults} Data Found
              </p>
              <p className="text-black-50 ms-auto">
                {currentPage} page of {totalPage}
              </p>
            </div>
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <div>
                <NewsList news={article} />
                <Pagination
                  next={this.next}
                  prev={this.prev}
                  isPrev={isPrev}
                  isNext={isNext}
                  totalPage={totalPage}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
