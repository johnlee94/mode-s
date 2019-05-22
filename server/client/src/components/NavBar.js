import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  renderContent() {
    switch (this.props.user) {
    case null:
      return;
    case false:
      return (
        <li><a href="https://myfitmode.com/">Please Login!</a></li>
      )
    default:
      return [
        <li key="2"><a href="">Hello, {this.props.user.firstName}</a></li>
      ];
    }
  }


      render () {
        return (
          <nav>
            <div className="nav-wrapper">
            <a
              href='https://myfitmode.com/'
              className="left brand-logo"
              style={{ margin: '0 10px' }}
            >
              Home
            </a>
              <Link
                to='/'
                className="left brand-logo"
                style={{ margin: '0 10px' }}
              >
                Landing
              </Link>
              <Link
                to='/test'
                className="left brand-logo"
                style={{ margin: '0 10px' }}
              >
                Dummy
              </Link>
              <Link
                to='/billing'
                className="left brand-logo"
                style={{ margin: '0 10px' }}
              >
                Billing History
              </Link>
              <Link
                to='/account'
                className="left brand-logo"
                style={{ margin: '0 10px' }}
              >
                Account
              </Link>
              <ul style={{float: 'right'}}>
                {this.renderContent()}
              </ul>
            </div>
          </nav>
        );
      }

  }

  function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(NavBar);
