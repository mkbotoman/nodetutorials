
var items = {
    SKN:{name:'Shuriken', price:100},
    ASK:{name:'Ashiko', price:690},
    CGI:{name:'Chigiriki', price:250},
    NGT:{name:'Naginata', price:900},
    KTN:{name:'Katana', price:1000}
};

exports.home = function(req, res) {
	if (typeof req.session.username == 'undefined') {
		res.render('home', {title: 'Ninja Store'});
	} else {
		res.redirect("/items");
	}

}
exports.home_post_handler = function(req, res) {
	username = req.body.username || "Anonymous";
	req.session.username = username;
	res.redirect("/");
}

exports.items = function(req, res) {
	if (typeof req.session.username == 'undefined')  res.redirect('/');
	else {
		res.render('items', { title: 'Ninja Store - Items', username: req.session.username, items: items});
	}
}

exports.item = function(req, res) {
	if (typeof req.session.username == 'undefined')  res.redirect('/');
	else {
		var name = items[req.params.id].name;
		var price = items[req.params.id].price;
		res.render('item', { title: 'Ninja Store - ' + name, username: req.session.username, name: name, price: price});
	}
}

exports.page = function(req, res) {
	var name = req.query.name;
	var contents = {
		about: 'Ninja Store sells cool shit.',
		contact: 'Contact us at <address><strong>Ninja Store</strong>,<br>1, World Ninja Headquarters,<br>Ninja Avenue,<br>NIN80B7-JP,<br>Nihongo.</address>'
	};
	res.render('page', {title: 'Ninja Store - ' + name, username: req.session.username, content:contents[name]});
}
