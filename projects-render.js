(function () {
  function createProjectCard(project) {
    var article = document.createElement('article');
    article.className = 'project-card' + (project.featured ? ' featured' : '');

    var stack = document.createElement('p');
    stack.className = 'tag';
    stack.textContent = project.stack;

    var title = document.createElement('h3');
    title.textContent = project.title;

    var description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;

    article.appendChild(stack);
    article.appendChild(title);
    article.appendChild(description);

    if (project.repo) {
      var link = document.createElement('a');
      link.className = 'project-link';
      link.href = project.repo;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = 'View repository';
      article.appendChild(link);
    } else {
      var pending = document.createElement('span');
      pending.className = 'project-link pending';
      pending.textContent = 'Repository link coming soon';
      article.appendChild(pending);
    }

    return article;
  }

  function renderProjectList(container, projects) {
    container.innerHTML = '';
    projects.forEach(function (project) {
      container.appendChild(createProjectCard(project));
    });
  }

  function initProjects() {
    var projects = window.portfolioProjects || [];
    var pinnedContainer = document.querySelector('[data-project-list="pinned"]');
    var academicContainer = document.querySelector('[data-project-list="academic"]');
    var personalContainer = document.querySelector('[data-project-list="personal"]');

    if (pinnedContainer) {
      renderProjectList(pinnedContainer, projects.filter(function (project) {
        return project.pinned;
      }).slice(0, 8));
    }

    if (academicContainer) {
      renderProjectList(academicContainer, projects.filter(function (project) {
        return project.category === 'Academic Project';
      }));
    }

    if (personalContainer) {
      renderProjectList(personalContainer, projects.filter(function (project) {
        return project.category === 'Personal Project';
      }));
    }

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
  } else {
    initProjects();
  }
}());
