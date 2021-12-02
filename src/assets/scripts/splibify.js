var App = {
        authWindow: undefined,
        loginButton: 'handle-login-button',
        init: function() {
            this.preparePage();
        },
        openPage: function() {
            if (undefined == this.authWindow) {
                var width = 480,
                    height = 640,
                    left = (screen.width / 2) - (width / 2),
                    top = (screen.height / 2) - (height / 2),
                    set = {
                        client_id: '1d30fc67bb3e49a8a91cbe45f497dab1',
                        redirect_uri: 'http://localhost:4200/signin-callback',
                        scope: 'playlist-read playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-library-modify',
                        response_type: 'code',
                        show_dialog: true,
                        state: '1wX456'
                    };

                this.authWindow = window.open(
                    "https://accounts.spotify.com/authorize?" + Tools.urlEncodeSet(set),
                    "Spotify",
                    'menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=' + width + ',height=' + height + ', top=' + top + ',left=' + left
                );
            } else {
                this.authWindow.focus();
            }
        },
        isPageCallback: function() {
            return /signin-callback/.test(window.location.pathname);
        },
        preparePage: function() {
            if (this.isPageCallback()) {
                var codeParts = window.location.search.split('&')[0].split('='),
                    target = window.self === window.top ? window.opener : window.parent;

                if (codeParts[0] == '?code') {
                    localStorage.setItem('accessCode', codeParts[1]);
                } else {
                    alert('Ocurrió un error al tratar de obtener los permisos necesarios, intentalo de nuevo');
                }
                target.postMessage('callback-finished', 'http://localhost:4200');
            } else {
                document.addEventListener('click', (event) => {
                    if (event.path[1].id == this.loginButton || event.target.id == this.loginButton) {
                        this.openPage();
                    }
                });
                window.addEventListener('message', this.gettingCodeFinished, false);
            }
        },
        gettingCodeFinished: function(event) {
            if (event.origin === 'http://localhost:4200' && event.data == 'callback-finished') {
                App.authWindow.close();
                App.getTokens();
            }
        },
        getTokens: function() {
            console.log('handleauth');
        }
    },
    Tools = {
        urlEncodeSet: function(set) {
            var comps = [];
            for (var i in set) {
                if (set.hasOwnProperty(i)) {
                    comps.push(encodeURIComponent(i) + "=" + encodeURIComponent(set[i]));
                }
            }
            var string = comps.join("&");
            return string;
        }
    };