// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const sampleJobs = [
        {
            position: "Senior Software Engineer",
            company: "TechCorp",
            maxSalary: 150000,
            location: "USA",
            status: "Applied",
            dateSaved: new Date("2024-10-15"),
            deadline: new Date("2024-11-30"),
            dateApplied: new Date("2024-10-20"),
            followUp: new Date("2024-11-05"),
            jobListingUrl: "https://www.techcorp.com/job-listing/senior-software-engineer",
            excitement: 4
        },
        {
            position: "Data Scientist",
            company: "AI Innovations",
            maxSalary: 130000,
            location: "Canada",
            status: "Interviewing",
            dateSaved: new Date("2024-10-10"),
            deadline: new Date("2024-12-15"),
            dateApplied: new Date("2024-10-18"),
            followUp: new Date("2024-11-01"),
            jobListingUrl: "https://www.aiinnovations.com/job-listing/senior-data-scientist",
            excitement: 5
        },
        // Add more sample jobs as needed
    ];

    for (const job of sampleJobs) {
        await prisma.job.create({
            data: job,
        });
    }

    console.log('Seed data inserted successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
