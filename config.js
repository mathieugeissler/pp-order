module.exports = {
    baseUrl: 'http://www.lapetitepause.fr/',
    cssSelectors: {
        dailyMenu : {
            selector: '.daily-menu ul li', // on home page each <li/> have date and name of menu
            date: 'span' // date is in span element
        },
        categories: {
            link: '.shop-categories ul li a', // on home page each <li/> have a link to go into category.
            name: '.lpp-shop h2' // category name, available on each category page
        },
        products : {
            selector: '.lpp-shop-product', // each product is in this class
            name: '.lpp-shop-product-name', // product name
            price: '.lpp-shop-product-price', // product price
            description : '.lpp-shop-product-description' // product description
        }
    },
}