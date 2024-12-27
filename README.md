# my-node-project  
User and Role Management:

Implemented user authentication and authorization with role-based access control (roles: user, employee, admin) managed within a single User collection.
Created middleware functions to restrict certain routes and functionalities based on user roles, ensuring data privacy and functionality restrictions as per user role.
API Endpoints for Core Features:::

Defined endpoints for handling requests related to hardware repair and maintenance, enabling users to submit, update, and view requests.
Set up admin and employee endpoints to manage these requests, with employees being able to view assigned tasks and admins having control over request assignments and user management.
Feedback System:

Developed endpoints for users to submit feedback on service requests, allowing for feedback management by administrators.
Database and Data Structure:

Used MongoDB as the database, leveraging Mongoose for schema definitions and data validation.
Configured collections to centralize data management (e.g., consolidated user roles into a single User collection), simplifying schema structure by removing unnecessary collections (e.g., employee-specific schema).
Authentication and Session Handling:

Implemented authentication for users and sessions, utilizing JWT for secure token management across all user types.
Included logout functionality, token expiration handling, and secure redirection to maintain user session integrity.
