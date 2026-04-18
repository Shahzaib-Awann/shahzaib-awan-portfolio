import ProjectForm from '@/components/pages/projects/project-form'
import React from 'react'

const AddNewProjectPage = () => {
  return (
    <div className='p-10 z-100'>
        <h1 className="text-xl sm:text-3xl md:text-5xl uppercase font-bold tracking-tight text-foreground  transition-all duration-300">Add New Project</h1>

        <ProjectForm />
    </div>
  )
}

export default AddNewProjectPage