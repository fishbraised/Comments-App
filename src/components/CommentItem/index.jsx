import { formatDistanceToNow } from 'date-fns';
import './index.css';

const CommentItem = (props) => {
  const { commentDetails } = props;
  const { id, name, comment, isLiked, initialClass, date } = commentDetails;
  const initial = name ? name[0].toUpperCase() : '';
  const likeTextClass = isLiked ? 'button active' : 'button';
  const likeImageUrl = isLiked
    ? 'https://res.cloudinary.com/saiuttej/image/upload/v1723612083/liked-img_urk7hn.png'
    : 'https://res.cloudinary.com/saiuttej/image/upload/v1723612098/like-img_b7k0pp.png';
  const postedTime = formatDistanceToNow(date);

  const onClickLike = () => {
    const { toggleIsLiked } = props;
    toggleIsLiked(id);
  };

  const onDeleteComment = () => {
    const { deleteComment } = props;
    deleteComment(id);
  };

  return (
    <li className="comment-item">
      <div className="comment-con">
        <div className={initialClass}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-con">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-con">
        <div className="like-con">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button className={likeTextClass} type="button" onClick={onClickLike}>
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          testid="delete"
        >
          <img
            className="delete"
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  );
};

export default CommentItem;
