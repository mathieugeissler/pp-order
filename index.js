const config = require('./config');
const parser = require('./parser')(config);
const Bluebird = require('bluebird');

module.export = () => {
    return parser.getAllCategories() // load categories for home page first
        .then(categories => {
            map = {}; // init map
            promises = [];
            // for each category load products
            categories.forEach(category => promises.push(parser.getProductsByCategory(category, map)));
            return Bluebird.all(promises).then(() => map);
        })
        .then(productsByCategory => {
            // we need to override Daily menu
            return parser.getDailyMenu().then(menusByDate => {
                productsByCategory['Plats du Jour'] = menusByDate;
                return productsByCategory;
            });
        });
};
