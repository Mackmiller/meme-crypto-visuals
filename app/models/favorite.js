const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		symbol: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Favorite', favoriteSchema)
