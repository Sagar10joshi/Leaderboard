
"use client"

import { useState, useEffect } from "react"
import "./Leaderboard.css"

function Leaderboard({ users }) {
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

  const getTrophyIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🏆"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return "🏆"
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "#FFD700"
      case 2:
        return "#C0C0C0"
      case 3:
        return "#CD7F32"
      default:
        return "#FFA500"
    }
  }

  const topThree = users.slice(0, 3)
  const remaining = users.slice(3)

  return (
    <div className="leaderboard">
      {/* Main Ranking Section */}
      <div className="main-section">
        {/* Settlement Timer */}
        <div className="settlement-timer">
          <span>
            Settlement time {timeLeft.days} days {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <div className="reward-icon">🎁 Reward</div>
        </div>

        {/* Trophy and Top 3 */}
        <div className="trophy-section">
          <div className="trophy">🏆</div>
          <div className="laurel-left">🌿</div>
          <div className="laurel-right">🌿</div>

          <div className="top-three">
            {topThree.map((user, index) => {
              const actualRank = index + 1
              const positions = [1, 0, 2] // Second place goes left, first center, third right
              const displayIndex = positions[index]

              return (
                <div
                  key={user._id}
                  className={`winner-card ${actualRank === 1 ? "first-place" : ""}`}
                  style={{ order: displayIndex }}
                >
                  <div className="rank-badge" style={{ backgroundColor: getRankColor(actualRank) }}>
                    {actualRank}
                  </div>
                  {actualRank === 1 && <div className="crown">👑</div>}
                  <div className="avatar">
                    {/* <img
                      // src={`https://images.pexels.com/photos/${1000 + index}/pexels-photo-${1000 + index}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                      // alt={user.name}
                    /> */}
                  </div>
                  <div className="user-name">{user.name}</div>
                  <div className="score">
                    <span className="trophy-icon">{getTrophyIcon(actualRank)}</span>
                    {user.points.toLocaleString()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Other Rankings */}
        <div className="other-rankings">
          {remaining.map((user) => (
            <div key={user._id} className="rank-item">
              <div className="rank-number">{user.rank}</div>
              <div className="user-avatar">
                {/* <img
                  src={`https://images.pexels.com/photos/${1000 + user.rank}/pexels-photo-${1000 + user.rank}.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop`}
                  alt={user.name}
                /> */}
              </div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
              </div>
              <div className="user-score">{user.points.toLocaleString()}</div>
              <div className="trophy-small">{getTrophyIcon(user.rank)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
