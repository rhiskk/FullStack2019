const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1991],
          msg: "Year must be greater than 1990",
        },
        isNotGreaterThanCurrentYear(value) {
          if (parseInt(value) > parseInt(this.created_at.getFullYear())) {
            throw new Error("Year must not be greater than current year");
          }
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
