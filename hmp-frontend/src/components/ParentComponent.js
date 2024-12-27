import React from 'react';
import FeedbackForm from './FeedbackForm';
import UserLayout from '../Layouts/UserLayout';
import { useUser } from '../context/UserContext';

const ParentComponent = () => {
  const { user } = useUser(); 
  const currentUserId = user?._id; 

  return (
    <UserLayout title="Submit Feedback">
      <FeedbackForm userId={currentUserId} />
    </UserLayout>
  );
};

export default ParentComponent;
