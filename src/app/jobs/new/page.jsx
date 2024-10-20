import NewJobForm from './NewJobForm';

export default function NewJobPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Job Application</h1>
            <NewJobForm />
        </div>
    );
}
