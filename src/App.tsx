// import { useState, useEffect } from 'react';
import './App.css';
import useResponse from './hooks/useResponse';
import useUsers from './hooks/useUsers';

function App() {
const { data: usersData,isLoading:isUsersLoading } = useUsers(10);
  const {
    streamedText,
    isLoading: isResponseLoading
  } = useResponse(usersData);



  return (
    <div className="App">
      <h1>Streaming Response</h1>
      <h2>Users</h2>
      {isUsersLoading && <p>Loading...</p>}
      <div>
        {usersData?.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      <div>
          <h2>Response</h2>
          {isResponseLoading && !streamedText && <p>Loading...</p>}
          <p>
            {streamedText || 'Waiting for response...'}
          </p>
      </div>
    </div>
    </div>
  );
}

export default App;
