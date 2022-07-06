const Query = {
    posts: (_, args, context) => {
        return context.dataSources.posts.getPosts();
    },

    onePost: (_, { id }, context) => {
        return context.dataSources.posts.getAPost(id);
    },
};
module.exports = Query;