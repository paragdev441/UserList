import React, { useEffect, useState } from "react";
import UsersAPI from "../API/UsersAPI";

const UserProfile = ({ match }) => {
  const userId = match.params.id;
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const { data } = await UsersAPI.get(`/posts?userId=${userId}`);
    const userProfile = await UsersAPI.get(`/users/${userId}`);
    setPosts(data);
    setProfile(userProfile.data);
    setLoading(false);
  }, []);

  const showPosts = () => {
    return posts.map(({ id, title, body }) => {
      return (
        <div key={id} className="post">
          <div className="post-block">Title</div>
          <div>{title}</div>
          <div className="post-block">Body:</div>
          <div>{body}</div>
        </div>
      );
    });
  };
  return (
    <>
      <h1>UserProfile</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <span>
              <b>UserName</b>: {profile.username}
            </span>
            <span>
              <b>Name</b>: {profile.name}
            </span>
            <span>
              <b>Email:</b> {profile.email}
            </span>
          </div>
          <div>
            <h3>Posts: </h3>
            <div>{showPosts()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
