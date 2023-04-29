import { useEffect, useState } from 'react';
import './App.css';
import { PostService, UserService } from './services';
import styles from './App.module.css';
import User from './components/User';
import UserForm from './components/UserForm';
import PostForm from './components/PostForm';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPostTitle, setSelectedPostTitle] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    PostService.getPosts().then(res => setPosts(res))
    UserService.getUsers().then(res => setUsers(res))
  }, [])

  // Getting spesific post when selected post Id has changed
  useEffect(() => {
    if (!selectedPostId) {
      setSelectedPostTitle("");
      return;
    }
    PostService.getPostById(selectedPostId)
      .then(post => setSelectedPostTitle(post.title))
      .catch(() => { setSelectedPostTitle('') })
  }, [selectedPostId])

  // Getting spesific user when selected userId has changed
  useEffect(() => {
    if (!selectedUserId) {
      setSelectedUser(null);
      return;
    }
    UserService.getUserById(selectedUserId)
      .then(user => { setSelectedUser(user); console.log(user); })
      .catch(() => { setSelectedUser(null) })
  }, [selectedUserId])



  return (
    <div className={styles.App}>

      { /* Select Post by ID */}
      <div className={styles.section}>
        <h2>Select Post by ID</h2>
        <select value={selectedPostId} onChange={(e) => setSelectedPostId(e.target.value)}>
          <option value="">Post Id</option>
          {posts.map(post => (
            <option key={post.id} value={post.id}>{post.id}</option>
          ))}
        </select>
        <p className='mt-3 mb-0'>Selected Post Title: {selectedPostTitle}</p>
      </div>

      { /* Select User by ID */}
      <div className={styles.section}>
        <h2>Select User by ID</h2>
        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
          <option value="">User Id</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.id}</option>
          ))}
        </select>
        {(selectedUser !== null) &&
          <User selectedUser={selectedUser}></User>
        }
      </div>

      { /* PostForm */}
      <div className={styles.section}>
        { console.log("myau") }
        <PostForm>
          {(element) => { console.log("myauuuu"); console.log(element) }}
        </PostForm>
      </div>

      { /* UserForm */}
      <div className={styles.section}>
        <UserForm />
      </div>

      { /* List of Users */}
      <div className={styles.section}>
        <h2>All Users</h2>
        <div className={styles.users}>
          {users.map(user => (
            <div key={user.id} className={styles.userCard}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.website}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

