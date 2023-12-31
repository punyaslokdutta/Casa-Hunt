import {
  BrowserRouter as Router, Routes, Route, Outlet,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import './App.css';
import SideBar from './components/sidebar/SideBar';
import HousesDetails from './components/houses details/HouseDetails';
import Houses from './components/houses/Houses';
import Login from './components/auth/Login';

const SidebarLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<SidebarLayout />}>
            <Route path="/" element={<Houses/>} />
            <Route path="/:id" element={<HousesDetails />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </div>
);

export default App;
