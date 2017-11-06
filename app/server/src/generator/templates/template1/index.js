/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { FormValues } from '../../../types'

function template1({
  basics,
  education,
  work,
  projects,
  skills,
  awards
}: FormValues) {
  return stripIndent`
    \\documentclass[a4paper]{article}
    \\usepackage{fullpage}
    \\usepackage{amsmath}
    \\usepackage{amssymb}
    \\usepackage{textcomp}
    \\textheight=10in
    \\pagestyle{empty}
    \\raggedright

    ${generateResumeDefinitions()}

    \\begin{document}
    \\vspace*{-40pt}

    ${generateProfileSection(basics)}

    \\vspace*{2mm}

    ${generateEducationSection(education)}

    \\vspace*{2mm}

    ${generateExperienceSection(work)}

    \\vspace*{2mm}

    ${generateSkillsSection(skills)}

    \\vspace*{2mm}

    ${generateProjectsSection(projects)}

    \\vspace*{2mm}

    ${generateAwardsSection(awards)}

    ${WHITESPACE}
    \\end{document}
  `
}

function generateProfileSection(basics) {
  if (!basics) {
    return ''
  }

  const { name, email, phone, location, website } = basics
  const address = (location && location.address) || ''

  let line1 = name ? `{\\Huge \\scshape {${name}}}` : ''
  let line2 = [address, email, phone, website]
    .filter(Boolean)
    .join(' $\\cdot$ ')

  if (line1 && line2) {
    line1 += '\\\\'
    line2 += '\\\\'
  }

  return stripIndent`
    %==== Profile ====%
    \\vspace*{-10pt}
    \\begin{center}
      ${line1}
      ${line2}
    \\end{center}
  `
}

function generateEducationSection(education) {
  if (!education) {
    return ''
  }

  return source`
  %==== Education ====%
  \\header{Education}
  ${education.map(school => {
    const {
      institution,
      location,
      studyType,
      area,
      gpa,
      startDate,
      endDate
    } = school

    let line1 = ''
    let line2 = ''

    if (institution) {
      line1 += `\\textbf{${institution}}`
    }

    if (location) {
      line1 += `\\hfill ${location}`
    }

    if (studyType) {
      line2 += studyType
    }

    if (area) {
      line2 += studyType ? ` ${area}` : `Degree in ${area}`
    }

    if (gpa) {
      line2 += ` \\textit{GPA: ${gpa}}`
    }

    if (startDate || endDate) {
      const gradLine = `${startDate || ''} - ${endDate || ''}`
      line2 += line2 ? ` \\hfill ${gradLine}` : gradLine
    }

    if (line1) {
      line1 += '\\\\'
    }

    if (line2) {
      line2 += '\\\\'
    }

    return stripIndent`
      ${line1}
      ${line2.trim()}
      \\vspace{2mm}
    `
  })}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    %==== Experience ====%
    \\header{Experience}
    \\vspace{1mm}

  ${jobs.map(job => {
    const { company, position, location, startDate, endDate, highlights } = job

    let line1 = ''
    let line2 = ''
    let highlightLines = ''

    if (company) {
      line1 += `\\textbf{${company}}`
    }

    if (location) {
      line1 += ` \\hfill ${location}`
    }

    if (position) {
      line2 += `\\textit{${position}}`
    }

    if (startDate && endDate) {
      line2 += ` \\hfill ${startDate} | ${endDate}`
    } else if (startDate) {
      line2 += ` \\hfill ${startDate} | Present`
    } else if (endDate) {
      line2 += ` \\hfill ${endDate}`
    }

    if (line1) line1 += '\\\\'
    if (line2) line2 += '\\\\'

    if (highlights) {
      highlightLines = source`
          \\vspace{-1mm}
          \\begin{itemize} \\itemsep 1pt
            ${highlights.map(highlight => `\\item ${highlight}`)}
          \\end{itemize}
        `
    }

    return stripIndent`
      ${line1}
      ${line2}
      ${highlightLines}
    `
  })}
  `
}

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
  \\header{Skills}
  \\begin{tabular}{ l l }
  ${skills.map(skill => {
    const { name = 'Misc', keywords = [] } = skill
    return `${name}: & ${keywords.join(', ')} \\\\`
  })}
  \\end{tabular}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
  \\header{Projects}
  ${projects.map(project => {
    if (Object.keys(project) === 0) {
      return ''
    }

    const { name, description, keywords, url } = project

    let line1 = ''
    let line2 = description || ''

    if (name) {
      line1 += `{\\textbf{${name}}`
    }

    if (keywords) {
      line1 += ` \\sl {${keywords.join(', ')}} `
    }

    if (url) {
      line1 += `\\hfill ${url}`
    }

    if (line1) {
      line1 += '\\\\'
    }

    if (line2) {
      line2 += '\\\\'
    }

    return stripIndent`
      ${line1}
      ${line2}
      \\vspace*{2mm}
    `
  })}
  `
}

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  return source`
  \\header{Awards}
  ${awards.map(award => {
    const { title, summary, date, awarder } = award

    let line1 = ''
    let line2 = summary || ''

    if (title) {
      line1 += `\\textbf{${title}}`
    }

    if (awarder) {
      line1 += ` \\hfill ${awarder}`
    }

    if (date) {
      line2 += ` \\hfill ${date}`
    }

    if (line1) line1 += '\\\\'
    if (line2) line2 += '\\\\'

    return stripIndent`
      ${line1}
      ${line2}
      \\vspace*{2mm}
    `
  })}
  `
}

function generateResumeDefinitions() {
  return stripIndent`
    %\\renewcommand{\\encodingdefault}{cg}
    %\\renewcommand{\\rmdefault}{lgrcmr}

    \\def\\bull{\\vrule height 0.8ex width .7ex depth -.1ex }

    % DEFINITIONS FOR RESUME %%%%%%%%%%%%%%%%%%%%%%%

    \\newcommand{\\area} [2] {
        \\vspace*{-9pt}
        \\begin{verse}
            \\textbf{#1}   #2
        \\end{verse}
    }

    \\newcommand{\\lineunder} {
        \\vspace*{-8pt} \\\\
        \\hspace*{-18pt} \\hrulefill \\\\
    }

    \\newcommand{\\header} [1] {
        {\\hspace*{-18pt}\\vspace*{6pt} \\textsc{#1}}
        \\vspace*{-6pt} \\lineunder
    }

    \\newcommand{\\employer} [3] {
        { \\textbf{#1} (#2)\\\\ \\underline{\\textbf{\\emph{#3}}}\\\\  }
    }

    \\newcommand{\\contact} [3] {
        \\vspace*{-10pt}
        \\begin{center}
            {\\Huge \\scshape {#1}}\\\\
            #2 \\\\ #3
        \\end{center}
        \\vspace*{-8pt}
    }

    \\newenvironment{achievements}{
        \\begin{list}
            {$\\bullet$}{\\topsep 0pt \\itemsep -2pt}}{\\vspace*{4pt}
        \\end{list}
    }

    \\newcommand{\\schoolwithcourses} [4] {
        \\textbf{#1} #2 $\\bullet$ #3\\\\
        #4 \\\\
        \\vspace*{5pt}
    }

    \\newcommand{\\school} [4] {
        \\textbf{#1} #2 $\\bullet$ #3\\\\
        #4 \\\\
    }
    % END RESUME DEFINITIONS %%%%%%%%%%%%%%%%%%%%%%%
  `
}

module.exports = template1
