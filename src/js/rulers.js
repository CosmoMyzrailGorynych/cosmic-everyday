(function(){
    window.addEventListener('keyup', e => {
        if (e.keyCode + ' ' + e.shiftKey + ' ' + e.ctrlKey !== '82 true true') {
            return;
        }
        var hor = document.createElement('div'),
            ver = document.createElement('div'),
            all = [hor, ver],
            css = function (obj) {
                for (var key in obj) {
                    this[key] = obj[key];
                }
            };
        all.forEach(function (elt) {
            css.call(elt.style, {
                position: 'fixed',
                width: '1px',
                height: '1px',
                background: '#ff00ff',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                'z-index': 100500
            });
        });
        ver.style.height = hor.style.width = '100%';
        var listener = function (e) {
            hor.style.top = e.clientY+'px';
            hor.style.bottom = (e.clientY+1)+'px';
            ver.style.left = e.clientX+'px';
            ver.style.right = (e.clientX+1)+'px';
        };
        window.addEventListener('mousemove', listener);
        var butt = document.createElement('button');
        css.call(butt.style, {
            position: 'fixed',
            left: '1em',
            top: '1em',
            opacity: 0.75,
            'z-index': 100501
        });
        butt.innerHTML = 'Убрать линейки';
        butt.addEventListener('click', function () {
            [hor, ver, butt].forEach(function (elt) {
                elt.parentNode.removeChild(elt);
            });
        });
        [hor, ver, butt].forEach(function (elt) {
            document.body.appendChild(elt);
        });
    });
    return void 0;
})();
(function(){
    window.addEventListener('keyup', e => {
        if (e.keyCode + ' ' + e.shiftKey + ' ' + e.ctrlKey !== '71 true true') {
            return;
        }
        var grid = document.createElement('div'),
            baselineHeight = document.createElement('input'),
            css = function (obj) {
                for (var key in obj) {
                    this[key] = obj[key];
                }
            };

        css.call(grid.style, {
            position: 'absolute',
            'z-index': 100500,
            background: 'linear-gradient(transparent 0%, transparent 95%, rgba(255, 0, 0,0.5) 100%) 0px 0.115rem / 0.5rem 1.5rem, linear-gradient(transparent 0%, transparent 80%, rgba(255, 100, 100,0.27) 100%) 0px 0.115rem / 0.5rem 0.5rem',
            left: 0,
            top: 0,
            height: '100%',
            right: 0,
            'pointer-events': 'none'
        });

        baselineHeight.value = '0.115';
        baselineHeight.placeholder = 'Введите высоту базовой линии';
        baselineHeight.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9\-.]|([0-9\-.]+)-|(\.[0-9]*)\.|(^-?0)0|^\./, '$1$2$3');
            css.call(grid.style, {
                background: `linear-gradient(to bottom, transparent 0% , transparent 95%, #f00 100%) 0 ${baselineHeight.value}rem / 0.5rem 1.5rem, linear-gradient(transparent 0%, transparent 80%, rgba(255, 100, 100,0.27) 100%) 0px ${baselineHeight.value}rem / 0.5rem 0.5rem`
            });
        });
        window.addEventListener('scroll', function () {
            css.call(grid.style, {
                'padding-top': window.scrolY
            });

        });
        var butt = document.createElement('button');
        [butt, baselineHeight].forEach(function (elt) {
            css.call(elt.style, {
                position: 'fixed',
                left: '1em',
                top: '1em',
                opacity: 0.75,
                'z-index': 100501
            });
        });
        css.call(baselineHeight.style, {
            top: 'auto',
            bottom: '1em'
        });
        butt.innerHTML = 'Убрать сетку';
        butt.addEventListener('click', function () {
            [baselineHeight, grid, butt].forEach(function (elt) {
                elt.parentNode.removeChild(elt);
            });
        });
        [baselineHeight, grid, butt].forEach(function (elt) {
            document.body.appendChild(elt);
        });
    });
})();
