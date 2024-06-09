const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require('util');
const asyncExec = util.promisify(exec);

const projectNameArgument =  process.argv[2];

const updatePackageJsonName = (name)=>{
    const jsonFilePath = path.join(__dirname , "package.json")
    const packageJsonFileTextContent = fs.readFileSync(jsonFilePath, 'utf8');
    const packageJson = JSON.parse(packageJsonFileTextContent);
    packageJson.name = name;
    fs.writeFileSync(jsonFilePath,JSON.stringify(packageJson), "utf8");
}


const reInstantiateGit = async ()=>{
    await asyncExec("rm -rf .git");
    await asyncExec("git init");
}


const removeSelf = () =>{
    const selfFilePath = path.join(__dirname , "init.js");
    fs.unlinkSync(selfFilePath)

}

const main  = async (projectName)=>{
    if(!projectName) {
        console.log('provide a name for this project')
        return ;
    }
    updatePackageJsonName(projectName);
    await reInstantiateGit()
    removeSelf();
}



main(projectNameArgument);