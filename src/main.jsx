import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.jsx';
import PostsProvider from './providers/PostsProvider.jsx';
import ProfileProvider from './providers/ProfileProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostsProvider>
      <ProfileProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </ProfileProvider>
    </PostsProvider>
  </React.StrictMode>,
)
