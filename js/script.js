document.addEventListener("DOMContentLoaded", function () {

    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const formulario = document.getElementById("formulario");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");
    const toast = document.querySelector(".toast");

    function apenasNumeros(valor) {
        return valor.replace(/\D/g, "");
    }

    // MÁSCARA CPF
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

    // MÁSCARA TELEFONE
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

    // MÁSCARA CEP
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

    // ENVIO DO FORMULÁRIO
    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }

            // Mensagem na página
            if (mensagemSucesso) {
                mensagemSucesso.textContent =
                    "Cadastro realizado com sucesso! Obrigado por querer fazer parte do Instituto Esperança.";

                mensagemSucesso.classList.add("exibir");

                mensagemSucesso.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            // Toast
            if (toast) {
                toast.textContent = "Cadastro realizado com sucesso!";
                toast.classList.add("exibir");

                setTimeout(function () {
                    toast.classList.remove("exibir");
                }, 4000);
            }

            formulario.reset();
        });
    }

});