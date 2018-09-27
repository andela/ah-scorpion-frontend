import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Profile_Account } from '../actions/ProfileAction';
import image from '../assets/images/avatar1.png';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillMount = () => {
    this.props.Profile_Account();
  };

  render() {
    console.log('acccount', this.props);
    if (Object.keys(this.props.account).length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <main style={{ marginTop: '14em' }}>
          <div className="container">
            <div className="row my-2">
              <div className="col-lg-8 order-lg-2 pl-4">
                <div className="tab-content">
                  <div className="tab-pane active" id="profile">
                    <div className="row">
                      <div className="col-md-12">
                        <br />
                        <div className="dropright">
                          <div
                            className=" test"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          />
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/profile/edit">
                              edit
                            </Link>
                          </div>
                        </div>
                        <h3 className="user-profile">{this.props.account.profile.username}</h3>
                        <hr />
                        <h5 className="mt-3 mb-3">
                          <strong>Biography</strong>
                        </h5>
                        {this.props.account.profile.bio ? (
                          <p>{this.props.account.profile.bio}</p>
                        ) : (
                          <p style={{ fontStyle: 'italic' }}>Nothing to show</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="edit" />
                </div>
              </div>
              <div className="col-lg-4 order-lg-1 text-center">
                <img
                  src={
                    this.props.account.profile.image
                      ? `${this.props.account.profile.image}?sz=500`
                      : image
                  }
                  className="mx-auto img-fluid img-circle d-block"
                  alt="avatar"
                  style={{ width: '70%', borderRadius: '50%' }}
                />

                <br />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  account,
});

export default connect(
  mapStateToProps,
  { Profile_Account },
)(ProfilePage);
