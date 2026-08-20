'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const {
  categories,
  authors,
  articles,
  global,
  about,
  programReference,
  navigation,
  uiLabel,
  homePage,
  alumni,
  faqThemes,
  faqItems,
  licencePage,
  formationPage,
  financementPage,
  contactPage,
  candidaturePage,
  alumniPage,
  elearningPage,
  legalPage,
  articlesPage,
} = require('../data/data.json');

async function seedExampleApp() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up the template...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  } else {
    console.log(
      'Seed data has already been imported. We cannot reimport unless you clear your database first.'
    );
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats['size'];
  return fileSizeInBytes;
}

function getFileData(fileName) {
  const filePath = path.join('data', 'uploads', fileName);
  // Parse the file metadata
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
    });
}

// Create an entry and attach files if there are any
// `publish` est necessaire pour les content-types en draft & publish :
// depuis Strapi 5, passer publishedAt dans `data` ne publie pas l'entree,
// elle reste en brouillon et l'API publique renvoie 404.
async function createEntry({ model, entry, publish = false }) {
  try {
    // Actually create the entry in Strapi
    return await strapi.documents(`api::${model}.${model}`).create({
      data: entry,
      ...(publish ? { status: 'published' } : {}),
    });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

async function checkFileExistsBeforeUpload(files) {
  const existingFiles = [];
  const uploadedFiles = [];
  const filesCopy = [...files];

  for (const fileName of filesCopy) {
    // Un media absent n'est pas une erreur : tous les contenus n'ont pas d'illustration.
    if (!fileName) continue;
    if (!fs.existsSync(path.join('data', 'uploads', fileName))) continue;

    // Check if the file already exists in Strapi
    const fileWhereName = await strapi.query('plugin::upload.file').findOne({
      where: {
        name: fileName.replace(/\..*$/, ''),
      },
    });

    if (fileWhereName) {
      // File exists, don't upload it
      existingFiles.push(fileWhereName);
    } else {
      // File doesn't exist, upload it
      const fileData = getFileData(fileName);
      const fileNameNoExtension = fileName.split('.').shift();
      const [file] = await uploadFile(fileData, fileNameNoExtension);
      uploadedFiles.push(file);
    }
  }
  const allFiles = [...existingFiles, ...uploadedFiles];
  if (allFiles.length === 0) return null;
  // If only one file then return only that file
  return allFiles.length === 1 ? allFiles[0] : allFiles;
}

async function updateBlocks(blocks) {
  const updatedBlocks = [];
  for (const block of blocks) {
    if (block.__component === 'shared.media') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.file]);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file name on the block with the actual file
      blockCopy.file = uploadedFiles;
      updatedBlocks.push(blockCopy);
    } else if (block.__component === 'shared.slider') {
      // Get files already uploaded to Strapi or upload new files
      const existingAndUploadedFiles = await checkFileExistsBeforeUpload(block.files);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file names on the block with the actual files
      blockCopy.files = existingAndUploadedFiles;
      // Push the updated block
      updatedBlocks.push(blockCopy);
    } else {
      // Just push the block as is
      updatedBlocks.push(block);
    }
  }

  return updatedBlocks;
}

async function importArticles() {
  for (const article of articles) {
    const cover = await checkFileExistsBeforeUpload([`${article.slug}.jpg`]);
    const updatedBlocks = await updateBlocks(article.blocks);

    await createEntry({
      model: 'article',
      entry: {
        ...article,
        cover,
        blocks: updatedBlocks,
      },
      publish: true,
    });
  }
}

async function importGlobal() {
  const favicon = await checkFileExistsBeforeUpload(['favicon.png']);
  const shareImage = await checkFileExistsBeforeUpload(['default-image.png']);
  return createEntry({
    model: 'global',
    entry: {
      ...global,
      favicon,
      // Make sure it's not a draft
      publishedAt: Date.now(),
      defaultSeo: {
        ...global.defaultSeo,
        shareImage,
      },
    },
  });
}

async function importAbout() {
  const updatedBlocks = await updateBlocks(about.blocks);

  await createEntry({
    model: 'about',
    entry: {
      ...about,
      blocks: updatedBlocks,
      // Make sure it's not a draft
      publishedAt: Date.now(),
    },
  });
}

async function importProgramReference() {
  await createEntry({
    model: 'program-reference',
    entry: {
      ...programReference,
    },
    publish: true,
  });
}

async function importNavigation() {
  await createEntry({ model: 'navigation', entry: { ...navigation }, publish: true });
}

async function importUiLabels() {
  await createEntry({ model: 'ui-label', entry: { ...uiLabel }, publish: true });
}

async function importAlumni() {
  for (const person of alumni) {
    const photo = await checkFileExistsBeforeUpload([person.photo]);
    await createEntry({ model: 'alumnus', entry: { ...person, photo }, publish: true });
  }
}

async function importFaq() {
  // Strapi 5 relie les entrees par documentId : on memorise celui de chaque
  // theme a la creation plutot que de supposer des identifiants numeriques.
  const themeIds = [];
  for (const theme of faqThemes) {
    const created = await createEntry({ model: 'faq-theme', entry: theme, publish: true });
    themeIds.push(created?.documentId ?? null);
  }
  for (const item of faqItems) {
    const { theme, ...rest } = item;
    const documentId = themeIds[theme.id - 1];
    await createEntry({
      model: 'faq-item',
      entry: { ...rest, ...(documentId ? { faq_theme: documentId } : {}) },
      publish: true,
    });
  }
}

async function importHomePage() {
  await createEntry({ model: 'home-page', entry: { ...homePage }, publish: true });
}

async function importPages() {
  const pages = [
    ['licence-page', licencePage],
    ['formation-page', formationPage],
    ['financement-page', financementPage],
    ['contact-page', contactPage],
    ['candidature-page', candidaturePage],
    ['alumni-page', alumniPage],
    ['elearning-page', elearningPage],
    ['legal-page', legalPage],
    ['articles-page', articlesPage],
  ];
  for (const [model, entry] of pages) {
    await createEntry({ model, entry: { ...entry }, publish: true });
  }
}

async function importCategories() {
  for (const category of categories) {
    await createEntry({ model: 'category', entry: category });
  }
}

async function importAuthors() {
  for (const author of authors) {
    const avatar = await checkFileExistsBeforeUpload([author.avatar]);

    await createEntry({
      model: 'author',
      entry: {
        ...author,
        avatar,
      },
    });
  }
}

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    article: ['find', 'findOne'],
    category: ['find', 'findOne'],
    author: ['find', 'findOne'],
    global: ['find', 'findOne'],
    about: ['find', 'findOne'],
    'program-reference': ['find', 'findOne'],
    navigation: ['find', 'findOne'],
    'ui-label': ['find', 'findOne'],
    alumnus: ['find', 'findOne'],
    'faq-theme': ['find', 'findOne'],
    'faq-item': ['find', 'findOne'],
    'home-page': ['find', 'findOne'],
    'licence-page': ['find', 'findOne'],
    'formation-page': ['find', 'findOne'],
    'financement-page': ['find', 'findOne'],
    'contact-page': ['find', 'findOne'],
    'candidature-page': ['find', 'findOne'],
    'alumni-page': ['find', 'findOne'],
    'elearning-page': ['find', 'findOne'],
    'legal-page': ['find', 'findOne'],
    'articles-page': ['find', 'findOne'],
  });

  // Create all entries
  await importCategories();
  await importAuthors();
  await importArticles();
  await importGlobal();
  await importAbout();
  await importProgramReference();
  await importNavigation();
  await importUiLabels();
  await importAlumni();
  await importFaq();
  await importHomePage();
  await importPages();
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedExampleApp();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
