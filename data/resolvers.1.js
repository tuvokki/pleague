import { Author, View, FortuneCookie, Player } from './connectors';

const resolvers = {
    Query: {
        author(_, args) {
            return Author.find({ where: args });
        },
        getFortuneCookie() {
            return FortuneCookie.getOne();
        },
        players() {
            return Player.find().then(
                (player) => player.name);
        }
    },
    Author: {
        posts(author) {
            return author.getPosts();
        }
    },
    Post: {
        author(post) {
            return post.getAuthor();
        },
        views(post) {
            return View.findOne({ postId: post.id })
                .then((view) => view.views);
        }
    }
};

export default resolvers;
