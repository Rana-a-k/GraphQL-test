const Mutation = {
    createPost: (_, data, context) => {
        return context.dataSources.posts.createPost(data);
    },

    updatePost: (_, data, context) => {
        return context.dataSources.posts.updatePost(data);
    },

    deletePost: (_, { id }, context) => {
        return context.dataSources.posts.deletePost(id);
    },
};

module.exports = Mutation;