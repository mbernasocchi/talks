window.onload = function () {
    var s = document.getElementsByTagName('div'), cur = 0;
    if (!s) return;
    function go(n) {
        cur = n;
        var i = 1e3, e = s[n];
        for (var k = 0; k < s.length; k++) s[k].style.display = 'none';
        e.style.display = 'inline';
        e.style.fontSize = i + 'px';
        if (e.firstChild.nodeName === 'IMG') {
            document.body.style.backgroundImage = 'url(' + e.firstChild.src + ')';
            document.body.className = document.body.className.replace(/with_logo/g, '');
            e.firstChild.style.display = 'none';
        }
        else if (e.className.match('no_logo')) {
            document.body.style.backgroundImage = '';
        } else {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundColor = e.style.backgroundColor;
            document.body.className += ' with_logo'
        }
        while (
        e.offsetWidth > window.innerWidth ||
        e.offsetHeight > window.innerHeight) {
            e.style.fontSize = (i -= 10) + 'px';
            if (i < 0) break;
        }
        e.style.marginTop = ((window.innerHeight - e.offsetHeight) / 2) + 'px';
        if (window.location.hash !== n) window.location.hash = n;
        document.title = e.textContent || e.innerText;
    }

    document.onclick = function () {
        go(++cur % (s.length));
    };
    document.onkeydown = function (e) {
        (e.which === 39 || e.which == 34) && go(Math.min(s.length - 1, ++cur)); // 39 is right arrow, 34 is page down 
        (e.which === 37 || e.which == 33) && go(Math.max(0, --cur)); // 37 is left arrow, 33 is page up
    };
    function parse_hash() {
        return Math.max(Math.min(
            s.length - 1,
            parseInt(window.location.hash.substring(1), 10)), 0);
    }

    if (window.location.hash) cur = parse_hash() || cur;
    window.onhashchange = function () {
        var c = parse_hash();
        if (c !== cur) go(c);
    };

    go(cur);
};
