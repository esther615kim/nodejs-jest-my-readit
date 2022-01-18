// func get data
const topics = [];
const setTopicInfo = (topicData) => {
    if (topicData.length === 0) return [];
    topics.length = 0;// any better way to empty the array?
    topicData.forEach(item => topics.push(item.slug));
    return topicData.map((item) => [item.description, item.slug]);
};

const users = [];
const setUserInfo = (userData) => {
    if (userData.length === 0) return [];
    users.length = 0;
    userData.forEach(item => users.push(item.username));
    return userData.map((item) => [
        item.username,
        item.avatar_url,
        item.name
    ])
};

const setArticleInfo = (articleData) =>
    articleData.map((item) => {
        if (topics.includes(item.topic) && users.includes(item.author)) {
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

const articleRef = (articleInfo) => {
    const articleIds = articleInfo.map(item => item.article_id);
    return articleIds; //typeof articleIds[0]); number
}

const setCommentInfo = (commentData, articleIds) => {

   return commentData.map((item)=>{
       if(articleIds.includes(item.article_id)&& users.includes(item.author)){
        return [
            item.author, //REFERENCES users(username)
            item.article_id, // REFERENCES article(article_id)
            item.votes,
            item.created_at,
            item.body
        ]
       }
    })
}

module.exports = { topics, users, setTopicInfo, setUserInfo, setCommentInfo, setArticleInfo, articleRef }



