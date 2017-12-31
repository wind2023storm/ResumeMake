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

    const { name, email, phone, location = {}, website } = basics
    const info = [email, phone, location.address, website]
      .filter(Boolean)
      .join(' | ')

    return stripIndent`
      \\name{{\\LARGE ${name || ''}}}
      \\address{${info}}
    `
  },

  educationSection(education) {
    if (!education || !education.schools) {
      return ''
    }

    const lastSchoolIndex = education.schools.length - 1

    return source`
      \\section{${education.heading || 'EDUCATION'}}
      ${education.schools.map((school, i) => {
        const {
          institution,
          location,
          studyType,
          area,
          gpa,
          startDate,
          endDate
        } = school

        let schoolLine = ''
        let degreeLine = ''

        if (institution) {
          schoolLine += `\\textbf{${institution}}, `
        }

        if (studyType && area) {
          degreeLine = `${studyType} in ${area}`
        } else if (studyType || area) {
          degreeLine = studyType || area
        }

        if (degreeLine) {
          schoolLine += `{\\sl ${degreeLine}} `
        }

        if (gpa) {
          schoolLine += `GPA: ${gpa}`
        }

        let dateRange = ''

        if (startDate && endDate) {
          dateRange = `${startDate} | ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} | Present`
        } else {
          dateRange = endDate
        }

        if (dateRange) {
          schoolLine += `\\hfill ${dateRange}`
        }

        if (schoolLine) {
          schoolLine += '\\\\'
        }

        if (location) {
          schoolLine += `${location}`
        }

        if (i !== lastSchoolIndex) {
          schoolLine += '\\\\\\\\'
        }

        return schoolLine
      })}
    `
  },

  workSection(work) {
    if (!work || !work.jobs) {
      return ''
    }

    return source`
      \\section{${work.heading || 'EXPERIENCE'}}
      ${work.jobs.map(job => {
        const {
          company,
          position,
          location,
          startDate,
          endDate,
          highlights
        } = job

        let jobLine = ''
        let dateRange = ''

        if (company) {
          jobLine += `\\textbf{${company}}, `
        }

        if (position) {
          jobLine += `{\\sl ${position}}`
        }

        if (startDate && endDate) {
          dateRange = `${startDate} | ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} | Present`
        } else {
          dateRange = endDate
        }

        if (dateRange) {
          jobLine += `\\hfill ${dateRange}`
        }

        if (jobLine) {
          jobLine += '\\\\'
        }

        if (location) {
          jobLine += `${location}\\\\`
        }

        if (highlights) {
          jobLine += source`
            \\begin{itemize} \\itemsep 3pt
            ${highlights.map(highlight => `\\item ${highlight}`)}
            \\end{itemize}
          `
        }

        return jobLine
      })}
    `
  },

  skillsSection(skills) {
    if (!skills || !skills.skills) {
      return ''
    }

    return source`
      \\section{${skills.heading || 'SKILLS'}}
      \\begin{tabular}{@{}ll}
      ${skills.skills.map(skill => {
        const { name, keywords = [] } = skill
        return `\\textbf{${name || ''}}: & ${keywords.join(', ') || ''}\\\\`
      })}
      \\end{tabular}
    `
  },

  projectsSection(projects) {
    if (!projects || !projects.projects) {
      return ''
    }

    return source`
      \\section{${projects.heading || 'PROJECTS'}}
      ${projects.projects.map(project => {
        const { name, description, keywords = [], url } = project

        let projectLine = ''

        if (name) {
          projectLine += `\\textbf{${name}}`
        }

        if (keywords) {
          projectLine += `, {\\sl ${keywords.join(', ')}}`
        }

        if (description) {
          projectLine += projectLine ? `\\\\ ${description}` : description
        }

        if (url) {
          projectLine += projectLine ? `\\\\ ${url}` : url
        }

        if (projectLine) {
          projectLine += '\\\\\\\\'
        }

        return projectLine
      })}
    `
  },

  awardsSection(awards) {
    if (!awards || !awards.awards) {
      return ''
    }

    return source`
      \\section{${awards.heading || 'AWARDS'}}
      ${awards.awards.map(award => {
        const { title, summary, date, awarder } = award

        return stripIndent`
            \\textbf{${title || ''}}, {\\sl ${awarder || ''}} \\hfill ${date ||
          ''} \\\\
            ${summary || ''} \\\\\\\\
        `
      })}
    `
  }
}

function template5(values: SanitizedValues) {
  return stripIndent`
    \\documentclass[line,margin]{res}
    \\usepackage[none]{hyphenat}
    \\usepackage{textcomp}
    \\begin{document}
      ${generator.profileSection(values.basics)}
      \\begin{resume}
        \\vspace{-5mm}
        ${values.orderedSections
          .map(section => {
            switch (section) {
              case 'education':
                return generator.educationSection(values.education)

              case 'work':
                return generator.workSection(values.work)

              case 'skills':
                return generator.skillsSection(values.skills)

              case 'projects':
                return generator.projectsSection(values.projects)

              case 'awards':
                return generator.awardsSection(values.awards)

              default:
                return ''
            }
          })
          .join('\n')}
        ${WHITESPACE}
      \\end{resume}
    \\end{document}
  `
}

module.exports = template5
