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
    console.log(event);
    event.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required !" });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true})

    // Persist the comments on server
    let { comment } = this.state;
    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading : false, error: res.error});
        } else {
          // Add time return from api and push comment to parent state
          comment.time = res.time;
          this.props.addCommentHandler(comment);

          // Clear the message box
          this.setState({
            loading: false,
            comment: {...comment, message: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }

  isFormValid() {
    return this.state.comment.name !== "" && this.state.comment.email !== "" && this.state.comment.message !== "";
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
              placeholder="Enter your Name"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              value={this.state.comment.email}
              onChange={this.fieldChangeHandler}
              name="email"
              type="text"
              placeholder="Enter your Email"
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              value={this.state.comment.message}
              onChange={this.fieldChangeHandler}
              name="message"
              placeholder="Type your message"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Submit Comment
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default CommentFormComponent;
