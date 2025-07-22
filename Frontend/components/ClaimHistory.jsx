import React, { useState, useEffect } from 'react';

function ClaimHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
  try {
    const response = await fetch('https://leaderboard-kappa-virid.vercel.app/claims/history', {
      method: 'GET',
      // credentials: 'include'  // if your backend needs cookies or sessions
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setHistory(data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching history:', error);
    setLoading(false);
  }
};

  if (loading) {
    return <div className="loading">Loading history...</div>;
  }

  return (
    <div className="claim-history">
      <h2>Claim Points History</h2>
      <div className="history-list">
        {history.length === 0 ? (
          <div className="no-history">No claim history found</div>
        ) : (
          history.map((claim) => (
            <div key={claim._id} className="history-item">
              <div className="history-user">{claim.userName}</div>
              <div className="history-points">+{claim.pointsAwarded} points</div>
              <div className="history-date">
                {new Date(claim.claimedAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClaimHistory;