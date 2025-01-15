import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Pagination,
  Box
} from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/submissions?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSubmissions(res.data.submissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Interview Experiences
      </Typography>
      <Grid container spacing={3}>
        {submissions.map((submission) => (
          <Grid item xs={12} md={6} key={submission._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{submission.company}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {submission.country}
                </Typography>
                <Typography variant="body1">Questions:</Typography>
                {submission.questions.map((question, index) => (
                  <Typography key={index} variant="body2" paragraph>
                    {index + 1}. {question}
                  </Typography>
                ))}
                <Typography variant="caption" display="block">
                  Submitted by: {submission.userId.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default Dashboard;