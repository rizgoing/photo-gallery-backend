import PostModel from "../Schemas/PostSchema.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();

    res.json(posts);
  } catch (error) {
    res.json({ msg: "i cant master" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            msg: "Error",
          });
        }

        if (!doc) {
          return res.status(404).json({
            msg: "post not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    res.json({ msg: "i cant master" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            msg: "Error",
          });
        }

        if (!doc) {
          return res.status(404).json({
            msg: "post not found",
          });
        }

        res.json({
          succsess: true,
        });
      }
    );
  } catch (error) {
    res.json({ msg: "i cant master" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      err: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
      }
    );

    res.json({
      succsess: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
    });
  }
};
