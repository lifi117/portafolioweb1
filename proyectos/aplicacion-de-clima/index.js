window.addEventListener('load',()=>{
    let lon 
    let lat 
    
    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperaturadescripcion')

    let Ubicacion = document.getElementById('ubicacion')
    let imagenAnimada = document.getElementById('imagenAnimado')

    let vientoVelocidad = document.getElementById('vientovelocidad')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            //console.log(posicion.coords.latitude)
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            //ubicacion actual
            const url = `https://api.openweathermap.org/data/2.5/weather?lang=es&unit=metric&lat=${lat}&lon=${lon}&appid=042cd8ce0961b18aae12c6a2f3feec7f`


            //ubicacion por ciudad
            //const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&unit=metric&appid=042cd8ce0961b18aae12c6a2f3feec7f`
            console.log(url)

            fetch(url)
            .then (Response => {return Response.json()})
            .then (data =>{
                let temp = Math.round(data.main.temp - 273)
                temperaturaValor.textContent= `${temp} °C`

                
                let desc = data.weather[0].description
                temperaturadescripcion.textContent= `${desc}`


                Ubicacion.textContent= data.name
                
                vientovelocidad.textContent = `${data.wind.speed} m/s`
                //console.log(data.wind.speed)
                
            })


            .catch(error=>{
                console.log(error)
            })
        })
    }
      
})