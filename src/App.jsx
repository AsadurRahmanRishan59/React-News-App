import "./App.css";
import React from "react";
import axios from "axios";

import Header from "./components/header";
import { newsCategory } from "./news";
import NewsList from "./components/newsList";
import Pagination from "./components/pagination";
import Loading from "./components/loading";

class App extends React.Component {
  state = {
    news: [],
    category: newsCategory.technology,
    totalResults:'',
    totalPage:'',
    currentPage:1,
    searchTerm:''
  };

  // handleChange = (event) => {
  //   this.setState({ searchTerm: event.target.value })
  // };

  performSearch = (searchTerm) => {
    this.setState({searchTerm})
    const news=this.state.news.filter(item=>item.title.includes(this.state.searchTerm))
    console.log("Searched news ",news)
    this.setState({
      news
    })
    this.setState({
      searchTerm:""
    })
  };

 
  handleOnkeyPress = (value) => {
    const page = parseInt(value, 10);
    console.log('page : ',page)
    if (page >= 1 && page <= this.state.totalPage) {
      this.setState({ currentPage: page });
    }
  };

  changeCategory = (category) => {
    this.setState({ category,currentPage:1 });
  };
  nextPage = ()=>{
    this.setState({
      currentPage:this.state.currentPage+1
    })
    
  }
  prevPage = ()=>{
    this.setState({
      currentPage:this.state.currentPage-1
    })
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${this.state.category}&pageSize=10&page=${this.state.currentPage}`;

    axios
      .get(url)
      .then((response) => {
        
        this.setState({
          news: response.data.articles,
          totalResults:response.data.totalResults,
          totalPage:(response.data.totalResults/10)%1!==0?Math.ceil(response.data.totalResults/10):(response.data.totalResults/10),
          
        });
      })
      .catch((e) => console.log(e));
  }
  componentDidUpdate(prevProp, prevState) {
    if (prevState.category !== this.state.category || prevState.currentPage !== this.state.currentPage) {
      const url = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${this.state.category}&pageSize=10&page=${this.state.currentPage}&q=${this.state.searchTerm}`;
      
      axios
        .get(url)
        .then((response) => {
          this.setState({
            news: response.data.articles,
            totalResults:response.data.totalResults,
            totalPage:(response.data.totalResults/10)%1!==0?Math.ceil(response.data.totalResults/10):(response.data.totalResults/10),
          });
        })
        .catch((e) => console.log(e));
    }
  }
  

  render() {
    // const totalPage = (this.state.totalResults/10)%1!==0?Math.ceil(this.state.totalResults/10):(this.state.totalResults/10)
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-md-3">
            <Header
              category={this.state.category}
              changeCategory={this.changeCategory}
              
              handleChange={this.handleChange}
              performSearch={this.performSearch}
            />
            <div className="d-flex">
              <p className="text-black-50">{this.state.totalResults} Data Found</p>
              <p className="text-black-50 ms-auto">
                {this.state.currentPage} page of {this.state.totalPage}
              </p>
            </div>
            <NewsList news={this.state.news} />
            <Pagination nextPage={this.nextPage} prevPage={this.prevPage} currentPage={this.state.currentPage} totalPage={this.state.totalPage} handleOnkeyPress={this.handleOnkeyPress}/>
            <Loading />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
