'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewJobForm = () => {
    const router = useRouter();
    const [job, setJob] = useState({
        position: '',
        company: '',
        maxSalary: '',
        location: '',
        status: 'Bookmarked',
        dateSaved: new Date().toISOString().split('T')[0],
        deadline: '',
        dateApplied: '',
        followUp: '',
        excitement: 3
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const jobToSubmit = {
                ...job,
                maxSalary: parseInt(job.maxSalary, 10),
                excitement: parseFloat(job.excitement),
                deadline: job.deadline || null,
                dateApplied: job.dateApplied || null,
                followUp: job.followUp || null
            };

            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobToSubmit),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create job');
            }

            const newJob = await response.json();
            router.push(`/jobs/${newJob.id}`);
        } catch (error) {
            console.error('Error creating job:', error);
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <label htmlFor="position" className="block mb-1">Position:</label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    value={job.position}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="company" className="block mb-1">Company:</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={job.company}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="maxSalary" className="block mb-1">Max Salary:</label>
                <input
                    type="number"
                    id="maxSalary"
                    name="maxSalary"
                    value={job.maxSalary}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="location" className="block mb-1">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={job.location}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="status" className="block mb-1">Status:</label>
                <select
                    id="status"
                    name="status"
                    value={job.status}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                >
                    <option value="Bookmarked">Bookmarked</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Negotiating">Negotiating</option>
                    <option value="Accepted">Accepted</option>
                </select>
            </div>
            <div>
                <label htmlFor="dateSaved" className="block mb-1">Date Saved:</label>
                <input
                    type="date"
                    id="dateSaved"
                    name="dateSaved"
                    value={job.dateSaved}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="deadline" className="block mb-1">Deadline:</label>
                <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={job.deadline}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="dateApplied" className="block mb-1">Date Applied:</label>
                <input
                    type="date"
                    id="dateApplied"
                    name="dateApplied"
                    value={job.dateApplied}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="followUp" className="block mb-1">Follow Up:</label>
                <input
                    type="date"
                    id="followUp"
                    name="followUp"
                    value={job.followUp}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="jobListingUrl" className="block mb-1">Job Listing URL:</label>
                <input
                    type="url"
                    id="jobListingUrl"
                    name="jobListingUrl"
                    value={job.jobListingUrl}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    placeholder="https://example.com/job-listing"
                />
             </div>
            <div>
                <label htmlFor="excitement" className="block mb-1">Excitement (1-5):</label>
                <input
                    type="number"
                    id="excitement"
                    name="excitement"
                    value={job.excitement}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    step="0.5"
                    required
                    className="w-full border rounded p-2"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create Job Application
            </button>
        </form>
    );
};

export default NewJobForm;
