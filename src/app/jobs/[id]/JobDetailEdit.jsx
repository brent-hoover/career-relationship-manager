'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Star, StarHalf, Edit2, Check, X } from 'lucide-react';
import Link from 'next/link';

const JobDetailEdit = ({ job: initialJob }) => {
    const [job, setJob] = useState(initialJob);
    const [editingField, setEditingField] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleEditField = (fieldName) => {
        setEditingField(fieldName);
    };

    const handleSaveField = async (fieldName) => {
        try {
            const response = await fetch(`/api/jobs/${job.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [fieldName]: job[fieldName] }),
            });

            if (!response.ok) {
                throw new Error('Failed to update job');
            }

            const updatedJob = await response.json();
            setJob(updatedJob);
            setEditingField(null);
        } catch (error) {
            console.error('Error updating job:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleCancelEdit = (fieldName) => {
        setJob({ ...job, [fieldName]: initialJob[fieldName] });
        setEditingField(null);
    };

    const renderEditableField = (fieldName, label, type = 'text') => {
        const isEditing = editingField === fieldName;
        let fieldValue = job[fieldName];

        if (type === 'date' && fieldValue) {
            fieldValue = format(new Date(fieldValue), 'yyyy-MM-dd');
        }

        return (
            <div className="flex items-center py-2 border-b">
                <span className="font-semibold w-1/3">{label}:</span>
                <div className="w-2/3 flex items-center">
                    {isEditing ? (
                        <>
                            {type === 'select' ? (
                                <select
                                    name={fieldName}
                                    value={fieldValue}
                                    onChange={handleInputChange}
                                    className="border rounded p-1 mr-2 flex-grow"
                                >
                                    <option value="Bookmarked">Bookmarked</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewing">Interviewing</option>
                                    <option value="Negotiating">Negotiating</option>
                                    <option value="Accepted">Accepted</option>
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    name={fieldName}
                                    value={fieldValue}
                                    onChange={handleInputChange}
                                    className="border rounded p-1 mr-2 flex-grow"
                                />
                            )}
                            <button onClick={() => handleSaveField(fieldName)} className="text-green-500 mr-1">
                                <Check size={20} />
                            </button>
                            <button onClick={() => handleCancelEdit(fieldName)} className="text-red-500">
                                <X size={20} />
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="mr-2 flex-grow">
                                {type === 'date' && fieldValue
                                    ? format(new Date(fieldValue), 'MM/dd/yyyy')
                                    : type === 'number' && fieldName === 'maxSalary'
                                        ? `$${Number(fieldValue).toLocaleString()}`
                                        : fieldValue}
                            </span>
                            <button onClick={() => handleEditField(fieldName)} className="text-blue-500">
                                <Edit2 size={20} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
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
            <Link href="/jobs" className="text-blue-500 hover:underline mb-4 block">
                &larr; Back to Job Listings
            </Link>
            <h1 className="text-2xl font-bold mb-4">Job Details</h1>
            <div className="space-y-4 mt-4">
                {renderEditableField('position', 'Position')}
                {renderEditableField('company', 'Company')}
                {renderEditableField('maxSalary', 'Max Salary', 'number')}
                {renderEditableField('location', 'Location')}
                {renderEditableField('status', 'Status', 'select')}
                {renderEditableField('dateSaved', 'Date Saved', 'date')}
                {renderEditableField('deadline', 'Deadline', 'date')}
                {renderEditableField('dateApplied', 'Date Applied', 'date')}
                {renderEditableField('followUp', 'Follow Up', 'date')}
                <div className="flex items-center py-2 border-b">
                    <span className="font-semibold w-1/3">Excitement:</span>
                    <div className="w-2/3 flex items-center">
                        {editingField === 'excitement' ? (
                            <>
                                <input
                                    type="number"
                                    name="excitement"
                                    value={job.excitement}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="5"
                                    step="0.5"
                                    className="border rounded p-1 mr-2 w-20"
                                />
                                <button onClick={() => handleSaveField('excitement')} className="text-green-500 mr-1">
                                    <Check size={20} />
                                </button>
                                <button onClick={() => handleCancelEdit('excitement')} className="text-red-500">
                                    <X size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                {renderStars(job.excitement)}
                                <button onClick={() => handleEditField('excitement')} className="text-blue-500 ml-2">
                                    <Edit2 size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailEdit;
