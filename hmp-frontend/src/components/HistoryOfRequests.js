import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../Layouts/UserLayout';

const HistoryOfRequests = () => {
  const { user } = useContext(UserContext);  
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRequestHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hardware/history/${userId}`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching request history:', error);
      alert('Error fetching request history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      alert('Please log in to view your request history.');
      navigate('/login');
      return;
    }

    if (user._id) {
      fetchRequestHistory(user._id);
    }
  }, [user, navigate]);

  const handleFeedback = (requestId, assignedEmployee) => {
    const assignedEmployeeName = assignedEmployee ? assignedEmployee.name : 'Not Assigned';
    navigate(`/feedback?requestId=${requestId}`, {
      state: { assignedEmployeeName }
    });
  };

  const handleDelete = async (requestId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this request?');
      if (confirmDelete) {
        const response = await axios.put(`http://localhost:5000/api/hardware/updateStatus/${requestId}`, { status: 0 });
        if (response.status === 200) {
          alert('Request marked as deleted successfully');
          setHistory(history.map(request => 
            request._id === requestId ? { ...request, status: 0 } : request
          ));
        }
      }
    } catch (error) {
      console.error('Error marking request as deleted:', error);
      alert('Error marking request as deleted. Please try again.');
    }
  };

  
  const hasSubmittedFeedback = (requestId) => {
    const request = history.find((req) => req._id === requestId);
    return request?.feedbackSubmitted; 
  };

  if (loading) {
    return (
      <UserLayout title="History of Requests">
        <p>Loading request history...</p>
      </UserLayout>
    );
  }

  if (history.length === 0) {
    return (
      <UserLayout title="History of Requests">
        <p>No requests found.</p>
      </UserLayout>
    );
  }

  return (
    <UserLayout title="History of Requests">
      <div style={styles.historyContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>S.No</th>
              <th style={styles.tableHeader}>Details</th>
              <th style={styles.tableHeader}>Employee</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((request, index) => (
              <tr key={request._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{request.description}</td>
                <td style={styles.tableCell}>
                  {request.assignedEmployee ? request.assignedEmployee.name : 'Not Assigned'}
                </td>
                <td style={styles.tableCell}>{getStatusText(request.status)}</td>
                <td style={styles.tableCell}>
                  {request.status === 3 ? (
                    hasSubmittedFeedback(request._id) ? (
                      <span style={styles.feedbackSubmittedText}>Feedback Submitted</span>
                    ) : (
                      <button
                        style={styles.feedbackButton}
                        onClick={() => handleFeedback(request._id, request.assignedEmployee)}
                      >
                        Feedback
                      </button>
                    )
                  ) : request.status === 0 ? (
                    <span style={styles.deletedText}>Deleted</span>
                  ) : (
                    <button style={styles.deleteButton} onClick={() => handleDelete(request._id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UserLayout>
  );
};

// Helper function to convert status number to text
const getStatusText = (status) => {
  switch (status) {
    case 1: return 'Pending';
    case 2: return 'In Progress';
    case 3: return 'Completed';
    case 0: return 'Deleted';
    default: return 'Unknown';
  }
};

// Styles for the HistoryOfRequests component
const styles = {
  historyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f1f1f1',
    color: '#333',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontSize: '16px',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    padding: '12px',
    color: '#333',
    fontSize: '14px',
  },
  feedbackButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deletedText: {
    color: '#888',
    fontStyle: 'italic',
  },
  feedbackSubmittedText: {
    color: '#888',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
};

export default HistoryOfRequests;
