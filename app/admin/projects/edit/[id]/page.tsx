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
    // const project = await getProjectForEdit(id);
    const project = {
      id: '24fe6125-e9af-43fb-b9af-80c793d20382',
      slug: 'foodya-restaurant',
      coverImageUrl: 'https://ik.imagekit.io/shahzaibawan/portfolio/projects/1776942032672-7e46c6d2798eff446b365c5246f4c9ca_p9Zy9NUQF.jpg',
      coverImageFileId: '69e9fbd25c7cd75eb8719a67',
      title: 'Foodya Restaurant',
      shortSummary: 'My Second Project',
      fullDescription: 'askasnd',
      category: 'fullstack',
      githubUrl: 'http://Github:3000/admin/projects/add',
      liveUrl: 'http://Live:3000/admin/projects/add',
      isFeatured: true,
      isPublished: true,
      startDate: '2026-03-31',
      endDate: '2026-04-23',
      client: 'Personal',
      teamSize: 2,
      createdAt: '2026-04-23T11:00:38.881Z',
      updatedAt: '2026-04-23T11:00:38.983Z',
      galleryImages: [{ 
        imageUrl: 'https://ik.imagekit.io/shahzaibawan/portfolio/projects/1776855404595-umar.is-a.dev_admin_QsaZlylOA.png',
        fileId: '69e8a96e5c7cd75eb85c518a'
       }],
      technologies: [ { id: 4 }, { id: 5 }, { id: 7 } ]
    }

    return (
      <div className='p-10 z-100'>
          <h1 className="text-xl sm:text-3xl md:text-5xl uppercase font-bold tracking-tight text-foreground  transition-all duration-300">Edit Project <span className='text-sm font-semibold'>{id}</span></h1>
  
          <ProjectForm technologies={technologies} data={project} />
      </div>
    )
}

export default EditProjectPage