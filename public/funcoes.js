let login_usuario;
let nome_usuario;


function redirecionar_login() {
    window.location.href = 'login.html';
}

function verificar_autenticacao(event) {
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;
    

    if (event == 2) {
        if (login_usuario == undefined) {
            redirecionar_login();
        } else {
            lista.innerHTML = `<li><a href="index.html">Início</a></li> 
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="eventos.html">Eventos</a></li>
            <li class="barra">|</li>
            <li><a href="#" id="b_usuario"></a></li>
            <li ><a href="#" onclick="logoff()">Sair</a></li>`;
            b_usuario.innerHTML = nome_usuario;

            validar_sessao();
        }
    }

    if (event == 1) {
        if (login_usuario == undefined) {} else {
            esconderStart.style.display = 'none';
            lista.innerHTML = `<li><a href="index.html">Início</a></li> 
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="eventos.html">Eventos</a></li>
            <li class="barra">|</li>
            <li><a href="#" id="b_usuario"></a></li>
            <li ><a href="#" onclick="logoff()">Sair</a></li>`;
            b_usuario.innerHTML = nome_usuario;
        }
    }

}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    window.location.href = 'index.html';
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                logoff();
            }
        });
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, { cache: 'no-store' });
}

window.onscroll = function() { topo() };

function topo() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        document.getElementById('header').className = 'header-activate';
    } else {
        document.getElementById('header').className = '';
    }
}

