import { FilterQuery, UpdateQuery } from "mongoose";
import { permitDocument } from "../model/permit.model";
import UserModel, { UserDocument, UserInput } from "../model/user.model";
import { videoDocument } from "../model/video.model";
import { compass, createToken } from "../utils/helper";
import config from "config";
import { sentEmail } from "../utils/sentEmail";

const port = config.get<number>("port");
const host = config.get<string>("host");

export const registerUser = async (payload: UserInput) => {
  try {
    let email = await UserModel.find({ email: payload.email });
    let phone = await UserModel.find({ phone: payload.phone });
    if (email[0] || phone[0]) {
      throw new Error("email or phone already in exist");
    }
    let token = await createToken(payload);

    const url = `http://${host}:${port}/verify/${token}`;
    await sentEmail(payload.email, "Verify Email", url);
  } catch (e) {
    throw new Error(e);
  }
};

export const saveUser = async (payload: UserInput) => {
  try {
    let result = await UserModel.create(payload);
    let userObj: Partial<UserDocument> = result.toObject();
    delete userObj.password;
    return userObj;
  } catch (e) {
    throw new Error(e);
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    let user = await UserModel.findOne({ email })
      .populate({ path: "roles permits" })
      .select("-__v");

    if (!user || !compass(password, user.password)) {
      throw new Error("Creditial Error");
    }

    let userObj: Partial<UserDocument> = user.toObject();
    userObj["token"] = createToken(userObj);

    delete userObj.password;

    return userObj;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUser = async (query: FilterQuery<UserDocument>) => {
  try {
    return await UserModel.find(query)
      .lean()
      .populate({ path: "roles permits watchLater" })
      .select("-password -__v");
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteUser = async (query: FilterQuery<UserDocument>) => {
  try {
    return await UserModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUser = async (
  query: FilterQuery<UserDocument>,
  body: UpdateQuery<UserDocument>
) => {
  try {
    await UserModel.updateMany(query, body);
    return await UserModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const userAddRole = async (
  userId: UserDocument["_id"],
  roleId: UserDocument["_id"]
) => {
  try {
    await UserModel.findByIdAndUpdate(userId, { $push: { roles: roleId } });
    return await UserModel.findById(userId);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const userRemoveRole = async (
  userId: UserDocument["_id"],
  roleId: UserDocument["_id"]
) => {
  try {
    await UserModel.findByIdAndUpdate(userId, { $pull: { roles: roleId } });
    return await UserModel.findById(userId);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const userAddPermit = async (
  userId: UserDocument["_id"],
  permitId: permitDocument["_id"]
) => {
  try {
    await UserModel.findByIdAndUpdate(userId, { $push: { permits: permitId } });
    return await UserModel.findById(userId);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const userRemovePermit = async (
  userId: UserDocument["_id"],
  permitId: permitDocument["_id"]
) => {
  try {
    await UserModel.findByIdAndUpdate(userId, { $pull: { permits: permitId } });
    return await UserModel.findById(userId);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const userAddHistory = async (
  userId: UserDocument["_id"],
  video: videoDocument["_id"]
) => {
  try {
    await UserModel.findByIdAndUpdate(userId, { $push: { history: video } });
    return await UserModel.findById(userId);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const userRemoveHistory = async (
  userId: UserDocument["_id"],
  video: videoDocument["_id"]
) => {
  try {
    await UserModel.findByIdAndUpdate(userId, { $pull: { history: video } });
    return await UserModel.findById(userId);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const userAddWatchLater = async (
  userId: UserDocument["_id"],
  video: videoDocument["_id"]
) => {
  try {
    await UserModel.findByIdAndUpdate(userId, { $push: { watchLater: video } });
    return await UserModel.findById(userId);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const userRemoveWatchLater = async (
  userId: UserDocument["_id"],
  video: videoDocument["_id"]
) => {
  try {
    await UserModel.findByIdAndUpdate(userId, { $pull: { watchLater: video } });
    return await UserModel.findById(userId);
  } catch (e: any) {
    throw new Error(e);
  }
};
