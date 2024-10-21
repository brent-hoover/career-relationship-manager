# Career Relationship Manager

## Overview

**Career Relationship Manager** (CRM) is a web application built with Next.js that helps job seekers manage their career journey. This tool is designed to offer much of the functionality of a traditional Customer Relationship Manager (CRM), but with features specifically tailored for job seekers. You can track job applications, networking contacts, interviews, and follow-ups—all in one place, helping you stay organized and proactive in your career growth.

Sure, you could use a Google Sheet for this, but **Career Relationship Manager** makes it more fun and efficient.

## Features (some still to be built, this project is a WIP)

- View a list of all job applications and networking connections
- Add, edit, and delete job applications and contacts
- Track important information such as company, position, salary, application status, interview schedules, follow-ups, and key dates
- Keep notes on networking events and conversations
- Monitor your job search progress and follow-ups

## Tech Stack

- **Next.js 13+ (App Router)** – Fast, modern web framework
- **React** – Frontend library for building interactive UIs
- **Prisma** (ORM) – Simplified database management
- **SQLite** (Database) – Lightweight and simple database solution (for development)
- **PostgresSQL (Database) - For deployed version
- **Tailwind CSS** – For easy and customizable styling

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (usually comes with Node.js)

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/career-relationship-manager.git
   cd career-relationship-manager
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   The project uses SQLite, so no additional database setup is required.

   - Initialize Prisma and generate the client:

     ```bash
     npx prisma generate
     ```

   - Run the initial migration:

     ```bash
     npx prisma migrate dev --name init
     ```

   - (Optional) Seed the database with sample data:

     ```bash
     npm run db:seed
     ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- To add a new job application or networking contact, click on the "Add New" button and fill out the form.
- To view or edit a job application or contact, click on the corresponding entry in the list.
- To delete applications or contacts, select the checkboxes next to the items you want to remove and click the "Delete Selected" button.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
