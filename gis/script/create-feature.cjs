const fs = require('node:fs');
const path = require('node:path');

const name = process.argv[2];

if (!name || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) {
  console.error('Tên feature phải theo kebab-case. Ví dụ: report-by-service');
  process.exit(1);
}

const componentName = name
  .split('-')
  .map((word) => word[0].toUpperCase() + word.slice(1))
  .join('');

const camelName = componentName[0].toLowerCase() + componentName.slice(1);

const featureDir = path.resolve(__dirname, '../src/features', name);
const templateDir = path.join(__dirname, 'templates');

const variables = {
  name,
  componentName,
  camelName,
};

function renderTemplate(templateName) {
  const templatePath = path.join(templateDir, templateName);
  const template = fs.readFileSync(templatePath, 'utf8');

  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!Object.hasOwn(variables, key)) {
      throw new Error(`Biến template chưa được khai báo: ${key}`);
    }

    return variables[key];
  });
}

// Đọc toàn bộ template trước khi tạo folder và file.
const files = [
  {
    path: path.join(featureDir, 'pages', `${componentName}.tsx`),
    content: renderTemplate('page.tpl'),
  },
  {
    path: path.join(featureDir, 'services', `${name}.service.ts`),
    content: renderTemplate('service.tpl'),
  },
  {
    path: path.join(featureDir, 'types', `${name}.types.ts`),
    content: renderTemplate('type.tpl'),
  },
];

for (const folder of ['components', 'pages', 'services', 'types']) {
  fs.mkdirSync(path.join(featureDir, folder), { recursive: true });
}

for (const file of files) {
  try {
    fs.writeFileSync(file.path, file.content, { flag: 'wx' });
    console.log(`Đã tạo: ${file.path}`);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    console.log(`File đã tồn tại, giữ nguyên: ${file.path}`);
  }
}