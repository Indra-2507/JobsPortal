// Getting elements from DOM
const $ = (selector) => document.querySelector(selector)

// Show and hide elements
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")
const cleanContainer = (selector) => $(selector).innerHTML = ""

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

//get information
const getJobs = () => {
    fetch(`https://6487a592beba62972790de96.mockapi.io/Jobs`)
        .then(res => res.json())
        .then(jobs => renderJobs(jobs))
}


const renderJobs = (jobs) => {
    showElement("#spinner")
    if (jobs) {
        //cleanContainer("#characters-container")
        setTimeout(() => {
            hideElement("#spinner")
            for (const { id, name, description, salary, image,location } of jobs) {
                $("#renderCard").innerHTML += `
                <div class="border-y-indigo-900 border-2 rounded-md w-2/5 m-2 p-2 grid grid-rows-1 bg-[url('/assets/image.jpg')]">
                <img src="" alt="">${image}
                <h2 class="text-center py-2">${name}</h2>
                <p class="text-sm py-2"> ${description} </p>
                <div class=" text-start text-xs py-2">
                    <span class="bg-indigo-400 rounded-md"> ${salary}</span>
                    <span class="bg-indigo-400 rounded-md"> ${location}</span>
                </div>
                <button class="bg-orange-400 rounded-md px-2">See details</button>
            </div>
                `
            }
        }, 2000)
    }
}

window.addEventListener("load", () => {
    getJobs()
})

// const jobs=
// [
//     {
//       "name": "Drummer",
//       "image": "image 1",
//       "description": "Drummer requiered for Rock band",
//       "location": "Argntina",
//       "category": "Musician",
//       "experience": "3 years of experience",
//       "benefits": {
//         "vacations": "3 weeks",
//         "travel costs": "paid by the company"
//       },
//       "salary": 200000,
//       "long_term": false,
//       "instruments": [
//         "drummer",
//         "cymbals"
//       ],
//       "id": "1"
//     },
//     {
//       "name": "Guitarist",
//       "image": "image 2",
//       "description": "Guitarist wanted for Metal band",
//       "location": "Germany",
//       "category": "Musician",
//       "experience": "5 years of experience",
//       "benefits": {
//         "vacations": "4 weeks",
//         "travel costs": "reimbursed by the company"
//       },
//       "salary": 250000,
//       "long_term": true,
//       "instruments": [
//         "electric guitar",
//         "acoustic guitar"
//       ],
//       "id": "2"
//     },
        //     {
//       "name": "name 3",
//       "image": "image 3",
//       "description": "description 21",
//       "location": "location 21",
//       "category": "category 21",
//       "seniority": "seniority 21",
//       "benefits": {},
//       "salary": 29,
//       "long_term": false,
//       "instruments": [],
//       "id": "3"
//     }
//     {
//       "name": "Bassist",
//       "image": "image 5",
//       "description": "Talented bassist needed for Jazz fusion band",
//       "location": "France",
//       "category": "Musician",
//       "experience": "4 years of experience",
//       "benefits": {
//         "vacations": "2 weeks",
//         "travel costs": "provided by the band"
//       },
//       "salary": 180000,
//       "long_term": true,
//       "instruments": [
//         "bass guitar"
//       ],
//       "id": "4"
//     },
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



