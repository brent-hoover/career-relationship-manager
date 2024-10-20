import JobDetailEdit from './JobDetailEdit';

const jobs = [
    {
        position: "Senior Software Engineer",
        company: "TechCorp",
        maxSalary: 150000,
        location: "USA",
        status: "Applied",
        dateSaved: "2024-10-15",
        deadline: "2024-11-30",
        dateApplied: "2024-10-20",
        followUp: "2024-11-05",
        excitement: 4
    },
    // ... other job objects (include all the jobs from your original data)
];

export default function JobDetailPage({ params }) {
    const job = jobs[params.id];

    if (!job) {
        return <div>Job not found</div>;
    }

    return <JobDetailEdit job={job} />;
}
