const db = require("../config/index");
const Sequelize = require("sequelize");

const DataTypes = Sequelize;

const Jobs = db.define(
  "jobs",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fulltime: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    linkquery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyprofile: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    yourtask: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

const Users = db.define("users", {
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
});

db.sync();

module.exports = { Jobs, Users };
