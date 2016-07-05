import React from 'react';
 
/**
 * A counter button: tap the button to increase the count.
 */
export class MessageInput extends Component {
  addMessage(e){
    var messageNode = this.refs.message;
      if (e.which === 13) {
        this.props.onAddMessage({
          name: this.refs.name.value,
          message: messageNode.value
        });
        messageNode.value = '';
      }
  }
  render() {
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
}

export class Messages extends Component {
  render() {
    var messageEls = this.props.messages.map(function(item, index) {
      return (
        <div key={index}><strong>{item.name}</strong>: {item.message}
        </div>
          );
      });
      return <div className="messages">{messageEls}</div>;
    }
  scrollToBottom() {
    var el = ReactDOM.findDOMNode(this);
    el.scrollTop = el.scrollHeight;
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }   
}

export class ChatClient extends Component {
  constructor(props,context){
    super (props,context);
    mixins: [ReactFireMixin],
    this.state = {
    messages: []
  };
  }
  addMessage(newMessage) {
    this.firebaseRefs.messages.push(newMessage);
  }
  componentWillMount() {
    this.bindAsArray(
      new Firebase('https://ultimate-donut.firebaseio.com/egghead/react/intro/messages'), 'messages'
      )
  }
  render() {
    return (
      <div>
        <Messages messages={this.state.messages} />
        <MessageInput onAddMessage={this.addMessage} />
      </div>
    );
  }
}
reactMixin(ChatClient.prototype, ReactFireMixin)
export class Demo extends Component {
  render() {
    return (
      <div>
        <h3>ReactFire IRC</h3>
            <ChatClient />
      </div>
    );
  }
}
export class App extends Component {
  render() {
    return (
      <div><Demo /></div>
    );
  }
}
