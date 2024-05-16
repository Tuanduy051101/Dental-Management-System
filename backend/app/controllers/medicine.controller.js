const ApiError = require("../api-error");
const Medicine = require("../models/medicine.model");

exports.create = async (req, res, next) => {
    const medicines = await Medicine.find().exec();
    if(medicines.length) {
        if(Object.keys(req.body).length ===0 || req.body.name == "" || req.body.tFMedicine == "") {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty."
                )
            );
        }

        const medicine = await Medicine.find({name: req.body.name}).exec();
        const new_medicine = new Medicine({
            name: req.body.name,
            function: req.body.function,
            ingredient: req.body.ingredient,
        });

        if(medicine.length) {
            return res.send({
                message: "Medicine already exists.",
                content: medicine
            });
        }

        try {
            const document = await new_medicine.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(
                    500,
                    "An error occurred while creating the medicine."
                )
            )
        }
    }

    try {
        const documents = await Medicine.insertMany([
            {
                name: "Metrogyl Denta",
                function: "Giúp sát khuẩn, kháng nấm ngay tại chỗ, đồng thời ngăn ngừa hình thành các mảng bám và cao răng.",
                ingredient: ": Gồm có metronidazole benzoate BP và dung dịch chlorhexidinegluconate solution BP (20%), cùng tá dược vừa đủ."
            },
            {
                name: "Cefixim",
                function: "Cefixim có tác dụng tốt trên vi khuẩn gram âm, nồng độ diệt khuẩn cao trong dịch não tủy",
                ingredient: "Cefixim Trihydrat và tá dược vừa đủ."
            },
            {
                name: "Metronidazol Stada",
                function: "Thuốc có tác dụng mạnh đối với người bệnh bị viêm lợi do vi khuẩn kỵ khí.",
                ingredient: "Metronidazol, Lactose monohydrat, Acid stearic hay Magnesi stearat."
            },{
                name: "Periokin",
                function: "Giúp kháng khuẩn trên diện rộng cho răng miệng, đồng thời hỗ trợ tiêu diệt các vi khuẩn gây hại đến niêm mạc miệng.",
                ingredient: "Chủ yếu là chlorhexidine 0.2g, ngoài ra còn có các tá dược khác vừa đủ."
            },{
                name: "Emofluor Gel",
                function: "Loại bỏ và ngăn chặn sự tấn công của các tác nhân gây hại vào răng nướu.",
                ingredient: "Glycerin Cellulose Gum Propyleglycol Aqua Aroma Sodium Saccharin Phosphorcolamine Stannous Fluoride PEG-40 Hydrogenated Castor Oil PEG 8"
            }
        ]);
        return res.send(documents);
    }catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while creating the medicines."
            )
        )
    }
}

exports.findAll = async (req, res, next) => {
    try{
        const medicines = await Medicine.find().populate("tFMedicine").exec();
        return res.send(medicines);
    }catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while finding for all the type of medicines."
            )
        )
    }
}

