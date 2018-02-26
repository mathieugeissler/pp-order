const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const cheerio = require('cheerio')

fetch.Promise = Bluebird; // associate Bluebird to node-fetch

module.exports = (config) => {

    const parseUrl = (url, parsingFn) => {
        return fetch(url)
            .then(res => res.text()) // unzip compressed html
            .then(body => parsingFn(cheerio.load(body))); // execute parsing function with cheerio selector
    };
    
    const getAllCategories = () => {
        return parseUrl(config.baseUrl, $ => {
            const urls = [];
            $(config.cssSelectors.categories.link).each((idx, elem) => {
                const url = $(elem).attr('href');
                const name = $(elem).find('span').text();
                urls.push({name, url});
            });
            return urls;
        });
    };

    const getProductsByCategory = (category, map) => {
        if(!map) throw new Error('You need provide an object to map products by category');
        return parseUrl(config.baseUrl + category.url, $ => {
            const products = [];
            $(config.cssSelectors.products.selector).each((idx, elem) => {
                const name = $(elem).find(config.cssSelectors.products.name).text();
                const price = $(elem).find(config.cssSelectors.products.price).text();
                const description = $(elem).find(config.cssSelectors.products.description).text();
                products.push({name, price, description});
            })
            return map[category.name] = products;
        })
    }

    // name = date
    // description = daily menu
    const getDailyMenu = () => {
        return parseUrl(config.baseUrl, $ => {
            const menusByDate = [];
            $(config.cssSelectors.dailyMenu.selector).each((idx, elem) => {
                // Todo : find a way to parse date ?
                // remove children span to remove unnecessary chars
                let name = $(elem)
                    .find(config.cssSelectors.dailyMenu.date)
                    .children()
                    .remove()
                    .end()
                    .text();
                const n = date.indexOf(':');
                name = date.substring(0, n != -1 ? n : s.length); // remove ": (Made By LPP)"
                // remove children to remove date
                const description = $(elem)
                    .children() // get childrens
                    .remove() // remove it
                    .end()  // return to parent
                    .text(); // get name only :)
                menusByDate.push({description, name});
            });
            return menusByDate;
        });
    }

    return {
        getAllCategories,
        getProductsByCategory,
        getDailyMenu
    }
    
}
