
let usdt = document.getElementsByClassName("usdt")[0]
let cambio = document.getElementsByClassName('cambio')[0]
let spread = document.getElementsByClassName('spread')[0]
let comision = document.getElementsByClassName('comision')[0]

let mxn = document.getElementsByClassName('mxn')[0]
let usd = document.getElementsByClassName('usd')[0]


let cambio_precio = 0
let spread_procentaje = 0.03
let comision_procentaje = 0.02

usdt.addEventListener('change',()=>{
    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=mxn").then(response =>{
        cambio_precio = response.data.tether.mxn
        cambio.value = cambio_precio*(1+.05)
        spread.value = (usdt.value * spread_procentaje).toFixed(2)
        comision.value = (usdt.value * comision_procentaje).toFixed(2)
        usd_total = Number(usdt.value) + Number(spread.value) + Number(comision.value)
        mxn_total = (Number(usdt.value) + Number(spread.value) + Number(comision.value))*Number(cambio.value)

        mxn.textContent = mxn_total.toFixed(2)
        usd.textContent = usd_total.toFixed(2)
    })
})

