var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
      body: {type: String, required: true},
      author: {type: String, required: true},
      post: {type: Schema.Types.ObjectId, ref: "Post", required: true },
      date: {type: Date, default: Date.now}
    }
);

// Virtual for date formatted
CommentSchema
.virtual('date_formatted')
.get(function () {
    return moment.this.date.format('MMMM Do, YYYY');
});

// Export model
module.export = mongoose.model("Comment", CommentSchema);