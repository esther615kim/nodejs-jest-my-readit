// func get data
const topics =[];
exports.setTopicInfo = (topicData) => {
    topicData.forEach(item => topics.push(item.slug));
    return topicData.map((item) => [item.description, item.slug]);
  };

const users =[];
exports.setUserInfo = (userData) => {
    userData.forEach(item => users.push(item.username));
    return userData.map((item) => [
        item.username,
        item.avatar_url,
        item.name
    ])
  };

exports.setArticleInfo = (articleData) =>
    articleData.map((item)=>{ 
        if(topics.includes(item.topic) && users.includes(item.author)){
            return [
                item.title,
                item.body,
                item.votes,
                item.topic, // REFERENCES topic(slug)
                item.created_at,
                item.author // REFERENCES users(username)
            ]
        } 
    }
)

// exports.setCommentInfo = (commentData) =>{
    
//     return commentData.map((item)=>[
//         item.author,
//         item.article_id,
//         // item.author,// REFERENCES users(username)
//         // item.article_id, // REFERENCES article(article_id)
//         item.votes,
//         item.created_at,
//         item.body
//     ])
// }