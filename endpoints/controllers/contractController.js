const contractService = require('../services/contractService');

const getContractById = async (req, res, next) => {
    try {
        const id = req.params.id;
        // Validate ID
        if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
        }

        const contract = await contractService.getContractById(id);
        if (!contract) {
            return res.status(404).json({ message: "no contract with that id was found" });
        }
        return res.status(200).json(contract);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal server error');
    }
}

  
const createContract = async (req, res, next) => {
    const {title, description, color} = req.body;
    if(!title || !description || !color){
        return res.status(400).json({message: "missing required fields"})
    }
    await contractService.createContract(title, description, color);
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

module.exports={
    getContractById,
    createContract,
    deleteContract
}