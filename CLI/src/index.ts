import inquirer from "inquirer";

let tasques: string[] = [];
let bucle: boolean = true;

while (bucle){
    const respostes: {
        TODO: string,
        ADDMORE: boolean
    } = await inquirer.prompt([
        {
            type: "input",
            name: "TODO",
            message: "Introduir tasca: "
        },
        {
            type: "confirm",
            name: "ADDMORE",
            message: "Vols introduir una altra tasca?",
            default: false
        }
    ])
    const {TODO, ADDMORE} = respostes;
    console.log(respostes)
        bucle = ADDMORE
    if(TODO){
        tasques.push(TODO)

    }else{
        console.log("Afegeix un valor vàlid: ")
    }
}
if (tasques.length > 0){
    console.log('La teva llista de tasques: \n\n')
    tasques.forEach(element => {
        console.log(element);
    })
}else{
    console.log('No hi ha tasques.')
}
