import JobDetailEdit from './JobDetailEdit';

async function getJob(id) {
    console.log('Fetching job with ID:', id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, { cache: 'no-store' });
    console.log('Fetch response status:', res.status);
    if (!res.ok) {
        console.error('Failed to fetch job:', await res.text());
        throw new Error('Failed to fetch job');
    }
    const data = await res.json();
    console.log('Fetched job data:', data);
    return data;
}

export default async function JobDetailPage({ params }) {
    console.log('Rendering JobDetailPage with params:', params);
    let job;
    try {
        job = await getJob(params.id);
    } catch (error) {
        console.error('Error in JobDetailPage:', error);
        return <div>Error: {error.message}</div>;
    }

    if (!job) {
        console.log('Job not found for ID:', params.id);
        return <div>Job not found</div>;
    }

    return <JobDetailEdit job={job} />;
}
