Database Documentation

This document outlines the structure of the sports_buddy database, including tables, relationships, and key columns. The database is designed to support a sports matchmaking application where users can find others to play with, book venues, and participate in activities.

Tables Overview
1. users

    Purpose: Stores information about each user, including authentication details and profile information.
    Key Columns:
        user_id: Primary key for the table.
        username: Unique username for each user.
        email: User’s email address (unique).
        password: User’s hashed password.
        skill_level: Enum for the user’s skill level (beginner, intermediate, advanced).
        preferred_sport: Default sport the user is interested in.
        profile_picture_url: URL of the user’s profile picture.
    Additional Info: Foreign key references to other tables (like activities, reviews) ensure data consistency across the application.

2. sports

    Purpose: Lists different sports available for matchmaking.
    Key Columns:
        sport_id: Primary key.
        name: Name of the sport (unique).
        description: Description or rules for the sport.
    Additional Info: Used to filter activities by sport and specify available sports for venues.

3. venues

    Purpose: Stores information about venues available for booking.
    Key Columns:
        venue_id: Primary key.
        name: Venue name.
        location: Venue address or location.
        availability: General availability information (e.g., open hours).
        rental_cost: Rental price for booking the venue.
        contact_info: Contact information for the venue.
    Additional Info: Each venue is associated with a sport, allowing users to find specific venues for their sport of choice.

4. activities

    Purpose: Represents matches or activities created by users.
    Key Columns:
        activity_id: Primary key.
        creator_id: User ID of the activity creator (foreign key to users table).
        sport_id: Sport ID (foreign key to sports table).
        venue_id: Venue ID if a specific venue is chosen (foreign key to venues table).
        activity_date & activity_time: Date and time for the activity.
        max_players: Maximum players allowed in the activity.
        current_players: Tracks the number of players joined.
    Additional Info: Tracks when the activity was created and has relations with users through the activity_participants table.

5. activity_participants

    Purpose: Manages the relationship between users and activities they join.
    Key Columns:
        activity_id: ID of the activity (foreign key to activities table).
        user_id: ID of the user participating (foreign key to users table).
        joined_at: Timestamp for when the user joined the activity.
    Additional Info: Allows for multiple users to join a single activity, supporting group activities.

6. user_connections

    Purpose: Tracks connections or friendships between users.
    Key Columns:
        user_id: ID of the user (foreign key to users table).
        friend_id: ID of the connected user (foreign key to users table).
        connection_status: Enum status of the connection (pending, accepted, declined).
        requested_at: Timestamp for when the connection was requested.
    Additional Info: Facilitates social features, allowing users to connect with others and see their activities.

7. messages

    Purpose: Stores messages sent between users.
    Key Columns:
        message_id: Primary key.
        sender_id: ID of the user sending the message (foreign key to users table).
        receiver_id: ID of the message recipient (foreign key to users table).
        content: Text content of the message.
        sent_at: Timestamp when the message was sent.
    Additional Info: Supports real-time messaging between users.

8. notifications

    Purpose: Manages notifications for user activity (e.g., match invites, friend requests).
    Key Columns:
        notification_id: Primary key.
        user_id: User receiving the notification (foreign key to users table).
        message: Notification text.
        read: Boolean to indicate if the notification has been read.
    Additional Info: Allows users to stay informed about relevant events.

9. reviews

    Purpose: Stores reviews for venues made by users.
    Key Columns:
        review_id: Primary key.
        user_id: ID of the user making the review (foreign key to users table).
        venue_id: Venue being reviewed (foreign key to venues table).
        activity_id: Related activity if applicable (foreign key to activities table).
        rating: Rating given by the user (integer from 1 to 5).
        review_text: Text content of the review.
    Additional Info: Supports user feedback on venues, helping other users make informed decisions.

10. groups

    Purpose: Represents user groups that can participate in activities together.
    Key Columns:
        group_id: Primary key.
        group_name: Name of the group.
        creator_id: ID of the user who created the group (foreign key to users table).
        description: Group description.
    Additional Info: Groups allow users to organize and participate in activities as a team.

11. group_members

    Purpose: Manages the membership of users in groups.
    Key Columns:
        group_id: ID of the group (foreign key to groups table).
        user_id: ID of the group member (foreign key to users table).
    Additional Info: Links users to groups, supporting team-based activities.

Relationships and Foreign Keys

    One-to-Many Relationships:
        Users and Activities: Each user can create multiple activities, but each activity is created by a single user.
        Venues and Activities: Each venue can be associated with multiple activities.
        Users and Connections: Users can have multiple connections through the user_connections table.

    Many-to-Many Relationships:
        Users and Activities: The activity_participants table links multiple users to a single activity and vice versa.
        Users and Groups: The group_members table connects users to groups, supporting multiple users per group and multiple groups per user.