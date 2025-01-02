'use client';

import React from 'react';

export default function App() {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/leetcode?username=panditapollo")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((err) => {
        console.log("Error during fetch:", err);
      });
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Data:</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}
