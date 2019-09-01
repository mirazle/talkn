●サーバー側では定義したバランス通りに保存するだけ。

/common/emotions/modelのバランスの通りに絵文字IDに従って保存

●クライアント側(表示時の計算)
-管理画面の通常表示(ユーザー側は0-5になる)
入力合計値(228)	1以上	5以上,	10以上,		30以上,		70以上,		100以上, 		250以上,	500以上, 	750以上,	1000以上
グラフ上限値		0-1,		0-2,	0-3,		0-4,		0-5,		0-6,			0-7			0-8			0-9			0-10

●●●例1	入力累積値を按分する
————————————————————
EXCITE		25	(入力合計値の11%)		1
HAPPY		75	(入力合計値33%)		5
JOY			100	(入力合計値の44%)		6
RELAX		20	(入力合計値の8%)		1
SLACK		5	(入力合計値の2%)		0	
MEKANCHOLY	2	(入力合計値の0.8%)	0
ANGER		1	(入力合計値の0.4%)	0
WORRY&FEAR	0	(入力合計値の0.0%)	0
——
入力合計値：		228
グラフ上限値	：	6
——
44% / 7(最大指標値に0の分を確保するために6に1を加算) = 6.285%刻みで0-6のグラフ指標値を決定

	0%		-	6.285%		0
	6.285%	-	12.57%		1
	12.57%	-	18.855%		2
	18.855%	-	25.14%		3
	25.14%	-	31.425%		4
	31.425%	-	37.71%		5
	37.71%	-	43.995%		6
————————————————————

●●●例2	入力累積値を按分する
————————————————————
EXCITE		0	(入力合計値の0%)		0
HAPPY		0	(入力合計値0%)		0
JOY			0	(入力合計値の0%)		0
RELAX		0	(入力合計値の0%)		0
SLACK		0	(入力合計値の0%)		0	
MEKANCHOLY	2	(入力合計値の50%)		1
ANGER		1	(入力合計値の25%)		0
WORRY&FEAR	1	(入力合計値の25%)		0
——
入力合計値：		4
グラフ上限値	：	1
——
50% / 2(最大指標値に0の分を確保するために1に1を加算) = 25%刻みで0-1のグラフ指標値を決定

	0%		-	25%			0
	25%		-	50%			0
	50%		-	75%			1
	75%		-	100%			1

————————————————————

●●●例3	入力累積値を按分する
————————————————————
EXCITE		0	(入力合計値の0%)		0
HAPPY		0	(入力合計値0%)		0
JOY			0	(入力合計値の0%)		0
RELAX		0	(入力合計値の0%)		0
SLACK		1	(入力合計値の100%)	1
MEKANCHOLY	0	(入力合計値の50%)		0
ANGER		0	(入力合計値の25%)		0
WORRY&FEAR	0	(入力合計値の25%)		0
——
入力合計値：		1
グラフ上限値	：	1
——
100% / 2(最大指標値に0の分を確保するために1に1を加算) = 50%刻みで0-1のグラフ指標値を決定

	0%		-	50%			0
	50%		-	100%			1

————————————————————

●●●例4	入力累積値を按分する
————————————————————
EXCITE		1	(入力合計値の3.57%)	0
HAPPY		2	(入力合計値7.14%)		1
JOY			3	(入力合計値の10.71%)	1
RELAX		4	(入力合計値の14.28%)	2
SLACK		5	(入力合計値の17.85%)	2
MEKANCHOLY	6	(入力合計値の21.42%)	3
ANGER		7	(入力合計値の25%)		3
WORRY&FEAR	0	(入力合計値の0%)		0
——
入力合計値：		28
グラフ上限値	：	3
——
25% / 4(最大指標値に0の分を確保するために1に1を加算) = 6.25%刻みで0-3のグラフ指標値を決定

	0%		-	6.25%		0
	6.25%	-	12.5%		1
	12.5%	-	18.75%		2
	18.75%	-	25%			3
————————————————————

●●●例5	入力累積値を按分する
————————————————————
EXCITE		1234	(入力合計値の10.17%)	2
HAPPY		2345	(入力合計値19.34%)	5
JOY			3456	(入力合計値の28.50%)	8
RELAX		0	(入力合計値の0%)		0
SLACK		1	(入力合計値の0%)		0
MEKANCHOLY	2	(入力合計値の0%)		0
ANGER		4567	(入力合計値の37.66%)	10
WORRY&FEAR	520	(入力合計値の4.28%)	1
——
入力合計値：		12125
グラフ上限値	：	10
——
37.66% / 11(最大指標値に0の分を確保するために1に1を加算) = 3.42%刻みで0-10のグラフ指標値を決定

	0%		-	3.42%		0
	3.42%	-	6.84%		1
	6.84%	-	10.26%		2
	10.26%	-	13.68%		3
	13.68%	-	17.1%			4
	17.1%		-	20.52%		5
	20.52%	-	23.94%		6
	23.94%	-	27.36%		7
	27.36%	-	30.78%		8
	30.78%	-	34.2%		9
	34.2%	-	37.62%		10
————————————————————