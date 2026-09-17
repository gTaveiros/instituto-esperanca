document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       FORMULÁRIO
    ========================= */

    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const formulario = document.getElementById("formulario");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");
    const toast = document.querySelector(".toast");

    function apenasNumeros(valor) {
        return valor.replace(/\D/g, "");
    }


    /* MÁSCARA CPF */

    if (cpf) {
        cpf.addEventListener("input", function () {

            let valor = apenasNumeros(this.value);
            valor = valor.substring(0, 11);

            if (valor.length > 9) {
                valor = valor.replace(
                    /^(\d{3})(\d{3})(\d{3})(\d{1,2})$/,
                    "$1.$2.$3-$4"
                );
            } else if (valor.length > 6) {
                valor = valor.replace(
                    /^(\d{3})(\d{3})(\d{1,3})$/,
                    "$1.$2.$3"
                );
            } else if (valor.length > 3) {
                valor = valor.replace(
                    /^(\d{3})(\d{1,3})$/,
                    "$1.$2"
                );
            }

            this.value = valor;
        });
    }


    /* MÁSCARA TELEFONE */

    if (telefone) {
        telefone.addEventListener("input", function () {

            let valor = apenasNumeros(this.value);
            valor = valor.substring(0, 11);

            if (valor.length > 10) {
                valor = valor.replace(
                    /^(\d{2})(\d{5})(\d{4})$/,
                    "($1) $2-$3"
                );
            } else if (valor.length > 6) {
                valor = valor.replace(
                    /^(\d{2})(\d{4})(\d{1,4})$/,
                    "($1) $2-$3"
                );
            } else if (valor.length > 2) {
                valor = valor.replace(
                    /^(\d{2})(\d{1,5})$/,
                    "($1) $2"
                );
            }

            this.value = valor;
        });
    }


    /* MÁSCARA CEP */

    if (cep) {
        cep.addEventListener("input", function () {

            let valor = apenasNumeros(this.value);
            valor = valor.substring(0, 8);

            if (valor.length > 5) {
                valor = valor.replace(
                    /^(\d{5})(\d{1,3})$/,
                    "$1-$2"
                );
            }

            this.value = valor;
        });
    }


    /* ENVIO DO FORMULÁRIO */

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {

            evento.preventDefault();

            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }


            /* SALVA NO LOCALSTORAGE */

            const dadosCadastro = {
                cpf: cpf ? cpf.value : "",
                telefone: telefone ? telefone.value : "",
                cep: cep ? cep.value : "",
                dataCadastro: new Date().toLocaleString("pt-BR")
            };

            localStorage.setItem(
                "cadastroInstitutoEsperanca",
                JSON.stringify(dadosCadastro)
            );


            /* MENSAGEM */

            if (mensagemSucesso) {

                mensagemSucesso.textContent =
                    "Cadastro realizado com sucesso! Obrigado por querer fazer parte do Instituto Esperança.";

                mensagemSucesso.classList.add("exibir");

                mensagemSucesso.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }


            /* TOAST */

            if (toast) {

                toast.textContent =
                    "Cadastro realizado com sucesso!";

                toast.classList.add("exibir");

                setTimeout(function () {
                    toast.classList.remove("exibir");
                }, 4000);
            }

            formulario.reset();

        });
    }


    /* =========================
       NAVEGAÇÃO SPA
    ========================= */

    const conteudo = document.getElementById("conteudo");

    const links = document.querySelectorAll(
        'a[data-page]'
    );


    async function carregarPagina(url, alterarHistorico = true) {

        if (!conteudo) return;

        try {

            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error("Página não encontrada");
            }

            const html = await resposta.text();

            const documento = new DOMParser().parseFromString(
                html,
                "text/html"
            );

            const novoConteudo = documento.querySelector("main");

            if (!novoConteudo) {
                throw new Error("Conteúdo principal não encontrado");
            }

            conteudo.innerHTML = novoConteudo.innerHTML;


            /* ATUALIZA O TÍTULO */

            const novoTitulo = documento.querySelector("title");

            if (novoTitulo) {
                document.title = novoTitulo.textContent;
            }


            /* LINK ATIVO */

            links.forEach(function (link) {
                link.classList.remove("ativo");

                if (link.getAttribute("href") === url) {
                    link.classList.add("ativo");
                }
            });


            /* ATUALIZA A URL */

            if (alterarHistorico) {
                history.pushState(
                    {},
                    "",
                    url
                );
            }


            /* VOLTA PARA O TOPO */

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


        } catch (erro) {

            console.error("Erro ao carregar página:", erro);

        }

    }


    /* CLIQUE NOS LINKS */

    links.forEach(function (link) {

        link.addEventListener("click", function (evento) {

            evento.preventDefault();

            const url = this.getAttribute("href");

            carregarPagina(url);

        });

    });


    /* BOTÕES DENTRO DO CONTEÚDO */

    if (conteudo) {

        conteudo.addEventListener("click", function (evento) {

            const link = evento.target.closest("a[data-page]");

            if (!link) return;

            evento.preventDefault();

            const url = link.getAttribute("href");

            carregarPagina(url);

        });

    }


    /* BOTÃO VOLTAR E AVANÇAR DO NAVEGADOR */

    window.addEventListener("popstate", function () {

        const caminho =
            window.location.pathname.split("/").pop();

        const pagina =
            caminho === ""
                ? "index.html"
                : caminho;

        carregarPagina(pagina, false);

    });

});