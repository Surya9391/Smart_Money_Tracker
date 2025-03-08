import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const GoalsTracker = () => {
  const goals = [
    { name: 'Emergency Fund', current: 5000, target: 10000 },
    { name: 'Vacation Savings', current: 2000, target: 5000 },
    { name: 'New Car', current: 15000, target: 30000 }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Financial Goals
      </Typography>
      {goals.map((goal, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            {goal.name}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(goal.current / goal.target) * 100}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
            ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default GoalsTracker; 