import React, { Component } from 'react'

class CommentFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        name: "",
        email: "",
        message: ""
      }
    };

    this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  fieldChangeHandler = (event) => {
    // Get the value of the name, email and comment to update it
    const { value, name, email } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value,
        [email]: value
      }
    });
  }

  onSubmit = (event) => {
    // Prevent default form submission
    event.preventDefault();
  }

  renderError = () => {
    // Error Message function
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="POST" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              value={this.state.comment.name}
              onChange={this.fieldChangeHandler}
              name="name"
              type="text"
              placeholder="Enter your Name here"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              value={this.state.comment.email}
              onChange={this.fieldChangeHandler}
              name="email"
              type="text"
              placeholder="Enter your Email here"
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              value={this.state.comment.message}
              onChange={this.fieldChangeHandler}
              name="message"
              placeholder="Share your thoughts !"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Post Comment
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default CommentFormComponent;
