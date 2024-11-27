import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

export default function ProgressBar({ percentage }) {
  return (
    <>
          <div style={{ width: 100, height: 100 }}>
              <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                      // Customize colors
                      pathColor: `#00bcd4`, // Progress color
                      textColor: '#ffffff', // Percentage text color
                      trailColor: '#d6d6d6', // Background trail color
                  })}
              />
          </div>
    </>
  )
}
