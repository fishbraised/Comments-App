import { Component } from 'react';
import { v4 } from 'uuid';
import CommentItem from '../CommentItem';
import './index.css';

const initialConBgClasses = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
];

class CommentsApp extends Component {
  state = { nameInput: '', commentInput: '', commentsList: [] };

  toggleIsLiked = (id) => {
    this.setState((prevState) => ({
      commentsList: prevState.commentsList.map((eachComment) => {
        if (id === eachComment.id) {
          return { ...eachComment, isLiked: !eachComment.isLiked };
        }
        return eachComment;
      }),
    }));
  };

  deleteComment = (commentId) => {
    const { commentsList } = this.state;

    this.setState({
      commentsList: commentsList.filter(
        (eachComment) => eachComment.id !== commentId
      ),
    });
  };

  onAddComment = (event) => {
    event.preventDefault();
    const { nameInput, commentInput } = this.state;
    const initialBgColorClass = `initial-con ${
      initialConBgClasses[
        Math.ceil(Math.random() * initialConBgClasses.length - 1)
      ]
    }`;

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClass: initialBgColorClass,
    };

    this.setState((prevState) => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }));
  };

  renderCommentsList = () => {
    const { commentsList } = this.state;

    return commentsList.map((eachComment) => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ));
  };

  onChangeNameInput = (event) => {
    this.setState({ nameInput: event.target.value });
  };

  onChangeCommentInput = (event) => {
    this.setState({ commentInput: event.target.value });
  };

  render() {
    const { nameInput, commentInput, commentsList } = this.state;
    return (
      <div className="bg-con">
        <div className="comments-con">
          <h1 className="title">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-desc">
                Post a review for your favourite Food...
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                className="comment-input"
                onChange={this.onChangeCommentInput}
                value={commentInput}
                placeholder="Your Comment"
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://img.freepik.com/free-vector/internet-forum-abstract-concept-illustration_335657-3679.jpg?t=st=1723611756~exp=1723615356~hmac=4c5539fd28e3e334be701ec89c17bf8d484eb913475d5aa2f820a00e902958c3&w=740"
              alt="image"
            />
          </div>
          <hr className="line" />
          <p className="comment-count-heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    );
  }
}

export default CommentsApp;
