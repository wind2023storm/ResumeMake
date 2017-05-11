const { stripIndent, source } = require('common-tags')

function template4({ profile, schools, jobs, projects, skills }) {
  return stripIndent`
    ${generateCommentHeader()}

    \\begin{document}
    ${generateProfileSection(profile)}
    ${generateEducationSection(schools)}

    \\cvsection{Experience}
    \\begin{cventries}
      \\cventry
        {Software Engineer Intern}
        {Mozilla}
        {Mountain View, CA}
        {Jun 2016 - Aug 2016}
        {
          \\begin{cvitems}
            \\item {Broadened search criteria for Firefox’s context menu to include subdomains in password suggestions.}
            \\item {Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.}
            \\item {Fixed regressions for Firefox Electrolysis and improved dialogs and notification popups.}
          \\end{cvitems}
        }
      \\cventry
        {Coding Advisor}
        {Codecademy}
        {Manhattan, NY}
        {Dec 2015 - May 2016}
        {
          \\begin{cvitems}
            \\item {Created a JavaScript project for Codecademy Pro members now available in the new JS course.}
            \\item {Taught new coders how to avoid bugs and how to go through the process of fixing existing ones.}
            \\item {Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.}
          \\end{cvitems}
        }
      \\cventry
        {Software Developer Intern}
        {IEEE}
        {Piscataway, NJ}
        {Jun 2015 - Nov 2015}
        {
          \\begin{cvitems}
            \\item {Wrote an API that allowed CRUD operations to be used for accessing and manipulating data involving current departments/groups/teams at IEEE.}
            \\item {Created a UI for admins that used the aforementioned API to automate the process of syncing departments/groups/teams on the site to relevant databases.}
            \\item {Improved the IEEE Innovate site by using cookies to display tailored web-content.}
          \\end{cvitems}
        }
      \\cventry
        {Web Developer Intern}
        {Johnson \\& Johnson}
        {New Brunswick, NJ}
        {Jan 2015 - Jun 2015}
        {
          \\begin{cvitems}
            \\item {Improved existing web pages by migrating inline-styling to external CSS files, and adding cross-browser compatibility.}
            \\item {Created SharePoint front-ends with HTML, CSS, and JavaScript and utilized the jQuery UI library to create responsive widgets.}
            \\item {Debugged original code base as the sole developer on the team and created a standard for SharePoint web part development for future employees.}
          \\end{cvitems}
        }
    \\end{cventries}

    \\cvsection{Skills}
    \\begin{cventries}
    \\cventry
      {}
      {\\def\\arraystretch{1.15}{\\begin{tabular}{ l l }
        Languages: & {\\skill{ Java, JavaScript, Ruby, Python, HTML, CSS}} \\\\
        Libraries: & {\\skill{ Node.js, Koa, Express, React, Redux, Bootstrap, Materialize}} \\\\
      \\end{tabular}}}
      {}
      {}
      {}
    \\end{cventries}

    \\vspace{-7mm}

    \\cvsection{Projects}
    \\begin{cventries}
      \\cventry
        {A webapp for generating LaTeX resumes from form data (including this one).}
        {LaTeX Resume Generator}
        {Node.js, Koa, React, Redux}
        {https://latexresu.me}
        {}

      \\vspace{-5mm}

      \\cventry
        {A modern speedcubing app with a scrambler, timer, and analyzer for cubing statistics.}
        {Flow Timer}
        {Node.js, Koa, React, Redux}
        {https://flowtimer.com}
        {}

      \\vspace{-5mm}

      \\cventry
        {A web app that lets you view a collage of images/videos from a subreddit.}
        {Reddit Image Scraper}
        {Ruby, Sinatra}
        {https://reddit-scraper.herokuapp.com}
        {}

      \\vspace{-5mm}

      \\cventry
        {A cognitive, anagram-recognition game where the player must quickly find the answer.}
        {Anagrams}
        {HTML, CSS, JavaScript}
        {A cognitive, anagram-recognition game where the player must quickly find the answer.}
        {}
    \\end{cventries}


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
    \\raggedright
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
            {${gpa ? `GPA: ${gpa}` : ''} \\vspace{2mm}}
        `
      })}
    \\end{cventries}

    \\vspace{-2mm}
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
