// func get data
exports.seedTopicInfo = (topicData) => {
    return topicData.map((item) => [item.description, item.slug]);
  };

  exports.seedUserInfo = (userData) => {
    return userData.map((item) => [
        item.username,
        item.avatar_url,
        item.name
    ])
  };

exports.seedArticleInfo = (articleData) =>{
    return articleData.map((item)=>[
        item.title,
        item.body,
        item.votes,
        // item.topic, // REFERENCES topics(slug)
        item.created_at
        // item.author // REFERENCES users(username)
    ])
}

exports.seedCommentInfo = (commentData) =>{
    return commentData.map((item)=>[
        // item.author,// REFERENCES users(username)
        // item.article_id, // REFERENCES article(article_id)
        item.votes,
        item.created_at,
        item.body
    ])
}