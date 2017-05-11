const { stripIndent, source } = require('common-tags')

function template4({ profile, schools, jobs, projects, skills }) {
  return stripIndent`
    ${generateCommentHeader()}
    \\begin{document}
    ${generateProfileSection(profile)}
    ${generateEducationSection(schools)}
    ${generateExperienceSection(jobs)}
    ${generateSkillsSection(skills)}
    ${generateProjectsSection(projects)}
    \\end{document}
  `
}

function generateProfileSection(profile) {
  if (!profile) {
    return ''
  }

  const { fullName, email, phoneNumber, address, link } = profile

  let nameLine = ''

  if (fullName) {
    const names = fullName.split(' ')
    let nameStart = ''
    let nameEnd = ''

    if (names.length === 1) {
      nameStart = names[0]
    } else if (names.length === 2) {
      nameStart = names[0]
      nameEnd = names[1]
    } else {
      nameStart = names.slice(0, names.length - 1).join(' ')
      nameEnd = names[names.length - 1]
    }

    nameLine = `\\headerfirstnamestyle{${nameStart}} \\headerlastnamestyle{${nameEnd}} \\\\`
  }

  const emailLine = email ? `{\\faEnvelope\\ ${email}}` : ''
  const phoneLine = phoneNumber ? `{\\faMobile\\ ${phoneNumber}}` : ''
  const addressLine = address ? `{\\faMapMarker\\ ${address}}` : ''
  const linkLine = link ? `{\\faLink\\ ${link}}` : ''
  const info = [emailLine, phoneLine, addressLine, linkLine].filter(Boolean).join(' | ')

  return stripIndent`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %     Profile
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\begin{center}
    ${nameLine}
    \\vspace{2mm}
    ${info}
    \\end{center}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %     Education
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\cvsection{Education}
    \\begin{cventries}
    ${schools.map((school) => {
      const { name, location, degree, major, gpa, graduationDate } = school

      let degreeLine = ''

      if (degree && major) {
        degreeLine = `${degree} in ${major}`
      } else if (degree || major) {
        degreeLine = degree || major
      }

      return stripIndent`
        \\cventry
          {${degreeLine}}
          {${name || ''}}
          {${location || ''}}
          {${graduationDate || ''}}
          {${gpa ? `GPA: ${gpa}` : ''}}
      `
    })}
    \\end{cventries}

    \\vspace{-2mm}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %     Experience
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\cvsection{Experience}
    \\begin{cventries}
    ${jobs.map((job) => {
      const { name, title, location, startDate, endDate, duties } = job

      let dateRange = ''
      let dutyLines = ''

      if (startDate && endDate) {
        dateRange = `${startDate} – ${endDate}`
      } else if (startDate) {
        dateRange = `${startDate} – Present`
      } else {
        dateRange = endDate
      }

      if (duties) {
        dutyLines = source`
          \\begin{cvitems}
            ${duties.map(duty => `\\item {${duty}}`)}
          \\end{cvitems}
        `
      }

      return stripIndent`
        \\cventry
          {${title || ''}}
          {${name || ''}}
          {${location || ''}}
          {${dateRange}}
          {${dutyLines}}
      `
    })}
    \\end{cventries}
  `
}

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
      \\cvsection{Skills}
      \\begin{cventries}
      \\cventry
        {}
        {\\def\\arraystretch{1.15}{\\begin{tabular}{ l l }
          ${skills.map((skill) => {
            const { name, details } = skill
            const nameLine = name ? `${name}: ` : ''
            const detailsLine = `{\\skill{ ${details || ''}}}`

            return `${nameLine} & ${detailsLine} \\\\`
          })}
        \\end{tabular}}}
        {}
        {}
        {}
      \\end{cventries}

      \\vspace{-7mm}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
    \\cvsection{Projects}
    \\begin{cventries}
    ${projects.map(project => stripIndent`
        \\cventry
          {${project.description || ''}}
          {${project.name || ''}}
          {${project.technologies || ''}}
          {${project.link || ''}}
          {}

        \\vspace{-5mm}

      `
    )}
    \\end{cventries}
  `
}

function generateCommentHeader() {
  return stripIndent`
    %!TEX TS-program = xelatex
    %!TEX encoding = UTF-8 Unicode
    % Awesome CV LaTeX Template
    %
    % This template has been downloaded from:
    % https://github.com/posquit0/Awesome-CV
    %
    % Author:
    % Claud D. Park <posquit0.bj@gmail.com>
    % http://www.posquit0.com
    %
    % Template license:
    % CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
    %


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %     Configuration
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%% Themes: Awesome-CV
    \\documentclass[11pt, a4paper]{awesome-cv}

    %%% Override a directory location for fonts(default: 'fonts/')
    \\fontdir[fonts/]

    %%% Configure a directory location for sections
    \\newcommand*{\\sectiondir}{resume/}

    %%% Override color
    % Awesome Colors: awesome-emerald, awesome-skyblue, awesome-red, awesome-pink, awesome-orange
    %                 awesome-nephritis, awesome-concrete, awesome-darknight
    %% Color for highlight
    % Define your custom color if you don't like awesome colors
    \\colorlet{awesome}{awesome-red}
    %\\definecolor{awesome}{HTML}{CA63A8}
    %% Colors for text
    %\\definecolor{darktext}{HTML}{414141}
    %\\definecolor{text}{HTML}{414141}
    %\\definecolor{graytext}{HTML}{414141}
    %\\definecolor{lighttext}{HTML}{414141}

    %%% Override a separator for social informations in header(default: ' | ')
    %\\headersocialsep[\\quad\\textbar\\quad]
  `
}

module.exports = template4
