# Project Name

Short description or tagline for your project

## Description

Provide a brief overview of your project, highlighting its purpose and key features.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

Follow these steps to run the project locally:

1. Clone the repository:

   git clone https://github.com/YGWoah/pfm.git

2. Navigate to the project directory:

   cd pfm

3. Install dependencies for the API server:

   npm install

4. Create a `.env` file in the project's root directory and add the following environment variables:

   DATABASE_URL=your_database_url ("postgres://vagxglnu:gmSDBJPFYMkhlB2hkHmpeUlORT_omYiC@drona.db.elephantsql.com/vagxglnu")
   JWT_SECRET=your_secret_key

5. Generate Prisma client:

   npx prisma generate

6. Pull the latest database changes:

   npm run db pull

7. Start the API server:

   npm run dev

8. Open a new terminal window/tab.

9. Navigate to the frontend directory:

   cd frontend

10. Install dependencies for the frontend:

```
    npm install
```

11. Start the frontend server:

```
    npm start
```

## Usage

Provide examples and instructions on how to use your project. This section can include code snippets, screenshots, or demo links.

<!--
## Contributing

Specify guidelines for contributing to your project. Include information on how others can report issues, submit pull requests, or contact you.
-->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Please feel free to reach out with any questions or feedback regarding the project.

- Name: Hamza El Massoudi
- GitHub: @YGWoah
- Email: hamza.elmassoudi.dev@gmail.com

## About the App

The blog app is a platform where users can create and share articles on various topics. It also allows users to engage with the content by commenting on articles posted by others.

<!--

### Features

- Feature 1: [Description of feature 1]
- Feature 2: [Description of feature 2]
- ...

### User Roles

- Admin: [Description of admin role]
- User: [Description of user role]
  -->

### Technologies Used

Front-end: The front-end of the blog app was developed using React, JavaScript, and HTML/CSS. I utilized the Tailwind CSS framework for styling . The front-end will be hosted on Netlify.

Back-end: For the back-end, I used Node.js as the runtime environment and Express.js as the web framework. These technologies allowed me to handle routing, middleware, and API development efficiently. The back-end will is hosted on vercel.

Database: I utilized PostgreSQL as the database management system to store and manage data for the blog app. PostgreSQL provided the necessary data persistence and allowed for efficient querying and data manipulation. The database is hosted on ElephantSQL.
