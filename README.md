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

sql

8. Open a new terminal window/tab.

9. Navigate to the frontend directory:

cd frontend

typescript

10. Install dependencies for the frontend:

```
npm install
```

11. Start the frontend server:

```
npm start
```

Make sure to replace `your-username` and `your-project` with your actual GitHub username and project name.

## Usage

Provide examples and instructions on how to use your project. This section can include code snippets, screenshots, or demo links.

## Contributing

Specify guidelines for contributing to your project. Include information on how others can report issues, submit pull requests, or contact you.

## License

Specify the license under which your project is distributed. You can include a link to the license file if applicable.

## Contact

Please feel free to reach out with any questions or feedback regarding the project.

- Name: [Your Name]
- Email: [Your Email]

## About the App

Provide a general idea of the blog app and how it works. Include information about its main features, user roles, and any specific technologies or frameworks used.

### Features

- Feature 1: [Description of feature 1]
- Feature 2: [Description of feature 2]
- ...

### User Roles

- Admin: [Description of admin role]
- User: [Description of user role]

### Technologies Used

- Front-end: [List of front-end technologies used]
- Back-end: [List of back-end technologies used]
- Database: [Database technology used]
