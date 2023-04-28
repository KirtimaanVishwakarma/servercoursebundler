import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";

//Contact Form
export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return next(new ErrorHandler("Please enter all field.", 400));
  const to = process.env.MY_MAIL;
  const subject = "Contact from CourseBundler";
  const text = `I am ${name} and my Email is ${email}. \n${message}`;

  await sendEail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your message has been sent.",
  });
});

// Request Course Form
export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course)
    return next(new ErrorHandler("Please enter all field.", 400));

  const to = process.env.MY_MAIL;
  const subject = "Request for a Course from CourseBundler";
  const text = `I am ${name} and my Email is ${email}. \n${course}`;

  await sendEail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your request has been sent.",
  });
});

// Admin Dashboard Stats
export const adminDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  //   how much stats needed more

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }

  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscriptions: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].users;
  const subscriptionsCount = statsData[11].subscriptions;
  const viewsCount = statsData[11].views;

  let usersProfit = true,
    subscriptionsProfit = true,
    viewsProfit = true;

  let usersPercentage = 0,
    subscriptionsPercentage = 0,
    viewsPercentage = 0;

  // check profit EX: last month subscription 15, current 20 them profit
  // 20-15/15 * 100=33.33
  if (statsData[10].users === 0) usersPercentage = usersCount * 100;
  //Checking if last month[10] user was 0; & in current month 20; then growth will be 20*100=2000%
  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  if (statsData[10].subscriptions === 0)
    subscriptionsPercentage = subscriptionsCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscriptions: statsData[11].subscriptions - statsData[10].subscriptions,
    };

    usersPercentage = (difference.users / statsData[10].users) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    subscriptionsPercentage =
      (difference.subscriptions / statsData[10].subscriptions) * 100;

    if (usersPercentage < 0) usersProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionsPercentage < 0) subscriptionsProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionsCount,
    viewsCount,
    usersPercentage,
    viewsPercentage,
    subscriptionsPercentage,
    usersProfit,
    viewsProfit,
    subscriptionsProfit,
  });
});
