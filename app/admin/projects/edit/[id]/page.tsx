import ProjectForm from '@/components/pages/projects/project-form';
import { getProjectForEdit } from '@/lib/actions/projects';
import { db } from '@/lib/db';
import { technologies as technologiesSchema } from '@/lib/db/schema';

interface PageProps {
    params: Promise<{ id: string }>;
  }

const EditProjectPage = async ({ params }: PageProps) => {

    const { id } = await params;
    const technologies = await db.select().from(technologiesSchema);
    const project = await getProjectForEdit(id);

    return (
      <div className='p-10 z-100'>
          <h1 className="text-xl sm:text-3xl md:text-5xl uppercase font-bold tracking-tight text-foreground  transition-all duration-300">Edit Project <span className='text-sm font-semibold'>{id}</span></h1>
  
          <ProjectForm technologies={technologies} data={project} />
      </div>
    )
}

export default EditProjectPage