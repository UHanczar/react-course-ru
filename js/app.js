const myNews = [
  {
    author: 'J. Meyer',
    text: 'In thursday, at 4th of...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'J. Dow',
    text: 'I suppose, that that item\'s price',
    bigText: 'А евро 42!'
  },
  {
    author: 'S. Bach',
    text: 'Free. Download. The best site - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  },
  {
    author: 'A. Abraham',
    text: 'Hello, world!',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

const Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },

  getInitialState () {
    return {
      visible: false
    };
  },

  readmoreClick: function (e) {
    e.preventDefault();
    this.setState({ visible: true }, function () {
      console.log('The state has changes!');
    });
  },

  render: function () {
    let author = this.props.data.author;
    let text = this.props.data.text;
    let bigText = this.props.data.bigText;
    let visible = this.state.visible;

    console.log('render', this);

    return (
      <div className="article">
        <p className="news_author">{author}</p>
        <p className="news_text">{text}</p>
        <a href="#"
          onClick={this.readmoreClick} className={'news__readmore ' + (visible ? 'none' : '')}>
            More
        </a>
        <p className={'news_big-text ' + (visible ? '' : 'none')}>{bigText}</p>
      </div>
    )
  }
});

const News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      counter: 0
    }
  },

  changingCounter () {
    this.setState({
      counter: ++this.state.counter
    })
  },

  render: function () {
    const data = this.props.data;
    let newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map((item, index) => {
        return (
          <div key={index}>
            <Article data={ item } />
          </div>
        );
      });
    } else {
      newsTemplate = <p>Sorry, but we havent news for you.</p>
    }

    console.log(newsTemplate, this.state.counter);

    return (
      <div className="news">
        { newsTemplate }
        <strong
          className={'news__count ' + (data.length > 0 ? '' : 'none')} onClick={this.changingCounter}>
          Всего новостей: {data.length}
        </strong>
      </div>
    );
  }
});

// const Comments = React.createClass({
//   render: function () {
//     return (
//       <div className="comments">
//         No news - nothing to comment.
//       </div>
//     );
//   }
// });

const TestInput = React.createClass({
  onSendButton: function () {
    console.log(this.refs);
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  },

  render: function () {
    return (
      <div>
        <input className="test-input" defaultValue="" placeholder="enter value" ref="myTestInput" />
        <button onClick={this.onSendButton} ref="alert_button">Send</button>
      </div>
    )
  }
});

const App = React.createClass({
  render: function () {
    return (
      <div className="app">
        <h3>News</h3>
        <TestInput />
        <News data={ myNews } /> {/* Added data property */}

        {/* <Comments /> */}
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
