const { DateTime } = require('luxon');

module.exports = function(config) {
    config.addPassthroughCopy('src/pres');
    config.addPassthroughCopy('src/blocks');
    config.addPassthroughCopy('src/fonts');

    config.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale('ru').toFormat('d MMMM yyyy');
    });

    config.addCollection('postsReversed', function(collection) {
        return collection.getFilteredByTag('post').reverse();
    });

    // config.addCollection('postsReversedButLast', function(collection) {
    //     return collection.getFilteredByTag('post').reverse().filter(function(item) {
    //         item
    //     }
    // });

    return {
        dir: {
            input: 'src',
            output: 'dist'
        },
        passthroughFileCopy: true,
        templateFormats: [
            'md',
            'gif', 'jpg', 'png', 'svg'
        ],
    };
};
