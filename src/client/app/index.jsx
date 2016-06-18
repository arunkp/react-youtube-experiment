import React from 'react';
import {render} from 'react-dom';
import Request from 'reqwest';
import List from './list.jsx';
import VideoPlayer from './videoplayer.jsx';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      autoCompleteInput: "",
      autoSuggestData: [],
      videoLists:[],
      videoSelected: "",
      nextPageToken: "",
      resultQuery: ""
    };
  }


  fetchResults(){
    var self = this;
    console.log(this.state.nextPageToken);
    var request = gapi.client.youtube.search.list({
        q: this.state.resultQuery,
        part: 'snippet',
        maxResults: 20,
        PageToken: this.state.nextPageToken
      });

      request.execute(function(response) {
        var str = JSON.stringify(response.result);
        console.log(response.result);
        console.log(response.result.pageToken);
        console.log(response.result.nextPageToken);
        debugger;
        self.setState({
          videoLists:response.result.items,
          nextPageToken: response.result.nextPageToken
        });
      });
  }


  componentDidMount() {
    var self = this;
    var prevList = this.state.videoLists;
    $('.video-thumbs').bind('scroll', function(e) {
      var elem = $(e.currentTarget);
          if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {
            // self.getResults.bind(this)();
            self.fetchResults.bind(self)();
            // var request = gapi.client.youtube.search.list({
            //     q: resultQuery,
            //     part: 'snippet',
            //     maxResults: 20,
            //     PageToken: self.state.nextPageToken
            //   });

            // console.log(self.state.nextPageToken);
            // console.log(self.state.videoLists);

            //   request.execute(function(response) {
            //     console.log(response.result.nextPageToken);
            //     var newList = response.result.items;
            //     var str = JSON.stringify(response.result);
            //     self.setState({
            //       videoLists: response.result.items,
            //       nextPageToken: response.result.nextPageToken
            //     });
            //     // console.log(response.result);
            //   });
          }
    });
  }

  getAutoComplete(e){
    var q = e.target.value;
    var apiKey = "AIzaSyD3USYjzVwlrM6eiiN_PHDFtVmEP1lrR9M";
    var self = this;
    if(q.length > 3) {
      $(".suggestions").show();
      Request({
        url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+q+"&key="+apiKey+"&format=5&alt=json&callback=?",
        method: 'get',
        type: 'jsonp',
        success: function(data, textStatus, request) {
          self.setState({
            autoSuggestData:data
          })
        }
      });
    }else{
      $(".suggestions").hide();
    }
  }

  getResults(e){
    $(".suggestions").hide();
    if(e.target.tagName === "A") {
      this.setState({
        resultQuery: e.target.text
      })
      this.fetchResults.bind(this)();
    }
  }

  loadVideo(id){
    this.setState({
      videoSelected: id
    })
  }

  render(){
    var elems;
    var lists;
    var videoplayer;
    if(this.state.autoSuggestData.length > 0){
      elems = this.state.autoSuggestData[1].map(function(result,index) {
          return <li key={index}><a href="#">{result[0]}</a></li>;
        });
    }else{
      elems = <li>"no data"</li>;
    }

   if(this.state.videoLists.length > 0){
      lists = <List data={this.state.videoLists} loadVideo={this.loadVideo.bind(this)}/>
    }else{
      lists = <span>No suggestion</span>
    }

    if(this.state.videoSelected){
      videoplayer = <VideoPlayer videoId={this.state.videoSelected} />
    }else{
      videoplayer = <span>No video clicked</span>
    }

    return <div>
      <div className="search-box">
        <input ref="textBox" onKeyUp={this.getAutoComplete.bind(this)} type="text"/>
        <div className={(this.state.autoSuggestData.length > 0)?'suggestions show':'suggestions hide'}>
          <ul onClick={this.getResults.bind(this)}>
          {elems}
          </ul>
        </div>
      </div>

      <div className="video-section clearfix">
      <div className="player pull-left">{videoplayer}</div>
      <div className="video-thumbs" on>
        {lists}
      </div>


      </div>

      </div>
  }
}

render(<App/>, document.getElementById('app'));






































