import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reservation from './components/pages/Reservation';
import axios from "axios";
import { signIn } from './auth';

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ id, password }) => setUser(signIn({ id, password }));
  const logout = () => setUser(null);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Login />;
      </Switch>
    </Router>
  )
}
// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Router>
//           <Navbar />
//           <Switch>
//             <Login />;
//           </Switch>
//         </Router>

//       </div>
//     );
//   }
// }

export default App;
