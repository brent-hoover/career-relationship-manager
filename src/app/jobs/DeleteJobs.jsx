'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function DeleteJobs({ jobs }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDeleteClick = () => {
        const selectedJobs = jobs.filter(job => document.querySelector(`input[name="job-${job.id}"]`).checked);
        if (selectedJobs.length === 0) return;
        setIsDeleting(true);
    };

    const confirmDelete = async () => {
        const selectedJobIds = jobs
            .filter(job => document.querySelector(`input[name="job-${job.id}"]`).checked)
            .map(job => job.id);

        try {
            const response = await fetch('/api/jobs/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: selectedJobIds }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete jobs');
            }

            router.refresh(); // Refresh the page to reflect changes
        } catch (error) {
            console.error('Error deleting jobs:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
            >
                <Trash2 className="inline-block mr-1" size={18} />
                Delete Selected
            </button>
            {isDeleting && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <h2 className="text-xl mb-4">Are you sure you want to delete the selected job(s)?</h2>
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setIsDeleting(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
