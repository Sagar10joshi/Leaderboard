import React from 'react';

function ClaimButton({ onClaim, selectedUser, lastClaimedPoints }) {
  return (
    <div className="claim-section">
      <button 
        className="claim-btn" 
        onClick={onClaim}
        disabled={!selectedUser}
      >
        Claim Points
      </button>
      {lastClaimedPoints && (
        <div className="points-awarded">
          +{lastClaimedPoints} points awarded to {selectedUser?.name}!
        </div>
      )}
    </div>
  );
}

export default ClaimButton;