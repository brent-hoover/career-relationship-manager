# Job Application Tracker

## Overview

Job Application Tracker is a web application built with Next.js that helps you manage and track your job applications. It allows you to add, view, edit, and delete job applications, making it easier to stay organized during your job search.
 Could you do this in a Google Sheet as well. Sure, but where's the fun in that?

## Features

- View a list of all job applications
- Add new job applications
- Edit existing job application details
- Delete job applications
- Track important information such as company, position, salary, application status, and important dates

## Tech Stack

- Next.js 13+ (App Router)
- React
- Prisma (ORM)
- SQLite (Database)
- Tailwind CSS (Styling)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (usually comes with Node.js)

## Getting Started

Follow these steps to set up the project locally:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/job-tracker-nextjs.git
   cd job-tracker-nextjs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
    - The project uses SQLite, so no additional database setup is required.
    - Initialize Prisma and generate the client:
      ```
      npx prisma generate
      ```
    - Run the initial migration:
      ```
      npx prisma migrate dev --name init
      ```

4. (Optional) Seed the database with sample data:
   ```
   npm run db:seed
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- To add a new job application, click on the "Add New Job" button and fill out the form.
- To view or edit a job application, click on the job title in the list.
- To delete job applications, select the checkboxes next to the jobs you want to remove and click the "Delete Selected" button.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
