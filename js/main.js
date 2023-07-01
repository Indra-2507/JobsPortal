import {$, $$, Utils, Methods, Render, SEL, Functions} from './modules.js'


//Events functions
$(SEL.selectLocation).addEventListener("change", (e)=>{
    e.preventDefault
    $(SEL.selectLocation).value
    $(SEL.selectInstrument).disabled = true
    $(SEL.selectStyle).disabled =true
   Methods.getJobs(Methods.getParams("location",SEL.selectLocation))
})
 $(SEL.selectInstrument).addEventListener("change",(e)=>{
    e.preventDefault()
    $(SEL.selectInstrument).value
    $(SEL.selectLocation).disabled =true
    $(SEL.selectStyle).disabled =true
   Methods.getJobs(Methods.getParams("instrument",SEL.selectInstrument))
 }
 ) 

$(SEL.selectStyle).addEventListener("change", (e)=>{
    e.preventDefault()
    $(SEL.selectStyle).value
    $(SEL.selectLocation).disabled =true
    $(SEL.selectInstrument).disabled = true
    Methods.getJobs(Methods.getParams("style",SEL.selectStyle))
})

$(SEL.clearSelects).addEventListener("click", (e)=>{
    e.preventDefault
    $(SEL.searchForm).reset()
})

$(SEL.crateJob).addEventListener("click", ()=>{
    Utils.showElement(SEL.spinner)
    setTimeout(() => {
        Utils.hideElements([SEL.crateJob,SEL.searchForm, SEL.renderCard ,SEL.renderDetails ,SEL.spinner ])
        Utils.showElement(SEL.formNewJob)
        Utils.isSubmit= true     
 }, 2000)   
})

$(SEL.formNewJob).addEventListener(SEL.submit, (e)=>{
    e.preventDefault()
    if(Functions.validateForm()){
        Utils.showElement(SEL.spinner)
        Utils.hideElements([SEL.spinner,SEL.searchForm])
        if (Utils.isSubmit) {
            Methods.newJob()
            setTimeout(() => {
            Utils.hideElement(SEL.succesfullAlert)
        }, 1500)
        Utils.showElement(SEL.succesfullAlert)
        } else {
            validateForm()
            const jobId = $(SEL.editForm).getAttribute("data-id")
            Methods.editJob(jobId)
            Utils.hideElement(SEL.formNewJob) 
        }
        $(SEL.formNewJob).reset()
        
    }   
})

$(SEL.modalCancel).addEventListener("click", ()=>{
    Utils.hideElement(SEL.modalWindow)
    Utils.showElements([SEL.renderCard,SEL.searchForm ])
    Render.jobs(Methods.getJobs())
})

window.addEventListener("load", () => {
    Methods.getJobs()
})