```
db.Threads.find({}, {ch: 1}).forEach((t)=>{ db.Threads.update( {ch: t.ch}, {$set:{postCnt: db.Posts.find( {ch: t.ch } ).size() } } );
```

### コレクション「myCollection」のフィールド「oldname」を「newname」に変更

```
db.Posts.update({}, {$rename:{connection : 'ch'}}, {multi:true});
db.Posts.update({}, {$rename:{connections : 'chs'}}, {multi:true});
db.Threads.update({}, {$rename:{connection : 'ch'}}, {multi:true});
db.Threads.update({}, {$rename:{connections : 'chs'}}, {multi:true});
db.Threads.update({}, {$rename:{'lastPost.connection' : 'lastPost.ch'}}, {multi:true});
db.Threads.update({}, {$rename:{'lastPost.connections' : 'lastPost.chs'}}, {multi:true});
db.Users.update({}, {$rename:{connection : 'ch'}}, {multi:true});
```

### 複数件以上ある ch を検出して削除

```
db.Threads.find().forEach( (d) => { if( db.Threads.find({ch: d.ch}).size() > 1 ){ print(d.ch);db.Threads.remove({_id: d._id}) } });
```
