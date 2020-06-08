import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import { AuthContext } from '../contexts/AuthContext';

export default function Header({ loginMsg, toggleModal }) {
  const {
    auth: { isAdmin, isLoggedIn, username }
  } = useContext(AuthContext);

  return (
    <Menu color='blue' size='massive'>
      <Menu.Item as={NavLink} to='/' name='home'>
        <Icon name='home' />
        Home
      </Menu.Item>

      <Menu.Item as={NavLink} to='content3' name='content3'>
        Content 3
      </Menu.Item>
      <Menu.Item as={NavLink} to='parentNested' name='content3'>
        parentNested
      </Menu.Item>
      {isLoggedIn && (
        <Menu.Item as={NavLink} to='jokes' name='jokes'>
          Jokes
        </Menu.Item>
      )}
      {isAdmin && (
        <Menu.Item as={NavLink} to='scrape' name='scrape'>
          Scrape
        </Menu.Item>
      )}
      <Menu.Menu position='right'>
        {isLoggedIn && (
          <Menu.Item Header>
            {isAdmin ? <Icon name='user plus' /> : <Icon name='user' />}
            {username}
          </Menu.Item>
        )}
        <Menu.Item
          as={NavLink}
          to='login-out'
          onClick={toggleModal}
          name='login-out'
        >
          {loginMsg}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
