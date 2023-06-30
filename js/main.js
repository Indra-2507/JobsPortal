// Getting elements from DOM
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
// Show and hide elements
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")
const cleanContainer = (selector) => $(selector).innerHTML = ''
const showElements = (selectors) => {
    for (const selector of selectors){
        $(selector).classList.remove("hidden")
    }
}
const hideElements = (selectors) => {
    for (const selector of selectors){
        $(selector).classList.add("hidden")
    }
}

let isSubmit = false

//Fetchs
const getJobs = (params) => {
   fetch(`http://6487a592beba62972790de96.mockapi.io/jobs/?${params ? `${params}` : ""}`)
        .then(res => res.json())
        .then(jobs => renderJobs(jobs)
        )
}

const getDetails = (jobId) => {
    fetch(`http://6487a592beba62972790de96.mockapi.io/jobs/${jobId}`)
    .then(res => res.json())
    .then(jobs => renderJobInformation(jobs))
}

const getForm =(jobId = "")=>{
        fetch(`http://6487a592beba62972790de96.mockapi.io/jobs/${jobId}`)
        .then(resp =>resp.json())
        .then(jobs => {
            if (jobId === "") {
                renderJobs(jobs)
            } else 
            {
                populateForm(jobs)
            }
        })
}

const newJob =() =>{
     fetch(`http://6487a592beba62972790de96.mockapi.io/jobs`, {
    method: "POST",
    headers: {
        'Content-Type': 'Application/json'
    },
    body: JSON.stringify(saveJob())
})
}

const editJob =(jobId)=>{
        fetch(`http://6487a592beba62972790de96.mockapi.io/jobs/${jobId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(saveJob(jobId))
        }).finally(() => window.location.reload())
}

const deleteJob =(jobId) =>{
    fetch(`http://6487a592beba62972790de96.mockapi.io/jobs/${jobId}`, {
        method: "DELETE"
    }).finally(() => window.location.reload())
}

//Render functions
const renderJobs = (jobs) => {
    cleanContainer("#render-card")
   showElement("#spinner")
    if (jobs) { 
setTimeout(() => {
            hideElement("#spinner")
            for (const { id, name, information, style, image,location, instrument } of jobs) {
                $("#render-card").innerHTML += `
                <div class="border-y-[#a2825c] border-2 rounded-md w-2/5 m-2 p-2 grid grid-rows-1 bg-gradient-to-r from-[#f5da7a] to-[#88d3ab]">
                <img src="${image}" alt="">
                <h2 id="jobsName" name="${name}" class="text-center py-2 font-bold">${name}</h2>
                <p class="text-sm py-2"> ${information} </p>
                <div class=" text-start py-2">
                    <span class="bg-[#88d3ab] rounded px-2"> ${style}</span>
                    <span class="bg-gradient-to-r from-[#88d3ab] to-[#f5da7a] rounded px-2"> ${location}</span>
                    <span class="bg-[#f5da7a] rounded px-2"> ${instrument}</span>
                </div>
                <button id="btn-details" onclick="seeDetails('${id}')" class="bg-[#ff985e] my-4 py-2 w-28 font-bold rounded mx-auto text-[#f9fad2] active:bg-[#f9fad2] active:text-[#ff985e]">See details</button>
            </div>
                `
            }
    }, 2000)
    }
}

const renderJobInformation = ({id, name, description, image, benefits, long_term, instruments, salary }) =>{
       hideElement("#render-card") 
        showElement("#spinner")
    setTimeout(() => { 
       hideElement("#spinner")
        showElement("#renderJobInformation")
                $("#renderJobInformation").innerHTML += `
                <div class="text-[#5a1e4a] text-center">
                <img src="${image}" alt="" class="p-2 mx-auto ">
                <h2 class="text-center py-2 text-2xl font-bold">${name}</h2>
                <p class="py-2"> ${description} </p>
                <h3 class="text-xl font-bold">Benefits</h3>
                <p class=" py-2 text-[#c2412d]"> Vacations: ${benefits.vacations} </p>
                <p class="py-2 text-[#c2412d] "> Travel costs: ${benefits.costs} </p>
                <p class="py-2"> ${instruments} </p>
                <div class="text-start my-4">
                    <span class="bg-[#5a1e4a] text-[#f9fad2] rounded p-2"> Salary :$${salary}</span>
                    <span class="bg-[#5a1e4a] text-[#f9fad2] rounded p-2"> Long term: ${long_term}</span>
                </div>
                <div class="my-6 ">
                <button id="edit-btn" onclick="editJobs('${id}')" data-id="${id}" class="rounded-lg bg-[#f5da7a] m-4 py-2 w-28 font-bold">Edit <i class="fa-solid fa-pencil"></i></button>
                <button id="delete-btn" onclick="deleteJobs('${id}')" data-id="${id}" class="rounded-lg bg-[#c2412d] m-4 py-2 w-28 font-bold text-[#f5da7a]">Delete <i class="fa-solid fa-trash"></i></button>
                </div>
                    `
    } ,
    2000)
}

const saveJob = () => {
    return {
        name: $("#name").value,
        image: $("#image").value,
        information: $("#information").value,
        location: $("#locationForm").value,
        instrument: $("#instrumentForm").value,
        style: $("#styleForm").value,
        // benefits: {
        //     $("#vacations").value,
        //     $("#costs").value },
        salary : $("#salary").value,
        long_term: $("#long_term_no").value,
        long_term: $("#long_term_yes").value,
        instruments : [
            $("#instrument1").value,
            $("#instrument2").value,
            $("#instrument3").value
        ],
        description: $("#description").value,
    }
}
const populateForm =({name, image, information, location, instrument, style, benefits, salary, long_term_no, long_term_yes, instruments, description})=>{
    $("#name").value = name
    $("#image").value = image
    $("#information").value = information
    $("#locationForm").value =location
    $("#instrumentForm").value =instrument
    $("#styleForm").value =style
    $("#vacations").value= benefits
    $("#costs").value = benefits
    $("#salary").value = salary
    $("#long_term_no").value =long_term_no
    $("#long_term_yes").value= long_term_yes
    $("#instrument1").value = instruments,
    $("#instrument2").value = instruments,
    $("#instrument3").value = instruments,
    $("#description").value = description    
}


const validateForm=() => {
    const name = $("#name").value.trim()
    const image = $("#image").value.trim()
    const information = $("#information").value.trim()
    const locationForm = $("#locationForm").value.trim()
    const instrumentForm = $("#instrumentForm").value.trim()
    const styleForm = $("#styleForm").value.trim()
    const vacations = $("#vacations").value.trim()
    const costs = $("#costs").value.trim()
    const salary = $("#salary").valueAsNumber
    const long_term = $("#long_term").value
    const instrument1 = $("#instrument1").value.trim()
    const description = $("#description").value.trim()

    if(name === "") {
        showElement(".name-error")
       $("#name").focus()
    } else {
        hideElement(".name-error")
        $("#name").focus()    
    }
    if(information === "") {
        showElement(".information-error")
        $("#information").focus() 
    } else {
        hideElement(".information-error")
        $("#information").focus()    
    }
    if(image === "") {
        showElement(".image-error")
        $("#image").focus() 
    } else {
        hideElement(".image-error")
        $("#image").focus()    
    }
    if(locationForm === "") {
        showElement(".location-error")
        $("#locationForm").focus() 
    } else {
        hideElement(".location-error")
        $("#locationForm").focus()    
    }
    if(instrumentForm === "") {
        showElement(".instrument-error")
        $("#instrumentForm").focus()
    } else {
        hideElement(".instrument-error")
        $("#instrumentForm").focus()    
    }
    if(styleForm === "") {
        showElement(".style-error")
        $("#styleForm").focus() 
    } else {
        hideElement(".style-error")
        $("#styleForm").focus()    
    }
    if(vacations === "") {
        showElement(".vacations-error")
        $("#vacations").focus() 
    } else {
        hideElement(".vacations-error")
        $("#vacations").focus()    
    }
    if(costs === "") {
        showElement(".costs-error")
        $("#costs").focus() 
    } else {
        hideElement(".costs-error")
        $("#costs").focus()    
    }
    if(isNaN(salary)) {
        showElement(".salary-error")
        $("#salary").focus() 
    } else {
        hideElement(".salary-error")
        $("#salary ").focus()    
    }
    if(long_term === "") {
        showElement(".long_term-error")
        $("#long_term ").focus() 
    } else {
        hideElement(".long_term-error")
        $("#long_term ").focus()    
    }
    if(instrument1 === "") {
        showElement(".instrument1-error")
        $("#instrument1").focus() 
    } else {
        hideElement(".instrument1-error")
        $("#instrument1").focus()    
    }
    if(description === "") {
        showElement(".description-error")
        $("#description").focus() 
    } else {
        hideElement(".description-error")
        $("#description").focus()    
    }
    return name !== "" && !isNaN(salary) && information !== "" && image !== "" &&  locationForm !== "" && instrumentForm !== "" && styleForm !== "" && vacations !== "" && costs !== "" && long_term !== "" && instrument1 !== "" && description !== "" 
}

//Filters functions

const getParams = (key,selector) => {
    const params = {
       [key]: $(selector).value
    }
    const url = new URLSearchParams(params).toString()
    return url
}

const locationfunction = () =>{
    $("#location").value
    $("#instrument").disabled = true
    $("#style").disabled =true
   getJobs(getParams("location","#location"))
}   

const instrumentfunction = () =>{
    $("#instrument").value
    $("#location").disabled =true
    $("#style").disabled =true
   getJobs(getParams("instrument","#instrument"))
}   

const stylefunction =() =>{
    $("#style").value
    $("#location").disabled =true
    $("#instrument").disabled = true
    getJobs(getParams("style","#style"))

}


//Data functions
const deleteJobs =()=>{
    hideElement("#renderJobInformation")
    showElement("#modal-window")
     const jobId = $("#delete-btn").getAttribute("data-id")
    const name = $("#jobsName").getAttribute("name")
    $("#modal-delete").setAttribute("data-id", jobId) 
    $(".modal-text").innerHTML = name
    modalDelete(jobId)
}

const editJobs= ()=>{
hideElements(["#renderJobInformation" , ".submit-btn"])
showElements(["#new-job",".edit-form"])
    const jobId = $("#edit-btn").getAttribute("data-id")
    $(".edit-form").setAttribute("data-id", jobId)
    getForm(jobId)
    isSubmit = false  
}  

const seeDetails = (jobId) =>{
    hideElement("#search-form")
    getDetails(jobId)
}

//Events functions
$("#btn-clear").addEventListener("click", (e)=>{
    e.preventDefault
    $("#search-form").reset()
})

 const modalDelete = (jobId) =>{
    $("#modal-delete").addEventListener("click", ()=>{
        deleteJob(jobId)
        hideElement("#modal-window")
    })
}

$("#btn-create").addEventListener("click", ()=>{
    showElement("#spinner")
    setTimeout(() => {
        hideElements(["#btn-create","#search-form", "#render-card", "#renderJobInformation", "#spinner"])
        showElement("#new-job")
        isSubmit = true     
 }, 2000)   
})

$("#new-job").addEventListener("submit", (e)=>{
    e.preventDefault()
    if(validateForm()){
        showElement("#spinner")
        hideElement("#spinner")
        hideElement("#search-form")
        if (isSubmit) {
            newJob()
        } else {
            const jobId = $(".edit-form").getAttribute("data-id")
            editJob(jobId)
            hideElement("#new-job") 
        }
        showElement("#succesfull-alert")
        $("#new-job").reset()
        setTimeout(() => {
            hideElement("#succesfull-alert");
        }, 1500);
    }   
})

$("#modal-cancel").addEventListener("click", ()=>{
    hideElement("#modal-window")
    showElement("#render-card")
    showElement("#search-form")
    renderJobs(getJobs())
})

window.addEventListener("load", () => {
    getJobs()
})

// [
    // {
    //  "name": "Vocalista",
    //  "image": "https://img.freepik.com/vector-gratis/personas-cantando_52683-4073.jpg?w=740&t=st=1687731569~exp=1687732169~hmac=537ff758e0fab9aaa516f9b0faee505c0382b8002bc88b33974acb5f364ea5c1",
    //  "information": "se busca vocalista para banda de pop",
    //  "location": "Argentina",
    //  "instrument": "Percussion",
    //  "style": "Classical",
    //  "benefits": "pagados por la empresa",
    //  "salary": "99994",
    //  "long_term": "false",
    //  "instruments": [
    //   "",
    //   "",
    //   ""
    //  ],
    //  "description": "buscamos a alguien proactivo con ganas de crecer en la muscia",
    //  "id": "1"
    // },
    // {
    //  "name": "vocalista",
    //  "image": "https://img.freepik.com/vector-gratis/ilustracion-concepto-abstracto-musica-popular-gira-cantantes-populares-industria-musica-pop-artista-top-chart-servicio-produccion-bandas-musicales-estudio-grabacion-libro-eventos_335657-3656.jpg?size=626&ext=jpg&ga=GA1.2.1739721551.1669313569&semt=ais",
    //  "information": "para banda de Jazz",
    //  "location": "Brazil",
    //  "instrument": "Electronic",
    //  "style": "Pop",
    //  "benefits": "no",
    //  "salary": "36666",
    //  "long_term": "false",
    //  "instruments": [
    //   ",,",
    //   ",,",
    //   ",,"
    //  ],
    //  "description": "honsns jajajja dhsjd",
    //  "id": "2"
    // },
    // {
    //  "name": "banda de blues",
    //  "image": "https://img.freepik.com/vector-premium/nina-bonita-sostiene-microfono-cantando_73637-1003.jpg?size=626&ext=jpg&ga=GA1.1.1739721551.1669313569&semt=ais",
    //  "information": "Bluessssss",
    //  "location": "Chile",
    //  "instrument": "String",
    //  "style": "Blues",
    //  "benefits": "3666",
    //  "salary": "95",
    //  "long_term": "false",
    //  "instruments": [
    //   "bajo,guitarra,piano",
    //   "bajo,guitarra,piano",
    //   "bajo,guitarra,piano"
    //  ],
    //  "description": "hola como estas, estoy escribiendo mucho texto para ver como se ve la card con mas informacion.",
    //  "id": "3"
    // },
    // {
    //  "name": "guitarrista",
    //  "image": "https://img.freepik.com/vector-premium/nina-bonita-sostiene-microfono-cantando_73637-1003.jpg?size=626&ext=jpg&ga=GA1.1.1739721551.1669313569&semt=ais",
    //  "information": "se busca rock",
    //  "location": "Uruguay",
    //  "instrument": "Wind",
    //  "style": "Rock",
    //  "benefits": "[object Object]",
    //  "salary": "42",
    //  "long_term": "false",
    //  "instruments": [
    //   "guitarra",
    //   "flauta",
    //   ""
    //  ],
    //  "description": "description 4",
    //  "id": "4"
    // }
//    ]

// pics 
// cantantes:
// https://img.freepik.com/vector-gratis/manos-microfonos-palmas-humanas-sosteniendo-microfonos_107791-9600.jpg?w=740&t=st=1687819828~exp=1687820428~hmac=149acab0215a4ac4b2d2b4d5444b3977a6054ba663a16570fb5ac65f0722f357

// guitarrista
// https://img.freepik.com/vector-gratis/set-guitarras-acusticas-electricas_1284-52287.jpg?w=740&t=st=1687819967~exp=1687820567~hmac=65024021ecbacadc6f68bca9a5d5cfa73f984f9ef6946d7098cb4f19a6716213

//viento
//https://img.freepik.com/vector-premium/conjunto-varios-instrumentos-perfume-gaita-trompa-acordeon-flauta-ilustracion-sobre-fondo-blanco_223337-1783.jpg?w=740

//bateria
//https://img.freepik.com/vector-gratis/bateria-dibujada-mano_1379-14.jpg?w=740&t=st=1687820112~exp=1687820712~hmac=fdf03fb20e0bc1546b8cf5c2897f840b823427472a33796d8d284ec560ac9975

//instrumentos de percusion
//https://img.freepik.com/vector-gratis/coleccion-instrumentos-musicales-dibujados-mano_23-2149612643.jpg?w=740&t=st=1687820157~exp=1687820757~hmac=1f9b7e62fcd15b7482112cc68598c1d064f7b9ffec8469b71f90db9f76c6c279

//instrumentos de cuerda
//https://img.freepik.com/vector-premium/conjunto-instrumentos-musicales-cuerda-pulsada_273525-744.jpg?w=740

//electronicos
//https://img.freepik.com/vector-gratis/diseno-equipamiento-misica_1040-1048.jpg?w=740&t=st=1687820258~exp=1687820858~hmac=0097cb911e9274708a900543c9d82c56d301dde7da4284bdab05776b6c09c989
//https://img.freepik.com/vector-gratis/equipos-profesionales-estudio-musica_23-2147568449.jpg?w=740&t=st=1687820310~exp=1687820910~hmac=1654cfee9131d276c8f6f17b5f9d9e107f6114b996403b6dd04dead7a359c901


// const jobs=
// [
    // {
    //   "name": "Drummer",
    //   "image": "https://img.freepik.com/vector-gratis/bateria-dibujada-mano_1379-14.jpg?size=626&ext=jpg&ga=GA1.1.1739721551.1669313569&semt=ais",
    //   "information": "Drummer  required for Rock band",
    //   "location": "Argentina",
    //   "instrument": "Percussion",
    //   "style": "Rock"   
    //   "experience": "3 years of experience",
    //   "benefits": {
    //     "vacations": "3 weeks",
    //     "costs": "paid by the company"
    //   },
    //   "salary": 200000,
    //   "long_term": false,
    //   "instruments": [
    //     "drummer",
    //     "cymbals"
    //   ],
    //  "description": "Buscamos baterista con experiencia en rock internacional. Excelente clima laboral, trabajo solo los dias viernes y sabados. Banda consolidada"
    //   "id": "1"
    // },
    // {
    //   "name": "Guitarist",
    //   "image": "https://img.freepik.com/vector-gratis/set-guitarras-acusticas-electricas_1284-52287.jpg?size=626&ext=jpg&ga=GA1.2.1739721551.1669313569&semt=ais",
    //   "information": "Guitarist wanted for Metal band",
    //   "location": "Brazil",
    //   "instrument_type": "string",
    //   "style": "Rock" 
    //   "experience": "5 years of experience",
    //   "benefits": {
    //     "vacations": "4 weeks",
    //     "travel costs": "reimbursed by the company"
    //   },
    //   "salary": 250000,
    //   "long_term": true,
    //   "instruments": [
    //     "electric guitar",
    //     "acoustic guitar"
    //   ],
    //  "description": " We are looking for an experiment guitarist for our metal band. "
    //   "id": "2"
    // },
    //         {
    //   "name": "Vocalist",
    //   "image": "https://img.freepik.com/vector-gratis/personas-cantando_52683-4073.jpg?w=740&t=st=1687731569~exp=1687732169~hmac=537ff758e0fab9aaa516f9b0faee505c0382b8002bc88b33974acb5f364ea5c1",
    //   "information": "Cantante femenino para banda Pop",
    //   "location": "Chile",
    //   "style": "vocals",
    //   "experience": "non  required",
    //   "benefits": {
    //     "vacations": "1 weeks",
    //     "travel costs": "reimbursed by the company"
    //   },
    //   "salary": 10000,
    //   "long_term": true,
    //   "instruments": [
    //     "vocals"
    //   ],
    //  "description": " Buscamos cantante femenina para bamda de Pop en formacion, requerimos un alto compromiso "
    //   "id": "3"
    // }
    // {
    //   "name": "Bassist",
    //   "image": "https://img.freepik.com/vector-gratis/vector-silueta-guitarra_23-2147495879.jpg?w=740&t=st=1687731538~exp=1687732138~hmac=aaa2640d5cdada085ad09149385e89b494ec7ee763884236ec9c8b94df186357",
    //   "information": "Talented bassist needed for Jazz fusion band",
    //   "location": "Colombia",
    //   "style": "jazz",
    //   "experience": "1 years of experience",
    //   "benefits": {
    //     "vacations": "2 weeks",
    //     "travel costs": "provided by the band"
    //   },
    //   "salary": 180000,
    //   "long_term": true,
    //   "instruments": [
    //     "bass guitar"
    //   ],
    //  "description": " Bajista para banda de jazz "
    //   "id": "4"
    // },
//     {
//       "name": "Vocalist",
//       "image": "image 6",
//       "description": "Powerful vocalist wanted for Hard Rock band",
//       "location": "United Kingdom",
//       "category": "Musician",
//       "experience": "6 years of experience",
//       "benefits": {
//         "vacations": "3 weeks",
//         "travel costs": "covered by the band"
//       },
//       "salary": 220000,
//       "long_term": true,
//       "instruments": [
//         "vocals"
//       ],
//       "id": "5"
//     },
//     {
//       "name": "Keyboardist",
//       "image": "image 7",
//       "description": "Experienced keyboardist needed for Progressive Metal band",
//       "location": "Sweden",
//       "category": "Musician",
//       "experience": "7 years of experience",
//       "benefits": {
//         "vacations": "4 weeks",
//         "travel costs": "reimbursed by the company"
//       },
//       "salary": 260000,
//       "long_term": true,
//       "instruments": [
//         "keyboard",
//         "synthesizer"
//       ],
//       "id": "6"
//     },
//     {
//       "name": "Violinist",
//       "image": "image 8",
//       "description": "Talented violinist wanted for Classical orchestra",
//       "location": "Italy",
//       "category": "Musician",
//       "experience": "10 years of experience",
//       "benefits": {
//         "vacations": "5 weeks",
//         "travel costs": "covered by the orchestra"
//       },
//       "salary": 300000,
//       "long_term": true,
//       "instruments": [
//         "violin"
//       ],
//       "id": "7"
//     },
//     {
//       "name": "Saxophonist",
//       "image": "image 9",
//       "description": "Skilled saxophonist needed for Jazz ensemble",
//       "location": "United States",
//       "category": "Musician",
//       "experience": "3 years of experience",
//       "benefits": {
//         "vacations": "2 weeks",
//         "travel costs": "paid by the company"
//       },
//       "salary": 150000,
//       "long_term": false,
//       "instruments": [
//         "saxophone"
//       ],
//       "id": "8"
//     },
//     {
//       "name": "Pianist",
//       "image": "image 10",
//       "description": "Versatile pianist wanted for Pop band",
//       "location": "Canada",
//       "category": "Musician",
//       "experience": "5 years of experience",
//       "benefits": {
//         "vacations": "3 weeks",
//         "travel costs": "provided by the band"
//       },
//       "salary": 200000,
//       "long_term": true,
//       "instruments": [
//         "piano"
//       ],
//       "id": "9"
//     },
//     {
//       "name": "Lead Vocalist",
//       "image": "image 11",
//       "description": "Charismatic lead vocalist needed for Cover band",
//       "location": "Australia",
//       "category": "Musician",
//       "experience": "8 years of experience",
//       "benefits": {
//         "vacations": "4 weeks",
//         "travel costs": "covered by the band"
//       },
//       "salary": 240000,
//       "long_term": true,
//       "instruments": [
//         "vocals"
//       ],
//       "id": "10"
//     },
//     {
//       "name": "Trumpeter",
//       "image": "image 12",
//       "description": "Talented trumpeter wanted for Big Band",
//       "location": "United States",
//       "category": "Musician",
//       "experience": "6 years of experience",
//       "benefits": {
//         "vacations": "3 weeks",
//         "travel costs": "reimbursed by the company"
//       },
//       "salary": 180000,
//       "long_term": true,
//       "instruments": [
//         "trumpet"
//       ],
//       "id": "11"
//     },
//     {
//       "name": "Bandleader",
//       "image": "image 13",
//       "description": "Experienced bandleader needed for Wedding band",
//       "location": "United Kingdom",
//       "category": "Musician",
//       "experience": "10 years of experience",
//       "benefits": {
//         "vacations": "5 weeks",
//         "travel costs": "paid by the company"
//       },
//       "salary": 280000,
//       "long_term": true,
//       "instruments": [
//         "various instruments"
//       ],
//       "id": "12"
//     },
//     {
//       "name": "Cellist",
//       "image": "image 14",
//       "description": "Skilled cellist wanted for Chamber orchestra",
//       "location": "Germany",
//       "category": "Musician",
//       "experience": "4 years of experience",
//       "benefits": {
//         "vacations": "2 weeks",
//         "travel costs": "covered by the orchestra"
//       },
//       "salary": 200000,
//       "long_term": true,
//       "instruments": [
//         "cello"
//       ],
//       "id": "13"
//     },
//     {
//       "name": "Keyboardist",
//       "image": "image 15",
//       "description": "Creative keyboardist wanted for Experimental band",
//       "location": "Japan",
//       "category": "Musician",
//       "experience": "3 years of experience",
//       "benefits": {
//         "vacations": "2 weeks",
//         "travel costs": "covered by the band"
//       },
//       "salary": 180000,
//       "long_term": true,
//       "instruments": [
//         "keyboard",
//         "synthesizer"
//       ],
//       "id": "14"
//     },
//     {
//       "name": "Rhythm Guitarist",
//       "image": "image 16",
//       "description": "Talented rhythm guitarist needed for Punk band",
//       "location": "United States",
//       "category": "Musician",
//       "experience": "5 years of experience",
//       "benefits": {
//         "vacations": "3 weeks",
//         "travel costs": "reimbursed by the company"
//       },
//       "salary": 200000,
//       "long_term": true,
//       "instruments": [
//         "electric guitar",
//         "acoustic guitar"
//       ],
//       "id": "15"
//     },
//     {
//       "name": "Flutist",
//       "image": "image 17",
//       "description": "Versatile flutist wanted for Symphony orchestra",
//       "location": "France",
//       "category": "Musician",
//       "experience": "8 years of experience",
//       "benefits": {
//         "vacations": "4 weeks",
//         "travel costs": "covered by the orchestra"
//       },
//       "salary": 220000,
//       "long_term": true,
//       "instruments": [
//         "flute"
//       ],
//       "id": "16"
//     },
//     {
//       "name": "Backing Vocalist",
//       "image": "image 18",
//       "description": "Talented backing vocalist wanted for Pop/Rock band",
//       "location": "Canada",
//       "category": "Musician",
//       "experience": "3 years of experience",
//       "benefits": {
//         "vacations": "2 weeks",
//         "travel costs": "paid by the company"
//       },
//       "salary": 160000,
//       "long_term": false,
//       "instruments": [
//         "vocals"
//       ],
//       "id": "17"
//     },
//     {
//       "name": "Bassoonist",
//       "image": "image 19",
//       "description": "Skilled bassoonist wanted for Chamber ensemble",
//       "location": "Germany",
//       "category": "Musician",
//       "experience": "6 years of experience",
//       "benefits": {
//         "vacations": "3 weeks",
//         "travel costs": "provided by the ensemble"
//       },
//       "salary": 190000,
//       "long_term": true,
//       "instruments": [
//         "bassoon"
//       ],
//       "id": "18"
//     },
//     {
//       "name": "Lead Guitarist",
//       "image": "image 20",
//       "description": "Talented lead guitarist wanted for Blues band",
//       "location": "United States",
//       "category": "Musician",
//       "experience": "7 years of experience",
//       "benefits": {
//         "vacations": "4 weeks",
//         "travel costs": "reimbursed by the company"
//       },
//       "salary": 230000,
//       "long_term": true,
//       "instruments": [
//         "electric guitar"
//       ],
//       "id": "19"
//     },
//     {
//       "name": "Harmonica Player",
//       "image": "image 21",
//       "description": "Skilled harmonica player wanted for Folk band",
//       "location": "Ireland",
//       "category": "Musician",
//       "experience": "4 years of experience",
//       "benefits": {
//         "vacations": "2 weeks",
//         "travel costs": "covered by the band"
//       },
//       "salary": 170000,
//       "long_term": true,
//       "instruments": [
//         "harmonica"
//       ],
//       "id": "20"
//     },
//   ]



