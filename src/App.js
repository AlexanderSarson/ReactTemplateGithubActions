import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Modal from './components/Modal';
import LogIn from './components/Login';
import NoMatch from './components/NoMatch';
import Content3 from './components/Content3';
import Scrape from './components/Scrape';
import Jokes from './components/Jokes';
import Home from './components/Home';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import ParentNested from './components/nested/ParentNested';
import ChildNested from './components/nested/ChildNested';
import DisplayParams from './components/nested/ChildNested2';

function App() {
  const {
    auth: { isAdmin, isLoggedIn }
  } = useContext(AuthContext);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const toggleModalLogin = () => setShowModalLogin(!showModalLogin);
  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? 'Logout' : 'Login'}
        toggleModal={toggleModalLogin}
      />
      <hr />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route
            path='jokes'
            element={isLoggedIn ? <Jokes /> : <Navigate to='/login-out' />}
          />
          <Route
            path='scrape'
            element={isAdmin ? <Scrape /> : <Navigate to='/login-out' />}
          />
          <Route path='Content3' element={<Content3 />} />

          <Route path='parentNested' element={<ParentNested />}>
            <Route path='childNested' element={<ChildNested />} />
            <Route path=':displayParam' element={<DisplayParams />} />
          </Route>

          <Route
            path='/login-out'
            element={
              showModalLogin ? (
                <Modal toggleModalLogin={toggleModalLogin}>
                  <LogIn
                    loginMsg={isLoggedIn ? 'Logout' : 'Login'}
                    toggleModalLogin={toggleModalLogin}
                  />
                </Modal>
              ) : null
            }
          />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
