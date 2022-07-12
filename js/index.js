
let usdt = document.getElementsByClassName("usdt")[0]
let cambio = document.getElementsByClassName('cambio')[0]
let spread = document.getElementsByClassName('spread')[0]
let comision = document.getElementsByClassName('comision')[0]

let spread_per = document.getElementsByClassName('spread_per')[0]
let comision_per = document.getElementsByClassName('comision_per')[0]

let mxn = document.getElementsByClassName('mxn')[0]
let usd = document.getElementsByClassName('usd')[0]

let enable_comision = document.getElementById("comision")
let enable_spread = document.getElementById("spread")

let cambio_precio = 0

spread_per.value = 3
comision_per.value = 2

let spread_porcentaje = spread_per.value/100
let comision_porcentaje = comision_per.value/100

enable_comision.addEventListener('change',()=>{
    if(enable_comision.checked === false){
        comision_per.disabled = true
    }else{
        comision_per.disabled = false
    }
})

enable_spread.addEventListener('change',()=>{
    if(enable_spread.checked === false){
        spread_per.disabled = true
    }else{
        spread_per.disabled = false
    }
})

spread_per.addEventListener('change',()=>{
    calcular()
})

comision_per.addEventListener('change',()=>{
    calcular()
})

usdt.addEventListener('change',()=>{
    calcular()
})


function calcular(){

    spread_porcentaje = spread_per.value/100
    comision_porcentaje = comision_per.value/100

    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=mxn").then(response =>{
        cambio_precio = response.data.tether.mxn
        cambio.value = cambio_precio*(1+.05)
        spread.value = (usdt.value * spread_porcentaje).toFixed(2)
        comision.value = (usdt.value * comision_porcentaje).toFixed(2)
        usd_total = Number(usdt.value) + Number(spread.value) + Number(comision.value)
        mxn_total = (Number(usdt.value) + Number(spread.value) + Number(comision.value))*Number(cambio.value)

        mxn.textContent = mxn_total.toFixed(2)
        usd.textContent = usd_total.toFixed(2)
    })
}
