(() => {
    const md = require('markdown-it')();
    var BAD_PROTO_RE = /^(vbscript|javascript):/;
    var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

    md.validateLink = function (url) {
        var str = url.trim().toLowerCase();
        return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
    };
})();
