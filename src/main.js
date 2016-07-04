// console.log('Hello World!');
import React from 'react';
import ReactDOM from 'react-dom';
// import Firebase from 'firebase';
// import ReactFireMixin from 'reactfire';
// import reactMixin from 'react-mixin';
// import Counter from './Counter';
 
// ReactDOM.render(
//   React.createElement(Counter),
//   document.getElementById('app')
// );
var lessonTitle = 'Intro to ReactFire';

var MessageInput = React.createClass({
  addMessage: function(e) {
    var messageNode = this.refs.message;
    if (e.which === 13) {
      this.props.onAddMessage({
        name: this.refs.name.value,
        message: messageNode.value
      });
      messageNode.value = '';
    }
  },
  render: function() {
    return (
      <div className="message-input">
        <label>
          Name:<br />
          <input ref="name" placeholder="Be creative..." />
        </label>
        <br />
        <label>
          Message:<br />
          <textarea ref="message" onKeyUp={this.addMessage} placeholder="Type and hit enter..."></textarea>
      </label>
      </div>
    );
  }
});

var Messages = React.createClass({
  render: function() {
    var messageEls = this.props.messages.map(function(item, index) {
      return (
        <div key={index}><strong>{item.name}</strong>: {item.message}</div>
      );
    });
    return <div className="messages">{messageEls}</div>;
  },
  // .getDOMNode is deprecated
  // https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#dom-node-refs
  scrollToBottom: function() {
    var el = ReactDOM.findDOMNode(this);
    el.scrollTop = el.scrollHeight;
  },
  componentDidMount: function() {
    this.scrollToBottom();
  },
  componentDidUpdate: function() {
    this.scrollToBottom();
  }
});

var ChatClient = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      messages: []
    };
  },
  addMessage: function(newMessage) {
    this.firebaseRefs.messages.push(newMessage);
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase('https://ultimate-donut.firebaseio.com/egghead/react/intro/messages'), 'messages');
  },
  render: function() {
    return (
      <div>
        <Messages messages={this.state.messages} />
        <MessageInput onAddMessage={this.addMessage} />
      </div>
    );
  }
});

var Demo = React.createClass({
  render: function() {
    return (
      <div>
        <h3>ReactFire IRC</h3>
        <ChatClient />
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Demo />
      </div>
    );
  }
});

//React.render will be depricated in the next release
//https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#two-packages-react-and-react-dom
ReactDOM.render(<App />, document.getElementById('app'));

