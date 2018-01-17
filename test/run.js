let eless = require('../');

eless({
    source:'styles.less',
    variables: {
        color: 'blue'
    }
});

eless({
    source:'city-lights-ui-atom/index.less',
    paths: ['city-lights-ui-atom/']
});
