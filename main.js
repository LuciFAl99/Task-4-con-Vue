const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            valorBusqueda: '',
            categorias: [],
            eventos: [],
            checked: [],
            eventosFiltrados: [],
            cDate: [],
            details: []
    
        };
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(data => {

                this.cDate = data.currentDate
                this.eventos = data.events.filter(evento => evento.category)
                this.eventosFiltrados = data.events.filter(evento => evento.category)
                this.categorias = [... new Set(data.events.filter(evento => evento.category).map(evento => evento.category))]
                const params = new URLSearchParams(location.search)
                const id = params.get("id")
                this.details = data.events.find(evento => evento._id == id);


            })
            .catch(err => {
                console.log('entro en el catch')
            })
    },

    computed: {
     
        filtro() {
            let filtradoBusqueda = this.eventos.filter (evento => evento.name.toLowerCase().includes(this.valorBusqueda.toLowerCase()))
            let filtradoCheck = filtradoBusqueda.filter (evento => this.checked.includes(evento.category) || this.checked.length == 0)
           this.eventosFiltrados = filtradoCheck
        },
   
       
    },
})

app.mount('#app')