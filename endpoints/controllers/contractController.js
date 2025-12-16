const contractService = require('../services/contractService');

  
const createContract = async (req, res, next) => {
    console.log("reached the function controller")
    const {title, description, color, participants} = req.body;
    console.log(title, description, color, participants)
    if(!title || !description || !color){
        return res.status(400).json({message: "missing required fields"})
    }
    await contractService.createContract(title, description, color, participants);
    return res.status(201).json({message: "contract created successfully"})
}

const deleteContract = async (req, res, next) => {
    const id = req.params.id; 
    if(!id || isNaN(id)){
        return res.status(400).json({message: "invalid id"})
    }
    await contractService.deleteContract(id);
    return res.status(200).json({message: "contract deleted successfully"})
}

const getContractWithUsers = async (req,res) =>{
   try {
        const contract_id = req.params.id;
        if(!contract_id || isNaN(contract_id)){
            return res.status(400).json({message: "invalid id"})
        }
        const contract = await contractService.getContractWithUsers(contract_id);
        if (!contract) {
            return res.status(404).json({ message: "no contract with that id was found" });
        }
        return res.status(200).json(contract);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal server error');
    }
}

module.exports={
    createContract,
    deleteContract,
    getContractWithUsers
}