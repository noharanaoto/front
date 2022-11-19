// function doTwice(func) {
//   func(); 
//   func(); 
// }

// function hello() {
//   console.log('Hello!');
// }

// doTwice(hello);

const hackerUriPrefix = 'https://hacker-news.firebaseio.com/v0/'

// 最新記事のidリストを取得する
async function getLatestPostIds(){
  try{
    const res = await fetch(`${hackerUriPrefix}newstories.json`)
    return res.json()
  } catch(e) {
    console.error(e)
    return []
  }
}

async function getPostData(id){
  try{
    const res = await fetch(`${hackerUriPrefix}item/${id}.json`)
    return res.json()
  } catch(e) {
    console.error(e)
    return null
  }
}

function createPostDOM (post){
  const postLinkNode = document.createElement('a')

  postLinkNode.classList.add('posts_item')
  postLinkNode.setAttribute('href', post.url || '#')
  postLinkNode.setAttribute('target', post.url ? '_blank' : '_self')
  postLinkNode.textContent = post.title

  document.getElementById('posts').appendChild(postLinkNode)
}

async function getPosts(limit){
  try{
    const ids = await getLatestPostIds()
    const postDataList = await Promise.all(ids.slice(0,limit).map(id => getPostData(id)))
    postDataList.forEach(post => createPostDOM(post))
  }catch(e){
    console.error(e)
  }
}

getPosts(4)