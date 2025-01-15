import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SubmissionForm() {
  const [formData, setFormData] = useState({
    company: '',
    country: '',
    questions: ['']
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, '']
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/submissions',
        {
          ...formData,
          name: 'Anonymous', // You can get this from user context if needed
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Submit Interview Experience
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            margin="normal"
          />
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Interview Questions
          </Typography>
          <List>
            {formData.questions.map((question, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText>
                  <TextField
                    required
                    fullWidth
                    label={`Question ${index + 1}`}
                    value={question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    margin="dense"
                  />
                </ListItemText>
                <ListItemSecondaryAction>
                  {formData.questions.length > 1 && (
                    <IconButton
                      edge="end"
                      onClick={() => removeQuestion(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            variant="outlined"
            onClick={addQuestion}
            sx={{ mt: 2 }}
          >
            Add Question
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
          >
            Submit Experience
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SubmissionForm;
