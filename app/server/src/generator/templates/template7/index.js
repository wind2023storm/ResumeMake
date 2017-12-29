/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues } from '../../../types'

function template7({
  basics,
  education,
  work,
  projects,
  skills,
  awards
}: SanitizedValues) {
  return stripIndent`
    ${generateHeader()}
    ${generateProfileSection(basics)}
    \\begin{document}
    ${basics ? '\\makecvtitle' : ''}
    ${generateEducationSection(education)}
    ${generateExperienceSection(work)}
    ${generateSkillsSection(skills)}
    ${generateProjectsSection(projects)}
    ${generateAwardsSection(awards)}
    ${WHITESPACE}
    \\end{document}
  `
}

function generateProfileSection(basics = {}) {
  const { name, email, phone, location = {}, website } = basics

  return stripIndent`
    % Profile
    \\name{${name || ''}}{}
    \\address{${location.address || ''}}
    ${phone ? `\\phone[mobile]{${phone}}` : ''}
    ${email ? `\\email{${email || ''}}` : ''}
    ${website ? `\\homepage{${website || ''}}` : ''}
  `
}

function generateEducationSection(education) {
  if (!education) {
    return ''
  }

  return source`
  \\section{Education}
  ${education.map(school => {
    const {
      institution,
      studyType,
      area,
      gpa,
      location,
      startDate,
      endDate
    } = school

    let degreeLine = ''

    if (studyType && area) {
      degreeLine = `${studyType} in ${area}`
    } else if (studyType || area) {
      degreeLine = studyType || area
    }

    let dateRange = ''

    if (startDate && endDate) {
      dateRange = `${startDate} | ${endDate}`
    } else if (startDate) {
      dateRange = `${startDate} | Present`
    } else {
      dateRange = endDate
    }

    return stripIndent`
      \\cventry
        {${dateRange || ''}}
        {${degreeLine}}
        {${institution || ''}}
        {${gpa ? `GPA: ${gpa}` : ''}}
        {\\textit{${location || ''}}}
        {}
    `
  })}
  `
}

function generateExperienceSection(work) {
  if (!work) {
    return ''
  }

  return source`
  \\section{Experience}
  ${work.map(job => {
    const { company, position, location, startDate, endDate, highlights } = job

    let dateRange = ''
    let highlightLines = ''

    if (startDate && endDate) {
      dateRange = `${startDate} -- ${endDate}`
    } else if (startDate) {
      dateRange = `${startDate} -- Present`
    } else {
      dateRange = endDate
    }

    if (highlights) {
      highlightLines = source`
        \\begin{itemize}%
          ${highlights.map(highlight => `\\item ${highlight}`)}
        \\end{itemize}
        `
    }

    return stripIndent`
      \\cventry
        {${dateRange || ''}}
        {${position || ''}}
        {${company || ''}}
        {${location || ''}}
        {}
        {${highlightLines}}
    `
  })}
  `
}

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
  \\section{Skills}
  ${skills.map(skill => {
    const { name, keywords = [] } = skill
    return `\\cvitem{${name || ''}}{${keywords.join(', ')}}`
  })}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
  \\section{Projects}
  ${projects.map(project => {
    const { name, description, keywords = [], url } = project

    let detailsLine = ''

    if (description) {
      detailsLine += `${description}\\\\`
    }

    if (url) {
      detailsLine += url
    }

    return stripIndent`
      \\cventry
        {}
        {${name || ''}}
        {}
        {\\textit{${keywords.join(', ')}}}
        {}
        {${detailsLine}}
      \\vspace{1mm}
    `
  })}
  `
}

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  return source`
  \\section{Awards}
  ${awards.map(award => {
    const { title, summary, date, awarder } = award

    let detailsLine = ''

    if (summary) {
      detailsLine += `${summary}\\\\`
    }

    if (awarder) {
      detailsLine += awarder
    }

    return stripIndent`
      \\cventry
        {}
        {${title || ''}}
        {}
        {\\textit{${date || ''}}}
        {}
        {${detailsLine}}
      \\vspace{1mm}
    `
  })}
  `
}

function generateHeader() {
  return stripIndent`
    %% start of file 'template.tex'.
    %% Copyright 2006-2013 Xavier Danaux (xdanaux@gmail.com).
    %
    % This work may be distributed and/or modified under the
    % conditions of the LaTeX Project Public License version 1.3c,
    % available at http://www.latex-project.org/lppl/.


    \\documentclass[letterpaper]{moderncv}        % possible options include font size ('10pt', '11pt' and '12pt'), paper size ('a4paper', 'letterpaper', 'a5paper', 'legalpaper', 'executivepaper' and 'landscape') and font family ('sans' and 'roman')
    \\usepackage{textcomp}
    % moderncv themes
    \\moderncvstyle{classic}                             % style options are 'casual' (default), 'classic', 'oldstyle' and 'banking'
    \\moderncvcolor{blue}                               % color options 'blue' (default), 'orange', 'green', 'red', 'purple', 'grey' and 'black'
    %\\renewcommand{\\familydefault}{\\sfdefault}         % to set the default font; use '\\sfdefault' for the default sans serif font, '\\rmdefault' for the default roman one, or any tex font name
    %\\nopagenumbers{}                                  % uncomment to suppress automatic page numbering for CVs longer than one page

    % character encoding
    \\usepackage[utf8]{inputenc}                       % if you are not using xelatex ou lualatex, replace by the encoding you are using
    %\\usepackage{CJKutf8}                              % if you need to use CJK to typeset your resume in Chinese, Japanese or Korean

    % adjust the page margins
    \\usepackage[scale=0.75]{geometry}
    %\\setlength{\\hintscolumnwidth}{3cm}                % if you want to change the width of the column with the dates
    %\\setlength{\\makecvtitlenamewidth}{10cm}           % for the 'classic' style, if you want to force the width allocated to your name and avoid line breaks. be careful though, the length is normally calculated to avoid any overlap with your personal info; use this at your own typographical risks...
  `
}

module.exports = template7
