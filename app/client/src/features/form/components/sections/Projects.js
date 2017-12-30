/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import { Button, LabeledInput } from '../../../../common/components'
import { Project } from '..'
import {
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword
} from '../../actions'
import type { Projects as ProjectsType } from '../../types'
import type { State } from '../../../../app/types'

type Props = {
  projects: $PropertyType<ProjectsType, 'projects'>,
  addProject: () => void,
  removeProject: () => void,
  addProjectKeyword: (index: number) => void,
  removeProjectKeyword: (index: number) => void
}

function Projects({
  projects,
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword
}: Props) {
  return (
    <Section heading="Your Projects">
      <LabeledInput
        name="projects.heading"
        label="Section Heading"
        placeholder="Projects"
      />
      {projects.map((project, i) => (
        <Project
          key={i}
          index={i}
          keywords={project.keywords}
          addKeyword={addProjectKeyword}
          removeKeyword={removeProjectKeyword}
        />
      ))}
      <div>
        <Button onClick={addProject} type="button">
          Add Project
        </Button>
        <Button onClick={removeProject} type="button">
          Remove Project
        </Button>
      </div>
    </Section>
  )
}

function mapState(state: State) {
  return {
    projects: state.form.resume.values.projects.projects
  }
}

const mapActions = {
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword
}

export default connect(mapState, mapActions)(Projects)
