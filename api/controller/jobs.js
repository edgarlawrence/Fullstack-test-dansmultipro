const { Jobs } = require("../model/index");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("images");

const getAllData = async (req, res) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 5;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 5) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }

    const tables = await Jobs.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    res.json({
      content: tables.rows,
      totalPages: Math.ceil(tables.count / size),
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createData = (req, res) => {
  let data = {
    images: req.file.path,
    title: req.body.title,
    desc: req.body.desc,
    location: req.body.location,
    fulltime: req.body.fulltime,
    details: req.body.details,
    linkquery: req.body.linkquery,
    companyprofile: req.body.companyprofile,
    yourtask: req.body.yourtask,
    requirements: req.body.requirements,
  };
  if (!req.file) {
    return res.status(422).json({
      msg: "Please select an image to upload",
    });
  }
  Jobs.create(data);
  res.json(data);
};

const findDataBySearch = (req, res) => {
  Jobs.findAll({
    where: {
      [Op.and]: [
        {
          desc: {
            [Op.like]: `%${req.query.desc}`,
          },
        },
        {
          location: {
            [Op.like]: `%${req.query.location}`,
          },
        },
        {
          fulltime: {
            [Op.like]: `%${req.query.fulltime}`,
          },
        },
      ],
    },
  })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDataById = async (req, res) => {
  try {
    const data = await Jobs.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  upload,
  getAllData,
  createData,
  findDataBySearch,
  getDataById,
};
