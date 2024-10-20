import Link from 'next/link';
import { format } from 'date-fns';
import { Star, StarHalf } from 'lucide-react';

const statuses = ['Bookmarked', 'Applied', 'Interviewing', 'Negotiating', 'Accepted'];

const JobListing = ({ job, index }) => {
    const formatDate = (date) => {
        return date ? format(new Date(date), 'MM/dd/yyyy') : 'N/A';
    };

    const renderStars = (excitement: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= excitement) {
                stars.push(<Star key={i} className="text-yellow-400 inline" size={16} />);
            } else if (i - 0.5 === excitement) {
                stars.push(<StarHalf key={i} className="text-yellow-400 inline" size={16} />);
            } else {
                stars.push(<Star key={i} className="text-gray-300 inline" size={16} />);
            }
        }
        return stars;
    };

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-2 px-4">
                <Link href={`/jobs/${index}`} className="text-blue-500 hover:underline">
                    {job.position}
                </Link>
            </td>
            <td className="py-2 px-4">{job.company}</td>
            <td className="py-2 px-4">${job.maxSalary.toLocaleString()}</td>
            <td className="py-2 px-4">{job.location}</td>
            <td className="py-2 px-4">{job.status}</td>
            <td className="py-2 px-4">{formatDate(job.dateSaved)}</td>
            <td className="py-2 px-4">{formatDate(job.deadline)}</td>
            <td className="py-2 px-4">{formatDate(job.dateApplied)}</td>
            <td className="py-2 px-4">{formatDate(job.followUp)}</td>
            <td className="py-2 px-4">{renderStars(job.excitement)}</td>
        </tr>
    );
};

async function getJobs() {
    // This is where you'd fetch your jobs data
    // For now, we'll return dummy data
    return [
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
        // ... more job objects
    ];
}

export default async function JobsPage() {
    const jobs = await getJobs();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Job Application Listings</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left">Position</th>
                        <th className="py-2 px-4 text-left">Company</th>
                        <th className="py-2 px-4 text-left">Max Salary</th>
                        <th className="py-2 px-4 text-left">Location</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Date Saved</th>
                        <th className="py-2 px-4 text-left">Deadline</th>
                        <th className="py-2 px-4 text-left">Date Applied</th>
                        <th className="py-2 px-4 text-left">Follow Up</th>
                        <th className="py-2 px-4 text-left">Excitement</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job, index) => (
                        <JobListing key={index} job={job} index={index} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
