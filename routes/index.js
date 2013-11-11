
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Amuse Bouche' });
};

var descriptionFactory = require('../generator');

exports.description = function(req, res) {
  res.json({
    description: descriptionFactory()
  });
};
