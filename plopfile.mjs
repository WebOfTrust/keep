export default function (plop) {
  plop.setGenerator('tasks-index', {
    prompts: [{
      type: 'input',
      name: 'type',
      message: 'Which tasks do you want to bundle'
    }],
    actions: [
      {
        type: 'add',
        path: 'tasks/index.js',
        templateFile: 'plop-templates/tasks-index.hbs',
      },
    ],
  });
}
