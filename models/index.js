import mongoose from 'mongoose';

import modelNames from './ModelNames';

import eventSchema from './event';
export const Event = mongoose.model(modelNames.Event, eventSchema);

import guildSchema from './guild';
export const Guild = mongoose.model(modelNames.Guild, guildSchema);

import userSchema from './user';
export const User = mongoose.model(modelNames.User, userSchema);
