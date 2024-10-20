import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    console.log('API route called with params:', params);
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            console.log('Invalid job ID:', params.id);
            return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
        }

        console.log('Attempting to fetch job with ID:', id);
        const job = await prisma.job.findUnique({
            where: { id: id },
        });

        if (!job) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }
        return NextResponse.json(job);
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Error fetching job' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}



export async function PUT(request, { params }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
        }

        const updatedJobData = await request.json();

        const updatedJob = await prisma.job.update({
            where: { id: id },
            data: updatedJobData,
        });

        console.log('Updated job:', updatedJob);

        return NextResponse.json(updatedJob);
    } catch (error) {
        console.error('Error updating job:', error);
        return NextResponse.json({ error: 'Error updating job' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
