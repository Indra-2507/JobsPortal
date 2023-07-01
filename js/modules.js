export const $ = (selector) => document.querySelector(selector)
export const $$ = (selector) => document.querySelectorAll(selector)

export const SEL ={
selectLocation: "#location",
selectInstrument: "#instrument",
selectStyle :"#style",
clearSelects: "#btn-clear",
searchForm: "#search-form",
crateJob: "#btn-create",
spinner: "#spinner",
renderCard: "#render-card",
renderDetails: "#renderDetails",
formNewJob: "#new-job",
submit: "submit",
succesfullAlert: "#succesfull-alert",
editForm: ".edit-form",
modalCancel: "#modal-cancel",
modalWindow: "#modal-window",
}

export const Utils = {
    cleanContainer: (selector) => $(selector).innerHTML = '',
    showElement: (selector) => $(selector).classList.remove("hidden"),
    hideElement: (selector) => $(selector).classList.add("hidden"),
    showElements : (selectors) => {
    for (const selector of selectors){
        $(selector).classList.remove("hidden")
    }
},
    hideElements: (selectors) => {
    for (const selector of selectors){
        $(selector).classList.add("hidden")
    }
},
    isSubmit: false
}

export const Methods = {
    getJobs: (params) => {
   fetch(`https://6487a592beba62972790de96.mockapi.io/jobs/?${params ? `${params}` : ""}`)
        .then(res => res.json())
        .then(jobs => Render.jobs(jobs)
        )
},
    getDetails: (jobId) => {
    fetch(`https://6487a592beba62972790de96.mockapi.io/jobs/${jobId}`)
    .then(res => res.json())
    .then(jobs => Render.details(jobs))
},
    getForm : (jobId = "")=>{
        fetch(`https://6487a592beba62972790de96.mockapi.io/jobs/${jobId}`)
        .then(resp =>resp.json())
        .then(jobs => {
            if (jobId === "") {
                Render.jobs(jobs)
            } else 
            {
                Render.populateForm(jobs)
            }
        })
},

    newJob : () =>{
     fetch(`https://6487a592beba62972790de96.mockapi.io/jobs`, {
    method: "POST",
    headers: {
        'Content-Type': 'Application/json'
    },
    body: JSON.stringify(Methods.saveJob())
})
}, 
    editJob : (jobId)=>{
        fetch(`https://6487a592beba62972790de96.mockapi.io/jobs/${jobId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(Methods.saveJob(jobId))
        }).finally(() => window.location.reload())
},
    deleteJob : (jobId) =>{
    fetch(`https://6487a592beba62972790de96.mockapi.io/jobs/${jobId}`, {
        method: "DELETE"
    }).finally(() => window.location.reload())
},
    saveJob: () => {
    const longTermRadio = $('input[name="long_term"]:checked');
    const longTermValue = longTermRadio ? longTermRadio.value : "";
    return {
        name: $("#name").value,
        image: $("#image").value,
        information: $("#information").value,
        location: $("#locationForm").value,
        instrument: $("#instrumentForm").value,
        style: $("#styleForm").value,
        benefits: 
            {
            vacations: $("#vacations").value,
            costs: $("#costs").value 
            },
        salary : $("#salary").value,
        long_term: longTermValue,
        instruments : [
            $("#instrument1").value,
            $("#instrument2").value,
            $("#instrument3").value
        ],
        description: $("#description").value,
    }
},
    getParams: (key,selector) => {
        const params = {
           [key]: $(selector).value
        }
        const url = new URLSearchParams(params).toString()
        return url
    }
}

export const Render = {
    populateForm: ({name, image, information, location, instrument, style, benefits, salary, long_term, instruments, description }) => {
    $("#name").value = name
    $("#image").value = image
    $("#information").value = information
    $("#locationForm").value =location
    $("#instrumentForm").value = instrument
    $("#styleForm").value = style
    $("#vacations").value = benefits.vacations
    $("#costs").value = benefits.costs
    $("#salary").value = salary
    const longTermRadio = $(`input[name='long_term'][value='${long_term}']`);
    if (longTermRadio !== null) {
        longTermRadio.checked = true;
    }
    $("#instrument1").value = instruments[0],
    $("#instrument2").value = instruments[1],
    $("#instrument3").value = instruments[2],
    $("#description").value = description    
},
    details: ({id, name, description, image, benefits, long_term, instruments, salary }) =>{
       Utils.hideElement("#render-card") 
        Utils.showElement("#spinner")
    setTimeout(() => { 
       Utils.hideElement("#spinner")
        Utils.showElement("#renderDetails")
                $("#renderDetails").innerHTML += `
                <div class="text-[#5a1e4a] text-center mx-auto mt-20 mb-8">
                <img src="${image}" alt="job image" class="p-4">
                <h2 class="text-center py-2 text-2xl font-bold">${name}</h2>
                <p class="py-2"> ${description} </p>
                <h3 class="text-xl font-bold">Benefits</h3>
                <p class=" py-2 text-[#c2412d]"> Vacations: ${benefits.vacations} </p>
                <p class="py-2 text-[#c2412d] "> Travel costs: ${benefits.costs} </p>
                <p class="py-2"> ${instruments} </p>
                <div class="text-start m-4">
                    <span class="bg-[#5a1e4a] text-[#f9fad2] rounded p-2"> Salary :$${salary}</span>
                    <span class="bg-[#5a1e4a] text-[#f9fad2] rounded p-2"> Long term: ${long_term}</span>
                </div>
                <div class="my-6 ">
                <button id="edit-btn" data-id="${id}" class="rounded-lg bg-[#f5da7a] m-4 py-2 w-28 font-bold">Edit <i class="fa-solid fa-pencil"></i></button>
                <button id="delete-btn" data-id="${id}" class="rounded-lg bg-[#c2412d] m-4 py-2 w-28 font-bold text-[#f5da7a]">Delete <i class="fa-solid fa-trash"></i></button>
                </div>
                    `
                $("#edit-btn").addEventListener("click", (e)=>{
                    e.preventDefault()
                        Utils.hideElements(["#renderDetails" , ".submit-btn"])
                        Utils.showElements(["#new-job",".edit-form"])
                            const jobId = $("#edit-btn").getAttribute("data-id")
                            $(".edit-form").setAttribute("data-id", jobId)
                            Methods.getForm(jobId)
                            Utils.isSubmit = false  
                })
                    for (const btn of $$("#delete-btn")){
                        btn.addEventListener("click", (e)=>{
                        e.preventDefault()
                        Utils.hideElement("#renderDetails")
                        Utils.showElement("#modal-window")
                        const jobId = $("#delete-btn").getAttribute("data-id")
                        $(".modal-text").innerHTML = name
                        Functions.modalDelete(jobId)
                })}         
    } ,
    2000)
},
    jobs :(jobs) => {
    Utils.cleanContainer("#render-card")
   Utils.showElement("#spinner")
    if (jobs) { 
setTimeout(() => {
            Utils.hideElement("#spinner")
            for (const { id, name, information, style, image,location, instrument } of jobs) {
                $("#render-card").innerHTML += `
                <div class="border-y-[#a2825c] border-2 rounded-md w-2/5 m-2 p-2 grid grid-rows-1 bg-gradient-to-r from-[#f5da7a] to-[#88d3ab] xl:w-1/4">
                <img src="${image}" alt="job image" class="p-4">
                <h2 id="jobsName" name="${name}" class="text-center py-2 font-bold">${name}</h2>
                <p class="text-sm py-2"> ${information} </p>
                <div class=" text-start py-2">
                    <span class="bg-[#88d3ab] rounded px-2"> ${style}</span>
                    <span class="bg-gradient-to-r from-[#88d3ab] to-[#f5da7a] rounded px-2"> ${location}</span>
                    <span class="bg-[#f5da7a] rounded px-2"> ${instrument}</span>
                </div>
                <button id="btn-details" data-id="${id}" class="bg-[#ff985e] my-4 py-2 w-28 font-bold rounded mx-auto text-[#f9fad2] active:bg-[#f9fad2] active:text-[#ff985e]">See details</button>
            </div>
                `
                for (const btn of $$("#btn-details")) {
                btn.addEventListener("click",(e)=>{
                    e.preventDefault()
                    Utils.hideElement("#search-form")
                    const jobId = btn.getAttribute("data-id")
                    Methods.getDetails(jobId)
                })
            } 
            }
    }, 2000)
    }
},
    
}
export const Functions = {
    modalDelete: (jobId) =>{
        $("#modal-delete").addEventListener("click", ()=>{
            Methods.deleteJob(jobId)
            Utils.hideElement("#modal-window")
        })
    }, 
    validateForm: () => {
        const name = $("#name").value.trim()
        const image = $("#image").value.trim()
        const information = $("#information").value.trim()
        const locationForm = $("#locationForm").value.trim()
        const instrumentForm = $("#instrumentForm").value.trim()
        const styleForm = $("#styleForm").value.trim()
        const vacations = $("#vacations").value.trim()
        const costs = $("#costs").value.trim()
        const salary = $("#salary").valueAsNumber
        const long_term = $('input[name="long_term"]:checked');
        const instrument1 = $("#instrument1").value.trim()
        const description = $("#description").value.trim()
        
    
        if(name === "") {
            Utils.showElement(".name-error")
           
        } else {
            Utils.hideElement(".name-error")
             
        }
        if(information === "") {
            Utils.showElement(".information-error")
           
        } else {
            Utils.hideElement(".information-error")
             
        }
        if(image === "") {
            Utils.showElement(".image-error")
           
        } else {
            Utils.hideElement(".image-error")
         
        }
        if(locationForm === "") {
            Utils.showElement(".location-error")
            
        } else {
            Utils.hideElement(".location-error")
               
        }
        if(instrumentForm === "") {
            Utils.showElement(".instrument-error")
            
        } else {
            Utils.hideElement(".instrument-error")
             
        }
        if(styleForm === "") {
            Utils.showElement(".style-error")
            
        } else {
            Utils.hideElement(".style-error")
            
        }
        if(vacations === "") {
            Utils.showElement(".vacations-error")
            
        } else {
            Utils.hideElement(".vacations-error")
             
        }
        if(costs === "") {
            Utils.showElement(".costs-error")
            
        } else {
            Utils.hideElement(".costs-error")
              
        }
        if(isNaN(salary)) {
            Utils.showElement(".salary-error")
        } else {
            Utils.hideElement(".salary-error")
        }
        if (long_term === null) {
            Utils.showElement(".long_term-error");
        } else {
            Utils.hideElement(".long_term-error");
        }
        if(instrument1 === "") {
            Utils.showElement(".instrument1-error")
          
        } else {
            Utils.hideElement(".instrument1-error")
            
        }
        if(description === "") {
            Utils.showElement(".description-error")
           
        } else {
            Utils.hideElement(".description-error")    
        }
        return name !== "" && !isNaN(salary) && information !== "" && image !== "" &&  locationForm !== "" && instrumentForm !== "" && styleForm !== "" && vacations !== "" && costs !== "" && long_term !== null  && instrument1 !== "" && description !== "" 
    } 
}
