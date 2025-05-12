

// API for adding doctor
const addDoctor = async (req, res) => {
    try{
        const { name, email, password, image, speciality, degree, experience, about, available, fees, address } = req.body;
        const doctor = {
            name,
            email,
            password,
            image,
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            address
        }
        // Save doctor to database
        const newDoctor = await doctorModel.create(doctor);
        res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    }
    catch(error){

    }
}

export { addDoctor };