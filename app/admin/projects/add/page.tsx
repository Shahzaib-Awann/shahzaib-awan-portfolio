import ProjectForm from '@/components/pages/projects/project-form'
import { db } from '@/lib/db';
import { technologies as technologiesSchema } from '@/lib/db/schema';
import React from 'react'

const AddNewProjectPage = async () => {

  const technologies = await db.select().from(technologiesSchema);

  return (
    <div className='p-10 z-100'>
        <h1 className="text-xl sm:text-3xl md:text-5xl uppercase font-bold tracking-tight text-foreground  transition-all duration-300">Add New Project</h1>

        <ProjectForm technologies={technologies} />
    </div>
  )
}

export default AddNewProjectPage