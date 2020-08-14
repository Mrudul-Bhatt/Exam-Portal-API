// module.exports = {
// 	MONGO_URI:
// 		'mongodb+srv://mrudul:1203@cluster0-2nil5.mongodb.net/test?retryWrites=true&w=majority',
// 	JWT_SECRET_KEY: 'examapp',
// };

//'mongodb+srv://mrudul:1203@cluster0-2nil5.mongodb.net/test?retryWrites=true&w=majority'

module.exports = {
	MONGO_URI: process.env.MONGO_URI,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
