const db: any = {};

db.UserTags.drop();
db.UserTags.insert({
  email: 'mirazle2069@gmail.com',
  tagParentType: 'self',
  tagType: 'investor',
  industoryId: '4-2',
  startupSeriesId: '1',
  year: 17,
  index: 0,
});
db.UserTags.insert({
  email: 'mirazle2069@gmail.com',
  tagParentType: 'self',
  tagType: 'founder',
  industoryId: '3-4',
  startupSeriesId: '11',
  year: 1,
  index: 0,
});
db.UserTags.insert({
  email: 'mirazle2069@gmail.com',
  tagParentType: 'self',
  tagType: 'member',
  industoryId: '6-3',
  jobId: '2-2',
  year: 3,
  index: 0,
});

db.UserTags.insert({
  email: 'scottie142@gmail.com',
  tagParentType: 'self',
  tagType: 'investor',
  industoryId: '5-2',
  startupSeriesId: '1',
  year: 12,
  index: 0,
});

db.UserTags.insert({
  email: 'scottie142@gmail.com',
  tagParentType: 'self',
  tagType: 'member',
  industoryId: '5-1',
  jobId: '2-1',
  year: 8,
  index: 0,
});

db.UserTags.insert({
  email: 'scottie142@gmail.com',
  tagParentType: 'self',
  tagType: 'founder',
  industoryId: '3-4',
  startupSeriesId: '5',
  year: 1,
  index: 0,
});

db.UserTags.insert({
  email: 'scottie142@gmail.com',
  tagParentType: 'search',
  tagType: 'founder',
  industoryId: '1-2',
  startupSeriesId: '4',
  year: 10,
  index: 0,
  sexes: ['1', '2'],
  languages: ['2', '5'],
  birthday: '1980-01-10',
});

db.UserTags.insert({
  email: 'scottie142@gmail.com',
  tagParentType: 'search',
  tagType: 'investor',
  industoryId: '2-1',
  startupSeriesId: '3',
  year: 8,
  index: 0,
  sexes: ['1'],
  languages: ['1', '3'],
  birthday: '1978-09-11',
});

db.UserTags.insert({
  email: 'scottie142@gmail.com',
  tagParentType: 'search',
  tagType: 'member',
  industoryId: '5-1',
  jobId: '4-1',
  year: 5,
  index: 0,
  sexes: ['2'],
  languages: ['4', '5'],
  birthday: '1990-12-30',
});

db.UserTags.insert({
  email: 'scottie142@gmail.com',
  tagParentType: 'story',
  tagType: 'story',
  storyId: '1',
  index: 0,
});

db.UserTags.find();
