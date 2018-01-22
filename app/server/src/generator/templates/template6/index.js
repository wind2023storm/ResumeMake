/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues, Generator } from '../../../types'

const generator: Generator = {
  profileSection(basics) {
    if (!basics) {
      return ''
    }

    const { name = '', email, phone, location = {}, website } = basics
    const info = [email, phone, location.address, website].filter(Boolean)

    return stripIndent`
      \\begin{center}
      % Personal
      % -----------------------------------------------------
      {\\fontsize{\\sizeone}{\\sizeone}\\fontspec[Path = fonts/,LetterSpace=15]{Montserrat-Regular} ${name.toUpperCase()}}
      ${name && info.length > 1 ? '\\\\' : ''}
      \\vspace{2mm}
      {\\fontsize{1em}{1em}\\fontspec[Path = fonts/]{Montserrat-Light} ${info.join(
        ' -- '
      )}}
      \\end{center}
    `
  },

  educationSection(education, heading) {
    if (!education) {
      return ''
    }

    return source`
      ${education.map(school => {
        const {
          institution = '',
          location = '',
          area = '',
          studyType = '',
          gpa = '',
          startDate = '',
          endDate = ''
        } = school

        const degreeLine = [studyType, area].filter(Boolean).join(' ')
        let dateRange = ''

        if (startDate && endDate) {
          dateRange = `${startDate} – ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} – Present`
        } else {
          dateRange = endDate
        }

        return stripIndent`
          % Chapter: Education
          % ------------------

          \\chap{${heading ? heading.toUpperCase() : 'EDUCATION'}}{

            \\school
              {${institution}}
              {${dateRange}}
              {${degreeLine}}
              {${location}}
              {${gpa ? `\\begin{newitemize}
                  \\item ${gpa ? `GPA: ${gpa}` : ''}
                \\end{newitemize}`
                    : ''}
              }
          }
        `
      })}
    `
  },

  workSection(work, heading) {
    if (!work) {
      return ''
    }

    return source`
      % Chapter: Work Experience
      % ------------------------
      \\chap{${heading ? heading.toUpperCase() : 'EXPERIENCE'}}{

      ${work.map(job => {
        const {
          company = '',
          position = '',
          location = '',
          startDate = '',
          endDate = '',
          highlights = []
        } = job

        let dateRange = ''
        let dutyLines = ''

        if (startDate && endDate) {
          dateRange = `${startDate} – ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} – Present`
        } else {
          dateRange = endDate
        }

        if (highlights) {
          dutyLines = source`
            \\begin{newitemize}
              ${highlights.map(duty => `\\item {${duty}}`)}
            \\end{newitemize}
            `
        }

        return stripIndent`
          \\job
            {${company}}
            {${dateRange}}
            {${position}}
            {${location}}
            {${dutyLines}}
        `
      })}
    }
    `
  },

  skillsSection(skills, heading) {
    if (!skills) {
      return ''
    }

    return ''
  },

  projectsSection(projects, heading) {
    if (!projects) {
      return ''
    }

    return ''
  },

  awardsSection(awards, heading) {
    if (!awards) {
      return ''
    }

    return ''
  }
}

function template6(values: SanitizedValues) {
  const { headings = {} } = values

  return stripIndent`
    \\documentclass[10pt]{article}
    \\usepackage[english]{babel}
    \\input{config/minimal-resume-config}
    \\begin{document}
    ${generator.profileSection(values.basics)}
    ${generator.educationSection(values.education, headings.education)}
    ${generator.workSection(values.work, headings.work)}
    ${WHITESPACE}
    \\end{document}
  `
}

export default template6
