Large は Posts で scroll させている
Small, Middle は Window で scroll させている

Large だけ Posts で scroll させているのはスクローラーの表示位置を正しい位置に表示させたいため(特に windows)

UPDATE: 2020/08/15

    SMALLもPostsのscrollに変更

理由：
iPhone の Chrome, Safari などで Menu からスレッドを選択した際に、Posts の高さが変更される。
その時に iframe 内の表示が崩れる現象(Posts の位置が変更され表示自体が無くなるように見える | メニューが 100px 位下に表示される)があり、
調査により Posts の高さを固定(100vh)にしてインラインスクロールにするとこの現象は起こらなくなった。
