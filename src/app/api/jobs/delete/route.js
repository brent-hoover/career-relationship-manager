import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { ids } = await request.json();

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        await prisma.job.deleteMany({
            where: {
                id: { in: ids.map(id => parseInt(id, 10)) }
            }
        });

        return NextResponse.json({ message: 'Jobs deleted successfully' });
    } catch (error) {
        console.error('Error deleting jobs:', error);
        return NextResponse.json({ error: 'Error deleting jobs' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
