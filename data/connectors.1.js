import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import Mongoose from 'mongoose';
import rp from 'request-promise';

const db = new Sequelize('blog', null, null, {
    dialect: 'sqlite',
    storage: './blog.sqlite'
});

const AuthorModel = db.define('author', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING }
});

const PostModel = db.define('post', {
    title: { type: Sequelize.STRING },
    text: { type: Sequelize.STRING }
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
    _.times(10, () => {
        return AuthorModel.create({
            firstName: casual.first_name,
            lastName: casual.last_name
        }).then((author) => {
            return author.createPost({
                title: `A post by ${author.firstName}`,
                text: casual.sentences(3)
            });
        });
    });
});

const Author = db.models.author;
const Post = db.models.post;

const mongo = Mongoose.connect('mongodb://pleague:W4nsmaak@ds011482.mlab.com:11482/heroku_fvrtt85g');
if (mongo) console.log('connected');

const ViewSchema = Mongoose.Schema({
    postId: Number,
    views: Number
});

const View = Mongoose.model('views', ViewSchema);

// modify the mock data creation to also create some views:
casual.seed(123);
db.sync({ force: true }).then(() => {
    _.times(10, () => {
        return AuthorModel.create({
            firstName: casual.first_name,
            lastName: casual.last_name
        }).then((author) => {
            return author.createPost({
                title: `A post by ${author.firstName}`,
                text: casual.sentences(3)
            }).then((post) => { // <- the new part starts here
                // create some View mocks
                return View.update({ postId: post.id }, { views: casual.integer(250, 666) }, { upsert: true });
            });
        });
    });
});

const PlayerSchema = Mongoose.Schema({
    name: String,
    elo: Number
});

const Player = Mongoose.model('players', PlayerSchema);

const FortuneCookie = {
    getOne() {
        return rp('https://api.chucknorris.io/jokes/random')
            .then((res) => JSON.parse(res))
            .then((res) => {
                return res.value;
            });
    }
};

export { Author, Post, View, FortuneCookie, Player };
