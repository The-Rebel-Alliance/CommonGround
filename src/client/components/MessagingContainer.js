// import React from 'react'
// import { browserHistory, Link } from 'react-router'
// import users from 'api/users'
// import 'assets/styles/MessagingContainer.css'
// import Drawer from './Drawer'
// import { getConvo } from 'api/convo'
// import store from 'store'

// const MessagingContainer = React.createClass({
//   getInitialState: function() {
//     return {
//     myconvo: []
//    }
//   },
//   componentWillMount: function() {
//     getConvo()
//     this.unsubscribe = store.subscribe(() => {
//       const appState = store.getState()
//       this.setState({
//         myconvo: appState.myconvo
//       })
//     })
//   },
//   render: function() {
//     <MessagingView myconvo={this.state.myconvo} />
//   }
// })


// const MessagingView = React.createClass({ 
//   render: function(){
//     return(
//       <div id="messagingContainer">
//         <div id="messages">
//           <h4>My conversation with (user)</h4>
//           <ul>
          
//           </ul>
//         </div>
//         <div id="textboxContainer">
//           <form id="textBox">
//             <input type="text" name="textBox" id="inputBox"></input><button>Submit</button>
//           </form>
//         </div>
//       </div>
//     )
//   }
// })



// export default MessagingContainer


  // {this.props.myconvo.map((chat, i) => {
  //           return (
  //             <li id={'chat' + chat.id} key={'chat' +chat.id}>
  //               {user.first}{chat.message}
  //             </li>
  //           )
  //         })} 

// <div id="username"><h6>(James Shabo)</h6></div>
//               <img src="http://orig02.deviantart.net/33e4/f/2010/188/6/a/twokinds_fanart___avatar_sized_by_turaiel.gif"></img><div id="time"><h6>(12:00am)</h6></div>
//             <li>:I'm Great! What are your views on (insert topic here)</li> <br />
//               <img src="http://orig02.deviantart.net/33e4/f/2010/188/6/a/twokinds_fanart___avatar_sized_by_turaiel.gif"></img><div id="time"><h6>(12:00am)</h6></div>
//             <li>:I'm Great! What are your views on (insert topic here)</li> <br />
//               <img src="http://orig02.deviantart.net/33e4/f/2010/188/6/a/twokinds_fanart___avatar_sized_by_turaiel.gif"></img><div id="time"><h6>(12:00am)</h6></div>
//             <li>:I'm Great! What are your views on (insert topic here)</li> <br />
