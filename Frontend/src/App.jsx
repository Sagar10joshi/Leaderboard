import { useState, useEffect } from 'react';
import UserSelector from '../components/UserSelector.jsx';
import ClaimButton from '../components/ClaimButton.jsx';
import Leaderboard from '../components/Leaderboard.jsx';
import AddUser from '../components/AddUser.jsx';
import ClaimHistory from '../components/ClaimHistory.jsx';
import './App.css';

function App() {
  
  const [users, setUsers] = useState([]);
  const [activeControl, setActiveControl] = useState('none');
  const [selectedUser, setSelectedUser] = useState(null);
  const [lastClaimedPoints, setLastClaimedPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('leaderboard');

  useEffect(() => {
    fetchUsers();
  }, []);


  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 1,
    minutes: 45,
    seconds: 47,
  })


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])


  const fetchUsers = async () => {
    try {
      const response = await fetch('https://leaderboard-joshis-projects-a16fdb29.vercel.app/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);

       setTimeout(() => {
        setActiveControl('none');
      }, 3000);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      alert('Please select a user first!');
      return;
    }

    try {
      const response = await fetch('https://leaderboard-joshis-projects-a16fdb29.vercel.app/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser._id }),
      });

      const data = await response.json();
      if (response.ok) {
        setLastClaimedPoints(data.pointsAwarded);
        fetchUsers(); // Refresh the leaderboard

        // Clear the points display after 3 seconds
        setTimeout(() => {
          setLastClaimedPoints(null);
        }, 3000);

        setTimeout(() => {
        setActiveControl('none');
      }, 3000);

      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error claiming points:', error);
      alert('Error claiming points');
    }
  };

  const handleAddUser = async (userName) => {
    try {
      const response = await fetch('https://leaderboard-joshis-projects-a16fdb29.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName }),
      });

      if (response.ok) {
        fetchUsers(); // Refresh the user list
        return true;
      } else {
        const data = await response.json();
        alert(data.error);
        return false;
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
      return false;
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }


  return (
    <div className="ranking-app">
      {/* Header */}
      <div className="header">
        <button className="back-btn">←</button>
        <div className="nav-tabs">
          <div className="tab active">
            <button
              // className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Party Ranking
            </button>
          </div>

          <div className="tab">
            <button
              className={`tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Claim History
            </button></div>

        </div>
        <button className="help-btn">?</button>
      </div>

      <div className="toggle-section">
        <button
          className={`toggle-btn ${activeControl === 'select' ? 'active' : ''}`}
          onClick={() =>
            setActiveControl(activeControl === 'select' ? 'none' : 'select')
          }
        >
          Select User
        </button>
        <button
          className={`toggle-btn ${activeControl === 'add' ? 'active' : ''}`}
          onClick={() =>
            setActiveControl(activeControl === 'add' ? 'none' : 'add')
          }
        >
          Add User
        </button>
      </div>

      {activeTab === 'leaderboard' ? (
        <>
          {activeControl === 'add' && (
            <AddUser onAddUser={handleAddUser} />
          )}

          {activeControl === 'select' && (
            <>
              <div className="control-panel">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onSelectUser={setSelectedUser}
                />
                <ClaimButton
                  onClaim={handleClaimPoints}
                  selectedUser={selectedUser}
                  lastClaimedPoints={lastClaimedPoints}
                />
              </div>
            </>
          )}

          {/* Leaderboard should always be visible */}
          <Leaderboard users={users} />
        </>
      ) : (
        <ClaimHistory />
      )}
    </div >
  )
}

export default App;