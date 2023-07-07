import db from './db';
import express from './express';
import io from './io';

let actions = { db, io, express };
export default actions;
