import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//import reply from '../assets/reply.svg';
//import upVotedBlack from '../assets/UpVotedBlack.svg';
//import upVotedBlue from '../assets/UpVotedBlue.svg';
// import AddReply from './postRouterSubCompenents/AddReply';
import '../style/Article.scss';

import handleUpVote from '../../assets/UpVotedBlack.svg';

const Reply = (props: {
  userName: string;
  role: string;
  replyImage: string;
  content: string;
}) => {
  const profileImg = 'https://picsum.photos/200/300';
  const replyImage = 'https://picsum.photos/300/300';

  return (
    <div className="post">
      <div>
        <div>
          <Link to={`/profile/${props.userName}`}>
            <div>
              <img src={profileImg} alt="" />
            </div>
            <div>
              <h5>{props.userName}</h5>
              <p>{props.role}</p>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <p>{props.content}</p>
      </div>
      <div>
        <img src={replyImage} alt="" />
      </div>
    </div>
  );
};

const PostRouter = () => {
  axios.defaults.withCredentials = true;
  let { postID } = useParams();
  const [profileImg, setProfileImg] = useState();
  const postImage = 'https://picsum.photos/200/300';
  const props = {
    name: 'John Doe',
    role: 'Student',
    isMyProfile: false,
    postID: '123',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquet nunc, vita',
    postImage: 'https://picsum.photos/200/300',
    profileImg: 'https://picsum.photos/200/300',
  };
  const post = {
    userName: 'John Doe',
    role: 'Student',
    isMyProfile: false,
    postID: '123',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquet nunc, vita',
    postImage: 'https://picsum.photos/200/300',
    profileImg: 'https://picsum.photos/200/300',
  };

  const replies = [
    {
      userName: 'John Doe',
      role: 'Student',
      replyImage: 'https://picsum.photos/200/300',
      replyContent:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquet nunc, vita',
      profileImg: 'https://picsum.photos/200/300',
    },
    {
      userName: 'Alex White',
      role: 'Student',
      replyImage: 'https://picsum.photos/200/300',
      replyContent:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquet nunc, vita',
      profileImg: 'https://picsum.photos/200/300',
    },
  ];

  return (
    <div className="post overflow">
      <div>
        <div>
          <Link to={`/profile/${post.userName}`}>
            <div>
              <img src={profileImg} />
            </div>
            <div>
              <h5>{post.userName}</h5>
              <p>{props.role}</p>
            </div>
          </Link>
        </div>
        <div>
          <img src={'upVotedBlack'} alt="" />
          <p>Up vote</p>
        </div>
      </div>
      <div>
        {/* <p>{post.content}</p> */}
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          {post.content}
        </p>
      </div>
      <div>
        <img src={postImage} />
      </div>
      <div>
        {/*img src={reply}/><p>Reply</p>*/}
        {/*  <AddReply />*/}
      </div>
      <div>
        {replies.map((reply) => {
          return (
            <Reply
              replyImage={reply.replyImage}
              userName={reply.userName}
              content={reply.replyContent}
              role={reply.role}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostRouter;
