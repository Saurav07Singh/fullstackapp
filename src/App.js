
import './App.css';

import Signup from "./components/Signup"
import Login from './components/Login';
import {BrowserRouter as Router , Routes , Route, Link} from "react-router-dom"
import TodoItems from './components/TodoItems';
import Error from './components/Error';
import ReqiureAuth from './components/RequireAuth';

function App() {
  return (
   <Router>
      <Routes>
        {/* <Route path="/" element={<LoginSigup />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ReqiureAuth />}>
        <Route path="/welcome"  element={<TodoItems />} />
        </Route>
        <Route path ="/*" element={<Error />} />
      </Routes>
   </Router>
  );
}

export default App;
