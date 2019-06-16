
import React, { Component } from 'react';
import {
  Menu, MenuItem, Container, Segment, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logo from '../../static/fav.png';
import style from './styles.scss';

class Header extends Component {
  static leftMenu() {
    return <Image as={Link} to="/" src={logo} className={style.img} />;
  }

  constructor(props) {
    super(props);

    this.itemChangeCallback = this.itemChangeCallback.bind(this);
  }

  itemChangeCallback(url) {
    const { activeItem, onItemChange } = this.props;
    if (activeItem === url) {
      return;
    }
    onItemChange(url);
  }

  rightMenu() {
    const { isLoggedIn } = this.props;

    return (
      <Menu.Menu position="right">
        {isLoggedIn ? this.rightMenuUser() : this.rightMenuGuest()}
      </Menu.Menu>
    );
  }

  rightMenuUser() {
    return (
      <React.Fragment>
        <MenuItem
          name="logout"
          data-cy="logout_btn"
          onClick={() => this.itemChangeCallback('/logout')}
        />
      </React.Fragment>
    );
  }

  rightMenuGuest() {
    return (
      <React.Fragment>
        <MenuItem name="login" onClick={() => this.itemChangeCallback('/login')} />
      </React.Fragment>
    );
  }

  render() {
    const { className } = this.props;

    const segmentClass = classNames(style.segment, {
      [className]: className,
    });

    return (
      <Segment className={segmentClass}>
        <Menu pointing secondary size="large">
          <Container>
            {Header.leftMenu()}
            {this.rightMenu()}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

Header.defaultProps = {
  isLoggedIn: false,
  activeItem: '/',
  className: null,
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  activeItem: PropTypes.string,
  className: PropTypes.string,
  onItemChange: PropTypes.func.isRequired,
};

export default Header;
