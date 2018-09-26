import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { node } from 'prop-types';
import { Edit_Account, Profile_Account } from '../actions/ProfileAction';
import NavBar from './NavBar';
import Footer from './Footer';
import image from '../assets/images/avatar1.png';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        username: '',
        email: '',
        bio: '',
      },
      errors: {},
      loading: false,
    };
  }

  componentDidMount = () => {
    this.props.Profile_Account();
    console.log('hello', this.props);
  };

  componentWillReceiveProps(nextProps) {
    const { email, username, bio } = nextProps.account.profile;
    this.setState({ profile: { email, username, bio } });
  }

  onChange = e => this.setState({
    profile: { ...this.state.profile, [e.target.name]: e.target.value },
  });

  onSubmit = (event) => {
    event.preventDefault();
    const { profile } = this.state;
    this.props.Edit_Account(profile, this.props.history);
  };

  render() {
    console.log('props', this.props);
    if (Object.keys(this.props.account).length === 0) {
      return <div>Loading...</div>;
    }
    const { bio } = this.state.profile;

    return (
    // <div>
    //   <NavBar />
    //   <main style={{ marginTop: '14em' }}>
    //     <div className="container">
    //       <div className="row center-div">
    //         <div className="col-lg-8  input-field">
    //           <div className="tab-pane" id="edit">
    //             <form role="form" style={{ marginLeft: 'auto' }} onSubmit={this.onSubmit}>
    //               <div className="form-group row">
    //                 <label className="col-lg-3 col-form-label form-control-label">Bio</label>
    //                 <div className="col-lg-8">
    //                   <textarea
    //                     className="form-control"
    //                     type="text"
    //                     onChange={this.onChange}
    //                     name="bio"
    //                     value={bio}
    //                     style={{ minHeight: '10em' }}
    //                   />
    //                 </div>
    //               </div>

      //               <div className="form-group row">
      //                 <label className="col-lg-3 col-form-label form-control-label" />
      //                 <div className="col-lg-9">
      //                   <button
      //                     type="submit"
      //                     className="btn btn-primary"
      //                     style={{ marginLeft: '180px' }}
      //                   >
      //                     Save Changes
      //                   </button>
      //                 </div>
      //               </div>
      //             </form>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </main>
      //   <Footer />
      // </div>
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

                        <h3 className="user-profile">{this.props.account.profile.username}</h3>
                        <hr />
                        <h6 className="mt-3 mb-3">
                          <strong>Biography</strong>
                        </h6>
                        <form role="form" style={{ marginLeft: 'auto' }} onSubmit={this.onSubmit}>
                          <div className="form-group row">
                            <div className="col-lg-8">
                              <textarea
                                className="form-control"
                                type="text"
                                onChange={this.onChange}
                                name="bio"
                                value={bio}
                                style={{ minHeight: '10em', marginLeft: '0', border: 'none' }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label" />
                            <div className="col-lg-9">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ marginLeft: '180px' }}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
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

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(
  mapStateToProps,
  { Edit_Account, Profile_Account },
)(EditProfile);
