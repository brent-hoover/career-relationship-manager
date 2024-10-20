import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { Star, StarHalf } from 'lucide-react';
import DeleteJobs from './DeleteJobs'; // We'll create this client component

const prisma = new PrismaClient();

const formatDate = (date) => {
    return date ? format(new Date(date), 'MM/dd/yyyy') : 'N/A';
};

const formatUrl = (url) => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
};

const renderStars = (excitement) => {
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

async function getJobs() {
    const jobs = await prisma.job.findMany();
    return jobs;
}

export default async function JobListingPage() {
    const jobs = await getJobs();

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">My Job Applications</h1>
                <div>
                    <Link href="/jobs/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
                        Add New Job
                    </Link>
                    <DeleteJobs jobs={jobs} />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left">Select</th>
                        <th className="py-2 px-4 text-left">Position</th>
                        <th className="py-2 px-4 text-left">Company</th>
                        <th className="py-2 px-4 text-left">Max Salary</th>
                        <th className="py-2 px-4 text-left">Location</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Date Saved</th>
                        <th className="py-2 px-4 text-left">Deadline</th>
                        <th className="py-2 px-4 text-left">Date Applied</th>
                        <th className="py-2 px-4 text-left">Follow Up</th>
                        <th className="py-2 px-4 text-left">Job Listing URL</th>
                        <th className="py-2 px-4 text-left">Excitement</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">
                                <input
                                    type="checkbox"
                                    name={`job-${job.id}`}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                            </td>
                            <td className="py-2 px-4">
                                <Link href={`/jobs/${job.id}`} className="text-blue-500 hover:underline">
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
                            <td className="py-2 px-4">
                                {job.jobListingUrl ? (
                                    <a
                                        href={formatUrl(job.jobListingUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Listing
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                                    <td className="py-2 px-4">{renderStars(job.excitement)}</td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>
                        </div>
                        </div>
    );
}
