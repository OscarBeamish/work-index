const fs = require('fs');
const path = require('path');

function generateWorkJson() {
  const workDirectory = path.resolve(__dirname, './public/work'); 
  const outputDirectory = path.resolve(__dirname, './public/data');
  
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const items = fs.readdirSync(workDirectory).filter(item => !item.startsWith('.'));
  const folders = items.filter(item => {
    const itemPath = path.join(workDirectory, item);
    return fs.statSync(itemPath).isDirectory();
  });

  const works = folders.map(folderName => {
    const workFolderPath = path.join(workDirectory, folderName);
    const files = fs.readdirSync(workFolderPath).filter(file => !file.startsWith('.'));
  
    const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    const videos = files.filter(file => file.endsWith('.mov') || file.endsWith('.mp4'));
  
    return {
      title: folderName,
      images: images.map(img => ({ src: `/work/${folderName}/${img}`, filename: img, type: 'image' })),
      videos: videos.map(vid => ({ src: `/work/${folderName}/${vid}`, filename: vid, type: 'video' }))
    };
  });

  fs.writeFileSync(path.join(outputDirectory, 'workData.json'), JSON.stringify(works, null, 2));
}

generateWorkJson();
