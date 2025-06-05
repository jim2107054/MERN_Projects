
//API for adding a new doctor
export const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            address,
        } = req.body;
        const doctorImage = req.file;
        console.log({name, email, password, speciality, degree, experience, about, available, fees, address}, doctorImage);
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}