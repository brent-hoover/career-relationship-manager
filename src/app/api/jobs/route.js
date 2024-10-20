import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const jobs = await prisma.job.findMany();
        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ error: 'Error fetching jobs' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request) {
    try {
        const jobData = await request.json();
        console.log('Received job data:', jobData);

        // Ensure all required fields are present
        const requiredFields = ['position', 'company', 'maxSalary', 'location', 'status', 'dateSaved', 'excitement'];
        for (const field of requiredFields) {
            if (!(field in jobData)) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Convert string dates to Date objects or null
        if (jobData.dateSaved) jobData.dateSaved = new Date(jobData.dateSaved);
        jobData.deadline = jobData.deadline ? new Date(jobData.deadline) : null;
        jobData.dateApplied = jobData.dateApplied ? new Date(jobData.dateApplied) : null;
        jobData.followUp = jobData.followUp ? new Date(jobData.followUp) : null;

        // Ensure numeric fields are properly converted
        jobData.maxSalary = parseInt(jobData.maxSalary, 10);
        jobData.excitement = parseFloat(jobData.excitement);

        console.log('Processed job data:', jobData);

        const newJob = await prisma.job.create({
            data: jobData,
        });

        console.log('Created new job:', newJob);
        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json({ error: 'Error creating job', details: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
