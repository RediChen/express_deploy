const express = require('express');
const { singers } = require("./singer.json");

//================== 初始化
const PORT = 3000;
const ROOT = "http://localhost";
const app = express();

const errContent = `
<!DOCTYPE html>
<html lang="zh-Hant-tw">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>不存在的頁面</title>
		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
		/>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	</head>
  <body>
    <h1 class="my-5 mx-auto py-3 w-50 text-bg-danger text-center">不存在的頁面</h1>
	</body>
</html>
  `;

//================== 設置路由架構
app.get("/", (req, res) => {
  res.send("歡迎來到首頁");
});

app.get("/singers/:sid.html", (req, res) => {
  const { sid } = req.params;

  const singer = singers.find(s => s.id === parseInt(sid));
  if (!singer) {
    res.status(404).end(errContent);
    return;
  }
  const pageContent = `
<!DOCTYPE html>
<html lang="zh-Hant-tw">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>${singer.singer_name} | 歌手介紹</title>
		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
		/>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	</head>
  <body>
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6">
          <div class="border-2 border-dark">
            <h1 class="text-bg-light rounded-pill text-center p-2 my-3">${singer.singer_name}</h1>
            <div class="my-3 mx-auto w-25">
              <img
                src="${singer.singer_img}"
                alt="${singer.singer_name}"
                class="w-100 object-fit-cover rounded-circle"
              />
            </div>
            <p class="text-center">${singer.singer_id}</p>
          </div>
				</div>
      </div>
		</div>
    <script src="./main.js"></script>
	</body>
</html>

  `;
  

  res.end(pageContent);
});

app.get("/", (req, res) => { });

//================== 監聽設置
app.listen(PORT, () => {
  console.log(`連線服務已運行於: ${ROOT}:${PORT}`);
})