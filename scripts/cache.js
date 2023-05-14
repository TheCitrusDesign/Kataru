const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function postData() {
    const postsDirectory = path.join(process.cwd(), '_posts')
    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        return {
          slug,
          title: matterResult.data.title,
          coverImage: matterResult.data.coverImage
        }
    })
    return `export const posts = ${JSON.stringify(posts)}`
}

try {
  fs.readdirSync('_cache')
} catch (e) {
  fs.mkdirSync('_cache')
}

fs.writeFile('_cache/data.js', postData(), function (err) {
  if (err) return console.log(err);
  console.log('Posts cached.');
})