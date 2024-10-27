Suggested Full API Endpoint Setup
Users

    POST /users/register: Register a new user.
    POST /users/login: Log in a user with JWT.
    GET /users/:id: Get user profile.
    PUT /users/:id: Update user profile (e.g., skill level, profile picture, etc.).
    POST /users/:id/connections: Send a friend request or follow another user.
    GET /users/:id/connections: List user’s friends or connections.
    POST /users/:id/upload-picture: Upload/update user profile picture.

Matches/Activities

    POST /matches: Create a new match or activity.
    GET /matches: List matches based on filters (e.g., sport type, skill level, location).
    GET /matches/:id: Get detailed information on a specific match (e.g., participants, venue).
    POST /matches/:id/join: Request to join a match.
    DELETE /matches/:id/leave: Leave a match.
    POST /matches/:id/invite: Invite a user to join a match.
    POST /matches/:id/message: Send a message within a match group (for organizing details).

Venues

    GET /venues: List all available sports venues.
    POST /venues: Add a new venue (admin or venue owner only).
    GET /venues/:id: Get details of a specific venue.
    POST /venues/:id/book: Book a venue for a specified date and time.
    GET /venues/:id/reviews: List all reviews for a specific venue.
    POST /venues/:id/reviews: Add a new review for a venue.

Notifications

    GET /notifications: Get all notifications for a user.
    POST /notifications/mark-read: Mark notifications as read (bulk or single).
    DELETE /notifications/:id: Delete a specific notification (optional).

Messages/Chat

    GET /messages: Retrieve all messages between users or in a specific activity group.
    POST /messages: Send a message to another user or within a match.
    GET /messages/:id: Get message details (optional, for viewing message threads).

Admin/Management (Optional)

    These are optional and might be restricted based on user role.
    POST /admin/venues: Add, update, or delete venues (restricted to admins or venue owners).
    GET /admin/users: List all users (admin view).
    DELETE /admin/users/:id: Soft delete or deactivate a user account.

Optional: Other Useful Endpoints

    Booking History: GET /bookings: Retrieve all bookings for the logged-in user.
    Search: GET /search: Search endpoint to find users, venues, or matches based on keywords
