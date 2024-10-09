
# Library Management System

This is a Library Management System developed using the **MERN** stack (MongoDB, Express.js, React, Node.js). The application allows administrators to manage books and users, issue books, and track returns, providing a comprehensive solution for library management.

## Features

- Admin authentication (login)
- Admin dashboard for managing books and users
- Ability to add, edit, and delete books
- Ability to add, edit, and delete users
- Issue books to users and record returns
- Check overdue books and check fines
- View borrowing history, including which books are borrowed and by whom

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

- Node.js
- MongoDB

## Screen Shots

## Login
![Login](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Login.png)

## Admin Dashboard
![Admin Dashboard](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Dashboard.png)

## Add Books
![Add Books](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Add%20Book.png)

## Manage Books
![Manage Books](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Manage%20Book.png)

## Books Details
![Books Details](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Book%20Details.png)

## Add Users
![Add Users](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Add%20User.png)

## Manage Users
![Manage Users](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Manage%20Users.png)

## Users Details
![Users Details](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/User%20Details.png)

## Issue Books
![Issue Books](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Issue%20Book.png)

## Return Books
![Return Books](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/Return%20Book.png)

## OverDue Fines
![OverDue Fines](https://github.com/Wasiqkhan527462/Library-management-system/blob/b9977cec398da887d03eef639ff66015d813d81c/OverDue%20Fine.png)

### Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Wasiqkhan527462/Library_Management.git
   cd Library_Management/server
   ```

2. Create a `.env` file in the root of the server directory and add the following environment variables:
   ```plaintext
   MONGO_URL=<your_mongo_connection_string>
   PORT=<your_port>
   JWT_SECRET=<your_jwt_secret>
   ```

3. Install server dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```

2. Create a `.env` file in the root of the client directory and add the following environment variable:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Start the frontend:
   ```bash
   npm start
   ```

## Usage

- Navigate to [http://localhost:3000](http://localhost:3000) to access the Library Management System.
- Admins can log in to manage books and users, issue books, and track returns.
- The dashboard provides an overview of the library’s current status, including overdue books and fines.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bugs you find.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
