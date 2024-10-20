'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { format } from 'date-fns';
import { Star, StarHalf } from 'lucide-react';

const JobDetailPage = ({ job, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedJob, setEditedJob] = useState(job);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedJob({ ...editedJob, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(editedJob);
        setIsEditing(false);
    };

    const renderStars = (excitement) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= excitement) {
                stars.push(<Star key={i} className="text-yellow-400 inline" size={24} />);
            } else if (i - 0.5 === excitement) {
                stars.push(<StarHalf key={i} className="text-yellow-400 inline" size={24} />);
            } else {
                stars.push(<Star key={i} className="text-gray-300 inline" size={24} />);
            }
        }
        return stars;
    };

    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="text-blue-500 hover:underline mb-4 block">
                &larr; Back to Job Listings
            </Link>
            <h1 className="text-2xl font-bold mb-4">Job Details</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Position:</label>
                        <input
                            type="text"
                            name="position"
                            value={editedJob.position}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Company:</label>
                        <input
                            type="text"
                            name="company"
                            value={editedJob.company}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Max Salary:</label>
                        <input
                            type="number"
                            name="maxSalary"
                            value={editedJob.maxSalary}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={editedJob.location}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Status:</label>
                        <select
                            name="status"
                            value={editedJob.status}
                            onChange={handleInputChange}
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
                        <label className="block mb-1">Date Saved:</label>
                        <input
                            type="date"
                            name="dateSaved"
                            value={editedJob.dateSaved}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Deadline:</label>
                        <input
                            type="date"
                            name="deadline"
                            value={editedJob.deadline}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Date Applied:</label>
                        <input
                            type="date"
                            name="dateApplied"
                            value={editedJob.dateApplied}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Follow Up:</label>
                        <input
                            type="date"
                            name="followUp"
                            value={editedJob.followUp}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Excitement (1-5):</label>
                        <input
                            type="number"
                            name="excitement"
                            value={editedJob.excitement}
                            onChange={handleInputChange}
                            min="1"
                            max="5"
                            step="0.5"
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <div className="space-y-4">
                    <p><strong>Position:</strong> {job.position}</p>
                    <p><strong>Company:</strong> {job.company}</p>
                    <p><strong>Max Salary:</strong> ${job.maxSalary.toLocaleString()}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <p><strong>Date Saved:</strong> {format(new Date(job.dateSaved), 'MM/dd/yyyy')}</p>
                    <p><strong>Deadline:</strong> {format(new Date(job.deadline), 'MM/dd/yyyy')}</p>
                    <p><strong>Date Applied:</strong> {job.dateApplied ? format(new Date(job.dateApplied), 'MM/dd/yyyy') : 'N/A'}</p>
                    <p><strong>Follow Up:</strong> {job.followUp ? format(new Date(job.followUp), 'MM/dd/yyyy') : 'N/A'}</p>
                    <p><strong>Excitement:</strong> {renderStars(job.excitement)}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Edit Job Details
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobDetailPage;
