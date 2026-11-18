// dados do cadastro do funcionario
const nome = document.getElementById("nome")
const cpf = document.getElementById("cpf")
const data = document.getElementById("data")
const funcao = document.getElementById("funcao")
const salario = document.getElementById("salario")
const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []

// dados de alteração de salario
const salario_novo = document.getElementById("salario_novo")
const cpf_novo = document.getElementById("cpf_novo")

// dados da demissão
const cpf_demissao = document.getElementById("cpf_demissao")

// dados da listagem
const cpf_listar = document.getElementById("cpf_listar")
const lista = document.getElementById("lista")
const lista2 = document.getElementById("lista2")
function cad_funcionario() {

    if (nome.value.trim() && cpf.value.trim() && salario.value.trim() && data.value.trim() && funcao.value.trim()) {
        if (/^[A-Za-zÀ-ý\s]+$/.test(nome.value)) {
            if (/^\d{11}$/.test(cpf.value)) {
                let achou = false
                for (let c of funcionarios) {
                    if (c.cpf == cpf.value)
                        achou = true
                }
                if (!achou) {
                    if (salario.value > 0) {

                        const funcionario = {
                            nome: nome.value,
                            cpf: cpf.value,
                            salario: salario.value,
                            data: data.value,
                            funcao: funcao.value,
                            status: "ativo"
                        }

                        funcionarios.push(funcionario)

                        localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                        alert(funcionario.nome +  " foi cadastrado(a)")
                    } else {
                        alert("salario deve ser acima de 0 !!!")
                    }
                } else {
                    alert(" Cpf ja cadastrado")
                }
            } else {
                alert(" cpf invalido")
            }
        } else {
            alert(" nome apenas com letras ")
        }
    } else {
        alert(" todos os campos devem estar preenchidos!!!")
    }
}

function Novo_salario() {

    let achou = false
    for (let buscar of funcionarios) {
        if (buscar.cpf == cpf_novo.value) {

            if (salario_novo.value.trim().length > 0) {

                if (Number(salario_novo.value) > Number(buscar.salario)) {

                    buscar.salario = salario_novo.value

                    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                    alert("Salario atualizado com sucesso!")

                    achou = true
                    break
                } else {
                    achou = true
                    alert(" o salario deve ser maior que o anterior")
                }
            }
        }
    }
    if (!achou) {
        alert("Cpf não encontrado!")
    }
}

function Demitir() {
    let i = -1,
        achou = false
    if (cpf_demissao.value) {
        for (let buscar of funcionarios) {
            i++
            if (buscar.cpf == cpf_demissao.value) {
                console.log("entrou")
                achou = true
            }
            if (achou) {
                buscar.status = "Demitido"
                console.log(funcionarios)
                localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                alert("Funcionario demitido com sucesso!")
                return
            }
        }
    } else {
        alert("Preencha todos o campos!")
        return
    }
    alert("Cliente não encontrado!")
}

function buscar() {
    let achou = false
    for (let buscar of funcionarios) {
        if (buscar.cpf == cpf_listar.value) {
            listar_ativos()
             listar_demitidos()
            achou = true
        
        }
    }
    if (!achou) {
        alert("Cpf não encontrado!")
    }

}

function listar_ativos() {
    lista.innerHTML = "lista"
    for (let f of funcionarios) {

        if (f.status === "ativo"){
        lista.innerHTML += `<p>Nome: ${f.nome} | CPF: ${f.cpf} | status:: ${f.status}</p>`
        }
    }
}
function listar_demitidos() {
    lista2.innerHTML = "Demitido"
    for (let f of funcionarios) {
        
        if (f.status === "Demitido"){
        lista2.innerHTML += `<p>Nome: ${f.nome} | CPF: ${f.cpf} | status:: ${f.status}</p>`
        }
    }
}