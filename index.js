const cepInput = document.querySelector('.cep-input')
const cepButton = document.querySelector('.cep-button')
const divResultado = document.querySelector('.resultado')
cepButton.addEventListener('click', () => {
    const fetchApi = async () => {
        try {
            Swal.fire({
                title: "Aguarde...",
                text: "Estamos buscando o local",
                icon: "info",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepInput.value}`)

            if (!res.ok) {
                throw new Error('CEP não encontrado')
            }


            const data = await res.json()
            Swal.close()

            divResultado.innerHTML = 
            `
                <p data-aos="zoom-in" data-aos-duration="1600">Rua: ${data.street}</p>
                <p data-aos="zoom-in" data-aos-duration="1900">Bairro: ${data.neighborhood}</p>
                <p data-aos="zoom-in" data-aos-duration="2200">Cidade: ${data.city}</p>
                <p data-aos="zoom-in" data-aos-duration="2500">Estado: ${data.state}</p>
            `
            

            console.log(data)
        } catch (err) {
            Swal.fire('Erro', err.message, 'error')
            console.error(err.message)
        }


    }
    fetchApi()

})
