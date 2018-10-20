import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, savePost, deletePost } from "../Actions/PostActions";
import { Field, reduxForm, reset } from "redux-form";
import _ from "lodash";
import PostCard from "../Components/PostCard";
import { getUser, logout } from "../Actions/UserActions";

class ListPosts extends Component {
  componentWillMount() {
    this.props.getPosts();
    this.props.getUser();
    if (
      this.props.user.loading === false &&
      this.props.user.email === undefined
    ) {
      this.props.history.replace("/Login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.loading === false &&
      nextProps.user.email === undefined
    ) {
      this.props.history.replace("/Login");
    }
  }

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard key={key}>
          <h3 className="card-title">{post.title}</h3>
          <p className="card-text">{post.details}</p>
          <span className="badge badge-success">{post.category}</span>
          <button
            className="btn btn-danger float-right"
            onClick={() => this.props.deletePost(key)}
          >
            Delete
          </button>
        </PostCard>
      );
    });
  }

  onSubmit(values) {
    this.props.savePost(values).then(this.props.dispatch(reset("NewPost")));
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="jumbotron">
        <div className="navbar">
          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.logout();
            }}
          >
            Sign out
          </button>
        </div>

        <div className="container">
          <div className="container">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="form-group">
                <label>Question title</label>
                <div>
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div>
                <label>Category</label>
                <div>
                  <Field
                    name="category"
                    component="select"
                    className="form-control"
                  >
                    <option />
                    <option>Reactjs</option>
                    <option>Redux</option>
                    <option>React native</option>
                  </Field>
                </div>
              </div>

              <div>
                <label>Question details</label>
                <div>
                  <Field
                    name="details"
                    component="input"
                    className="form-control"
                  />
                </div>
              </div>
              <br />

              <div>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={pristine || submitting}
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="btn btn-danger float-right"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Clear Values
                </button>
              </div>
            </form>
          </div>
          <br />
          <div className="main">{this.renderPosts()}</div>
        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: "NewPost"
})(ListPosts);

form = connect(
  (state, ownProps) => ({
    posts: state.posts,
    user: state.user
  }),
  { savePost, getPosts, deletePost, getUser, logout }
)(form);

export default form;
