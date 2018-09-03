import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import changePassword from "../../actions/resetPassword";


class ResetForm extends Component {
    state = {
        email: '',
        new_password: '',
        confirm_password: '',
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault();

        this.props.dispatch(changePassword({ ...this.state, reset_token: this.props.match.params.token }))

    }

    validatePassword = () => {
        return this.state.confirm_password === this.state.new_password
    }

    renderForm = () => (
        <React.Fragment>
            <NavBar />
            <main style={{ marginTop: "2.5em" }}>
                <div className="container p-5 signup-container">
                    {this.props.reset.errors.error ? (
                        <div
                            className="alert alert-danger"
                            style={{ textAlign: "center" }}
                            role="alert"
                        >
                            {this.props.reset.errors.error[0]}
                        </div>
                    ) : null}

                    <div className="card form-bg">
                        <div className="card-header text-center form-bg">
                            <h2>Change Password</h2>
                        </div>
                        <form className="pt-5 pb-2 px-5 form-bg" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input required
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input required
                                    type="Password"
                                    className="form-control"
                                    name="new_password"
                                    placeholder="Password"
                                    value={this.state.new_password}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <br />

                            <div className="form-group">
                                <input required
                                    type="Password"
                                    className={`form-control ${this.validatePassword() ? '' : 'is-invalid'}`}
                                    name="confirm_password"
                                    placeholder="Confirm Password"
                                    value={this.state.confirm_password}
                                    onChange={this.handleChange}

                                />
                                <div className="invalid-feedback text-center ">
                                    Passwords don't match
                                </div>

                            </div>

                            <div className="text-center">
                                <button className="btn btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    )


    render() {

        return (
            <div>
                {this.props.reset.sent ? this.props.history.push('/login') : this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reset: state.reset
    }
}
export default connect(mapStateToProps)(ResetForm)