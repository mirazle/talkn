タグの設計

DBQuery.shellBatchSize = 1000;

db.Tags.insert([
{uniqueId: '1-1-1', parentId: '1', categoryId: '1-1', ja: "IT 法人営業（直販）"},
{uniqueId: '1-1-2', parentId: '1', categoryId: '1-1', ja: "IT 法人営業（代理店）"},
{uniqueId: '1-1-3', parentId: '1', categoryId: '1-1', ja: "Web 系（IT）ソリューション営業"},
{uniqueId: '1-1-4', parentId: '1', categoryId: '1-1', ja: "IT 個人営業"}
]);

db.Tags.insert([
{uniqueId: '1-2-1', parentId: '1', categoryId: '1-2', ja: "半導体・電子部品・エレクトロニクス製品営業（国内）"},
{uniqueId: '1-2-2', parentId: '1', categoryId: '1-2', ja: "半導体・電子部品・エレクトロニクス製品営業（海外）"}
]);

db.Tags.insert([
{uniqueId: '1-3-1', parentId: '1', categoryId: '1-3', ja: "装置・工作機械・産業機械営業（国内）"},
{uniqueId: '1-3-2', parentId: '1', categoryId: '1-3', ja: "装置・工作機械・産業機械営業（海外）"},
{uniqueId: '1-3-3', parentId: '1', categoryId: '1-3', ja: "精密機械・計測機器・分析機器・光学製品営業（国内）"},
{uniqueId: '1-3-4', parentId: '1', categoryId: '1-3', ja: "精密機械・計測機器・分析機器・光学製品営業（海外）"},
{uniqueId: '1-3-5', parentId: '1', categoryId: '1-3', ja: "自動車・建機・自動車部品営業（国内）"},
{uniqueId: '1-3-6', parentId: '1', categoryId: '1-3', ja: "自動車・建機・自動車部品営業（海外）"}
]);

db.Tags.insert([
{uniqueId: '1-4-1', parentId: '1', categoryId: '1-4', ja: "原料・素材・化学製品営業（国内）"},
{uniqueId: '1-4-2', parentId: '1', categoryId: '1-4', ja: "原料・素材・化学製品営業（海外）"}
]);

db.Tags.insert([
{uniqueId: '1-5-1', parentId: '1', categoryId: '1-5', ja: "MR（製薬会社）"},
{uniqueId: '1-5-2', parentId: '1', categoryId: '1-5', ja: "医療機器営業"},
{uniqueId: '1-5-3', parentId: '1', categoryId: '1-5', ja: "OTC（一般用医薬品）"},
{uniqueId: '1-5-4', parentId: '1', categoryId: '1-5', ja: "MS・医薬品卸・代理店"},
{uniqueId: '1-5-5', parentId: '1', categoryId: '1-5', ja: "ライフサイエンス（理化学機器・試薬）"},
{uniqueId: '1-5-6', parentId: '1', categoryId: '1-5', ja: "その他医療系営業"}
]);

db.Tags.insert([
{uniqueId: '1-6-1', parentId: '1', categoryId: '1-6', ja: "食品・飲料営業（国内）"},
{uniqueId: '1-6-2', parentId: '1', categoryId: '1-6', ja: "日用品・化粧品営業（国内）"},
{uniqueId: '1-6-3', parentId: '1', categoryId: '1-6', ja: "その他消費財営業（国内）"},
{uniqueId: '1-6-4', parentId: '1', categoryId: '1-6', ja: "食品・飲料・日用品・化粧品・その他消費財営業（海外）"}
]);

db.Tags.insert([
{uniqueId: '1-7-1', parentId: '1', categoryId: '1-7', ja: "建設・不動産法人営業"},
{uniqueId: '1-7-2', parentId: '1', categoryId: '1-7', ja: "建設・不動産個人営業"}
]);

db.Tags.insert([
{uniqueId: '1-8-1', parentId: '1', categoryId: '1-8', ja: "金融法人営業"},
{uniqueId: '1-8-2', parentId: '1', categoryId: '1-8', ja: "金融個人営業・ファイナンシャルプランナー"}
]);

db.Tags.insert([
{uniqueId: '1-9-1', parentId: '1', categoryId: '1-9', ja: "広告・メディア法人営業（新規中心）"},
{uniqueId: '1-9-2', parentId: '1', categoryId: '1-9', ja: "広告・メディア法人営業（既存・ルートセールス中心）"},
{uniqueId: '1-9-3', parentId: '1', categoryId: '1-9', ja: "広告・メディア代理店営業・パートナーセールス"},
{uniqueId: '1-9-4', parentId: '1', categoryId: '1-9', ja: "広告・メディア個人営業"},
{uniqueId: '1-9-5', parentId: '1', categoryId: '1-9', ja: "広告・メディア海外営業"}
]);

db.Tags.insert([
{uniqueId: '1-10-1', parentId: '1', categoryId: '1-10', ja: "派遣営業"},
{uniqueId: '1-10-2', parentId: '1', categoryId: '1-10', ja: "派遣コーディネーター"},
{uniqueId: '1-10-3', parentId: '1', categoryId: '1-10', ja: "人材紹介営業"},
{uniqueId: '1-10-4', parentId: '1', categoryId: '1-10', ja: "求人広告営業"},
{uniqueId: '1-10-5', parentId: '1', categoryId: '1-10', ja: "キャリアコンサルタント・キャリアアドバイザー"},
{uniqueId: '1-10-6', parentId: '1', categoryId: '1-10', ja: "ブティック・エグゼクティブ"},
{uniqueId: '1-10-7', parentId: '1', categoryId: '1-10', ja: "その他人材・コーディネーター・求人広告営業}"}
]);

db.Tags.insert([
{uniqueId: '1-11-1', parentId: '1', categoryId: '1-11', ja: "その他法人営業（新規中心）"},
{uniqueId: '1-11-2', parentId: '1', categoryId: '1-11', ja: "その他法人営業（既存・ルートセールス中心）"},
{uniqueId: '1-11-3', parentId: '1', categoryId: '1-11', ja: "その他代理店営業・パートナーセールス"},
{uniqueId: '1-11-4', parentId: '1', categoryId: '1-11', ja: "その他個人営業"},
{uniqueId: '1-11-5', parentId: '1', categoryId: '1-11', ja: "その他海外営業"}
]);

db.Tags.insert([
{uniqueId: '2-1-1', parentId: '2', categoryId: '2-1', ja: "商品企画・サービス企画"},
{uniqueId: '2-1-2', parentId: '2', categoryId: '2-1', ja: "広告宣伝"},
{uniqueId: '2-1-3', parentId: '2', categoryId: '2-1', ja: "販売促進・PR"},
{uniqueId: '2-1-4', parentId: '2', categoryId: '2-1', ja: "MD"},
{uniqueId: '2-1-5', parentId: '2', categoryId: '2-1', ja: "Web マーケティング（ネット広告・販促 PR など）"},
{uniqueId: '2-1-6', parentId: '2', categoryId: '2-1', ja: "その他マーケティング・商品企画・広告宣伝"}
]);

db.Tags.insert([
{uniqueId: '2-2-1', parentId: '2', categoryId: '2-2', ja: "経理（財務会計）"},
{uniqueId: '2-2-2', parentId: '2', categoryId: '2-2', ja: "財務"},
{uniqueId: '2-2-3', parentId: '2', categoryId: '2-2', ja: "管理会計"},
{uniqueId: '2-2-4', parentId: '2', categoryId: '2-2', ja: "内部統制"},
]);

db.Tags.insert([
{uniqueId: '2-3-1', parentId: '2', categoryId: '2-3', ja: "総務"},
{uniqueId: '2-3-2', parentId: '2', categoryId: '2-3', ja: "法務"},
{uniqueId: '2-3-3', parentId: '2', categoryId: '2-3', ja: "知的財産（知財）・特許"},
{uniqueId: '2-3-4', parentId: '2', categoryId: '2-3', ja: "内部監査"}
]);

db.Tags.insert([
{uniqueId: '2-4-1', parentId: '2', categoryId: '2-4', ja: "購買・調達・バイヤー・MD"},
{uniqueId: '2-4-2', parentId: '2', categoryId: '2-4', ja: "間接購買・総務購買"},
{uniqueId: '2-4-3', parentId: '2', categoryId: '2-4', ja: "物流管理（ベンダー管理・配送管理・受発注管理など）"},
{uniqueId: '2-4-4', parentId: '2', categoryId: '2-4', ja: "SCM 企画・物流企画・需要予測（サプライチェーンマネジメント",
{uniqueId: '2-4-5', parentId: '2', categoryId: '2-4', ja: "貿易業務（輸出入業務・通関など）"},
{uniqueId: '2-4-6', parentId: '2', categoryId: '2-4', ja: "倉庫管理・作業・在庫管理（ピッキング）"}
]);

db.Tags.insert([
{uniqueId: '2-5-1', parentId: '2', categoryId: '2-5', ja: "経営企画"},
{uniqueId: '2-5-2', parentId: '2', categoryId: '2-5', ja: "事業企画・新規事業開発"},
{uniqueId: '2-5-3', parentId: '2', categoryId: '2-5', ja: "営業企画"}
]);

db.Tags.insert([
{uniqueId: '2-6-1', parentId: '2', categoryId: '2-6', ja: "リサーチ・市場調査"},
{uniqueId: '2-6-2', parentId: '2', categoryId: '2-6', ja: "データアナリスト・データサイエンティスト"},
]);

db.Tags.insert([
{uniqueId: '2-7-1', parentId: '2', categoryId: '2-7', ja: "経営者・経営幹部・役員（CFO／CEO／COO）"},
{uniqueId: '2-7-2', parentId: '2', categoryId: '2-7', ja: "事業統括マネジャー"},
]);

db.Tags.insert([
{uniqueId: '2-8-1', parentId: '2', categoryId: '2-8', ja: "広報"},
{uniqueId: '2-8-2', parentId: '2', categoryId: '2-8', ja: "IR"},
]);

db.Tags.insert([
{uniqueId: '2-9-1', parentId: '2', categoryId: '2-9', ja: "人事（教育・採用担当）"},
{uniqueId: '2-9-2', parentId: '2', categoryId: '2-9', ja: "人事（給与社保）"},
{uniqueId: '2-9-3', parentId: '2', categoryId: '2-9', ja: "人事（労務・人事制度）"},
{uniqueId: '2-9-4', parentId: '2', categoryId: '2-9', ja: "その他人事"},
]);

db.Tags.insert([
{uniqueId: '3-1-1', parentId: '3', categoryId: '3-1', ja: "経理事務・財務アシスタント"},
]);

db.Tags.insert([
{uniqueId: '3-2-1', parentId: '3', categoryId: '3-2', ja: "総務アシスタント"},
{uniqueId: '3-2-2', parentId: '3', categoryId: '3-2', ja: "法務アシスタント"},
{uniqueId: '3-2-3', parentId: '3', categoryId: '3-2', ja: "人事アシスタント"},
]);

db.Tags.insert([
{uniqueId: '3-3-1', parentId: '3', categoryId: '3-3', ja: "物流・購買アシスタント"},
{uniqueId: '3-3-2', parentId: '3', categoryId: '3-3', ja: "貿易事務"},
]);

db.Tags.insert([
{uniqueId: '3-4-1', parentId: '3', categoryId: '3-4', ja: "マーケティング・広報アシスタント"},
{uniqueId: '3-4-2', parentId: '3', categoryId: '3-4', ja: "経営企画／事業統括アシスタント"},
]);

db.Tags.insert([
{uniqueId: '3-5-1', parentId: '3', categoryId: '3-5', ja: "金融事務（銀行員・証券）"},
{uniqueId: '3-5-2', parentId: '3', categoryId: '3-5', ja: "金融事務（生保・損保）"},
{uniqueId: '3-5-3', parentId: '3', categoryId: '3-5', ja: "その他金融事務"},
{uniqueId: '3-5-4', parentId: '3', categoryId: '3-5', ja: "窓口"},
]);

db.Tags.insert([
{uniqueId: '3-6-1', parentId: '3', categoryId: '3-6', ja: "医療事務"},
]);

db.Tags.insert([
{uniqueId: '3-7-1', parentId: '3', categoryId: '3-7', ja: "秘書"},
{uniqueId: '3-7-2', parentId: '3', categoryId: '3-7', ja: "受付"},
]);

db.Tags.insert([
{uniqueId: '3-8-1', parentId: '3', categoryId: '3-8', ja: "通訳・翻訳"},
]);

db.Tags.insert([
{uniqueId: '3-9-1', parentId: '3', categoryId: '3-9', ja: "営業事務・アシスタント"},
{uniqueId: '3-9-2', parentId: '3', categoryId: '3-9', ja: "一般事務・アシスタント"},
]);

db.Tags.insert([
{uniqueId: '4-1-1', parentId: '4', categoryId: '4-1', ja: "店長"},
{uniqueId: '4-1-2', parentId: '4', categoryId: '4-1', ja: "販売員・接客・売り場担当"},
{uniqueId: '4-1-3', parentId: '4', categoryId: '4-1', ja: "ホールスタッフ・フロアスタッフ・調理スタッフ（飲食）"}
]);

db.Tags.insert([
{uniqueId: '4-2-1', parentId: '4', categoryId: '4-2', ja: "施設長"},
{uniqueId: '4-2-2', parentId: '4', categoryId: '4-2', ja: "エリアマネジャー・スーパーバイザー（SV）"},
{uniqueId: '4-2-3', parentId: '4', categoryId: '4-2', ja: "店舗開発・FC 開発"}
]);

db.Tags.insert([
{uniqueId: '4-3-1', parentId: '4', categoryId: '4-3', ja: "美容師・理容師・その他美容関連"},
{uniqueId: '4-3-2', parentId: '4', categoryId: '4-3', ja: "美容部員・エステティシャン・マッサージ・ビューティーアドバイザー"},
]);

db.Tags.insert([
{uniqueId: '4-4-1', parentId: '4', categoryId: '4-4', ja: "旅行手配員・添乗員・ツアーコンダクター"}
]);

db.Tags.insert([
{uniqueId: '4-5-1', parentId: '4', categoryId: '4-5', ja: "施設管理・マネジメント"},
{uniqueId: '4-5-2', parentId: '4', categoryId: '4-5', ja: "フロント業務・予約受付"},
{uniqueId: '4-5-3', parentId: '4', categoryId: '4-5', ja: "その他宿泊施設・ホテル関連"}
]);

db.Tags.insert([
{uniqueId: '4-6-1', parentId: '4', categoryId: '4-6', ja: "道路旅客・貨物運送（ドライバー・運転手・運転士）"},
{uniqueId: '4-6-2', parentId: '4', categoryId: '4-6', ja: "航空・鉄道・船舶運送"},
{uniqueId: '4-6-3', parentId: '4', categoryId: '4-6', ja: "倉庫業"}
]);

db.Tags.insert([
{uniqueId: '4-7-1', parentId: '4', categoryId: '4-7', ja: "清掃・警備・守衛"}
]);

db.Tags.insert([
{uniqueId: '4-8-1', parentId: '4', categoryId: '4-8', ja: "スーパーバイザー（SV）"},
{uniqueId: '4-8-2', parentId: '4', categoryId: '4-8', ja: "カスタマーサポート・ユーザーサポート・オペレータ"}
]);

db.Tags.insert([
{uniqueId: '4-9-1', parentId: '4', categoryId: '4-9', ja: "スクール長・マネジャー"},
{uniqueId: '4-9-2', parentId: '4', categoryId: '4-9', ja: "講師・指導員・インストラクター"}
]);

db.Tags.insert([
{uniqueId: '4-10-1', parentId: '4', categoryId: '4-10', ja: "バイヤー・ディストリビューター"},
{uniqueId: '4-10-2', parentId: '4', categoryId: '4-10', ja: "マーチャンダイザー"}
]);

db.Tags.insert([
{uniqueId: '4-11-1', parentId: '4', categoryId: '4-11', ja: "ブライダルコーディネーター・ウェディングプランナー"},
{uniqueId: '4-11-2', parentId: '4', categoryId: '4-11', ja: "葬祭ディレクター・プランナー"},
{uniqueId: '4-11-3', parentId: '4', categoryId: '4-11', ja: "その他ブライダル・葬祭関連"}
]);

db.Tags.insert([
{uniqueId: '5-1-1', parentId: '5', categoryId: '5-1', ja: "戦略・経営コンサルタント"},
{uniqueId: '5-1-2', parentId: '5', categoryId: '5-1', ja: "組織・人事コンサルタント"},
{uniqueId: '5-1-3', parentId: '5', categoryId: '5-1', ja: "業務改革コンサルタント（BPR）"},
{uniqueId: '5-1-4', parentId: '5', categoryId: '5-1', ja: "リスクコンサルタント"},
{uniqueId: '5-1-5', parentId: '5', categoryId: '5-1', ja: "その他ビジネスコンサルタント"},
{uniqueId: '5-1-6', parentId: '5', categoryId: '5-1', ja: "会計コンサルタント・財務アドバイザリー"},
{uniqueId: '5-1-7', parentId: '5', categoryId: '5-1', ja: "製造業コンサルタント（製品開発・生産技術・品質管理）"}
]);

db.Tags.insert([
{uniqueId: '5-2-1', parentId: '5', categoryId: '5-2', ja: "会計専門職・会計士"},
{uniqueId: '5-2-2', parentId: '5', categoryId: '5-2', ja: "弁護士"},
{uniqueId: '5-2-3', parentId: '5', categoryId: '5-2', ja: "弁理士・特許技術者"},
{uniqueId: '5-2-4', parentId: '5', categoryId: '5-2', ja: "司法書士"},
{uniqueId: '5-2-5', parentId: '5', categoryId: '5-2', ja: "行政書士"},
{uniqueId: '5-2-6', parentId: '5', categoryId: '5-2', ja: "社会保険労務士"},
{uniqueId: '5-2-7', parentId: '5', categoryId: '5-2', ja: "税理士"}
]);

db.Tags.insert([
{uniqueId: '6-1-1', parentId: '6', categoryId: '6-1', ja: "金融商品開発"},
{uniqueId: '6-1-2', parentId: '6', categoryId: '6-1', ja: "アクチュアリー"},
{uniqueId: '6-1-3', parentId: '6', categoryId: '6-1', ja: "クオンツ（開発）"},
{uniqueId: '6-1-4', parentId: '6', categoryId: '6-1', ja: "その他開発"}
]);

db.Tags.insert([
{uniqueId: '6-2-1', parentId: '6', categoryId: '6-2', ja: "ディーラー・トレーダー・トレーディング"},
{uniqueId: '6-2-2', parentId: '6', categoryId: '6-2', ja: "ファンドマネジャー"},
{uniqueId: '6-2-3', parentId: '6', categoryId: '6-2', ja: "クオンツ（運用）"},
{uniqueId: '6-2-4', parentId: '6', categoryId: '6-2', ja: "その他運用"}
]);

db.Tags.insert([
{uniqueId: '6-3-1', parentId: '6', categoryId: '6-3', ja: "ストラクチャードファイナンス"},
{uniqueId: '6-3-2', parentId: '6', categoryId: '6-3', ja: "公開・引受"},
{uniqueId: '6-3-3', parentId: '6', categoryId: '6-3', ja: "M&A"},
{uniqueId: '6-3-4', parentId: '6', categoryId: '6-3', ja: "その他投資銀行"},
{uniqueId: '6-3-5', parentId: '6', categoryId: '6-3', ja: "プロジェクトファイナンス"}
]);

db.Tags.insert([
{uniqueId: '6-4-1', parentId: '6', categoryId: '6-4', ja: "エコノミスト"},
{uniqueId: '6-4-2', parentId: '6', categoryId: '6-4', ja: "ストラテジスト"},
{uniqueId: '6-4-3', parentId: '6', categoryId: '6-4', ja: "アナリスト"}
]);

db.Tags.insert([
{uniqueId: '6-5-1', parentId: '6', categoryId: '6-5', ja: "融資審査（法人）"},
{uniqueId: '6-5-2', parentId: '6', categoryId: '6-5', ja: "融資・契約審査（個人）"},
{uniqueId: '6-5-3', parentId: '6', categoryId: '6-5', ja: "債権回収"},
{uniqueId: '6-5-4', parentId: '6', categoryId: '6-5', ja: "支払査定"},
{uniqueId: '6-5-5', parentId: '6', categoryId: '6-5', ja: "引受査定"}
]);

db.Tags.insert([
{uniqueId: '6-6-1', parentId: '6', categoryId: '6-6', ja: "決済"},
{uniqueId: '6-6-2', parentId: '6', categoryId: '6-6', ja: "投信計理"},
{uniqueId: '6-6-3', parentId: '6', categoryId: '6-6', ja: "カストディ"},
{uniqueId: '6-6-4', parentId: '6', categoryId: '6-6', ja: "その他バックオフィス"},
{uniqueId: '6-6-5', parentId: '6', categoryId: '6-6', ja: "約定"},
{uniqueId: '6-6-6', parentId: '6', categoryId: '6-6', ja: "受渡"}
]);

db.Tags.insert([
{uniqueId: '7-1-1', parentId: '7', categoryId: '7-1', ja: "検察官・裁判官・裁判所職員"},
{uniqueId: '7-1-2', parentId: '7', categoryId: '7-1', ja: "国会職員"},
{uniqueId: '7-1-3', parentId: '7', categoryId: '7-1', ja: "警察官・消防官・防衛庁職員・自衛官"},
{uniqueId: '7-1-4', parentId: '7', categoryId: '7-1', ja: "その他公務員"}
]);

db.Tags.insert([
{uniqueId: '7-2-1', parentId: '7', categoryId: '7-2', ja: "大学講師"},
{uniqueId: '7-2-2', parentId: '7', categoryId: '7-2', ja: "小・中・高等学校教師"},
{uniqueId: '7-2-3', parentId: '7', categoryId: '7-2', ja: "保育士・幼稚園教諭"},
]);

db.Tags.insert([
{uniqueId: '7-3-1', parentId: '7', categoryId: '7-3', ja: "農業／畜産／酪農"},
]);

db.Tags.insert([
{uniqueId: '8-1-1', parentId: '8', categoryId: '8-1', ja: "IT コンサルタント（アプリ）"},
{uniqueId: '8-1-2', parentId: '8', categoryId: '8-1', ja: "IT コンサルタント（インフラ）"}
]);

db.Tags.insert([
{uniqueId: '8-2-1', parentId: '8', categoryId: '8-2', ja: "プリセールス"}
]);

db.Tags.insert([
{uniqueId: '8-3-1', parentId: '8', categoryId: '8-3', ja: "システムエンジニア（Web・オープン系・パッケージ開発）"},
{uniqueId: '8-3-2', parentId: '8', categoryId: '8-3', ja: "システムエンジニア（汎用機系）"},
{uniqueId: '8-3-3', parentId: '8', categoryId: '8-3', ja: "プロジェクトマネジャー（Web・オープン系・パッケージ開発）"},
{uniqueId: '8-3-4', parentId: '8', categoryId: '8-3', ja: "システム・IT アーキテクト"},
{uniqueId: '8-3-5', parentId: '8', categoryId: '8-3', ja: "パッケージ導入・システム導入"}
]);

db.Tags.insert([
{uniqueId: '8-4-1', parentId: '8', categoryId: '8-4', ja: "サーバーエンジニア（設計構築）"},
{uniqueId: '8-4-2', parentId: '8', categoryId: '8-4', ja: "ネットワークエンジニア（設計構築）"},
{uniqueId: '8-4-3', parentId: '8', categoryId: '8-4', ja: "データベースエンジニア"},
{uniqueId: '8-4-4', parentId: '8', categoryId: '8-4', ja: "プロジェクトマネージャー（インフラ）"},
{uniqueId: '8-4-5', parentId: '8', categoryId: '8-4', ja: "Web サービスエンジニア（ネットワーク・サーバー・データベース）"},
{uniqueId: '8-4-6', parentId: '8', categoryId: '8-4', ja: "運用・監視・保守"}
]);

db.Tags.insert([
{uniqueId: '8-5-1', parentId: '8', categoryId: '8-5', ja: "テクニカルサポート・カスタマーサポート（IT 製品）"},
{uniqueId: '8-5-2', parentId: '8', categoryId: '8-5', ja: "ヘルプデスク"}
]);

db.Tags.insert([
{uniqueId: '8-6-1', parentId: '8', categoryId: '8-6', ja: "システム開発・運用（アプリ担当）"},
{uniqueId: '8-6-2', parentId: '8', categoryId: '8-6', ja: "システム構築・運用（インフラ担当）"},
{uniqueId: '8-6-3', parentId: '8', categoryId: '8-6', ja: "IT 戦略・システム企画担当"}
]);

db.Tags.insert([
{uniqueId: '8-7-1', parentId: '8', categoryId: '8-7', ja: "研究開発（R&D）エンジニア"}
]);

db.Tags.insert([
{uniqueId: '8-8-1', parentId: '8', categoryId: '8-8', ja: "QA エンジニア・テスター"}
]);

db.Tags.insert([
{uniqueId: '8-9-1', parentId: '8', categoryId: '8-9', ja: "データサイエンティスト・アナリスト"},
{uniqueId: '8-9-2', parentId: '8', categoryId: '8-9', ja: "データサイエンティスト・エンジニアリング"}
]);

db.Tags.insert([
{uniqueId: '8-10-1', parentId: '8', categoryId: '8-10', ja: "Web サービス・プロジェクトマネジャー"},
{uniqueId: '8-10-2', parentId: '8', categoryId: '8-10', ja: "Web サービス系エンジニア（フロントエンド・サーバーサイド・フルスタック）"}
]);

db.Tags.insert([
{uniqueId: '8-11-1', parentId: '8', categoryId: '8-11', ja: "スマホアプリ・ネイティブアプリ系エンジニア"}
]);

db.Tags.insert([
{uniqueId: '8-12-1', parentId: '8', categoryId: '8-12', ja: "制御系ソフトウェア開発（通信・ネットワーク・IoT 関連）"}
]);

db.Tags.insert([
{uniqueId: '8-13-1', parentId: '8', categoryId: '8-13', ja: "セキュリティコンサルタント・アナリスト"},
{uniqueId: '8-13-2', parentId: '8', categoryId: '8-13', ja: "セキュリティエンジニア（脆弱性診断・ネットワークセキュリティ）"}
]);

db.Tags.insert([
{uniqueId: '9-1-1', parentId: '9', categoryId: '9-1', ja: "基礎研究・先行開発・要素技術開発（機械）"},
{uniqueId: '9-1-2', parentId: '9', categoryId: '9-1', ja: "基礎研究・先行開発・要素技術開発（電気）"}
]);

db.Tags.insert([
{uniqueId: '9-2-1', parentId: '9', categoryId: '9-2', ja: "機械・電子部品・コネクタ"},
{uniqueId: '9-2-2', parentId: '9', categoryId: '9-2', ja: "家電・AV・スマートフォン・携帯端末・複合機"},
{uniqueId: '9-2-3', parentId: '9', categoryId: '9-2', ja: "医療機器"},
{uniqueId: '9-2-4', parentId: '9', categoryId: '9-2', ja: "精密・計測・分析機器"},
{uniqueId: '9-2-5', parentId: '9', categoryId: '9-2', ja: "自動車・自動車部品"},
{uniqueId: '9-2-6', parentId: '9', categoryId: '9-2', ja: "工作機械・産業機械・ロボット"},
{uniqueId: '9-2-7', parentId: '9', categoryId: '9-2', ja: "半導体製造装置"},
{uniqueId: '9-2-8', parentId: '9', categoryId: '9-2', ja: "その他機械設計"},
{uniqueId: '9-2-9', parentId: '9', categoryId: '9-2', ja: "パチンコ・パチスロ・遊戯機器"},
{uniqueId: '9-2-10', parentId: '9', categoryId: '9-3', ja: "無線・通信機器"},
{uniqueId: '9-2-11', parentId: '9', categoryId: '9-3', ja: "建機・その他輸送機器"},
{uniqueId: '9-2-12', parentId: '9', categoryId: '9-3', ja: "プラント機器・設備"}
]);

db.Tags.insert([
{uniqueId: '9-3-1', parentId: '9', categoryId: '9-3', ja: "品質管理（機械）"},
{uniqueId: '9-3-2', parentId: '9', categoryId: '9-3', ja: "品質管理（電気・電子・半導体）"},
{uniqueId: '9-3-3', parentId: '9', categoryId: '9-3', ja: "品質保証（機械）"},
{uniqueId: '9-3-4', parentId: '9', categoryId: '9-3', ja: "品質保証（電気・電子・半導体）"}
]);

db.Tags.insert([
{uniqueId: '9-4-1', parentId: '9', categoryId: '9-4', ja: "工程設計・工法開発・工程改善・IE（機械・金属加工）"},
{uniqueId: '9-4-2', parentId: '9', categoryId: '9-4', ja: "設備立ち上げ・設計（電気・制御設計）"},
{uniqueId: '9-4-3', parentId: '9', categoryId: '9-4', ja: "設備保全"},
{uniqueId: '9-4-4', parentId: '9', categoryId: '9-4', ja: "工程設計・工法開発・工程改善・IE（樹脂成形）"},
{uniqueId: '9-4-5', parentId: '9', categoryId: '9-4', ja: "工程設計・工法開発・工程改善・IE（組立・アッセンブリ）"},
{uniqueId: '9-4-6', parentId: '9', categoryId: '9-4', ja: "工程設計・工法開発・工程改善・IE（その他）"},
{uniqueId: '9-4-7', parentId: '9', categoryId: '9-4', ja: "設備立ち上げ・設計（機械設計）"}
]);

db.Tags.insert([
{uniqueId: '9-5-1', parentId: '9', categoryId: '9-5', ja: "家電・AV・携帯端末・複合機"},
{uniqueId: '9-5-2', parentId: '9', categoryId: '9-5', ja: "医療機器"},
{uniqueId: '9-5-3', parentId: '9', categoryId: '9-5', ja: "精密・計測・分析機器"},
{uniqueId: '9-5-4', parentId: '9', categoryId: '9-5', ja: "自動車・自動車部品"},
{uniqueId: '9-5-5', parentId: '9', categoryId: '9-5', ja: "建機・その他輸送機器"},
{uniqueId: '9-5-6', parentId: '9', categoryId: '9-5', ja: "半導体"},
{uniqueId: '9-5-7', parentId: '9', categoryId: '9-5', ja: "半導体製造装置"},
{uniqueId: '9-5-8', parentId: '9', categoryId: '9-5', ja: "その他セールスエンジニア・アプリケーションエンジニア・FAE"},
{uniqueId: '9-5-9', parentId: '9', categoryId: '9-5', ja: "基地局・無線機器・通信機器"},
{uniqueId: '9-5-10', parentId: '9', categoryId: '9-5', ja: "工作機械・産業機械・ロボット"},
{uniqueId: '9-5-11', parentId: '9', categoryId: '9-5', ja: "プラント機器・設備"},
{uniqueId: '9-5-12', parentId: '9', categoryId: '9-5', ja: "機械・電子部品・コネクタ"},
{uniqueId: '9-5-13', parentId: '9', categoryId: '9-5', ja: "ソフトウェア（CAD・CAM・CAE）"},
{uniqueId: '9-5-14', parentId: '9', categoryId: '9-5', ja: "ソフトウェア（その他）"}
]);

db.Tags.insert([
{uniqueId: '9-6-1', parentId: '9', categoryId: '9-6', ja: "自動車・航空・建機・その他輸送機器"},
{uniqueId: '9-6-2', parentId: '9', categoryId: '9-6', ja: "家電・AV・携帯端末・複合機"},
{uniqueId: '9-6-3', parentId: '9', categoryId: '9-6', ja: "医療機器"},
{uniqueId: '9-6-4', parentId: '9', categoryId: '9-6', ja: "精密・計測・分析機器"},
{uniqueId: '9-6-5', parentId: '9', categoryId: '9-6', ja: "工作機械・産業機械・ロボット"},
{uniqueId: '9-6-6', parentId: '9', categoryId: '9-6', ja: "半導体製造装置"},
{uniqueId: '9-6-7', parentId: '9', categoryId: '9-6', ja: "その他サービスエンジニア"},
{uniqueId: '9-6-8', parentId: '9', categoryId: '9-6', ja: "基地局・無線機器・通信機器"},
{uniqueId: '9-6-9', parentId: '9', categoryId: '9-6', ja: "機械・電子部品"},
{uniqueId: '9-6-10', parentId: '9', categoryId: '9-6',ja:"プラント機器・設備"}
]);

db.Tags.insert([
{uniqueId: '9-7-1', parentId: '9', categoryId: '9-7', ja: "その他技術職（機械・電気）"}
]);

db.Tags.insert([
{uniqueId: '9-8-1', parentId: '9', categoryId: '9-8', ja: "CAD オペレーター（機械）"}
]);

db.Tags.insert([
{uniqueId: '9-9-1', parentId: '9', categoryId: '9-9', ja: "光学設計"}
]);

db.Tags.insert([
{uniqueId: '9-10-1', parentId: '9', categoryId: '9-10', ja: "CAE 解析（熱・流体）"},
{uniqueId: '9-10-2', parentId: '9', categoryId: '9-10', ja: "CAE 解析（構造・応力・衝突・振動）"},
{uniqueId: '9-10-3', parentId: '9', categoryId: '9-10', ja: "CAE 解析（電磁界・電磁場）"},
{uniqueId: '9-10-4', parentId: '9', categoryId: '9-10', ja: "CAE 解析（その他）"}
]);

db.Tags.insert([
{uniqueId: '9-11-1', parentId: '9', categoryId: '9-11', ja: "アナログ（電源）"},
{uniqueId: '9-11-2', parentId: '9', categoryId: '9-11', ja: "アナログ（パワーエレクトロニクス）"},
{uniqueId: '9-11-3', parentId: '9', categoryId: '9-11', ja: "アナログ（高周波・RF・通信）"},
{uniqueId: '9-11-4', parentId: '9', categoryId: '9-11', ja: "アナログ（その他アナログ）"},
{uniqueId: '9-11-5', parentId: '9', categoryId: '9-11', ja: "デジタル（マイコン・CPU・DSP）"},
{uniqueId: '9-11-6', parentId: '9', categoryId: '9-11', ja: "デジタル（FPGA）"},
{uniqueId: '9-11-7', parentId: '9', categoryId: '9-11', ja: "デジタル（その他デジタル）"},
{uniqueId: '9-11-8', parentId: '9', categoryId: '9-11', ja: "半導体・IC（アナログ）"},
{uniqueId: '9-11-9', parentId: '9', categoryId: '9-11', ja: "半導体・IC（デジタル）"},
{uniqueId: '9-11-10', parentId: '9', categoryId: '9-11', ja: "半導体・IC（メモリ）"},
{uniqueId: '9-11-11', parentId: '9', categoryId: '9-11', ja: "半導体・IC（その他 IC）"},
{uniqueId: '9-11-12', parentId: '9', categoryId: '9-11', ja: "レイアウト設計"}
]);

db.Tags.insert([
{uniqueId: '9-12-1', parentId: '9', categoryId: '9-12', ja: "シーケンス制御（PLC・シーケンス・ラダー）"},
{uniqueId: '9-12-2', parentId: '9', categoryId: '9-12', ja: "電気設計（工作機械・装置・設備・制御盤など）"},
]);

db.Tags.insert([
{uniqueId: '9-13-1', parentId: '9', categoryId: '9-13', ja: "評価・実験（機械）"},
{uniqueId: '9-13-2', parentId: '9', categoryId: '9-13', ja: "評価・実験（電気・電子・半導体）"},
]);

db.Tags.insert([
{uniqueId: '9-14-1', parentId: '9', categoryId: '9-14', ja: "製品企画・プロジェクトマネージャー（電気）"},
{uniqueId: '9-14-2', parentId: '9', categoryId: '9-14', ja: "製品企画・プロジェクトマネージャー（機械）"},
]);

db.Tags.insert([
{uniqueId: '9-15-1', parentId: '9', categoryId: '9-15', ja: "プレス金型"},
{uniqueId: '9-15-2', parentId: '9', categoryId: '9-15', ja: "射出成型金型"},
{uniqueId: '9-15-3', parentId: '9', categoryId: '9-15', ja: "その他金型設計"},
]);

db.Tags.insert([
{uniqueId: '9-16-1', parentId: '9', categoryId: '9-16', ja: "機械・金属加工"},
{uniqueId: '9-16-2', parentId: '9', categoryId: '9-16', ja: "組立・その他製造職"},
]);

db.Tags.insert([
{uniqueId: '9-17-1', parentId: '9', categoryId: '9-17', ja: "生産管理"},
{uniqueId: '9-17-2', parentId: '9', categoryId: '9-17', ja: "工場長"},
]);

db.Tags.insert([
{uniqueId: '9-18-1', parentId: '9', categoryId: '9-18', ja: "デバイス開発（パワー半導体）"},
{uniqueId: '9-18-2', parentId: '9', categoryId: '9-18', ja: "デバイス開発（LED・発光デバイス・光半導体）"},
{uniqueId: '9-18-3', parentId: '9', categoryId: '9-18', ja: "デバイス開発（メモリ）"},
{uniqueId: '9-18-4', parentId: '9', categoryId: '9-18', ja: "デバイス開発（その他半導体）"},
{uniqueId: '9-18-5', parentId: '9', categoryId: '9-18', ja: "デバイス開発（太陽光・液晶など）"},
{uniqueId: '9-18-6', parentId: '9', categoryId: '9-18', ja: "デバイス開発（センサー）"},
]);

db.Tags.insert([
{uniqueId: '9-19-1', parentId: '9', categoryId: '9-19', ja: "プロセスインテグレーション"},
{uniqueId: '9-19-2', parentId: '9', categoryId: '9-19', ja: "プロセスエンジニア（前工程）"},
{uniqueId: '9-19-3', parentId: '9', categoryId: '9-19', ja: "プロセスエンジニア（後工程）"},
]);

db.Tags.insert([
{uniqueId: '9-20-1', parentId: '9', categoryId: '9-20', ja: "整備士（自動車・建機・航空機など）"}
]);

db.Tags.insert([
{uniqueId: '9-21-1', parentId: '9', categoryId: '9-21', ja: "テクニカルライター（マニュアル制作）"}
]);

db.Tags.insert([
{uniqueId: '10-1-1', parentId: '10', categoryId: '10-1', ja: "基礎研究・先行開発・要素技術開発"}
]);

db.Tags.insert([
{uniqueId: '10-2-2', parentId: '10', categoryId: '10-2', ja: "プロジェクトマネージャー"}
]);

db.Tags.insert([
{uniqueId: '10-3-1', parentId: '10', categoryId: '10-3', ja: "機械・電子部品"},
{uniqueId: '10-3-2', parentId: '10', categoryId: '10-3', ja: "家電・AV 機器・複合機"},
{uniqueId: '10-3-3', parentId: '10', categoryId: '10-3', ja: "パチンコ・パチスロ・遊戯機器"},
{uniqueId: '10-3-4', parentId: '10', categoryId: '10-3', ja: "医療機器"},
{uniqueId: '10-3-5', parentId: '10', categoryId: '10-3', ja: "スマホアプリ・ネイティブアプリ系エンジニア"},
{uniqueId: '10-3-6', parentId: '10', categoryId: '10-3', ja: "無線・通信機器"},
{uniqueId: '10-3-7', parentId: '10', categoryId: '10-3', ja: "半導体"},
{uniqueId: '10-3-8', parentId: '10', categoryId: '10-3', ja: "精密・計測・分析機器"},
{uniqueId: '10-3-9', parentId: '10', categoryId: '10-3', ja: "ストレージ（HDD・SSD など）"},
{uniqueId: '10-3-10', parentId: '10', categoryId: '10-3', ja: "自動車・自動車部品・車載製品"},
{uniqueId: '10-3-11', parentId: '10', categoryId: '10-3', ja: "建機・その他輸送機器"},
{uniqueId: '10-3-12', parentId: '10', categoryId: '10-3', ja: "工作機械・産業機械・半導体製造装置・産業用ロボット"},
{uniqueId: '10-3-13', parentId: '10', categoryId: '10-3', ja: "ロボット（作業用ロボット・パワードスーツなど）"},
{uniqueId: '10-3-14', parentId: '10', categoryId: '10-3', ja: "その他アプリケーション・ミドルウェア・デバイスドライバ・ファームウェア"},
{uniqueId: '10-3-15', parentId: '10', categoryId: '10-3', ja: "iOS・Android"},
{uniqueId: '10-3-16', parentId: '10', categoryId: '10-3', ja: "ネットワーク・IoT"}
]);

db.Tags.insert([
{uniqueId: '10-4-1', parentId: '10', categoryId: '10-4', ja: "家電・AV 機器・複合機"},
{uniqueId: '10-4-2', parentId: '10', categoryId: '10-4', ja: "機械・電子部品 機器・複合機"},
{uniqueId: '10-4-3', parentId: '10', categoryId: '10-4', ja: "医療機器"},
{uniqueId: '10-4-4', parentId: '10', categoryId: '10-4', ja: "スマートフォン・タブレット・携帯端末機器"},
{uniqueId: '10-4-5', parentId: '10', categoryId: '10-4', ja: "無線・通信機器"},
{uniqueId: '10-4-6', parentId: '10', categoryId: '10-4', ja: "自動車・自動車部品・車載製品"},
{uniqueId: '10-4-7', parentId: '10', categoryId: '10-4', ja: "工作機械・産業機械・半導体製造装置・産業用ロボット"},
{uniqueId: '10-4-8', parentId: '10', categoryId: '10-4', ja: "その他品質管理・品質保証・テクニカルサポート（組み込みソフトウエア）"}
]);

db.Tags.insert([
{uniqueId: '10-5-1', parentId: '10', categoryId: '10-5', ja: "家電・AV 評価・デバッグ（デバッガー）"}
]);

db.Tags.insert([
{uniqueId: '10-6-1', parentId: '10', categoryId: '10-6', ja: "ユーザーインタフェース"}
]);

db.Tags.insert([
{uniqueId: '10-7-1', parentId: '10', categoryId: '10-7', ja: "画像処理"}
]);

db.Tags.insert([
{uniqueId: '10-8-1', parentId: '10', categoryId: '10-8', ja: "音声処理"}
]);

db.Tags.insert([
{uniqueId: '10-9-1', parentId: '10', categoryId: '10-9', ja: "プリセールス・アプリケーションエンジニア（自動車業界向け）"},
{uniqueId: '10-9-2', parentId: '10', categoryId: '10-9', ja: "プリセールス（その他業界向け）"}
]);

db.Tags.insert([
{uniqueId: '10-10-1', parentId: '10', categoryId: '10-10', ja: "コンサルティング（品質・開発プロセスなど）"}
]);

db.Tags.insert([
{uniqueId: '11-1-1', parentId: '11', categoryId: '11-1', ja: "技術開発・工法開発（建築・土木）"},
{uniqueId: '11-1-2', parentId: '11', categoryId: '11-1', ja: "部材開発・建材開発（建築・土木）"},
{uniqueId: '11-1-3', parentId: '11', categoryId: '11-1', ja: "構造解析・耐震診断（建築・土木）"}
]);

db.Tags.insert([
{uniqueId: '11-2-1', parentId: '11', categoryId: '11-2', ja: "建築意匠設計"},
{uniqueId: '11-2-2', parentId: '11', categoryId: '11-2', ja: "建築構造設計"},
{uniqueId: '11-2-3', parentId: '11', categoryId: '11-2', ja: "製図・CAD オペレーター（建設）"},
{uniqueId: '11-2-4', parentId: '11', categoryId: '11-2', ja: "内装設計・インテリア・空間デザイン"},
{uniqueId: '11-2-5', parentId: '11', categoryId: '11-2', ja: "積算"},
{uniqueId: '11-2-6', parentId: '11', categoryId: '11-2', ja: "設計監理"},
{uniqueId: '11-2-7', parentId: '11', categoryId: '11-2', ja: "内装設計（店舗）"},
{uniqueId: '11-2-8', parentId: '11', categoryId: '11-2', ja: "内装設計・リフォーム・インテリア（住宅）"},
{uniqueId: '11-2-9', parentId: '11', categoryId: '11-2', ja: "内装設計（オフィス）"}
]);

db.Tags.insert([
{uniqueId: '11-3-1', parentId: '11', categoryId: '11-3', ja: "建築施工管理（RC 造・S 造・SRC 造）"},
{uniqueId: '11-3-2', parentId: '11', categoryId: '11-3', ja: "建築施工管理（木造）"},
{uniqueId: '11-3-3', parentId: '11', categoryId: '11-3', ja: "建築施工管理（店舗内装）"},
{uniqueId: '11-3-4', parentId: '11', categoryId: '11-3', ja: "建築施工管理（住宅内装・リフォーム・インテリア）"},
{uniqueId: '11-3-5', parentId: '11', categoryId: '11-3', ja: "建築施工管理（オフィス内装）"},
{uniqueId: '11-3-6', parentId: '11', categoryId: '11-3', ja: "設備施工管理（電気）"},
{uniqueId: '11-3-7', parentId: '11', categoryId: '11-3', ja: "設備施工管理（空調・衛生設備）"},
{uniqueId: '11-3-8', parentId: '11', categoryId: '11-3', ja: "設備施工管理（通信設備／消防・防災設備）"},
{uniqueId: '11-3-9', parentId: '11', categoryId: '11-3', ja: "土木施工管理（橋梁）"},
{uniqueId: '11-3-10', parentId: '11', categoryId: '11-3', ja: "土木施工管理（トンネル・道路・造成・ダム・河川・港湾・造園など）"},
{uniqueId: '11-3-11', parentId: '11', categoryId: '11-3', ja: "土木施工管理（上下水道）"},
{uniqueId: '11-3-12', parentId: '11', categoryId: '11-3', ja: "その他設備施工管理"}
]);

db.Tags.insert([
{uniqueId: '11-4-1', parentId: '11', categoryId: '11-4', ja: "その他建設・建築・不動産・プラント・工場関連職"},
]);

db.Tags.insert([
{uniqueId: '11-5-1', parentId: '11', categoryId: '11-5', ja: "プロジェクトマネジメント（国内）"},
{uniqueId: '11-5-2', parentId: '11', categoryId: '11-5', ja: "プロジェクトマネジメント（海外）"},
{uniqueId: '11-5-3', parentId: '11', categoryId: '11-5', ja: "設計（建築・土木）"},
{uniqueId: '11-5-4', parentId: '11', categoryId: '11-5', ja: "設計（電気・計装）"},
{uniqueId: '11-5-5', parentId: '11', categoryId: '11-5', ja: "設計（機械）"},
{uniqueId: '11-5-6', parentId: '11', categoryId: '11-5', ja: "設計（プロセス）"},
{uniqueId: '11-5-7', parentId: '11', categoryId: '11-5', ja: "施工管理（建築・土木）"},
{uniqueId: '11-5-8', parentId: '11', categoryId: '11-5', ja: "施工管理（電気・計装）"},
{uniqueId: '11-5-9', parentId: '11', categoryId: '11-5', ja: "施工管理（機械）"},
{uniqueId: '11-5-10', parentId: '11', categoryId: '11-5', ja: "資材調達"},
{uniqueId: '11-5-11', parentId: '11', categoryId: '11-5', ja: "オペレーション・試運転"},
{uniqueId: '11-5-12', parentId: '11', categoryId: '11-5', ja: "解析・調査"},
{uniqueId: '11-5-13', parentId: '11', categoryId: '11-5', ja: "メンテナンス"}
]);

db.Tags.insert([
{uniqueId: '11-6-1', parentId: '11', categoryId: '11-6', ja: "大工・とび・左官・設備など"},
]);

db.Tags.insert([
{uniqueId: '11-7-1', parentId: '11', categoryId: '11-7', ja: "不動産開発企画"},
{uniqueId: '11-7-2', parentId: '11', categoryId: '11-7', ja: "コンストラクションマネジメント・PM・FM（施主側）"},
{uniqueId: '11-7-3', parentId: '11', categoryId: '11-7', ja: "不動産仕入（用地・一棟・区分）"},
{uniqueId: '11-7-4', parentId: '11', categoryId: '11-7', ja: "デューデリジェンス（建築）"},
{uniqueId: '11-7-5', parentId: '11', categoryId: '11-7', ja: "デューデリジェンス（不動産鑑定評価）"},
{uniqueId: '11-7-6', parentId: '11', categoryId: '11-7', ja: "品質管理・安全管理（技術系）"}
]);

db.Tags.insert([
{uniqueId: '11-8-1', parentId: '11', categoryId: '11-8', ja: "アセットマネジメント"},
{uniqueId: '11-8-2', parentId: '11', categoryId: '11-8', ja: "プロパティマネジメント（オフィス）"},
{uniqueId: '11-8-3', parentId: '11', categoryId: '11-8', ja: "プロパティマネジメント（商業施設・その他）"},
{uniqueId: '11-8-4', parentId: '11', categoryId: '11-8', ja: "プロパティマネジメント（住居・賃貸管理）"},
{uniqueId: '11-8-5', parentId: '11', categoryId: '11-8', ja: "ビル・建物管理"},
{uniqueId: '11-8-6', parentId: '11', categoryId: '11-8', ja: "分譲マンション管理"},
{uniqueId: '11-8-7', parentId: '11', categoryId: '11-8', ja: "マンション管理（技術系）"},
{uniqueId: '11-8-8', parentId: '11', categoryId: '11-8', ja: "アフターメンテナンス（マンション・戸建）"}
]);

db.Tags.insert([
{uniqueId: '11-9-1', parentId: '11', categoryId: '11-9', ja: "ビルマネジメント（商業施設・店舗・オフィス）"},
{uniqueId: '11-9-2', parentId: '11', categoryId: '11-9', ja: "ビルメンテナンス（商業施設・店舗・オフィス）"},
]);

db.Tags.insert([
{uniqueId: '11-10-1', parentId: '11', categoryId: '11-10', ja: "電気設備"},
{uniqueId: '11-10-2', parentId: '11', categoryId: '11-10', ja: "空調・衛生設備"},
{uniqueId: '11-10-3', parentId: '11', categoryId: '11-10', ja: "通信設備／消防・防災設備"},
{uniqueId: '11-10-4', parentId: '11', categoryId: '11-10', ja: "製図・CAD オペレーター（建設）"},
{uniqueId: '11-10-5', parentId: '11', categoryId: '11-10', ja: "積算"},
]);

db.Tags.insert([
{uniqueId: '11-11-1', parentId: '11', categoryId: '11-11', ja: "土木設計・測量（都市計画・環境）"},
{uniqueId: '11-11-2', parentId: '11', categoryId: '11-11', ja: "土木設計・測量（橋梁）"},
{uniqueId: '11-11-3', parentId: '11', categoryId: '11-11', ja: "土木設計・測量（トンネル・道路・造成）"},
{uniqueId: '11-11-4', parentId: '11', categoryId: '11-11', ja: "土木設計・測量（ダム・河川・港湾）"},
{uniqueId: '11-11-5', parentId: '11', categoryId: '11-11', ja: "土木設計・測量（上下水道）"},
{uniqueId: '11-11-6', parentId: '11', categoryId: '11-11', ja: "製図・CAD オペレーター（建設）"},
{uniqueId: '11-11-7', parentId: '11', categoryId: '11-11', ja: "測量"},
{uniqueId: '11-11-8', parentId: '11', categoryId: '11-11', ja: "土壌・地質・地盤調査"}
]);

db.Tags.insert([
{uniqueId: '11-12-1', parentId: '11', categoryId: '11-12', ja: "工場ファシリティ・ユーティリティ（電気・空調衛生）"},
{uniqueId: '11-12-2', parentId: '11', categoryId: '11-12', ja: "労働安全衛生（EHS・HSE）"},
]);

db.Tags.insert([
{uniqueId: '12-1-1', parentId: '12', categoryId: '12-1', ja: "基礎・応用研究（有機）"},
{uniqueId: '12-1-2', parentId: '12', categoryId: '12-1', ja: "基礎・応用研究（高分子）"},
{uniqueId: '12-1-3', parentId: '12', categoryId: '12-1', ja: "基礎・応用研究（ガラス・セラミック）"},
{uniqueId: '12-1-4', parentId: '12', categoryId: '12-1', ja: "基礎・応用研究（カーボン）"},
{uniqueId: '12-1-5', parentId: '12', categoryId: '12-1', ja: "基礎・応用研究（金属・鉄鋼）"},
{uniqueId: '12-1-6', parentId: '12', categoryId: '12-1', ja: "基礎・応用研究（非鉄金属）"},
{uniqueId: '12-1-7', parentId: '12', categoryId: '12-1', ja: "基礎・応用研究（その他無機）"},
{uniqueId: '12-1-8', parentId: '12', categoryId: '12-1', ja: "基礎・応用研究（有機金属・錯体・触媒）"}
]);

db.Tags.insert([
{uniqueId: '12-2-1', parentId: '12', categoryId: '12-2', ja: "製品開発（有機）"},
{uniqueId: '12-2-2', parentId: '12', categoryId: '12-2', ja: "製品開発（高分子）"},
{uniqueId: '12-2-3', parentId: '12', categoryId: '12-2', ja: "製品開発（ガラス・セラミック）"},
{uniqueId: '12-2-4', parentId: '12', categoryId: '12-2', ja: "製品開発（カーボン）"},
{uniqueId: '12-2-5', parentId: '12', categoryId: '12-2', ja: "製品開発（金属・鉄鋼）"},
{uniqueId: '12-2-6', parentId: '12', categoryId: '12-2', ja: "製品開発（非鉄金属）"},
{uniqueId: '12-2-7', parentId: '12', categoryId: '12-2', ja: "製品開発（その他無機）"},
{uniqueId: '12-2-8', parentId: '12', categoryId: '12-2', ja: "製品開発（有機金属・錯体・触媒）"}
]);

db.Tags.insert([
{uniqueId: '12-3-1', parentId: '12', categoryId: '12-3', ja: "製造プロセス開発・工法開発（合成・重合）"},
{uniqueId: '12-3-2', parentId: '12', categoryId: '12-3', ja: "製造プロセス開発・工法開発（配合設計品）（塗料・接着剤など）"},
{uniqueId: '12-3-3', parentId: '12', categoryId: '12-3', ja: "製造プロセス開発・工法開発（加工成型）（樹脂）"},
{uniqueId: '12-3-4', parentId: '12', categoryId: '12-3', ja: "製造プロセス開発・工法開発（加工成型）（金属・鉄鋼・ガラス）"},
{uniqueId: '12-3-5', parentId: '12', categoryId: '12-3', ja: "製造プロセス開発・工法開発（無機・セラミック・非鉄金属）"},
{uniqueId: '12-3-6', parentId: '12', categoryId: '12-3', ja: "製造プロセス開発・工法開発（半導体・太陽光・液晶・LED など）"}
]);

db.Tags.insert([
{uniqueId: '12-4-1', parentId: '12', categoryId: '12-4', ja: "品質管理（化学品・化成品・化学原料など）"},
{uniqueId: '12-4-2', parentId: '12', categoryId: '12-4', ja: "品質管理（加工成型品・樹脂・金属・鉄鋼・ガラスなど）"}
]);

db.Tags.insert([
{uniqueId: '12-5-1', parentId: '12', categoryId: '12-5', ja: "技術営業・アプリケーションエンジニア（化学・素材・化粧品・トイレタリー）"}
]);

db.Tags.insert([
{uniqueId: '12-6-1', parentId: '12', categoryId: '12-6', ja: "その他製造・生産"}
]);

db.Tags.insert([
{uniqueId: '12-7-1', parentId: '12', categoryId: '12-7', ja: "分析・解析・測定・各種評価試験（化学）"},
{uniqueId: '12-7-2', parentId: '12', categoryId: '12-7', ja: "分析・解析・測定・各種評価試験（化粧品・トイレタリー）"}
]);

db.Tags.insert([
{uniqueId: '12-8-1', parentId: '12', categoryId: '12-8', ja: "基礎・応用研究（化粧品・トイレタリー）"}
]);

db.Tags.insert([
{uniqueId: '12-9-1', parentId: '12', categoryId: '12-9', ja: "製品開発（化粧品・トイレタリー）"}
]);

db.Tags.insert([
{uniqueId: '12-10-1', parentId: '12', categoryId: '12-10', ja: "製造プロセス開発・工法開発（化粧品・トイレタリー）"}
]);

db.Tags.insert([
{uniqueId: '12-11-1', parentId: '12', categoryId: '12-11', ja: "生産管理（化学・素材・化粧品・トイレタリー）"}
]);

db.Tags.insert([
{uniqueId: '12-12-1', parentId: '12', categoryId: '12-12', ja: "品質管理（化粧品・トイレタリー）"}
]);

db.Tags.insert([
{uniqueId: '12-13-1', parentId: '12', categoryId: '12-13', ja: "品質保証・監査（化学品・化成品・化学原料など）"},
{uniqueId: '12-13-2', parentId: '12', categoryId: '12-13', ja: "品質保証・監査（加工成型品）（樹脂・金属・鉄鋼・ガラスなど）"},
{uniqueId: '12-13-3', parentId: '12', categoryId: '12-13', ja: "化学法規"}
]);

db.Tags.insert([
{uniqueId: '12-14-1', parentId: '12', categoryId: '12-14', ja: "品質保証・監査"},
{uniqueId: '12-14-2', parentId: '12', categoryId: '12-14', ja: "申請・薬事"}
]);

db.Tags.insert([
{uniqueId: '12-15-1', parentId: '12', categoryId: '12-15', ja: "テクニカルサポート（技術系サポート職）"}
]);

db.Tags.insert([
{uniqueId: '12-16-1', parentId: '12', categoryId: '12-16', ja: "製造・生産リーダー"},
{uniqueId: '12-16-2', parentId: '12', categoryId: '12-16', ja: "製造・生産オペレーター"}
]);

db.Tags.insert([
{uniqueId: '12-17-1', parentId: '12', categoryId: '12-17', ja: "製造・生産リーダー"},
{uniqueId: '12-17-2', parentId: '12', categoryId: '12-17', ja: "製造・生産オペレーター"}
]);

db.Tags.insert([
{uniqueId: '12-18-1', parentId: '12', categoryId: '12-18', ja: "工場長（化学・素材・化粧品・トイレタリー）"}
]);

db.Tags.insert([
{uniqueId: '13-1-1', parentId: '13', categoryId: '13-1', ja: "基礎・応用研究（食品原料・機能性素材物質原料）"},
{uniqueId: '13-1-2', parentId: '13', categoryId: '13-1', ja: "基礎・応用研究（食品アプリケーション）"},
{uniqueId: '13-1-3', parentId: '13', categoryId: '13-1', ja: "基礎・応用研究（食品メニュー開発・中食・外食）"},
{uniqueId: '13-1-4', parentId: '13', categoryId: '13-1', ja: "基礎・応用研究（香料）"},
{uniqueId: '13-1-5', parentId: '13', categoryId: '13-1', ja: "基礎・応用研究（飼料・ペットフード）"}
]);

db.Tags.insert([
{uniqueId: '13-2-1', parentId: '13', categoryId: '13-2', ja: "製品開発（食品原料・機能性素材物質原料）"},
{uniqueId: '13-2-2', parentId: '13', categoryId: '13-2', ja: "製品開発（食品アプリケーション）"},
{uniqueId: '13-2-3', parentId: '13', categoryId: '13-2', ja: "製品開発（食品メニュー開発・中食・外食）"},
{uniqueId: '13-2-4', parentId: '13', categoryId: '13-2', ja: "製品開発（香料）"},
{uniqueId: '13-2-5', parentId: '13', categoryId: '13-2', ja: "製品開発（飼料・ペットフード）"}
]);

db.Tags.insert([
{uniqueId: '13-3-1', parentId: '13', categoryId: '13-3', ja: "製造プロセス開発・工法開発（食品・飲料プラント）"},
{uniqueId: '13-3-2', parentId: '13', categoryId: '13-3', ja: "製造プロセス開発・工法開発（製造ライン）"},
]);

db.Tags.insert([
{uniqueId: '13-4-1', parentId: '13', categoryId: '13-4', ja: "生産管理（食品・香料・飼料）"}
]);

db.Tags.insert([
{uniqueId: '13-5-1', parentId: '13', categoryId: '13-5', ja: "品質管理（食品・香料・飼料）"}
]);

db.Tags.insert([
{uniqueId: '13-6-1', parentId: '13', categoryId: '13-6', ja: "品質保証・監査（食品・香料・飼料）"}
]);

db.Tags.insert([
{uniqueId: '13-7-1', parentId: '13', categoryId: '13-7', ja: "技術営業・アプリケーションエンジニア（食品・香料・飼料）"}
]);

db.Tags.insert([
{uniqueId: '13-8-1', parentId: '13', categoryId: '13-8', ja: "テクニカルサポート（技術系サポート職）（食品・香料・飼料）"}
]);

db.Tags.insert([
{uniqueId: '13-9-1', parentId: '13', categoryId: '13-9', ja: "製造・生産リーダー（食品・香料・飼料）"},
{uniqueId: '13-9-2', parentId: '13', categoryId: '13-9', ja: "製造・生産オペレーター（食品・香料・飼料）"}
]);

db.Tags.insert([
{uniqueId: '13-10-1', parentId: '13', categoryId: '13-10', ja: "分析・解析・測定・各種評価試験（食品・香料・飼料）"}
]);

db.Tags.insert([
{uniqueId: '13-11-1', parentId: '13', categoryId: '13-11', ja: "工場長（食品・香料・飼料）"}
]);

db.Tags.insert([
{uniqueId: '14-1-1', parentId: '14', categoryId: '14-1', ja: "研究（シーズ探索・スクリーニング）"},
{uniqueId: '14-1-2', parentId: '14', categoryId: '14-1', ja: "製剤研究（スケールアップ・工業化）"},
{uniqueId: '14-1-3', parentId: '14', categoryId: '14-1', ja: "製造プロセス・工法開発（再生医療製品）"},
{uniqueId: '14-1-4', parentId: '14', categoryId: '14-1', ja: "非臨床研究（薬物動態・GLP）"},
{uniqueId: '14-1-5', parentId: '14', categoryId: '14-1', ja: "非臨床研究（安全性・毒性・GLP）"},
{uniqueId: '14-1-6', parentId: '14', categoryId: '14-1', ja: "製剤研究（処方設計）"},
{uniqueId: '14-1-7', parentId: '14', categoryId: '14-1', ja: "研究（基礎研究）"},
{uniqueId: '14-1-8', parentId: '14', categoryId: '14-1', ja: "非臨床研究（薬理・GLP）"},
{uniqueId: '14-1-9', parentId: '14', categoryId: '14-1', ja: "分析研究"},
{uniqueId: '14-1-10', parentId: '14', categoryId: '14-1', ja: "研究（バイオインフォマティクス）"}
]);

db.Tags.insert([
{uniqueId: '14-2-1', parentId: '14', categoryId: '14-2', ja: "臨床企画（プロトコル作成）"},
{uniqueId: '14-2-2', parentId: '14', categoryId: '14-2', ja: "スタディマネージャー・プロジェクトマネジャー"},
{uniqueId: '14-2-3', parentId: '14', categoryId: '14-2', ja: "CRA（臨床開発モニター）"},
{uniqueId: '14-2-4', parentId: '14', categoryId: '14-2', ja: "臨床研究"},
{uniqueId: '14-2-5', parentId: '14', categoryId: '14-2', ja: "CRC（治験コーディネーター）"},
{uniqueId: '14-2-6', parentId: '14', categoryId: '14-2', ja: "統計解析"},
{uniqueId: '14-2-7', parentId: '14', categoryId: '14-2', ja: "DM（データマネジメント）"},
{uniqueId: '14-2-8', parentId: '14', categoryId: '14-2', ja: "QC（臨床開発 QC）"},
{uniqueId: '14-2-9', parentId: '14', categoryId: '14-2', ja: "GCP 監査・QA（臨床開発 QA）"},
{uniqueId: '14-2-10', parentId: '14', categoryId: '14-2', ja: "臨床薬理"},
{uniqueId: '14-2-11', parentId: '14', categoryId: '14-2', ja: "MW（メディカルライティング）"},
{uniqueId: '14-2-12', parentId: '14', categoryId: '14-2', ja: "SMA（治験事務局）"},
{uniqueId: '14-2-13', parentId: '14', categoryId: '14-2', ja: "メディカルドクター（クリニカル・臨床開発）"},
{uniqueId: '14-2-14', parentId: '14', categoryId: '14-2', ja: "PV（安全性情報担当）"},
{uniqueId: '14-2-15', parentId: '14', categoryId: '14-2', ja: "PMS（製造販売後調査）"},
{uniqueId: '14-2-16', parentId: '14', categoryId: '14-2', ja: "メディカルドクター（セイフティ・PV）"}
]);

db.Tags.insert([
{uniqueId: '14-3-1', parentId: '14', categoryId: '14-3', ja: "医薬品開発薬事"},
{uniqueId: '14-3-2', parentId: '14', categoryId: '14-3', ja: "医薬品 CMC 薬事"},
{uniqueId: '14-3-3', parentId: '14', categoryId: '14-3', ja: "申請（医療機器）"},
{uniqueId: '14-3-4', parentId: '14', categoryId: '14-3', ja: "申請（OTC・医薬部外品）"},
{uniqueId: '14-3-5', parentId: '14', categoryId: '14-3', ja: "マーケットアクセス・薬価戦略"},
]);

db.Tags.insert([
{uniqueId: '14-4-1', parentId: '14', categoryId: '14-4', ja: "医薬品質管理・試験担当（QC）（製造所）"},
{uniqueId: '14-4-2', parentId: '14', categoryId: '14-4', ja: "医薬品質保証（QA）（本社）"},
{uniqueId: '14-4-3', parentId: '14', categoryId: '14-4', ja: "医療機器品質管理・品質保証（GQP・QMS）"},
{uniqueId: '14-4-4', parentId: '14', categoryId: '14-4', ja: "医療機器安全管理（GVP）"},
{uniqueId: '14-4-5', parentId: '14', categoryId: '14-4', ja: "医薬品質保証（QA）（製造所）"}
]);

db.Tags.insert([
{uniqueId: '14-5-1', parentId: '14', categoryId: '14-5', ja: "技術営業・アプリケーションスペシャリスト"},
{uniqueId: '14-5-2', parentId: '14', categoryId: '14-5', ja: "医薬品 クリニカルスペシャリスト 薬事"}
]);

db.Tags.insert([
{uniqueId: '14-6-1', parentId: '14', categoryId: '14-6', ja: "生産管理"},
{uniqueId: '14-6-2', parentId: '14', categoryId: '14-6', ja: "製造オペレーター"},
{uniqueId: '14-6-3', parentId: '14', categoryId: '14-6', ja: "製造工程管理・工程改善"},
{uniqueId: '14-6-4', parentId: '14', categoryId: '14-6', ja: "工場長"}
]);

db.Tags.insert([
{uniqueId: '14-7-1', parentId: '14', categoryId: '14-7', ja: "学術・DI"},
{uniqueId: '14-7-2', parentId: '14', categoryId: '14-7', ja: "メディカルサイエンスリエゾン・メディカルアフェアーズ"},
{uniqueId: '14-7-3', parentId: '14', categoryId: '14-7', ja: "メディカルドクター（アフェアーズ・学術）"}
]);

db.Tags.insert([
{uniqueId: '14-8-1', parentId: '14', categoryId: '14-8', ja: "ライセンシング"}
]);

db.Tags.insert([
{uniqueId: '14-9-1', parentId: '14', categoryId: '14-9', ja: "病院長・事務長"},
{uniqueId: '14-9-2', parentId: '14', categoryId: '14-9', ja: "医師"},
{uniqueId: '14-9-3', parentId: '14', categoryId: '14-9', ja: "看護師"},
{uniqueId: '14-9-4', parentId: '14', categoryId: '14-9', ja: "歯科医師"},
{uniqueId: '14-9-5', parentId: '14', categoryId: '14-9', ja: "歯科衛生士・歯科技工士"},
{uniqueId: '14-9-6', parentId: '14', categoryId: '14-9', ja: "臨床心理士・カウンセラー"},
{uniqueId: '14-9-7', parentId: '14', categoryId: '14-9', ja: "栄養士・管理栄養士"},
{uniqueId: '14-9-8', parentId: '14', categoryId: '14-9', ja: "臨床検査技師"},
{uniqueId: '14-9-9', parentId: '14', categoryId: '14-9', ja: "診療放射線技師"},
{uniqueId: '14-9-10', parentId: '14', categoryId: '14-9', ja: "保健師"},
{uniqueId: '14-9-11', parentId: '14', categoryId: '14-9', ja: "獣医師"},
{uniqueId: '14-9-12', parentId: '14', categoryId: '14-9', ja: "臨床工学技士"},
{uniqueId: '14-9-13', parentId: '14', categoryId: '14-9', ja: "その他医療・看護"}
]);

db.Tags.insert([
{uniqueId: '14-10-1', parentId: '14', categoryId: '14-10', ja: "薬剤師・管理薬剤師"},
{uniqueId: '14-10-2', parentId: '14', categoryId: '14-10', ja: "登録販売者"}
]);

db.Tags.insert([
{uniqueId: '14-11-1', parentId: '14', categoryId: '14-11', ja: "院長・福祉施設長"},
{uniqueId: '14-11-2', parentId: '14', categoryId: '14-11', ja: "介護福祉士・ケアマネジャー"},
{uniqueId: '14-11-3', parentId: '14', categoryId: '14-11', ja: "ホームヘルパー・ケアワーカー"},
{uniqueId: '14-11-4', parentId: '14', categoryId: '14-11', ja: "ケースワーカー"}
]);

db.Tags.insert([
{uniqueId: '14-12-1', parentId: '14', categoryId: '14-12', ja: "プロダクトマネージャー"},
{uniqueId: '14-12-2', parentId: '14', categoryId: '14-12', ja: "リサーチ"},
{uniqueId: '14-12-3', parentId: '14', categoryId: '14-12', ja: "マーケティングコミュニケーション"}
]);

db.Tags.insert([
{uniqueId: '15-1-1', parentId: '15', categoryId: '15-1', ja: "プロデューサー・ディレクター・プランナー"},
{uniqueId: '15-1-2', parentId: '15', categoryId: '15-1', ja: "デザイナー（グラフィック・その他）"},
{uniqueId: '15-1-3', parentId: '15', categoryId: '15-1', ja: "その他出版・広告・販促・印刷関連"},
{uniqueId: '15-1-4', parentId: '15', categoryId: '15-1', ja: "アートディレクター"},
{uniqueId: '15-1-5', parentId: '15', categoryId: '15-1', ja: "編集・記者・ライター"},
{uniqueId: '15-1-6', parentId: '15', categoryId: '15-1', ja: "DTP オペレーター"}
]);

db.Tags.insert([
{uniqueId: '15-2-1', parentId: '15', categoryId: '15-2', ja: "プロデューサー・ディレクター・プランナー"},
{uniqueId: '15-2-2', parentId: '15', categoryId: '15-2', ja: "AP（アシスタントプロデューサー）・AD・制作進行管理"},
{uniqueId: '15-2-3', parentId: '15', categoryId: '15-2', ja: "脚本家・放送作家・シナリオライター"},
{uniqueId: '15-2-4', parentId: '15', categoryId: '15-2', ja: "サウンドクリエイター"},
{uniqueId: '15-2-5', parentId: '15', categoryId: '15-2', ja: "その他映像・音響・イベント・芸能関連"},
{uniqueId: '15-2-6', parentId: '15', categoryId: '15-2', ja: "制作技術（実写・アニメ・音響・カメラ・舞台）"},
{uniqueId: '15-2-7', parentId: '15', categoryId: '15-2', ja: "芸能マネジャー"},
]);

db.Tags.insert([
{uniqueId: '15-3-1', parentId: '15', categoryId: '15-3', ja: "ファッション（服飾）デザイナー・パタンナー・スタイリスト"},
{uniqueId: '15-3-2', parentId: '15', categoryId: '15-3', ja: "VMD"},
{uniqueId: '15-3-3', parentId: '15', categoryId: '15-3', ja: "その他ファッション（アパレル・アクセサリー・テキスタイル）"}
]);

db.Tags.insert([
{uniqueId: '15-4-1', parentId: '15', categoryId: '15-4', ja: "プロダクトデザイナー・インダストリアルデザイナー（工業デザイナー）"}
]);

db.Tags.insert([
{uniqueId: '15-5-1', parentId: '15', categoryId: '15-5', ja: "その他クリエイティブ職"}
]);

db.Tags.insert([
{uniqueId: '15-6-1', parentId: '15', categoryId: '15-6', ja: "Web プロデューサー・Web ディレクター・Web プランナー"},
{uniqueId: '15-6-2', parentId: '15', categoryId: '15-6', ja: "アートディレクター"},
{uniqueId: '15-6-3', parentId: '15', categoryId: '15-6', ja: "Web デザイナー"},
{uniqueId: '15-6-4', parentId: '15', categoryId: '15-6', ja: "マークアップエンジニア・コーダー・フロントエンドエンジニア（Web・モバイル）"},
{uniqueId: '15-6-5', parentId: '15', categoryId: '15-6', ja: "Web 編集・Web ライター"},
{uniqueId: '15-6-6', parentId: '15', categoryId: '15-6', ja: "UI・UX デザイナー"},
{uniqueId: '15-6-7', parentId: '15', categoryId: '15-6', ja: "アシスタントディレクター・制作進行管理"}
]);

db.Tags.insert([
{uniqueId: '15-7-1', parentId: '15', categoryId: '15-7', ja: "Web ゲームプロデューサー・ディレクター・プランナー"},
{uniqueId: '15-7-2', parentId: '15', categoryId: '15-7', ja: "アートディレクター"},
{uniqueId: '15-7-3', parentId: '15', categoryId: '15-7', ja: "UI・UX デザイナー"},
{uniqueId: '15-7-4', parentId: '15', categoryId: '15-7', ja: "ゲームデザイナー・イラストレーター"},
{uniqueId: '15-7-5', parentId: '15', categoryId: '15-7', ja: "CG デザイナー"},
{uniqueId: '15-7-6', parentId: '15', categoryId: '15-7', ja: "マークアップエンジニア・コーダー・フロントエンドエンジニア（ゲーム）"},
{uniqueId: '15-7-7', parentId: '15', categoryId: '15-7', ja: "ゲームプログラマ"},
{uniqueId: '15-7-8', parentId: '15', categoryId: '15-7', ja: "サウンドクリエイター"},
{uniqueId: '15-7-9', parentId: '15', categoryId: '15-7', ja: "デバッグ（デバッガー）"}
]);

db.TagCategory.insert([
{uniqueId: '1-1', parentId: '1', ja: 'IT 営業'},
{uniqueId: '1-2', parentId: '1', ja: '半導体・電子部品・エレクトロニクス製品営業'},
{uniqueId: '1-3', parentId: '1', ja: '自動車・装置・機械製品営業'},
{uniqueId: '1-4', parentId: '1', ja: '原料・素材・化学製品営業'},
{uniqueId: '1-5', parentId: '1', ja: '医療営業'},
{uniqueId: '1-6', parentId: '1', ja: '食品・日用品・消費財営業'},
{uniqueId: '1-7', parentId: '1', ja: '建設・土木・不動産・住宅営業'},
{uniqueId: '1-8', parentId: '1', ja: '金融営業'},
{uniqueId: '1-9', parentId: '1', ja: '広告・メディア営業'},
{uniqueId: '1-10', parentId: '1', ja: '人材・求人広告営業'},
{uniqueId: '1-11', parentId: '1', ja: 'その他営業職'}
]);

db.TagCategory.insert([
{uniqueId: '2-1', parentId: '2', ja: 'マーケティング・商品企画・広告宣伝'},
{uniqueId: '2-2', parentId: '2', ja: '経理・財務・管理会計・内部統制'},
{uniqueId: '2-3', parentId: '2', ja: '総務・法務・知財・内部監査'},
{uniqueId: '2-4', parentId: '2', ja: '購買・物流・貿易'},
{uniqueId: '2-5', parentId: '2', ja: '経営企画・事業企画・営業企画'},
{uniqueId: '2-6', parentId: '2', ja: 'データアナリスト・データサイエンティスト・リサーチャー'},
{uniqueId: '2-7', parentId: '2', ja: '役員・事業統括マネジャー'},
{uniqueId: '2-8', parentId: '2', ja: '広報・IR'},
{uniqueId: '2-9', parentId: '2', ja: '人事'}
]);

db.TagCategory.insert([
{uniqueId: '3-1', parentId: '3', ja: '経理事務・財務アシスタント'},
{uniqueId: '3-2', parentId: '3', ja: '総務・法務・知財・人事アシスタント'},
{uniqueId: '3-3', parentId: '3', ja: '購買・物流・貿易アシスタント'},
{uniqueId: '3-4', parentId: '3', ja: '経営企画／事業統括'},
{uniqueId: '3-5', parentId: '3', ja: '金融事務'},
{uniqueId: '3-6', parentId: '3', ja: '医療事務'},
{uniqueId: '3-7', parentId: '3', ja: '秘書・受付'},
{uniqueId: '3-8', parentId: '3', ja: '通訳・翻訳'},
{uniqueId: '3-9', parentId: '3', ja: '営業事務・一般事務'}
]);

db.TagCategory.insert([
{uniqueId: '4-1', parentId: '4', ja: '店舗・販売'},
{uniqueId: '4-2', parentId: '4', ja: '店舗開発・施設管理'},
{uniqueId: '4-3', parentId: '4', ja: '美容関連（理美容・エステ・マッサージ・美容部員）'},
{uniqueId: '4-4', parentId: '4', ja: '旅行関連'},
{uniqueId: '4-5', parentId: '4', ja: '宿泊施設・ホテル'},
{uniqueId: '4-6', parentId: '4', ja: '運輸・物流サービス'},
{uniqueId: '4-7', parentId: '4', ja: '警備／清掃／監視／保守'},
{uniqueId: '4-8', parentId: '4', ja: 'テレマーケティング／カスタマーサポート／コールセンター'},
{uniqueId: '4-9', parentId: '4', ja: '教育／スクール／研修／塾講師／専門学校／英会話学校'},
{uniqueId: '4-10', parentId: '4', ja: 'バイヤー／MD'},
{uniqueId: '4-11', parentId: '4', ja: 'ブライダル・葬祭'}
]);

db.TagCategory.insert([
{uniqueId: '5-1', parentId: '5', ja: 'ビジネスコンサルタント'},
{uniqueId: '5-2', parentId: '5', ja: '専門事務所（会計・監査法人・法律・労務）'},
{uniqueId: '6-1', parentId: '6', ja: '開発'},
{uniqueId: '6-2', parentId: '6', ja: '運用'},
{uniqueId: '6-3', parentId: '6', ja: '投資銀行'},
{uniqueId: '6-4', parentId: '6', ja: 'リサーチ'},
{uniqueId: '6-5', parentId: '6', ja: '審査・査定'},
{uniqueId: '6-6', parentId: '6', ja: 'バックオフィス'},
{uniqueId: '7-1', parentId: '7', ja: '国家公務員・地方公務員'},
{uniqueId: '7-2', parentId: '7', ja: '教員／日本語教師／学校・大学事務'},
{uniqueId: '7-3', parentId: '7', ja: '農林水産関連職'}
]);

db.TagCategory.insert([
{uniqueId: '8-1', parentId: '8', ja: 'IT コンサルタント・システムコンサルタント'},
{uniqueId: '8-2', parentId: '8', ja: 'プリセールス'},
{uniqueId: '8-3', parentId: '8', ja: '業務系アプリケーションエンジニア・プログラマ'},
{uniqueId: '8-4', parentId: '8', ja: 'インフラエンジニア'},
{uniqueId: '8-5', parentId: '8', ja: 'サポート・ヘルプデスク'},
{uniqueId: '8-6', parentId: '8', ja: '社内情報システム（社内 SE）'},
{uniqueId: '8-7', parentId: '8', ja: '研究開発・R&D'},
{uniqueId: '8-8', parentId: '8', ja: '品質管理'},
{uniqueId: '8-9', parentId: '8', ja: 'データサイエンティスト'},
{uniqueId: '8-10', parentId: '8', ja: 'Web サービス系エンジニア・プログラマ'},
{uniqueId: '8-11', parentId: '8', ja: 'スマホアプリ・ネイティブアプリ系エンジニア'},
{uniqueId: '8-12', parentId: '8', ja: '制御系ソフトウェア開発（通信・ネットワーク・IoT 関連）'},
{uniqueId: '8-13', parentId: '8', ja: 'セキュリティエンジニア'}
]);

db.TagCategory.insert([
{uniqueId: '9-1', parentId: '9', ja: '基礎研究・先行開発・要素技術開発'},
{uniqueId: '9-2', parentId: '9', ja: '機械設計'},
{uniqueId: '9-3', parentId: '9', ja: '品質管理・品質保証'},
{uniqueId: '9-4', parentId: '9', ja: '生産技術'},
{uniqueId: '9-5', parentId: '9', ja: 'セールスエンジニア・アプリケーションエンジニア・FAE'},
{uniqueId: '9-6', parentId: '9', ja: 'サービスエンジニア・サポートエンジニア'},
{uniqueId: '9-7', parentId: '9', ja: 'その他技術職（機械・電気）'},
{uniqueId: '9-8', parentId: '9', ja: 'CAD オペレーター（機械）'},
{uniqueId: '9-9', parentId: '9', ja: '光学設計'},
{uniqueId: '9-10', parentId: '9', ja: 'CAE 解析'}]);

db.TagCategory.insert([
{uniqueId: '9-11', parentId: '9', ja: '回路設計'},
{uniqueId: '9-12', parentId: '9', ja: '電気設計・シーケンス制御'},
{uniqueId: '9-13', parentId: '9', ja: '評価・実験'},
{uniqueId: '9-14', parentId: '9', ja: '製品企画・プロジェクトマネージャー'},
{uniqueId: '9-15', parentId: '9', ja: '金型設計'},
{uniqueId: '9-16', parentId: '9', ja: '製造（溶接・加工・組立など）'},
{uniqueId: '9-17', parentId: '9', ja: '生産管理・工場長'},
{uniqueId: '9-18', parentId: '9', ja: 'デバイス開発（半導体・太陽光・液晶・LED など）'},
{uniqueId: '9-19', parentId: '9', ja: 'プロセスエンジニア（半導体・太陽光・液晶・LED など）'},
{uniqueId: '9-20', parentId: '9', ja: '自動車整備士・メカニック'},
{uniqueId: '9-21', parentId: '9', ja: 'テクニカルライター（マニュアル制作）'}
]);

db.TagCategory.insert([
{uniqueId: '10-1', parentId: '10', ja: '基礎研究・先行開発・要素技術開発（組み込みソフトウエア）'},
{uniqueId: '10-2', parentId: '10', ja: 'プロジェクトマネージャー（組み込みソフトウエア）'},
{uniqueId: '10-3', parentId: '10', ja: 'アプリケーション・ミドルウェア・デバイスドライバ・ファームウェア'},
{uniqueId: '10-4', parentId: '10', ja: '品質管理・品質保証・テクニカルサポート（組み込みソフトウエア）'},
{uniqueId: '10-5', parentId: '10', ja: '評価・デバッグ（デバッガー）'},
{uniqueId: '10-6', parentId: '10', ja: 'ユーザーインタフェース'},
{uniqueId: '10-7', parentId: '10', ja: '画像処理'},
{uniqueId: '10-8', parentId: '10', ja: '音声処理'}]);

db.TagCategory.insert([
{uniqueId: '10-9', parentId: '10', ja: 'プリセールス・アプリケーションエンジニア'},
{uniqueId: '10-10', parentId: '10', ja: 'コンサルティング（品質・開発プロセスなど）'},
{uniqueId: '11-1', parentId: '11', ja: '技術開発・部材開発・解析・調査'},
{uniqueId: '11-2', parentId: '11', ja: '建築設計・積算'},
{uniqueId: '11-3', parentId: '11', ja: '施工管理・施工管理技士'},
{uniqueId: '11-4', parentId: '11', ja: 'その他建設・建築・不動産・プラント・工場関連職'},
{uniqueId: '11-5', parentId: '11', ja: 'プラント'},
{uniqueId: '11-6', parentId: '11', ja: '職人・現場作業員'},
{uniqueId: '11-7', parentId: '11', ja: '不動産開発'},
{uniqueId: '11-8', parentId: '11', ja: '不動産運用・管理'},
{uniqueId: '11-9', parentId: '11', ja: '施設管理（技術系）'},
{uniqueId: '11-10', parentId: '11', ja: '設備設計・積算'},
{uniqueId: '11-11', parentId: '11', ja: '土木設計・測量'},
{uniqueId: '11-12', parentId: '11', ja: '工場ファシリティ・ユーティリティ・労働安全衛生'}]);

db.TagCategory.insert([
{uniqueId: '12-1', parentId: '12', ja: '基礎・応用研究（化学）'},
{uniqueId: '12-2', parentId: '12', ja: '製品開発（化学）'},
{uniqueId: '12-3', parentId: '12', ja: '製造プロセス開発・工法開発（化学）'},
{uniqueId: '12-4', parentId: '12', ja: '品質管理（化学）'},
{uniqueId: '12-5', parentId: '12', ja: '技術営業・アプリケーションエンジニア（化学・素材・化粧品・トイレタリー）'},
{uniqueId: '12-6', parentId: '12', ja: 'その他製造・生産'},
{uniqueId: '12-7', parentId: '12', ja: '分析・解析・測定・各種評価試験'},
{uniqueId: '12-8', parentId: '12', ja: '基礎・応用研究（化粧品・トイレタリー）'},
{uniqueId: '12-9', parentId: '12', ja: '製品開発（化粧品・トイレタリー）'},
{uniqueId: '12-10', parentId: '12', ja: '製造プロセス開発・工法開発（化粧品・トイレタリー）'}
]);

db.TagCategory.insert([
{uniqueId: '12-11', parentId: '12', ja: '生産管理（化学・素材・化粧品・トイレタリー）'},
{uniqueId: '12-12', parentId: '12', ja: '品質管理（化粧品・トイレタリー）'},
{uniqueId: '12-13', parentId: '12', ja: '品質保証・監査・化学法規（化学）'},
{uniqueId: '12-14', parentId: '12', ja: '品質保証・監査・薬事（化粧品・トイレタリー）'},
{uniqueId: '12-15', parentId: '12', ja: 'テクニカルサポート（技術系サポート職）'},
{uniqueId: '12-16', parentId: '12', ja: '製造・生産（化学）'},
{uniqueId: '12-17', parentId: '12', ja: '製造・生産（化粧品・トイレタリー）'},
{uniqueId: '12-18', parentId: '12', ja: '工場長（化学・素材・化粧品・トイレタリー）'}]);

db.TagCategory.insert([
{uniqueId: '13-1', parentId: '13', ja: '基礎・応用研究（食品・香料・飼料）'},
{uniqueId: '13-2', parentId: '13', ja: '製品開発（食品・香料・飼料）'},
{uniqueId: '13-3', parentId: '13', ja: '製造プロセス開発・工法開発（食品・香料・飼料）'},
{uniqueId: '13-4', parentId: '13', ja: '生産管理（食品・香料・飼料）'},
{uniqueId: '13-5', parentId: '13', ja: '品質管理（食品・香料・飼料）'},
{uniqueId: '13-6', parentId: '13', ja: '品質保証・監査（食品・香料・飼料）'},
{uniqueId: '13-7', parentId: '13', ja: '技術営業・アプリケーションエンジニア（食品・香料・飼料）'},
{uniqueId: '13-8', parentId: '13', ja: 'テクニカルサポート（技術系サポート職）（食品・香料・飼料）'},
{uniqueId: '13-9', parentId: '13', ja: '製造・生産（食品・香料・飼料）'}]);

db.TagCategory.insert([
{uniqueId: '13-10', parentId: '13', ja: '分析・解析・測定・各種評価試験（食品・香料・飼料）'},
{uniqueId: '13-11', parentId: '13', ja: '工場長（食品・香料・飼料）'}
]);

db.TagCategory.insert([
{uniqueId: '14-1', parentId: '14', ja: '研究'},
{uniqueId: '14-2', parentId: '14', ja: '臨床開発'},
{uniqueId: '14-3', parentId: '14', ja: '薬事'},
{uniqueId: '14-4', parentId: '14', ja: '品質管理・品質保証'},
{uniqueId: '14-5', parentId: '14', ja: '技術サポート'},
{uniqueId: '14-6', parentId: '14', ja: '生産・製造・プロセス開発（医療系）'},
{uniqueId: '14-7', parentId: '14', ja: '学術・メディカルアフェアーズ'},
{uniqueId: '14-8', parentId: '14', ja: 'ライセンシング'},
{uniqueId: '14-9', parentId: '14', ja: '医療・看護'},
{uniqueId: '14-10', parentId: '14', ja: '薬剤'},
{uniqueId: '14-11', parentId: '14', ja: '福祉'},
{uniqueId: '14-12', parentId: '14', ja: '医療系マーケティング'}]);

db.TagCategory.insert([
{uniqueId: '15-1', parentId: '15', ja: '出版・広告・販促・印刷'},
{uniqueId: '15-2', parentId: '15', ja: '映像・映画・音響・イベント・芸能関連'},
{uniqueId: '15-3', parentId: '15', ja: 'ファッション（アパレル／アクセサリー／テキスタイル）'},
{uniqueId: '15-4', parentId: '15', ja: 'プロダクトデザイナー／インダストリアルデザイナー（工業デザイナー）'},
{uniqueId: '15-5', parentId: '15', ja: 'その他クリエイティブ系職種'},
{uniqueId: '15-6', parentId: '15', ja: 'Web・モバイル（制作・開発）'},
{uniqueId: '15-7', parentId: '15', ja: 'ゲーム（制作・開発）'},
]);

db.TagParents.insert([
{uniqueId: 1, ja: '営業職'},
{uniqueId: 2, ja: '企画・管理'},
{uniqueId: 3, ja: '事務・アシスタント'},
{uniqueId: 4, ja: '販売・サービス職'},
{uniqueId: 5, ja: '専門職(コンサルティングファーム・専門事務職・監査法人)'},
{uniqueId: 6, ja: '金融系専門職'},
{uniqueId: 7, ja: '公務員・教員・農林水産関連職'},
{uniqueId: 8, ja: '技術職（SE・インフラエンジニア・Web エンジニア）'},
{uniqueId: 9, ja: '技術職（機械・電気）'},
{uniqueId: 10, ja: '技術職（組み込みソフトウェア）'},
{uniqueId: 11, ja: '技術職・専門職（建設・建築・不動産・プラント・工場）'},
{uniqueId: 12, ja: '技術職（化学・素材・化粧品・トイレタリー）'},
{uniqueId: 13, ja: '技術職（食品・香料・飼料）'},
{uniqueId: 14, ja: '医療系専門職'},
{uniqueId: 15, ja: 'クリエイター・クリエイティブ職'},
]);
