module.exports = (sequelize, DataTypes) => {
  // Define the Posts model with Sequelize
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define an association for Posts
  Posts.associate = (models) => {
    // Establish a one-to-many relationship between Posts and Comments
    // If a Post is deleted, all associated Comments will also be deleted (cascade deletion)
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
