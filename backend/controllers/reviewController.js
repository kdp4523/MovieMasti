const Review = require("../models/reviewModel");

// add review
module.exports.addReview = async (req, res) => {
  try {
    const { movieId, review, reviewId, datetime } = req.body;
    const user = req.user.userDetails;
    
    if (!user || !user.email) {
      return res.status(400).json({ 
        msg: "User information incomplete. Please login again.", 
        status: false 
      });
    }

    // Handle missing username by extracting from email or setting a default
    let username = user.name;
    if (!username) {
      // If name is missing, extract username from email (before @ symbol)
      username = user.email.split('@')[0];
    }
    
    await Review.create({
      reviewId,
      review,
      username: username,
      email: user.email,
      movieId,
      datetime,
    });

    return res.status(201).json({ status: true, reviewId });
  } catch (error) {
    console.log("Review creation error:", error.message);
    return res.status(500).json({ msg: "Server issue :(", status: false });
  }
};

//based on reviewid
module.exports.editReview = async (req, res) => {
  try {
    const { reviewId, review } = req.body;

    await Review.updateOne(
      { reviewId },
      {
        $set: {
          review,
          datetime: new Date(),
        },
      }
    );
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server issue :(", status: false });
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    await Review.deleteOne({ reviewId });

    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server issue :(", status: false });
  }
};

module.exports.getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await Review.find({ movieId });

    return res.status(200).json({ status: true, reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server issue :(", status: false });
  }
};
