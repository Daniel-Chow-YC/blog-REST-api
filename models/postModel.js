var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
      title: {type: String, required: true},
      body: {type: String, required: true},
      author: {type: Schema.Types.ObjectId, ref: 'User', required: true },
      date: {type: Date, default: Date.now}
    }
)

// Virtual for date formatted
PostSchema
.virtual('date_formatted')
.get(function () {
    return moment.this.date.format('MMMM Do, YYYY');
});

// Export model
module.export = mongoose.model("Post", PostSchema);