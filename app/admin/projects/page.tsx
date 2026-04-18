import Link from 'next/link'
import React from 'react'

const ProjectsPage = () => {
  return (
    <div className='p-10'>
      <h1>Projects Page</h1>

      <Link href="/admin/projects/add">
        Add New Project
      </Link>
    
    </div>
  )
}

export default ProjectsPage